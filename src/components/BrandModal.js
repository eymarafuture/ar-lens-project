import React, { useEffect, useState } from "react";
import FormModal from "./FormModal";
import { Button, Input, Switch } from "./common/FormFields";
import { Col, Row } from "reactstrap";
// import axios from "axios";
import { useStateValue } from "@/lib/StateProvider";
import { ID, storage } from "@/lib/appwrite";
// import { createLense, fetchBrands, fetchLense, updateLense } from "@/endpoints";
import { portraitMobile } from "@/lib/mediaQueries";
import { useMediaQuery } from "usehooks-ts";
import { useRouter, usePathname, useParams } from "next/navigation";
import LoaderIcon from "./common/LoaderIcon";
import { createBrand, fetchBrand, updateBrand } from "@/endpoints";

const BrandModal = () => {
  const [{ isBrandModal }, dispatch] = useStateValue();
  const isMobile = useMediaQuery(portraitMobile);
  const [imgLoader, setImageLoader] = useState(false);

  const [brandState, setBrandState] = useState({
    brand_name: "",
    brand_logo: "",
    is_active: true,
  });

  const { brand_name, brand_logo, is_active } = brandState;

  const UploadImage = async (e, key) => {
    const file = e.target.files[0];
    setImageLoader(true);
    // new Compressor(file, {
    //   quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
    //   success: async (compressedResult) => {
    //     // const formData = new FormData();

    //     // // The third parameter is required for server
    //     // formData.append("file", compressedResult, compressedResult.name);

    //     console.log(compressedResult);

    //   },
    // });

    let imageRes = await storage.createFile(
      process.env.NEXT_PUBLIC_LENSE_BUCKET, // bucketId
      ID.unique(),
      file
    );
    // console.log(imageRes?.$id);

    if (imageRes) {
      const result = storage.getFileDownload(
        process.env.NEXT_PUBLIC_LENSE_BUCKET, // bucketId
        imageRes?.$id
      );
      setImageLoader(false);

      setBrandState({
        ...brandState,
        brand_logo: result?.href,
      });
    }
  };

  const edit_brand = JSON.parse(localStorage.getItem("edit_brand"));

  const handleSubmit = async () => {
    const payload = {
      ...brandState,
    };
    console.log(payload, edit_brand);
    if (edit_brand) {
      updateBrand(dispatch, "/api/brands", payload, edit_brand);
    } else {
      createBrand(dispatch, "/api/brands", payload);
    }
  };

  useEffect(() => {
    if (isBrandModal && edit_brand) {
      fetchBrand(setBrandState, `/api/brands?id=${edit_brand}`);
    } else {
      setBrandState({
        brand_name: "",
        brand_logo: "",
        is_active: true,
      });
    }
  }, [isBrandModal]);
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <div className="d-flex gap-2 aic justify-content-end">
        {pathname !== "/brand-management" && (
          <Button
            text="View Brands"
            w={isMobile ? "7rem" : "9rem"}
            onClick={() => {
              router.push("/brand-management");
            }}
          />
        )}
        <Button
          text="Add Brand"
          w={isMobile ? "7rem" : "9rem"}
          onClick={() => {
            dispatch({
              type: "BRAND_MODAL",
            });
          }}
        />
      </div>

      <FormModal
        isDisabled={!brand_name || !brand_logo ? true : false}
        onClose={() => {
          localStorage.removeItem("edit_brand");
          dispatch({
            type: "BRAND_MODAL",
          });
        }}
        btnText={edit_brand ? "Update Brand" : "Add Brand"}
        handleClick={handleSubmit}
        title={edit_brand ? "Edit Brand" : "Add New Brand"}
        isOpen={isBrandModal}
        // setIsOpen={setIsOpen}
        fields={
          edit_brand && !brand_name
            ? []
            : [
              <Col className="mb-3" md={6} key="name">
                <label className="mb-2">Brand Name</label>
                <Input
                  onChange={(e) => {
                    setBrandState({
                      ...brandState,
                      brand_name: e.target.value,
                    });
                  }}
                  placeholder="Enter Brand Name"
                  type="text"
                  value={brand_name}
                  className="text-midnight border-midnight"
                />
              </Col>,

              <Col md={6} className="mb-3" key="brand_media">
                <Row>
                  {[
                    { name: "png", img: brand_logo, label: "Brand Image" },
                    // {
                    //   name: "effect",
                    //   img: lens_effect,
                    //   label: "Lense Effect (DeepAR)",
                    // },
                  ].map(({ name, img, label }, indx) => {
                    return (
                      <Col key={indx} md={12}>
                        <label className="mb-2">{label}</label>
                        <Input
                          className="text-midnight border-midnight"
                          type="file"
                          onChange={(e) => UploadImage(e, name)}
                        />
                        {imgLoader ? (
                          <div className="mt-2 d-flex aic">
                            <LoaderIcon /> Uploading...
                          </div>
                        ) : (
                          <>
                            {name === "png" && (
                              <div style={{ width: "20%" }}>
                                <img src={img} style={{ width: "100%" }} />
                              </div>
                            )}
                          </>
                        )}
                      </Col>
                    );
                  })}
                </Row>
              </Col>,

              <Col className="mb-3 d-flex aic" key="brand_active" md={6}>
                <label className="me-2">Active</label>
                <Switch
                  value={is_active}
                  onChange={(e) => {
                    setBrandState({
                      ...brandState,
                      is_active: e.target.checked,
                    });
                  }}
                ></Switch>
              </Col>,
            ]
        }
      />
    </>
  );
};

export default BrandModal;
