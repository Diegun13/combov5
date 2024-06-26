import CharacterCard from "@/components/myUI/CharacterCard";
import { db } from "@/db/index";
import { characters } from "@/db/schema";
import Link from "next/link";

export default async function Home() {
  let Characters = await db.query.characters.findMany();
  let displayCharacters = Characters.map((char) => (
    <CharacterCard key={char.id} char={char} />
  ));
  return (
    <main className="flex flex-col items-center bg-UFD-bg h-screen pt-16">
      <h1 className="text-white text-2xl font-poppins font-bold pt-2">Select Your Character</h1>
      <div className=" pt-5 flex h-full w-full justify-center gap-4">
        {displayCharacters}
        </div>
    </main>
  );
}
