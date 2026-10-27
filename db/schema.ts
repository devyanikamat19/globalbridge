import { pgTable, text, integer, doublePrecision, boolean, timestamp } from "drizzle-orm/pg-core";
import { randomUUID } from "node:crypto";

const id = () => text("id").primaryKey().$defaultFn(() => randomUUID());
const createdAt = () => timestamp("created_at").notNull().defaultNow();
const updatedAt = () => timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date());

export const universities = pgTable("universities", {
  id: id(), name: text("name").notNull(), country: text("country").notNull(), city: text("city").notNull(),
  ranking: integer("ranking"), tuition: integer("tuition"), acceptanceRate: doublePrecision("acceptance_rate"),
  image: text("image"), overview: text("overview"), createdAt: createdAt(), updatedAt: updatedAt(),
});
export const reviews = pgTable("reviews", {
  id: id(), author: text("author").notNull(), program: text("program").notNull(), rating: integer("rating").notNull(),
  quote: text("quote").notNull(), universityId: text("university_id").notNull().references(() => universities.id, { onDelete: "cascade" }), createdAt: createdAt(),
});
export const applications = pgTable("applications", {
  id: id(), program: text("program").notNull(), status: text("status").notNull().default("Draft"), deadline: text("deadline"),
  progress: integer("progress").notNull().default(10), universityId: text("university_id").notNull().references(() => universities.id, { onDelete: "cascade" }),
  createdAt: createdAt(), updatedAt: updatedAt(),
});
export const auditLogs = pgTable("audit_logs", {
  id: id(), action: text("action").notNull(), previousValue: text("previous_value"), newValue: text("new_value").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(), applicationId: text("application_id").notNull().references(() => applications.id, { onDelete: "cascade" }),
});
export const user = pgTable("user", {
  id: id(), name: text("name").notNull(), email: text("email").notNull().unique(), emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"), role: text("role").notNull().default("user"), createdAt: createdAt(), updatedAt: updatedAt(),
});
export const session = pgTable("session", {
  id: id(), userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }), token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(), ipAddress: text("ip_address"), userAgent: text("user_agent"), createdAt: createdAt(), updatedAt: updatedAt(),
});
export const account = pgTable("account", {
  id: id(), userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }), accountId: text("account_id").notNull(), providerId: text("provider_id").notNull(),
  accessToken: text("access_token"), refreshToken: text("refresh_token"), idToken: text("id_token"), accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"), scope: text("scope"), password: text("password"), createdAt: createdAt(), updatedAt: updatedAt(),
});
export const verification = pgTable("verification", {
  id: id(), identifier: text("identifier").notNull(), value: text("value").notNull(), expiresAt: timestamp("expires_at").notNull(), createdAt: createdAt(), updatedAt: updatedAt(),
});
