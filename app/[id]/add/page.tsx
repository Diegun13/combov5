"use client"
import {SignedIn, SignedOut } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { ComboValadtion } from "@/lib/validations/ComboVal";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { db } from "@/db/index";
import { characters, combos } from "@/db/schema";

export default function AddCombos({ params }: { params: { id: string } }) {
    
  const form = useForm({
    resolver: zodResolver(ComboValadtion),
    defaultValues: {
      moves: "",
      file: "",
      isTrue: false,
      notes: "",
      doesKill: false,
      startingPercent: 0,
    }
  })

  async function onSubmit(values: z.infer<typeof ComboValadtion>) {
    console.log(values)
    const char = await db.select().from(characters);
    let charToId = new Map();
    for (let person of char) {
      if (!charToId.get(person.name)) {
        charToId.set(person.name, person.id);
      }
    }
    await db.insert(combos).values({
      characterId: Number(charToId.get(params.id)),
      moves: values.moves as string,
      file: values.file as string,
      isTrue: values.isTrue  as boolean,
      notes: values.notes  as string,
      doesKill:  values.doesKill as boolean,
      startingPercent: Number(values.startingPercent)
    })
      console.log(values)
    }; 


  return (
    <section className="flex flex-col items-center bg-slate-700 h-screen">
      <div>{params.id} add Page</div>
      <div className="flex flex-col items-center  h-full justify-center">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col bg-slate-400  rounded px-4 py-4">
        <FormField
          control={form.control}
          name="moves"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Moves</FormLabel>
              <FormControl>
                <Input placeholder="Move List" {...field} />
              </FormControl>
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>file</FormLabel>
              <FormControl>
                <Input placeholder="file" {...field} />
              </FormControl>
            </FormItem>
            
          )}
        />
        <div className="flex justify-evenly">
        <FormField
          control={form.control}
          name="isTrue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>isTrue</FormLabel>
              <FormControl>
                <Input type="checkbox" {...field} />
              </FormControl>
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="doesKill"
          render={({ field }) => (
            <FormItem>
              <FormLabel>doesKill</FormLabel>
              <FormControl>
                <Input type="checkbox" {...field} />
              </FormControl>
            </FormItem>
            
          )}
        />
        </div>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>notes</FormLabel>
              <FormControl>
                <Input type="text" placeholder="" {...field} />
              </FormControl>
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="startingPercent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>startingPercent</FormLabel>
              <FormControl>
                <Input type="number"  {...field} />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
            
          )}
        />
        <Button className="text-gray-300" variant="outline"  type="submit">Submit</Button>
        <Button onClick={()=> console.log()}>Test</Button>
      </form>
    </Form>
      </div>
    </section>
  );
}




{/* <SignedOut>
        your not logged in
      </SignedOut>
      <SignedIn>
      <div>
        <form action={(e)=> SubmitCombo(e, params.id)}>
          <input type="text" name="moves" placeholder="moves" />
          <input type="text" name="file" placeholder="file" />
          <input type="checkbox" name="isTrue" placeholder="isTrue" />
          <input type="text" name="notes" placeholder="notes" />
          <input type="checkbox" name="doesKill" placeholder="doesKill" />
          <input type="number" name="statingPercent" placeholder="statingPercent" />
        <button type="submit">Submit</button>
        </form>
      </div>
      </SignedIn> */}