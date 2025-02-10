import { databases, ID } from "@/app/appwrite";
import { apiResponse } from "@/lib/helperFunc";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await databases.listDocuments(
      "6795286c0010d094efbb", // databaseId
      "6795287600170a61ad20" // collectionId
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
      "6795286c0010d094efbb", // databaseId
      "6795287600170a61ad20", // collectionId
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
