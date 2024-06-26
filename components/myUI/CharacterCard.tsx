import Image from "next/image";
import Link from "next/link";

type char = {
  name: string;
  img: string;
  id: number;
  ssbu_id: number | null;
};

export default function CharacterCard({ char }: { char: char }) {
  return (
    <>
      <Link className="h-32 w-32 " href={`/${char.name}`}>
        <div className="flex items-center justify-center bg-UFD-Char-bg   hover:scale-105 border border-neutral-500  hover:border-UFD-nameplate rounded-md">
          <h2 className=" absolute text-3xl text-white font-poppins drop-shadow-xl font-extrabold">
            {char.name}
          </h2>
          <Image src={char.img} width={100} height={100} alt={char.name} />
        </div>
      </Link>
    </>
  );
}
