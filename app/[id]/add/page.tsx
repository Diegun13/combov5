"use client"
import { db } from "@/db/index";
import { characters, combos } from "@/db/schema";
import { useRouter } from "next/router";
import {SubmitCombo} from "@/utils/actions"

export default function Page({ params }: { params: { id: string } }) {
  return (
    <section>
      <div>{params.id} add Page</div>
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
    </section>
  );
}
