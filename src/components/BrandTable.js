import { useStateValue } from "@/lib/StateProvider";
import React, { useEffect, useState } from "react";
import { Button } from "./common/FormFields";
import { fetchAllBrands } from "@/endpoints";
import { useMediaQuery } from "usehooks-ts";
import { portraitMobile } from "@/lib/mediaQueries";
import { Pagination } from "antd";

const BrandTable = () => {
  const [{ brands }, dispatch] = useStateValue();
  const isMobile = useMediaQuery(portraitMobile);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const handleEdit = (id) => {
    localStorage.setItem("edit_brand", JSON.stringify(id));
    dispatch({ type: "BRAND_MODAL" });
  };

  useEffect(() => {
    /// All Lenses For Listing
    fetchAllBrands(dispatch, "/api/brands");
  }, []);

  console.log(brands);
  //   return;

  return (
    <div className="w-100" style={{ overflowX: "auto" }}>
      <table className="mb-2 w-100">
        <thead>
          <tr className="bg-midnight text-light border-midnight">
            {["Brand Logo", "Brand Name", "Usage", "Status", "Action"].map(
              (item) => (
                <th
                  key={item}
                  className="p-2"
                  style={{ minWidth: isMobile ? "100px" : "" }}
                >
                  {item}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {brands &&
            brands?.data?.map((item, indx) => (
              <tr key={indx} className="border-lacecap">
                <td className={`${isMobile ? "p-0" : "p-2"} w-25`}>
                  <div style={{ width: isMobile ? "80%" : "20%" }}>
                    <img
                      src={item?.brand_logo ? item?.brand_logo : null}
                      style={{ width: "100%" }}
                    />
                  </div>
                </td>
                <td className="p-2">{item?.brand_name}</td>
                {/* <td className="p-2 ">
                <div style={{ width: "10%" }}>
                  <img style={{ width: "100%" }} src={item?.brand_logo} />
                </div>
              </td> */}
                <td className="p-2">{item?.brand_fetch_count}</td>
                <td className="p-2">
                  {item?.is_active ? "In-Stock" : "Out of Stock"}
                </td>
                <td className="p-2 ">
                  <Button text="Edit" onClick={() => handleEdit(item?.$id)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="p-2 mb-2 d-flex jcc">
        {brands && (
          <Pagination
            className="text-theme"
            defaultCurrent={1}
            total={brands?.count}
            onChange={(e) => console.log(e)}
          />
        )}
      </div>
    </div>
  );
};

export default BrandTable;
