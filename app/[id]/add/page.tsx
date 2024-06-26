"use client";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComboValadtion } from "@/lib/validations/ComboVal";
import { Button } from "@/components/ui/button";
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
import { SubmitCombo } from "@/lib/actions";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormStatus } from "react-dom";
import { UploadButton } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { useState } from "react";

export default function AddCombos({ params }: { params: { id: string } }) {
  let [dashSpace, setDashSpace] = useState("")
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
    <section className="flex flex-col bg-slate-800  items-center h-screen w-full pt-20">
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
                    {/* <input type="tel"  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="YOUR_WARNING_TEXT" />  */}
                    
                    {/* <Input placeholder="Move List" {...field} /> */}
                    {/* genrated by copiolt kinda */}
                    <Input
                    {...field}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\s+/g, "-");
                                setDashSpace(value);
                                field.value = value;
                              }}
                              placeholder="Move List"
                              value={dashSpace}
                            />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* upload */}
            {/* <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // gen by copilot
                form.setValue("file", res[0].url);
              }}
            /> */}
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>file</FormLabel>
                  <FormControl>
                    <Input type="file" placeholder="file" {...field} />
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
                      {...field}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        value={field.value ? "true" : "false"}
                      />
                      {/* <Input {...field}   type="checkbox" value={"true"}  /> */}
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
                      {...field}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        value={field.value ? "true" : "false"}
                      />
                      {/* <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      /> */}
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
