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
    const is_use = searchParams.get("is_use");
    const $id = searchParams.get("id");
    // console.log(is_active, $id);
    if (authorization(req)) {
      // get single lense
      if ($id && !is_use) {
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

      // fetch found
      if ($id && is_use) {
        let lense = await databases.getDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
          process.env.NEXT_PUBLIC_LENSE_COLLECTION, // collectionId
          $id
        );
        if (lense) {
          lense = { fetch_count: (Number(lense.fetch_count) + 1).toString() };
        }
        // return NextResponse.json(
        //   apiResponse(true, "Lense use count sucessfully!", lense)
        // );

        const data = await databases.updateDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
          process.env.NEXT_PUBLIC_LENSE_COLLECTION, // collectionId
          $id,
          lense
        );
        return NextResponse.json(
          apiResponse(true, "Lense use count sucessfully!", data)
        );
      }
      const lenses = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
        process.env.NEXT_PUBLIC_LENSE_COLLECTION, // collectionId
        is_active ? [Query.equal("is_active", true)] : [] // Filter for active lenses
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
    return NextResponse.json(apiResponse(false, err?.response?.message, err));
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
    return NextResponse.json(apiResponse(false, err?.response?.message, err));
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
    return NextResponse.json(apiResponse(false, err?.response?.message, err));
  }
}
