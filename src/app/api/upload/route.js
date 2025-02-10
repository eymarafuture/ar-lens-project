import { NextResponse } from "next/server";
import { apiResponse } from "@/lib/helperFunc";
import path from "path";
import { promises as fs } from "fs";

export async function POST(request) {
  try {
    // return NextResponse.json(
    //   apiResponse(
    //     true,
    //     "Texture and files updated successfully!",
    //     process.cwd()
    //   )
    // );
    // Define file paths
    let fileName = "MAGIC EYE - AQUA BLUE.png";
    const basePath = path.join(
      process.cwd(),
      "src",
      "deepAR",
      "resources",
      "Materials"
    );
    const matFilePath = path.join(basePath, "Eyes.mat");
    const cacheFile = path.join(basePath, "cache.deeparcache");

    const cacheFilePath = `${basePath}/${fileName}.deeparcache`;
    const importFilePath = `${basePath}/${fileName}.deeparimport`;

    // Read and parse the .mat file
    const fileData = await fs.readFile(matFilePath, "utf-8");
    let matData = JSON.parse(fileData);

    // Update texture name
    matData.uniformValues.s_texColor.texture = fileName;

    // Write changes back to the .mat file
    await fs.writeFile(matFilePath, JSON.stringify(matData, null, 4), "utf-8");

    // Create the .deeparcache file (empty)
    const cacheFileData = await fs.readFile(cacheFile, "binary");
    await fs.writeFile(cacheFilePath, cacheFileData, "binary");

    // Create the .deeparimport file (copy content from updated .mat)
    await fs.writeFile(
      importFilePath,
      JSON.stringify(
        {
          autoGenMipmaps: false,
          compression: "lossless",
          dataType: "colorData",
          format: "png",
          hasMipmaps: true,
          height: 4096,
          originalFormatLossy: false,
          quality: 0,
          resizeMode: "bilinear",
          type: "texture",
          width: 4096,
          wrapMode: "repeat",
        },
        null,
        4
      ),
      "utf-8"
    );

    return NextResponse.json(
      apiResponse(true, "Texture and files updated successfully!", matData)
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
