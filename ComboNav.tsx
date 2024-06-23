"use client"
import { useState } from "react";

interface combos {
  id: string;
  moves: string;
  isTrue: boolean;
  notes: string;
}
export default function ComboNav({ combos }: { combos: Array<combos> }) {
    const[filterMove, SetFilterMove] = useState("all")
    function handleFilterChange(e){
        console.log(e)
    }

  // we are going through all the combos and getting the frist name of the combos
  // and then we are trying to get all combos that start with the first part
  let filterdCombos: Set<string> = new Set();
  for (let i = 0; i < combos.length; i++) {
    let moves = combos[i].moves;
    let placeholder: string[] = [];
    let j = 0;
    while (j < moves.length && moves[j] !== "-") {
      placeholder.push(moves[j]);
      j++;
    }
    filterdCombos.add(placeholder.join(""));
  }
  const optionsArray: string[] = Array.from(filterdCombos);
  console.log(optionsArray);
  return (
    <section>
      <form>
        <select className="text-black" value={filterMove} onChange={handleFilterChange}>
          <option value="all">all</option>
          {optionsArray.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </form>
      hi
    </section>
  );
}
