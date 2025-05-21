import { relations } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  text,
  integer,
  timestamp,
  decimal,
  pgEnum, uuid,
} from 'drizzle-orm/pg-core';

// === Enums ===
export const recordTypeEnum = pgEnum('RecordType', ['income', 'expense']);
export const goalStatusEnum = pgEnum('GoalStatus', ['not_completed', 'achieved']);

// === User ===
export const users = pgTable('User', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  username: varchar('username', { length: 255 }).unique().notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }),
  profileImage: varchar('profileImage', { length: 500 }),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow().notNull(),
});

// === Category ===
export const categories = pgTable('Category', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  type: recordTypeEnum('type').notNull(),
  color: varchar('color', { length: 50 }).notNull(),
  userId: integer('userId').notNull().references(() => users.id),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow().notNull(),
});

// === FinancialRecord ===
export const financialRecords = pgTable('FinancialRecord', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  userId: integer('userId').notNull().references(() => users.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 10 }).notNull(),
  description: text('description'),
  type: recordTypeEnum('type').notNull(),
  categoryId: integer('categoryId').references(() => categories.id),
  attachment: varchar('attachment', { length: 500 }),
  month: varchar('month', { length: 20 }).notNull(),
  year: integer('year').notNull(),
});

// === Goal ===
export const goals = pgTable('Goal', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 10 }).notNull(),
  status: goalStatusEnum('status').notNull(),
  photo: varchar('photo', { length: 500 }),
  userId: integer('userId').notNull().references(() => users.id),
});

// === Relations ===
export const userRelations = relations(users, ({ many }) => ({
  records: many(financialRecords),
  goals: many(goals),
  categories: many(categories),
}));

export const recordRelations = relations(financialRecords, ({ one }) => ({
  user: one(users, { fields: [financialRecords.userId], references: [users.id] }),
  category: one(categories, { fields: [financialRecords.categoryId], references: [categories.id] }),
}));

export const categoryRelations = relations(categories, ({ one, many }) => ({
  user: one(users, { fields: [categories.userId], references: [users.id] }),
  records: many(financialRecords),
}));

export const goalRelations = relations(goals, ({ one }) => ({
  user: one(users, { fields: [goals.userId], references: [users.id] }),
}));
