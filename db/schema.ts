import { integer, pgTable, serial, text, timestamp, boolean, varchar } from 'drizzle-orm/pg-core';

export const characters = pgTable('SSBU_characters', {
    id: serial('id').primaryKey(),
    ssbu_id: integer('ssbu_id'),
    name: text('name').notNull(),
    img: text('img').notNull(),
  });

  export const users = pgTable(
    'SSBU_users', {
      id: serial('id').primaryKey(),
      clerkID: varchar('clerk_id').notNull(),
      username: text('username').notNull(),
  })
  
    
  export const combos = pgTable(
    'SSBU_combos', {
      id: serial('id').primaryKey(),
      characterId: integer('character_id').notNull().references(() => characters.id),
      userId: integer('user_id').references(() => users.id),
      moves: text('moves').notNull(),
      file: text('gif').notNull(),
      isTrue: boolean('is_true').notNull(), // BOOLEAN in SQL, integer in TypeScript
      notes: text('notes').notNull(),
      doesKill: boolean('does_kill'), // BOOLEAN in SQL, integer in TypeScript
      startingPercent: integer('starting_percent').notNull()
  });
  
  