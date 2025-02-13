"use client";

import { useStateValue } from "@/lib/StateProvider";
import React from "react";
import { IoIosMenu } from "react-icons/io";
import LensesTable from "./LensesTable";
import { Button } from "./common/FormFields";

const LenseManagement = () => {
  const [{ loggedInUser, toggleMenu }, dispatch] = useStateValue();
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

        {/* inventory listing */}
        <div className="py-2 mb-2 text-end">
          {/* <h2 className="m-0 w-100">Lense Management</h2> */}
          <Button text="Add Lense" w="10rem" />
        </div>
        <LensesTable />
      </div>
    </div>
  );
};

export default LenseManagement;
