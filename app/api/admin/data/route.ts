import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/db";
import { user, session, applications } from "@/db/schema";

/**
 * Confidential Server Data Endpoint (Admin Only)
 * Protected at both Edge Proxy Middleware layer and Route Handler layer.
 */
export async function GET() {
  const headerList = await headers();
  const userRole = headerList.get("x-user-role");
  const userEmail = headerList.get("x-user-email");
  const userId = headerList.get("x-user-id");

  // Secondary Defense-in-Depth verification
  if (userRole !== "admin") {
    return NextResponse.json(
      {
        success: false,
        error: "Forbidden: Unauthorized server data access blocked.",
        requiredRole: "admin",
        currentRole: userRole || "guest",
      },
      { status: 403 }
    );
  }

  // Fetch confidential server statistics
  let userCount = 0;
  let sessionCount = 0;
  let applicationCount = 0;

  try {
    [userCount, sessionCount, applicationCount] = await Promise.all([
      db.$count(user),
      db.$count(session),
      db.$count(applications),
    ]);
  } catch (e) {
    console.warn("Could not query DB counts:", e);
  }

  return NextResponse.json(
    {
      success: true,
      message: "Authorized server data access granted.",
      caller: {
        id: userId,
        email: userEmail,
        role: userRole,
      },
      confidentialServerMetrics: {
        serverTimestamp: new Date().toISOString(),
        systemStatus: "OPERATIONAL",
        registeredUsersInDb: userCount,
        activeSessionsInDb: sessionCount,
        trackedApplicationsInDb: applicationCount,
        securityFirewall: "proxy.ts middleware ACTIVE",
        serverNodeVersion: process.version,
      },
    },
    { status: 200 }
  );
}
