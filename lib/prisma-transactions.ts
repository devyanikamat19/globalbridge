import { db } from "@/db";
import { universities, reviews, applications, auditLogs } from "@/db/schema";
import { desc, eq, inArray } from "drizzle-orm";

export interface UniversityWithReviewsInput {
  name: string;
  country: string;
  city: string;
  ranking?: number;
  tuition?: number;
  acceptanceRate?: number;
  overview?: string;
  reviews: Array<{
    author: string;
    program: string;
    rating: number;
    quote: string;
  }>;
}

export async function createUniversityWithReviewsTransaction(data: UniversityWithReviewsInput) {
  return db.transaction(async (tx) => {
    const { reviews: reviewInputs, ...universityData } = data;
    const [university] = await tx.insert(universities).values(universityData).returning();
    const insertedReviews = reviewInputs.length
      ? await tx.insert(reviews).values(reviewInputs.map((review) => ({ ...review, universityId: university.id }))).returning()
      : [];
    return { ...university, reviews: insertedReviews, applications: [] };
  });
}

export async function updateApplicationWithAuditTransaction(
  applicationId: string,
  newStatus: string,
  newProgress: number,
  shouldSimulateFailure = false
) {
  return db.transaction(async (tx) => {
    const [current] = await tx.select().from(applications).where(eq(applications.id, applicationId)).for("update");
    if (!current) throw new Error(`Application with ID ${applicationId} not found.`);
    const [application] = await tx.update(applications).set({ status: newStatus, progress: newProgress })
      .where(eq(applications.id, applicationId)).returning();
    const [audit] = await tx.insert(auditLogs).values({
      applicationId, action: "STATUS_CHANGE", previousValue: current.status, newValue: newStatus,
    }).returning();
    if (shouldSimulateFailure) {
      throw new Error("SIMULATED_TRANSACTION_FAILURE: Deliberate rollback triggered. Application update and AuditLog were reverted.");
    }
    return { application, audit };
  });
}

export async function getUniversitiesWithRelations() {
  return db.transaction(async (tx) => {
    const universityRows = await tx.select().from(universities).orderBy(desc(universities.createdAt));
    if (!universityRows.length) return [];
    const ids = universityRows.map((row) => row.id);
    const reviewRows = await tx.select().from(reviews).where(inArray(reviews.universityId, ids));
    const applicationRows = await tx.select().from(applications).where(inArray(applications.universityId, ids));
    const logs = applicationRows.length
      ? await tx.select().from(auditLogs).where(inArray(auditLogs.applicationId, applicationRows.map((row) => row.id))).orderBy(desc(auditLogs.timestamp))
      : [];
    return universityRows.map((university) => ({
      ...university,
      reviews: reviewRows.filter((review) => review.universityId === university.id),
      applications: applicationRows.filter((application) => application.universityId === university.id)
        .map((application) => ({ ...application, auditLogs: logs.filter((log) => log.applicationId === application.id) })),
    }));
  });
}

export async function seedSampleApplication() {
  return db.transaction(async (tx) => {
    let [university] = await tx.select().from(universities).limit(1);
    if (!university) {
      [university] = await tx.insert(universities).values({
        name: "ETH Zurich", country: "Switzerland", city: "Zurich", ranking: 7, tuition: 1600, acceptanceRate: 0.27,
      }).returning();
    }
    const [application] = await tx.insert(applications).values({
      universityId: university.id, program: "MSc Robotics, Systems and Control", status: "Draft", progress: 20,
    }).returning();
    return application;
  });
}
