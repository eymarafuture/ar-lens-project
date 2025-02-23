import { databases, ID } from "@/lib/appwrite";
import { apiResponse } from "@/lib/helperFunc";
import { NextResponse } from "next/server";
import { authorization } from "../middleware";
import { Query } from "appwrite";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const is_active = searchParams.get("is_active");
    const $id = searchParams.get("id");
    if (authorization(req)) {
      if ($id) {
        const brand = await databases.getDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
          process.env.NEXT_PUBLIC_LENSE_BRAND_COLLECTION, // collectionId
          $id
        );

        return NextResponse.json(
          apiResponse(true, "Brand data fetched", {
            count: 1,
            data: brand,
          })
        );
      }
      const brands = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
        process.env.NEXT_PUBLIC_LENSE_BRAND_COLLECTION, // collectionId
        is_active ? [Query.equal("is_active", true)] : [] // Filter for active brands
      );
      const lens_brands = brands.documents;

      return NextResponse.json(
        apiResponse(true, "Brands data fetched", {
          count: brands.total,
          data: lens_brands,
        })
      );
    }
    return NextResponse.json(
      apiResponse(false, "You are not authorized", null)
    );
  } catch (err) {
    console.log("Error", err);
  }
}

// export async function POST(req) {
//   try {
//     const request = await req.json();
//     const data = await databases.createDocument(
//       process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
//       process.env.NEXT_PUBLIC_LENSE_COLLECTION, // collectionId
//       ID.unique(),
//       request
//     );
//     return NextResponse.json(apiResponse(true, "Data created", data));
//   } catch (err) {
//     console.log("Error", err);
//   }
// }

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
