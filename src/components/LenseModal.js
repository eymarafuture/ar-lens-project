import React, { useEffect, useState } from "react";
import FormModal from "./FormModal";
import { Button, Input, Select, Switch } from "./common/FormFields";
import { Col, Row } from "reactstrap";
import axios from "axios";
import { useStateValue } from "@/lib/StateProvider";
import { ID, storage } from "@/lib/appwrite";
import { createLense, fetchLenses } from "@/endpoints";

const LenseModal = () => {
  const [{}, dispatch] = useStateValue();
  const [lenseState, setLenseState] = useState({
    name: "",
    lens_brand_Id: "",
    lens_png: "",
    lens_effect: "",
    is_active: true,
  });
  const [brands, setBrands] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
    async function fetch() {
      try {
        const ress = await axios.get("/api/brands", {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_API_KEY,
          },
        });
        const data = ress?.data?.data?.data;
        setBrands(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetch();
  }, []);

  return (
    <>
      <Button text="Add Lense" w="10rem" onClick={() => setIsOpen(!isOpen)} />

      <FormModal
        isDisabled={
          !lens_effect || !lens_png || !name || !lens_brand_Id ? true : false
        }
        btnText="Add Lense"
        handleClick={handleSubmit}
        title="Add New Lense"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
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
