"use client";

import { useStateValue } from "@/lib/StateProvider";
import React from "react";
import { IoIosMenu } from "react-icons/io";
import LensesTable from "./LensesTable";

import LenseModal from "./LenseModal";
import HeaderSection from "./common/HeaderSection";
import BrandTable from "./BrandTable";
import BrandModal from "./BrandModal";

const BrandManagement = () => {
  const [{ loggedInUser, toggleMenu }, dispatch] = useStateValue();
  return (
    <div
      className={toggleMenu ? "col-12" : "col-xl-10 col-lg-9 col-md-8 col-12"}
    >
      <div className="bg-light p-2 h-100">
        <HeaderSection />
        {/* inventory listing */}
        <div className="py-2 mb-2 text-end">
          {/* <h2 className="m-0 w-100">Lense Management</h2> */}
          {/* <Button text="Add Lense" w="10rem" /> */}
          <BrandModal />
        </div>
        <BrandTable />
      </div>
    </div>
  );
};

export default BrandManagement;
