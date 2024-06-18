import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const characters = pgTable('SSBU_characters', {
    id: serial('id').primaryKey(),
    ssbu_id: integer('ssbu_id'),
    name: text('name').notNull(),
    img: text('img').notNull(),
  });
  