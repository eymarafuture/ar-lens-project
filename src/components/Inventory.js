"use client";

import { ID, storage } from "@/app/appwrite";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Inventory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loader, setLoader] = useState(true);
  const [list, setList] = useState([]);

  async function fetchLenses() {
    try {
      let res = await axios.get("/api/lenses");
      if (res) {
        setList(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function createLenses() {
    try {
      await axios.post("/api/lenses", {
        name,
        pngImage: image,
        deepArImage: "deepAR",
      });
      fetchLenses();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchLenses();
  }, []);

  const handleImages = async (file) => {
    console.log(file);
    let imageRes = await storage.createFile(
      "679ba678003bddcabfff", // bucketId
      ID.unique(),
      file[0]
    );
    const result = storage.getFileDownload(
      "679ba678003bddcabfff", // bucketId
      imageRes?.$id
    );
    setImage(result?.href);
  };

  return (
    <div>
      <form>
        {/* <img src={image} /> */}
        <input type="file" onChange={(e) => handleImages(e.target.files)} />

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="button" onClick={createLenses}>
          Add
        </button>
      </form>

      {list.map((item) => (
        <>
          {item.name}
          <img src={item.pngImage} />
        </>
      ))}
    </div>
  );
};

export default Inventory;
