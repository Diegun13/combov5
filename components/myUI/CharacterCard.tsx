import Image from "next/image";
import Link from "next/link";

type char= {
    name: string;
    img: string;
    id: number;
    ssbu_id: number | null;
}

export default function CharacterCard({char}: {char:char}) {
  return (
    <>
    <Link href={`/${char.name}`}>
      <div className="flex items-center justify-center bg-rose-400">
        <h2 className=" absolute">{char.name}</h2>
        <Image src={char.img} width={100} height={100} alt={char.name} />
      </div>
    </Link>
  </>
  )
}
