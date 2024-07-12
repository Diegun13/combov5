import { db } from "@/db";
import { combos, users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import React from "react";
import ProfileCombos from "./ProfileCombos";

export default async function Profile() {
  let curUser = await currentUser();
  let person = await db
    .select()
    .from(users)
    .where(eq(users.clerkID, String(curUser?.id)));
  let userCombos = await db
    .select()
    .from(combos)
    .where(eq(combos.userId, person[0].id));

  let sayhi = () => {
    console.log("hi");
  };
  let displayCombos = userCombos.map((combo) => {
    return (
      <div key={combo.id} className=" flex ">
        <ProfileCombos combo={combo} />
      </div>
    );
  });
  return (
    <div className="flex flex-col items-center pt-16 text-white bg-UFD-Char-bg h-screen">
      Profile
      <div className="flex gap-4 h-screen w-screen flex-wrap overflow-y-scroll bg-UFD-Combo-bg justify-center">
      {displayCombos}
      </div>
    </div>
  );
}
