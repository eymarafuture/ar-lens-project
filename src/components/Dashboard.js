"use client";

import { useStateValue } from "@/lib/StateProvider";

import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";

import LensesTable from "./LensesTable";
import LenseModal from "./LenseModal";

import { useMediaQuery } from "usehooks-ts";
import { portraitMobile } from "@/lib/mediaQueries";
import DashboardCard from "./DashboardCard";
import { fetchAllBrands } from "@/endpoints";
import BarChartComp from "./common/BarChart";
import HeaderSection from "./common/HeaderSection";
const Dashboard = () => {
  const [{ loggedInUser, toggleMenu, lenses, brands }, dispatch] =
    useStateValue();
  const [lenseStock, setLenseStock] = useState(0);
  const [lenseuStock, setLenseUstock] = useState(0);
  const [topLenses, setTopLenses] = useState([]);
  // const [brandStock, setBrandStock] = useState(0);
  const isMobile = useMediaQuery(portraitMobile);

  useEffect(() => {
    fetchAllBrands(dispatch, "api/brands");
  }, []);

  useEffect(() => {
    // console.log("hello");
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

    let lensess =
      lenses &&
      lenses?.data
        ?.filter(
          (item) => item?.is_active === true && Number(item?.fetch_count) >= 10
        )
        ?.map((item) => ({
          name: item?.name,
          fetch_count: Number(item?.fetch_count),
        }))
        ?.slice(0, 10); // Limit to 10 records

    // console.log(lensess, lenses);
    if (lensess) {
      setTopLenses(lensess);
    }
  }, [lenses]);

  // console.log(lenses);
  return (
    <div
      className={toggleMenu ? "col-12" : "col-xl-10 col-lg-9 col-md-8 col-12"}
    >
      <div className="bg-light p-2 h-100">
        <HeaderSection />
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
              value: brands ? brands?.count : 0,
            },
          ].map((item, indx) => (
            <DashboardCard
              col="col-lg-3 col-md-6 col-6"
              isMobile={isMobile}
              indx={indx}
              item={item}
              key={indx}
            />
          ))}
        </div>
        {/* Info Graphics */}
        <div className="row mb-2">
          <div className="col-md-6">
            {isMobile ? (
              <h3 className="m-0 mb-3 w-100">Top Lenses</h3>
            ) : (
              <h2 className="m-0 w-100">Top Lenses</h2>
            )}
            {lenses && topLenses.length > 0 && (
              <BarChartComp lensesData={topLenses} isMobile={isMobile} />
            )}
          </div>
          {/* <div className="col-md-6">
            <BarChartComp />
          </div> */}
        </div>
        {/* lense listing */}
        <div className="py-2 mb-2 d-flex text-midnight flex-column flex-md-row align-items-end jcb">
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
