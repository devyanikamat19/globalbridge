"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Server Action ensuring the admin demo user has role="admin" in PostgreSQL
 */
export async function setDemoUserRole(email: string, role: "admin" | "user") {
  try {
    await prisma.user.updateMany({
      where: { email },
      data: { role },
    });
    revalidatePath("/role-demo");
    revalidatePath("/auth");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
