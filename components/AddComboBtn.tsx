"use client"

import { useRouter } from "next/navigation";

export default function AddComboBtn({ id }: { id: string }) {
 let router = useRouter()
  return (
    <section>
        <button onClick={()=> router.push(`/${id}/add`) }> Add Somthing </button>
    </section>
  );
}
