"use client";
import { databases } from "@/lib/appwrite";
import { useStateValue } from "@/lib/StateProvider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { Button } from "./common/FormFields";
import LensesTable from "./LensesTable";
import LenseModal from "./LenseModal";
const Dashboard = () => {
  const [{ loggedInUser, toggleMenu, lenses }, dispatch] = useStateValue();
  const [lenseStock, setLenseStock] = useState(0);
  const [lenseuStock, setLenseUstock] = useState(0);

  useEffect(() => {
    async function fetch() {
      const ress = await axios.get("/api/lenses", {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
      });

      const data = ress.data.data;

      dispatch({
        type: "SET_LENSES",
        payload: data,
      });

      const counts = data.data.reduce(
        (acc, item) => {
          if (item.is_active) {
            acc.trueCount++;
          } else {
            acc.falseCount++;
          }
          return acc;
        },
        { trueCount: 0, falseCount: 0 }
      );

      setLenseStock(counts.trueCount);
      setLenseUstock(counts.falseCount);
    }
    fetch();
  }, []);

  return (
    <div
      className={toggleMenu ? "col-12" : "col-xl-10 col-lg-9 col-md-8 col-12"}
    >
      <div className="bg-light p-2 h-100">
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
        <div className="row my-4">
          {[
            {
              name: "Lense Inventory (In-Stock)",
              value: lenseStock,
            },
            {
              name: "Lense Inventory (Out of Stock)",
              value: lenseuStock,
            },
            {
              name: "Brand Available",
              value: 0,
            },
          ].map((item, indx) => (
            <div key={indx} className="col-lg-3 col-md-6 col-6">
              <div
                className={`shadow d-flex flex-column jcb rounded-1 px-3 py-2 h-100 ${
                  indx % 2 === 0 ? "bg-theme text-light" : "bg-light text-theme"
                }`}
              >
                <h5>{item.name}</h5>
                <h2 className="text-end">
                  {item.value < 10
                    ? `0${item.value}`
                    : item?.value?.toLocaleString("en-US")}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* inventory listing */}
        <div className="py-2  mb-2 d-flex flex-column flex-md-row align-items-end jcb">
          <h2 className="m-0 w-100">Lense Management</h2>
          <LenseModal />
        </div>
        <LensesTable />
      </div>
    </div>
  );
};

export default Dashboard;
