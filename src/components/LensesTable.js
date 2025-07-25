import { useStateValue } from "@/lib/StateProvider";
import React, { useEffect, useState } from "react";
import { Button } from "./common/FormFields";
import { fetchAllLenses, updateLense, deleteLense } from "@/endpoints";
import { useMediaQuery } from "usehooks-ts";
import { portraitMobile } from "@/lib/mediaQueries";
import { Pagination } from "antd";
import LoaderIcon from "./common/LoaderIcon";
import Swal from "sweetalert2";

const LensesTable = ({ limit, page, setPage, setLimit }) => {
  const [{ lenses }, dispatch] = useStateValue();
  const isMobile = useMediaQuery(portraitMobile);
  const [loading, setLoading] = useState(false);

  // console.log(lenses);

  const handleEdit = (id) => {
    localStorage.setItem("edit_lense", JSON.stringify(id));
    dispatch({ type: "LENSE_MODAL" });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#020035",
      cancelButtonColor: "#ed4b00",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLense(dispatch, "/api/lenses", id, setLoading, page, limit).then(() => {
          Swal.fire({
            title: "Deleted!", text: "Lense has been deleted.", icon: "success",
            confirmButtonColor: "#020035",
            confirmButtonText: "Close",
          });
        });
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchAllLenses(dispatch, `/api/lenses?page=${page}&limit=${limit}`, setLoading);
  }, [page]);

  return (
    <div className="w-100" style={{ overflowX: "auto" }}>
      {loading ? (
        <div className="d-flex  aic jcc  py-5">
          <LoaderIcon /> <span className="ms-2">Lense fetching...</span>
        </div>
      ) : (
        <>
          <table className="mb-2 w-100">
            <thead>
              <tr className="bg-midnight text-light border-midnight">
                {[
                  "Lense Image",
                  "Lense Name",
                  //   "Brand Logo",
                  "Brand Name",
                  "Usage",
                  "Status",
                  "Action",
                ].map((item) => (
                  <th
                    key={item}
                    className="p-2"
                    style={{ minWidth: isMobile ? "100px" : "" }}
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lenses &&
                lenses?.data?.map((item, indx) => (
                  <tr key={indx} className="border-lacecap">
                    <td className={`${isMobile ? "p-0" : "p-2"} w-25`}>
                      <div style={{ width: isMobile ? "80%" : "20%" }}>
                        <img
                          src={item?.lens_png ? item?.lens_png : null}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </td>
                    <td className="p-2">{item?.name}</td>
                    {/* <td className="p-2 ">
                <div style={{ width: "10%" }}>
                  <img style={{ width: "100%" }} src={item?.brand_logo} />
                </div>
              </td> */}
                    <td className="p-2">{item?.brand?.brand_name}</td>
                    <td className="p-2">{item?.fetch_count}</td>
                    <td className="p-2">
                      {item?.is_active ? "In-Stock" : "Out of Stock"}
                    </td>
                    <td className="px-2 pt-3 d-flex gap-2">
                      <Button
                        text="Edit"
                        onClick={() => handleEdit(item?.$id)}
                      />
                      <Button
                        text="Delete"
                        onClick={() => handleDelete(item?.$id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="p-2 mb-2 d-flex jcc">
            {lenses && (
              <Pagination
                className="text-theme"
                defaultCurrent={page}
                total={lenses?.count}
                pageSize={limit}
                onChange={(e) => setPage(e)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LensesTable;
