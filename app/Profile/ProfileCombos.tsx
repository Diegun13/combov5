"use client";

import ComboCard from "@/components/myUI/ComboCard";
import Modal from "@/components/myUI/Modal";
import { Button } from "@/components/ui/button";
import { deleteCombo } from "@/lib/actions";
import { SignedIn } from "@clerk/nextjs";
import ProModal from "@/components/myUI/ProModal";
import { useState } from "react";
import ForumEdit from "./ForumEdit";
import { useRouter } from "next/navigation";
import Link from "next/link";

type comboSet = {
  id: number;
  characterId: number;
  moves: string;
  file: string;
  isTrue: boolean;
  notes: string;
  doesKill: boolean;
  startingPercent: number;
};

// deleteCombo(combo)

export default function ProfileCombos({ combo }: { combo: comboSet }) {
  let [test, setTest] = useState("hidden");
  let [test2, setTest2] = useState("hidden");

  let router = useRouter();

  return (
    <main>
      <section className="relative group">
        <div className="flex invisible group-hover:visible overflow-hidden hover:bg-black/60 h-80 w-80  absolute z-[1] items-center justify-center">
          <Button
            onClick={() => {
              setTest("");
            }}
            variant="destructive"
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setTest2("");
            }}
            variant="secondary"
          >
            Edit
          </Button>
        </div>
        <ComboCard combo={combo} />
      </section>
      {/* delete button */}
      <div className={`${test} `}>
        <ProModal>
          are you sure you want to delete this combo?
          <div>
            <Button onClick={() => deleteCombo(combo)} variant="destructive">
              Delete
            </Button>
            <Button onClick={() => setTest("hidden")} variant="secondary">
              Cancel
            </Button>
          </div>
        </ProModal>
      </div>
      {/* edit button */}
      <div className={`${test2} `}>
        <ProModal>
          <Button onClick={() => setTest2("hidden")} variant="secondary">
            Cancel
          </Button>
          <ForumEdit combos={combo} />
        </ProModal>
      </div>
    </main>
  );
}
