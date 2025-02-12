"use client";
import { databases } from "@/lib/appwrite";
import { useStateValue } from "@/lib/StateProvider";
import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
const Dashboard = () => {
  const [{ loggedInUser, toggleMenu }, dispatch] = useStateValue();

  useEffect(() => {
    async function fetch() {
      const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
        process.env.NEXT_PUBLIC_LENSE_COLLECTION // collectionId
      );

      console.log(data);
    }
    fetch();
  });
  return (
    <div
      className={toggleMenu ? "col-12" : "col-xl-10 col-lg-9 col-md-8 col-12"}
    >
      <div className="bg-light  p-2 h-100">
        <div className="bg-light rounded-1 shadow p-2 px-3 d-flex aic jcb mb-2">
          {/* header section */}
          <IoIosMenu
            size={22}
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch({
                type: "TOGGLE_MENU",
              });
            }}
          />
          {loggedInUser?.name}
        </div>

        {/* analytics */}
        <div className="row mb-2">
          {[1, 2, 3, 4].map((item, indx) => (
            <div className="col-md-3">
              <div
                className={`shadow rounded-1 p-2 py-5 ${
                  indx % 2 === 0 ? "bg-theme text-light" : "bg-light text-theme"
                }`}
              >
                {item} box section
              </div>
            </div>
          ))}
        </div>

        {/* inventory listing */}
        <div className="bg-secondary p-2 mb-2">
          inventory table header section
        </div>
        <table className="mb-2">
          <thead>
            <tr className="bg-light border-2 border-light">
              <td className="p-2">name</td>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((item) => (
              <tr className="bg-info border-2 border-light">
                <td className="p-2 ">{item} table item</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-secondary p-2 mb-2">pagination section</div>
      </div>
    </div>
  );
};

export default Dashboard;
