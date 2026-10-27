import { prisma } from "@/lib/prisma";

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

/**
 * Transactional Operation 1: Nested / Atomic Creation
 * Atomically inserts a University and its related Reviews in a single query transaction.
 */
export async function createUniversityWithReviewsTransaction(data: UniversityWithReviewsInput) {
  return await prisma.university.create({
    data: {
      name: data.name,
      country: data.country,
      city: data.city,
      ranking: data.ranking,
      tuition: data.tuition,
      acceptanceRate: data.acceptanceRate,
      overview: data.overview,
      reviews: {
        create: data.reviews.map((r) => ({
          author: r.author,
          program: r.program,
          rating: r.rating,
          quote: r.quote,
        })),
      },
    },
    include: {
      reviews: true,
      applications: true,
    },
  });
}

/**
 * Transactional Operation 2: Interactive Transaction ($transaction)
 * Atomically updates an application's progress & status while generating an immutable AuditLog entry.
 * If either operation fails, both are rolled back automatically.
 */
export async function updateApplicationWithAuditTransaction(
  applicationId: string,
  newStatus: string,
  newProgress: number,
  shouldSimulateFailure: boolean = false
) {
  return await prisma.$transaction(async (tx: any) => {
    // Step 1: Read existing state
    const current = await tx.application.findUnique({
      where: { id: applicationId },
    });

    if (!current) {
      throw new Error(`Application with ID ${applicationId} not found.`);
    }

    // Step 2: Update application
    const updatedApplication = await tx.application.update({
      where: { id: applicationId },
      data: {
        status: newStatus,
        progress: newProgress,
      },
    });

    // Step 3: Write audit log record
    const auditRecord = await tx.auditLog.create({
      data: {
        applicationId,
        action: "STATUS_CHANGE",
        previousValue: current.status,
        newValue: newStatus,
      },
    });

    // Step 4: Deliberate rollback demonstration (if requested)
    if (shouldSimulateFailure) {
      throw new Error(
        "SIMULATED_TRANSACTION_FAILURE: Deliberate rollback triggered. Application update and AuditLog were reverted."
      );
    }

    return {
      application: updatedApplication,
      audit: auditRecord,
    };
  });
}

/**
 * Fetch all Universities with their related reviews and applications
 */
export async function getUniversitiesWithRelations() {
  return await prisma.university.findMany({
    include: {
      reviews: true,
      applications: {
        include: {
          auditLogs: {
            orderBy: { timestamp: "desc" },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
