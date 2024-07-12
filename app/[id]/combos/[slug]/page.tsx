

import ComboCard from "@/components/myUI/ComboCard";
import { db } from "@/db";
import { characters, combos } from "@/db/schema";
import { getAllCombos } from "@/lib/actions";
import { get } from "http";
import { useParams } from "next/navigation";
import ComboModal from "./ComboModal";
import { eq } from "drizzle-orm";


type comboSet = {
  id: number;
  characterId: number;
  moves: string;
  file: string;
  isTrue: boolean;
  notes: string;
  doesKill: boolean;
  startingPercent: number;
};

export default async function Page({ params }: { params: { id: string } }) {
  let cur = await db.select().from(combos)
  return (
    <main className="pt-16">
      <h1>hi {params.id}</h1>
      <ComboModal combos={cur} />
    </main>
  );
}
