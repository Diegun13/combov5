"use client"

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function AddComboBtn({ id }: { id: string }) {
 let router = useRouter()
  return (
    <section>
        <Button variant="default"  onClick={()=> router.push(`/${id}/add`) }> Add Somthing </Button>
    </section>
  );
}
