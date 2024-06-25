"use client";
import { useState } from "react";
import Image from "next/image";
import ComboCard from "./ComboCard";
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
export default function CharComboPage({ combos, charImg }: { combos: Array<comboSet>, charImg: string}) {
  const [filterMove, SetFilterMove] = useState("all");
  const [filterPercent, SetFilterPercent] = useState("all");

  const [isTrue, setIsTrue] = useState(false);
  const [doesKill, setDoesKIll] = useState(false);

  function handleTrueCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
    setIsTrue(event.target.checked);
  }

  function handleKillCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
    setDoesKIll(event.target.checked);
  }

  function handleFilterMoveChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = event.target.value;
    SetFilterMove(newValue);
  }
  function handleFilterPercentChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newValue = event.target.value;
    SetFilterPercent(newValue);
  }

  // we are going through all the combos and getting the frist name of the combos
  // and then we are trying to get all combos that start with the first part

  let filterdMovesCombos: Map<string, Array<comboSet>> = new Map();
  for (let i = 0; i < combos.length; i++) {
    let moves = combos[i].moves;
    let placeholder: string[] = [];
    let j = 0;
    while (j < moves.length && moves[j] !== "-") {
      placeholder.push(moves[j]);
      j++;
    }
    let namu = placeholder.join("");
    if (!filterdMovesCombos.get(namu)) {
      filterdMovesCombos.set(namu, [combos[i]]);
    } else {
      filterdMovesCombos.get(namu)?.push(combos[i]);
    }
  }

  let filterPercentCombos: Map<number, Array<comboSet>> = new Map();
  for (let i = 0; i < combos.length; i++) {
    let percent = combos[i].startingPercent;
    if (!filterPercentCombos.get(percent)) {
      filterPercentCombos.set(percent, [combos[i]]);
    } else {
      filterPercentCombos.get(percent)?.push(combos[i]);
    }
  }
  // console.log(filterPercentCombos);

  const optionsMoveArray: string[] = Array.from(filterdMovesCombos.keys());
  const optionsPercentArray: number[] = Array.from(filterPercentCombos.keys());

  let displayCombos = filterdMovesCombos.get(filterMove) || combos;
  if (isTrue) {
    displayCombos = displayCombos.filter((combo) => combo.isTrue);
  }
  if (doesKill) {
    displayCombos = displayCombos.filter((combo) => combo.doesKill);
  }
  if (filterPercent !== "all") {
    displayCombos = displayCombos.filter(
      (combo) => combo.startingPercent === Number(filterPercent)
    );
  }

  let listofCombos = displayCombos.map((combo) => {
    return <ComboCard key={combo.id} combo={combo} />;
  });

  return (
    <section className=" flex h-screen bg-blue-300 w-screen">
      <div className="w-36 bg-red-700">
        <Image 
        className="pb-3"
        src={charImg}
        width={144}
        height={144}
        alt="Character Image"
        />
        <form className="flex flex-col flex-wrap">
          <label htmlFor="statingMove">Starting Move</label>
          <select
            className="text-center text-black"
            id="statingMove"
            value={filterMove}
            onChange={handleFilterMoveChange}
          >
            <option value="all">all</option>
            {optionsMoveArray.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label htmlFor="Percent">Percent</label>
          <select
            className="text-center text-black"
            id="Percent"
            value={filterPercent}
            onChange={handleFilterPercentChange}
          >
            <option value="all">all</option>
            {optionsPercentArray.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="flex gap-3 justify-center">
            <label htmlFor="isTrue">True
            <input
              type="checkbox"
              id="isTrue"
              checked={isTrue}
              onChange={handleTrueCheckbox}
            />
            </label>
            <label htmlFor="Kills">Kills
            <input
              type="checkbox"
              id="Kills"
              checked={doesKill}
              onChange={handleKillCheckbox}
            />
            </label>
          </div>

          <button
            className="bg-blue-500 rounded"
            type="button"
            onClick={() => {
              SetFilterMove("all");
              SetFilterPercent("all");
              setIsTrue(false);
              setDoesKIll(false);
            }}
          >
            Reset
          </button>
        </form>
      </div>

      <div className=" overflow-scroll mx-auto">
        <div className="flex flex-wrap gap-2 w-screen">
          {displayCombos.length === 0 ? <h1>No Combos Found</h1> : listofCombos}
        </div>
      </div>
    </section>
  );
}
