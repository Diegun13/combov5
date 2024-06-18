"use server"

import { db } from "@/db/index";
import { characters, combos } from "@/db/schema";
import { useRouter } from "next/router";





 export async function SubmitCombo(formdata: FormData, id: string) {
    "use server"
    const char = await db.select().from(characters);
    let charToId = new Map();
    for (let person of char) {
      if (!charToId.get(person.name)) {
        charToId.set(person.name, person.id);
      }
    }

let cheese = {
characterId: Number(charToId.get(id)),
moves: formdata.get("moves") as string,
file: formdata.get("file") as string,
isTrue: formdata.get("isTrue") === 'true',
notes: formdata.get("notes") as string,
doesKill: formdata.get("doesKill") === 'true',
startingPercent: Number(formdata.get("startingPercent"))
}










    await db.insert(combos).values({...cheese});
    console.log(formdata)
  }