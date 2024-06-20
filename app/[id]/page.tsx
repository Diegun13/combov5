import AddComboBtn from "@/components/AddComboBtn";
import ComboCard from "@/components/myUI/ComboCard";
import { db } from "@/db/index";
import { characters, combos } from "@/db/schema";
import { SignedIn } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
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

export default async function CharacterCombos({ params }: { params: { id: string } }) {
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
  let displayCombos = charCombos.map((item: comboSet) => (
    <ComboCard key={item.id} combo={item} />
    
  ))

  return (
    <section className="flex flex-col items-center bg-slate-700 h-screen pt-9">
      <div className="bg-green-300">{params.id}</div>
      <div className="flex gap-3">{displayCombos}
      
      

      {/* <SignedIn> */}
        <div>
          add a combo
          <AddComboBtn id={params.id} />
        </div>
      {/* </SignedIn> */}
      </div>
    </section>
  );
}
