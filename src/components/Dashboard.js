"use client";
import React, { useEffect, useState } from "react";
import { useStateValue } from "@/lib/StateProvider";
import LensesTable from "./LensesTable";
import LenseModal from "./LenseModal";

import { useMediaQuery } from "usehooks-ts";
import { portraitMobile } from "@/lib/mediaQueries";
import DashboardCard from "./DashboardCard";
import { fetchBrands, fetchLenses } from "@/endpoints";
import BarChartComp from "./common/BarChart";
import HeaderSection from "./common/HeaderSection";

const Dashboard = () => {
  const [{ toggleMenu, isLenseModal, refreshPage }] = useStateValue();
  const [lenseStock, setLenseStock] = useState(0);
  const [lenseuStock, setLenseUstock] = useState(0);
  const [topLenses, setTopLenses] = useState([]);
  const [topBrands, setTopBrands] = useState([]);
  const [lenses, setLenses] = useState(null);
  const [brands, setBrands] = useState(null);
  const [page, setPage] = useState(1);
  // console.log(pathname)
  const [limit, setLimit] = useState(5);
  // const [brandStock, setBrandStock] = useState(0);
  const isMobile = useMediaQuery(portraitMobile);

  // console.log(lenses);

  useEffect(() => {
    fetchLenses(setLenses, "/api/lenses");
    fetchBrands(setBrands, "/api/brands");
  }, [isLenseModal, refreshPage]);

  useEffect(() => {
    // console.log("hello");
    const counts = lenses
      ? lenses?.reduce(
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
      lenses
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

  useEffect(() => {
    let brandss =
      brands &&
      brands
        ?.filter((item) => item?.is_active === true)
        ?.map((item) => ({
          name: item?.brand_name,
          fetch_count: Number(item?.brand_fetch_count),
        }))
        ?.slice(0, 10); // Limit to 10 records

    // console.log(lensess, lenses);
    if (brandss) {
      setTopBrands(brandss);
    }
  }, [brands]);

  // console.log(lenseStock, lenseuStock, brands);
  return (
    <div
      className={toggleMenu ? "col-12" : "col-xl-10 col-lg-9 col-md-8 col-12"}
    >
      <div className="bg-transparent p-2 h-100">
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
              value: brands ? brands?.length : 0,
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
            <div>
              {isMobile ? (
                <h3 className="m-0 mb-3 w-100">Top Lenses</h3>
              ) : (
                <h2 className="m-0 w-100">Top Lenses</h2>
              )}

              <BarChartComp data={lenses} lensesData={topLenses} />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              {isMobile ? (
                <h3 className="m-0 mb-3 w-100">Top Brands</h3>
              ) : (
                <h2 className="m-0 w-100">Top Brands</h2>
              )}
              <BarChartComp data={brands} lensesData={topBrands} />
            </div>
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
          <LenseModal
            limit={limit} setLimit={setLimit} setPage={setPage} page={page}
          />
        </div>
        <LensesTable limit={limit} setLimit={setLimit} setPage={setPage} page={page} />
      </div>
    </div>
  );
};

export default Dashboard;
