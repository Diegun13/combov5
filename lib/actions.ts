"use server"
import { db } from "@/db/index";
import { characters, combos } from "@/db/schema";
import { useRouter } from "next/router";
import { ComboValadtion } from "../lib/validations/ComboVal";
import { z } from "zod";

 export async function SubmitCombo(formdata: FormData, id: string) {
    "use server"
    const char = await db.select().from(characters);
    let charToId = new Map();
    for (let person of char) {
      if (!charToId.get(person.name)) {
        charToId.set(person.name, person.id);
      }
    }
    await db.insert(combos).values({
      characterId: Number(charToId.get(id)),
      moves: formdata.get("moves") as string,
      file: formdata.get("file") as string,
      isTrue:  formdata.get("isTrue") == "true"?  true: false,
      notes:  formdata.get("notes") as string,
      doesKill:  formdata.get("doesKill") == "true"?  true: false,
      startingPercent:  Number(formdata.get("startingPercent")),
    });    
    // console.log(formdata, id, "did it work?") 
  }