"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Server Action ensuring the admin demo user has role="admin" in PostgreSQL
 */
export async function setDemoUserRole(email: string, role: "admin" | "user") {
  try {
    await db.update(user).set({ role }).where(eq(user.email, email));
    revalidatePath("/role-demo");
    revalidatePath("/auth");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
