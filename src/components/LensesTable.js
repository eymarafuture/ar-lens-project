import { useStateValue } from "@/lib/StateProvider";
import React from "react";
import { Button } from "./common/FormFields";
import Image from "next/image";
import { updateLense } from "@/endpoints";

const LensesTable = () => {
  const [{ lenses }] = useStateValue();
  const handleEdit = (id) => {
    localStorage.setItem("edit_lense", JSON.stringify(id));

    // updateLense()
  };

  return (
    <div className="w-100" style={{ overflowX: "auto" }}>
      <table className="mb-2 w-100">
        <thead>
          <tr className="bg-theme text-light border-theme">
            {[
              "Lense Logo",
              "Lense Name",
              //   "Brand Logo",
              "Brand Name",
              "Usage",
              "Status",
              "Action",
            ].map((item) => (
              <th key={item} className="p-2">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lenses?.data?.map((item, indx) => (
            <tr key={indx} className="border-theme">
              <td className="p-2 w-25">
                <div style={{ width: "20%" }}>
                  <img src={item?.lens_png} style={{ width: "100%" }} />
                </div>
              </td>
              <td className="p-2 ">{item?.name}</td>
              {/* <td className="p-2 ">
                <div style={{ width: "10%" }}>
                  <img style={{ width: "100%" }} src={item?.brand_logo} />
                </div>
              </td> */}
              <td className="p-2 ">{item?.brand?.brand_name}</td>
              <td className="p-2 ">{item?.fetch_count}</td>
              <td className="p-2 ">
                {item?.is_active ? "In-Stock" : "Out of Stock"}
              </td>
              <td className="p-2 ">
                <Button text="Edit" onClick={() => handleEdit(item?.$id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-secondary p-2 mb-2">pagination section</div>
    </div>
  );
};

export default LensesTable;
