import AddComboBtn from "@/components/AddComboBtn";
import CharComboPage from "@/components/myUI/CharComboPage";
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
      charToId.set(person.name, Number(person.id));
    }
  }
  console.log(charToId, "CHar");
  const charCombos = await db
    .select()
    .from(combos)
    .where(eq(combos.characterId, charToId.get(params.id)));
  headers();
  let displayCombos = charCombos.map((item: comboSet) => (
    <ComboCard key={item.id} combo={item} />
    
  ))
  
  return (
    <section className="flex flex-col items-center bg-UFD-Combo-bg text-white pt-16 h-screen">
      {/* <div className="flex gap-2 w-full bg-blue-300 ">
        <p>
          {params.id}
        </p> 
        <SignedIn>
        <div className="flex bg-slate-400">
          add a combo
          <AddComboBtn id={params.id} />
        </div>
        </SignedIn>
      </div> */}
      <div className="flex gap-3 flex-wrap w-full h-full overflow-hidden ">
      <CharComboPage id={params.id} combos={charCombos} charImg={char[Number(charToId.get(params.id) - 1)].img} />
        {/* {displayCombos} */}
      </div>
    </section>
  );
}
