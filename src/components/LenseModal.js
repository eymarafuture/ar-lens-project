import React, { useEffect, useState } from "react";
import FormModal from "./FormModal";
import { Button, Input, Select, Switch } from "./common/FormFields";
import { Col, Row } from "reactstrap";
import axios from "axios";
import { useStateValue } from "@/lib/StateProvider";
import { ID, storage } from "@/lib/appwrite";
import { createLense, fetchBrands, fetchLense } from "@/endpoints";
import { portraitMobile } from "@/lib/mediaQueries";
import { useMediaQuery } from "usehooks-ts";
import { useRouter, usePathname, useParams } from "next/navigation";

const LenseModal = () => {
  const [{ isLenseModal }, dispatch] = useStateValue();
  const isMobile = useMediaQuery(portraitMobile);

  const [lenseState, setLenseState] = useState({
    name: "",
    lens_brand_Id: "",
    lens_png: "",
    lens_effect: "",
    is_active: true,
  });
  const [brands, setBrands] = useState([]);

  const { name, lens_brand_Id, is_active, lens_effect, lens_png } = lenseState;

  const UploadImage = async (e, key) => {
    const file = e.target.files;

    let imageRes = await storage.createFile(
      process.env.NEXT_PUBLIC_LENSE_BUCKET, // bucketId
      ID.unique(),
      file[0]
    );
    console.log(imageRes?.$id);

    if (imageRes) {
      const result = storage.getFileDownload(
        process.env.NEXT_PUBLIC_LENSE_BUCKET, // bucketId
        imageRes?.$id
      );

      if (key === "png") {
        setLenseState({
          ...lenseState,
          lens_png: result?.href,
        });
      }
      if (key === "effect") {
        setLenseState({
          ...lenseState,
          lens_effect: result?.href,
        });
      }
    }
  };

  const handleSubmit = async () => {
    const payload = {
      ...lenseState,
    };
    createLense(dispatch, "/api/lenses", payload);
  };

  useEffect(() => {
    fetchBrands(setBrands, "/api/brands");
  }, []);

  useEffect(() => {
    if (isLenseModal) {
      const edit_lense = JSON.parse(localStorage.getItem("edit_lense"));
      fetchLense(setLenseState, `/api/lenses?id=${edit_lense}`);
    } else {
      setLenseState({
        name: "",
        lens_brand_Id: "",
        lens_png: "",
        lens_effect: "",
        is_active: true,
      });
    }
  }, [isLenseModal]);
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <div className="d-flex gap-2 aic justify-content-end">
        {pathname !== "/lense-management" && (
          <Button
            text="View Lenses"
            w={isMobile ? "7rem" : "9rem"}
            onClick={() => {
              router.push("/lense-management");
            }}
          />
        )}
        <Button
          text="Add Lense"
          w={isMobile ? "7rem" : "9rem"}
          onClick={() => {
            dispatch({
              type: "LENSE_MODAL",
            });
          }}
        />
      </div>

      <FormModal
        isDisabled={
          !lens_effect || !lens_png || !name || !lens_brand_Id ? true : false
        }
        btnText="Add Lense"
        handleClick={handleSubmit}
        title="Add New Lense"
        isOpen={isLenseModal}
        // setIsOpen={setIsOpen}
        dispatch={dispatch}
        fields={[
          <Col className="mb-3" md={6} key="name">
            <label className="mb-2">Lense Name</label>
            <Input
              onChange={(e) => {
                setLenseState({
                  ...lenseState,
                  name: e.target.value,
                });
              }}
              placeholder="Enter Lense Name"
              type="text"
              value={name}
            />
          </Col>,

          <Col className="mb-3" key="lens_brand_Id" md={6}>
            <label className="mb-2">Lense Brand</label>
            <Select
              value={lens_brand_Id}
              onChange={(e) => {
                setLenseState({
                  ...lenseState,
                  lens_brand_Id: e.target.value,
                });
              }}
              options={brands.map((item) => {
                return (
                  <option className="options" key={item.$id} value={item.$id}>
                    {item.brand_name}
                  </option>
                );
              })}
            />
          </Col>,

          <Col md={12} className="mb-3" key="brand_media">
            <Row>
              {[
                { name: "png", img: lens_png, label: "Lense Image" },
                {
                  name: "effect",
                  img: lens_effect,
                  label: "Lense Effect (DeepAR)",
                },
              ].map(({ name, img, label }, indx) => {
                return (
                  <Col key={indx} md={6}>
                    <label className="mb-2">{label}</label>
                    <Input type="file" onChange={(e) => UploadImage(e, name)} />
                    {name === "png" && (
                      <div style={{ width: "20%" }}>
                        <img src={img} style={{ width: "100%" }} />
                      </div>
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
                setLenseState({
                  ...lenseState,
                  is_active: e.target.checked,
                });
              }}
            ></Switch>
          </Col>,
        ]}
      />
    </>
  );
};

export default LenseModal;
