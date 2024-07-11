"use server"
import { db } from "@/db/index";
import { characters, combos, users } from "@/db/schema";
import { useRouter } from "next/router";
import { ComboValadtion } from "../lib/validations/ComboVal";
import { z } from "zod";
import { utapi } from "@/utils/uploadthing";
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
=======
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
>>>>>>> 99e1fdf84608f742d85adaf660b57b7ac7343e65

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

export async function getAllCombos(){
}


<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> 99e1fdf84608f742d85adaf660b57b7ac7343e65
 export async function SubmitCombo(formdata: FormData, id: string) {
    const char = await db.select().from(characters);
    let charToId = new Map();
    for (let person of char) {
      if (!charToId.get(person.name)) {
        charToId.set(person.name, person.id);
      }
    }
   console.log(formdata, "formdata")

    const files = formdata.getAll("file") as File[];
    if(files[0].name != 'undefined') {
      console.log(files.length, files[0], "files")
    const response = await utapi.uploadFiles(new File([files[0]], files[0].name ));
    formdata.set("file", `${response.data?.url}`);
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
=======
>>>>>>> 99e1fdf84608f742d85adaf660b57b7ac7343e65
    }else{
      formdata.set("file", `na`);

    }
<<<<<<< HEAD

    let testman = await currentUser();
    const doesUserExist = await db.select().from(users).where(eq(users.clerkID, String(testman?.id)));

>>>>>>> Stashed changes
=======
>>>>>>> 99e1fdf84608f742d85adaf660b57b7ac7343e65
    await db.insert(combos).values({
      userId: doesUserExist[0].id,
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

export async function deleteCombo(combo: comboSet) {
  await db.delete(combos).where(eq(combos.id, Number(combo.id)));
  await utapi.deleteFiles(combo.file.slice(18))
  console.log(combo.id, "deleted")
  revalidatePath(`/${combo.id}`)
}

export async function editCombo(combo: comboSet) {
  db.update(combos).set({
    //add udated values here
  }).where(eq(combos.id, 88));
}

