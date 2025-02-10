"use client";
import { useState } from "react";

export default function ImageProcessor() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  };

  const processImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("/api/deepar", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const blob = await res.blob();
      setPreview(URL.createObjectURL(blob));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input type="file" onChange={handleFileChange} accept="image/png" />
      <button onClick={processImage} className="bg-blue-500 text-white p-2">
        Apply DeepAR Effect
      </button>
      {preview && <img src={preview} alt="Processed" />}
    </div>
  );
}
