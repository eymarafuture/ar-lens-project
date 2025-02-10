import { databases, ID } from "@/app/appwrite";
import { apiResponse } from "@/lib/helperFunc";
import { NextResponse } from "next/server";
export async function GET() {
  console.log(process.env);
  try {
    const data = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
      process.env.NEXT_PUBLIC_LENSE_COLLECTION // collectionId
    );
    return NextResponse.json(apiResponse(true, "Data fetch", data?.documents));
  } catch (err) {
    console.log(err);
  }
}

export async function POST(req) {
  try {
    const request = await req.json();
    const data = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
      process.env.NEXT_PUBLIC_LENSE_COLLECTION, // collectionId
      ID.unique(),
      request
    );
    return NextResponse.json(apiResponse(true, "Data created", data));
  } catch (err) {
    console.log(err);
  }
}

// export async function PUT() {
//   try {
//     return NextResponse.json({ message: "hello lenses" });
//   } catch (err) {
//     console.log(err);
//   }
// }
// export async function DELETE() {
//   try {
//     return NextResponse.json({ message: "hello lenses" });
//   } catch (err) {
//     console.log(err);
//   }
// }
