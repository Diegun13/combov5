import { Suspense } from "react";
import { Button } from "../ui/button";
import { SignedIn, SignIn } from "@clerk/nextjs";
import { deleteCombo } from "@/lib/actions";
import Link from "next/link";
import { get } from "http";

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

export default function ComboCard({ combo }: { combo: comboSet}) {
  return (
    <div className="flex flex-col h-25 w-80 my-5 text-center items-center overflow-hidden bg-UFD-Char-bg rounded-md border">
      <SignedIn>
        <div className=" relative self-end pr-3">
          {/* <Button onClick={() => deleteCombo(combo)} variant="destructive">
            X
          </Button>
          <Button> edit</Button> */}
        </div>
      </SignedIn>
      <div>Moves: {combo.moves}</div>
      <div>Is True: {combo.isTrue}</div>
      <div>Percent:: {combo.startingPercent}</div>
      <div>
        <video className="h-56 w-96" loop autoPlay muted src={combo.file} />
      </div>
      <div>Notes: {combo.notes}</div>
    </div>
  );
}
