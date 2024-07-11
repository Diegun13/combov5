import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {

  // console.log(user, "user")
  let testman = await currentUser();
  const doesUserExist = await db.select().from(users).where(eq(users.clerkID, String(testman?.id)));
  console.log(doesUserExist, "currentUser")
  console.log(testman?.id, "testman")
  if(doesUserExist.length === 0 && testman?.id != undefined|| null){
    await db.insert(users).values({
      clerkID: String(testman?.id) || "",
      username: testman?.fullName || "",
    });
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <nav className="absolute flex w-full justify-between bg-UFD-nameplate py-3  border-b-4 border-b-orange-400  ">
            <div>logo</div>
            <div>
              <Link href={"/"}>
                <h1 className=" text-3xl font-poppins font-bold text-UFD-Combo-bg hover:underline hover:text-neutral-700">
                  ComboV5
                </h1>
              </Link>
            </div>
            <div>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn >
                <UserButton />
              </SignedIn>
            </div>
          </nav>
          {children}
          {modal}
        </body>
      </html>
    </ClerkProvider>
  );
}
