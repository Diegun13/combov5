"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComboValadtion } from "@/lib/validations/ComboVal";
import { Button } from "@/components/ui/button";
import "@uploadthing/react/styles.css";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { db } from "@/db/index";
import { characters, combos } from "@/db/schema";
import { SubmitCombo } from "@/lib/actions";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/router";
import { useFormStatus } from "react-dom";
import { UploadButton } from "@/utils/uploadthing";

export default function AddCombos({ params }: { params: { id: string } }) {
  let { pending } = useFormStatus();
  const form = useForm<z.infer<typeof ComboValadtion>>({
    resolver: zodResolver(ComboValadtion),
    defaultValues: {
      moves: "",
      file: "",
      notes: "",
      isTrue: false,
      doesKill: false,
      startingPercent: 0,
    },
  });

  return (
    <section className="flex flex-col bg-slate-800  items-center h-screen w-full pt-9">
      <div>
        <Form {...form}>
          <form
            action={(e) => {
              SubmitCombo(e, params.id);
            }}
            className="space-y-8 flex flex-col bg-slate-400  rounded px-4 py-4"
          >
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
            <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // gen by copilot
            form.setValue("file", res[0].url);
          }} 
        />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>file</FormLabel>
                  <FormControl>
                    <Input className="hidden" placeholder="file" {...field} />
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
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
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
                      <Checkbox
                        type="button"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
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
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <Button
              disabled={pending}
              className="text-gray-300"
              variant="outline"
              type="submit"
            >
              {pending ? "Submitting" : "Submit"}
            </Button>
          </form>
        </Form>
       
      </div>
    </section>
  );
}
