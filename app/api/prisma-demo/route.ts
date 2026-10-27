import { NextResponse } from "next/server";
import {
  getUniversitiesWithRelations,
  createUniversityWithReviewsTransaction,
  updateApplicationWithAuditTransaction,
} from "@/lib/prisma-transactions";
import { prisma } from "@/lib/prisma";

// GET: Fetch all universities with nested Reviews & Applications (Relational query)
export async function GET() {
  try {
    const data = await getUniversitiesWithRelations();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch relational data",
      },
      { status: 500 }
    );
  }
}

// POST: Execute transactional actions based on requested action type
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "create-university-with-reviews") {
      const university = await createUniversityWithReviewsTransaction({
        name: body.name || "University of Oxford",
        country: body.country || "United Kingdom",
        city: body.city || "Oxford",
        ranking: body.ranking || 1,
        tuition: body.tuition || 38000,
        acceptanceRate: body.acceptanceRate || 0.14,
        overview: body.overview || "World renowned collegiate research university.",
        reviews: body.reviews || [
          {
            author: "Aiden Chen",
            program: "Computer Science MPhil",
            rating: 5,
            quote: "Unmatched academic depth and historical colleges.",
          },
        ],
      });

      return NextResponse.json({ success: true, data: university }, { status: 201 });
    }

    if (action === "seed-sample-application") {
      // Create a university with an application to test transactions on
      let uni = await prisma.university.findFirst({
        include: { applications: true },
      });

      if (!uni) {
        uni = await prisma.university.create({
          data: {
            name: "ETH Zurich",
            country: "Switzerland",
            city: "Zurich",
            ranking: 7,
            tuition: 1600,
            acceptanceRate: 0.27,
          },
          include: { applications: true },
        });
      }

      const app = await prisma.application.create({
        data: {
          universityId: uni.id,
          program: "MSc Robotics, Systems and Control",
          status: "Draft",
          progress: 20,
        },
      });

      return NextResponse.json({ success: true, data: app }, { status: 201 });
    }

    if (action === "run-status-transaction") {
      const { applicationId, newStatus, newProgress, simulateFailure } = body;

      if (!applicationId || !newStatus) {
        return NextResponse.json(
          { success: false, error: "applicationId and newStatus are required" },
          { status: 400 }
        );
      }

      const result = await updateApplicationWithAuditTransaction(
        applicationId,
        newStatus,
        newProgress ?? 50,
        Boolean(simulateFailure)
      );

      return NextResponse.json({ success: true, data: result }, { status: 200 });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action specified." },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Transaction failed and rolled back.",
      },
      { status: 500 }
    );
  }
}
