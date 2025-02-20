import { databases, ID } from "@/lib/appwrite";
import { apiResponse } from "@/lib/helperFunc";
import { NextResponse } from "next/server";
import { authorization } from "../middleware";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const is_active = searchParams.get("is_active");
    const $id = searchParams.get("id");
    console.log(is_active, $id);
    if (authorization(req)) {
      if ($id) {
        const lense = await databases.getDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
          process.env.NEXT_PUBLIC_LENSE_COLLECTION, // collectionId
          $id
        );
        const brand = await databases.getDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
          process.env.NEXT_PUBLIC_LENSE_BRAND_COLLECTION, // collectionId
          lense?.lens_brand_Id
        );
        return NextResponse.json(
          apiResponse(true, "Lense data fetched", {
            count: 1,
            data: {
              ...lense,
              brand,
            },
          })
        );
      }
      const lenses = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
        process.env.NEXT_PUBLIC_LENSE_COLLECTION // collectionId
      );
      const lens_brands = lenses.documents;
      // lens_brand_Id;
      const allLenses = [];
      for (const lense of lens_brands) {
        const brand = await databases.getDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
          process.env.NEXT_PUBLIC_LENSE_BRAND_COLLECTION, // collectionId
          lense?.lens_brand_Id
        );

        allLenses.push({
          ...lense,
          brand,
        });
      }

      return NextResponse.json(
        apiResponse(true, "Lenses data fetched", {
          count: lenses.total,
          data: allLenses,
        })
      );
    }

    return NextResponse.json(
      apiResponse(false, "You are not authorized", null)
    );
  } catch (err) {
    console.log("Error", err);
    return NextResponse.json(apiResponse(false, "Something went wrong", err));
  }
}

export async function POST(req) {
  try {
    const request = await req.json();
    // console.log(request);
    if (authorization(req)) {
      const data = await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
        process.env.NEXT_PUBLIC_LENSE_COLLECTION, // collectionId
        ID.unique(),
        request
      );
      return NextResponse.json(apiResponse(true, "Lense created", data));
    }
    return NextResponse.json(
      apiResponse(false, "You are not authorized", null)
    );
  } catch (err) {
    console.log("Error", err);
    return NextResponse.json(apiResponse(false, "Something went wrong", err));
  }
}

export async function PUT(req) {
  try {
    const request = await req.json();
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const documentId = searchParams.get("id");
    console.log(request, documentId);
    if (authorization(req)) {
      const data = await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
        process.env.NEXT_PUBLIC_LENSE_COLLECTION, // collectionId
        documentId,
        request
      );
      return NextResponse.json(apiResponse(true, "Lense updated", data));
    }
    return NextResponse.json(
      apiResponse(false, "You are not authorized", null)
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(apiResponse(false, "Something went wrong", err));
  }
}
// export async function DELETE() {
//   try {
//     return NextResponse.json({ message: "hello lenses" });
//   } catch (err) {
//     console.log(err);
//   }
// }
