import ComboCard from "@/components/myUI/ComboCard";
import Modal from "@/components/myUI/Modal";
import { db } from "@/db";
import { characters, combos } from "@/db/schema";


export default async function PhotoModal({ params }: { params: { id: string } }){
  const char = await db.select().from(characters);
  let charToId = new Map();
  for (let person of char) {
    if (!charToId.get(person.name)) {
      charToId.set(person.name, Number(person.id));
    }
  }

  let cur = await db.select().from(combos);
let soup = cur
  .filter((combo) => combo.characterId == Number(charToId.get(params.id)))
  // .map((combo) => (
  //   <ComboCard key={combo.id} combo={combo} />
  // ))
console.log({soup}, Number(charToId.get(params.id)));
return (
  <Modal >
    
      <ComboCard combo={cur[0]} />
   
  </Modal>
)
}