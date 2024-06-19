import CharacterCard from "@/components/myUI/CharacterCard";
import { db } from "@/db/index";
import { characters } from "@/db/schema";
import Link from "next/link";

export default async function Home() {
  let Characters = await db.query.characters.findMany();
  let displayCharacters = Characters.map((char) => (
    <CharacterCard key={char.id} char={char}/>
  ))
  return (
    <main className="flex flex-col items-center bg-slate-700 h-screen">
      <h1 className=" bg-green-900">Select Your Character</h1>
      <div className="flex gap-4 ">
        {displayCharacters}
      </div>
    </main>
  );
}
