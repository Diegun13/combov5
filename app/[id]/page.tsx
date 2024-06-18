import AddComboBtn from "@/components/AddComboBtn";
import { db } from "@/db/index";
import { characters, combos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/dist/server/api-utils";
import { headers } from "next/headers";

type comboSet = {
  id: number;
  characterId: number;
  moves: string;
  file: string;
  isTrue: boolean;
  notes: string;
  doesKill: boolean | null;
  startingPercent: number;
};

export default async function page({ params }: { params: { id: string } }) {
  const char = await db.select().from(characters);
  let charToId = new Map();
  for (let person of char) {
    if (!charToId.get(person.name)) {
      charToId.set(person.name, person.id);
    }
  }
  console.log(charToId);
  const charCombos = await db
    .select()
    .from(combos)
    .where(eq(combos.characterId, charToId.get(params.id)));
  headers();
  return (
    <section className="flex flex-col justify-center items-center">
      <div className="bg-green-300">{params.id}</div>
      <div>{charCombos.map((item: comboSet) => item.moves)}</div>
      <div>
        add a combo
        <AddComboBtn id={params.id} />
      </div>
    </section>
  );
}
