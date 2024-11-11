import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FiUserPlus } from "react-icons/fi";

const UserForm = ({
  receiveUserStateFromParent,
  receiveEditUserIndex,
  onTakeUserFromChild,
  onUserFormReset,
}) => {
  const [getUser, setUser] = useState(receiveUserStateFromParent);
  const [getEditUserIndex, setEditUserIndex] = useState(receiveEditUserIndex);

  const userFormSubmitHandler = (e) => {
    e.preventDefault();

    //send data to parent component
    onTakeUserFromChild(getUser, getEditUserIndex);
  };

  const userFormResetHandler = () => {
    onUserFormReset();
  };

  useEffect(() => {
    setUser(receiveUserStateFromParent);
  }, [receiveUserStateFromParent]);

  useEffect(() => {
    setEditUserIndex(receiveEditUserIndex);
  }, [receiveEditUserIndex]);

  return (
    <>
      <h2>
        <FiUserPlus className="mtx-10" /> Add / Edit User
      </h2>
      <Card>
        <Card.Body>
          <form onSubmit={userFormSubmitHandler}>
            <Form.Group className="mb-3" controlId="user.firstName">
              <Form.Label>
                <strong>First Name:</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                required
                value={getUser?.firstName}
                onChange={(e) =>
                  setUser({ ...getUser, firstName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="user.lastName">
              <Form.Label>
                <strong>Last Name:</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                required
                value={getUser?.lastName}
                onChange={(e) =>
                  setUser({ ...getUser, lastName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="user.email">
              <Form.Label>
                <strong>Email Id:</strong>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                required
                value={getUser?.email}
                onChange={(e) => setUser({ ...getUser, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="user.phoneNumber">
              <Form.Label>
                <strong>Phone Number:</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                required
                value={getUser?.phoneNumber}
                onChange={(e) =>
                  setUser({ ...getUser, phoneNumber: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="user.phoneNumber">
              <Button type="submit" variant="primary">
                {getEditUserIndex !== null ? "Save Changes" : "Add User"}
              </Button>{" "}
              <Button
                type="button"
                variant={getEditUserIndex !== null ? "danger" : "secondary"}
                onClick={userFormResetHandler}
              >
                {getEditUserIndex !== null ? "Cancel" : "Reset"}
              </Button>{" "}
            </Form.Group>
          </form>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserForm;
