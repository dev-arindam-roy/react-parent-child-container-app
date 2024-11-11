import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FiDatabase, FiUserX } from "react-icons/fi";

const Header = ({
  onLoadUserEventFromChild,
  onDeleteAllUserEventFromChild,
  receiveUserListFromParent,
}) => {
  return (
    <>
      <Row>
        <Col>
          <h3>
            <strong>Parent & Child - Container - Prop - App</strong>
          </h3>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Button
            type="button"
            variant="dark"
            onClick={onLoadUserEventFromChild}
          >
            <FiDatabase className="mtx-4" /> Load Users
          </Button>
          {receiveUserListFromParent.length > 0 && (
            <Button
              type="button"
              variant="danger"
              className="mx-2"
              onClick={onDeleteAllUserEventFromChild}
            >
              <FiUserX className="mtx-4" /> Delete All Users
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </>
  );
};

export default Header;
