import { db } from "@/db/index";
import { characters } from "@/db/schema";
import Link from "next/link";

export default async function Home() {
  let Characters = await db.query.characters.findMany()
  return (
    <main className="flex flex-col justify-center items-center bg-slate-700">
      <h1>Select Your Character</h1>
      {Characters.map((char) => (
        <Link href={`${char.name}`} key={char.id}>
        <div >
          {char.name}
        </div>
        </Link>
        ))}
    </main>
  );
}
