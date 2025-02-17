import React from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { Button } from "./common/FormFields";

const FormModal = ({
  isOpen,
  title,
  fields = [],
  handleClick,
  dispatch,
  btnText,
  isDisabled,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <Row>
          {fields.map((item) => item)}
          <Col md={12}>
            <Row>
              <Col md={6}>
                <Button
                  text="Cancel"
                  onClick={() => {
                    dispatch({
                      type: "LENSE_MODAL",
                    });
                  }}
                />
              </Col>

              <Col md={6}>
                <Button
                  isDisabled={isDisabled}
                  text={btnText}
                  onClick={handleClick}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default FormModal;
