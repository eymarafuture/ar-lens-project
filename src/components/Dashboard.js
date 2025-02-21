"use client";

import { useStateValue } from "@/lib/StateProvider";

import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";

import LensesTable from "./LensesTable";
import LenseModal from "./LenseModal";

import { useMediaQuery } from "usehooks-ts";
import { portraitMobile } from "@/lib/mediaQueries";
const Dashboard = () => {
  const [{ loggedInUser, toggleMenu, lenses }, dispatch] = useStateValue();
  const [lenseStock, setLenseStock] = useState(0);
  const [lenseuStock, setLenseUstock] = useState(0);
  const [brandStock, setBrandStock] = useState(0);
  const isMobile = useMediaQuery(portraitMobile);

  useEffect(() => {
    const counts = lenses
      ? lenses?.data?.reduce(
          (acc, item) => {
            if (item.is_active) {
              acc.trueCount++;
            } else {
              acc.falseCount++;
            }
            return acc;
          },
          { trueCount: 0, falseCount: 0 }
        )
      : null;
    setLenseStock(counts?.trueCount);
    setLenseUstock(counts?.falseCount);
  }, [lenses]);

  return (
    <div
      className={toggleMenu ? "col-12" : "col-xl-10 col-lg-9 col-md-8 col-12"}
    >
      <div className="bg-light p-2 h-100">
        <div className="bg-light text-theme rounded-1 shadow p-2 px-3 d-flex aic jcb mb-2">
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
              value: lenseStock ? lenseStock : 0,
            },
            {
              name: "Lense Inventory (Out of Stock)",
              value: lenseuStock ? lenseuStock : 0,
            },
            {
              name: "Brand Available",
              value: brandStock ? brandStock : 0,
            },
          ].map((item, indx) => (
            <div
              key={indx}
              className={`col-lg-3 col-md-6 col-6 ${isMobile ? "mb-4" : ""}`}
            >
              <div
                className={`shadow d-flex flex-column jcb rounded-1 px-3 py-2 h-100 bg-light text-midnight`}
              >
                {isMobile ? <h6>{item.name}</h6> : <h5>{item.name}</h5>}
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
        <div className="py-2 mb-2 d-flex text-theme flex-column flex-md-row align-items-end jcb">
          {isMobile ? (
            <h3 className="m-0 mb-3 w-100">Lense Management</h3>
          ) : (
            <h2 className="m-0 w-100">Lense Management</h2>
          )}
          <LenseModal />
        </div>
        <LensesTable />
      </div>
    </div>
  );
};

export default Dashboard;
