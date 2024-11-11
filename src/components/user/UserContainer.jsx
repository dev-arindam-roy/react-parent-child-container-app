import React, { useState, useEffect } from "react";
import Header from "./Header";
import UserForm from "./UserForm";
import UserList from "./UserList";
import * as Helper from "../../utils/Helpers";
import { v4 as uuidv4 } from "uuid";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "./User.css";

const initUserState = {
  uuid: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const UserContainer = () => {
  const [user, setUser] = useState(initUserState);
  const [userList, setUserList] = useState([]);
  const [editUserIndex, setEditUserIndex] = useState(null);

  /** EMIT::take user data from the child component - UserList */
  const emitOnTakeUserEventHandler = (formUser, haveUserEditIndex = null) => {
    if (haveUserEditIndex !== null) {
      const updatedUserList = userList.map((item, index) =>
        index === haveUserEditIndex ? formUser : item
      );
      setUserList(updatedUserList);
      toast.success("User updated successfully!");
    } else {
      const formUserAssignUuid = { ...formUser, uuid: uuidv4() };
      setUserList([...userList, formUserAssignUuid]);
      setUser(formUserAssignUuid);
      toast.success("User added successfully!");
    }

    onUserFormResetHandler();
  };

  /**  EMIT::reset the user from after add or edit user. It call from main component & child component - UserList */
  const onUserFormResetHandler = () => {
    setUser({
      uuid: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    });
    setEditUserIndex(null);
  };

  /** EMIT::delete user from the userList and it call from child component - UserList */
  const emitOnUserDeleteEventHandler = (keyIndex) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete all the users",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setUserList(userList.filter((_, index) => index !== keyIndex));
        toast.success("User deleted successfully!");
        onUserFormResetHandler();
      }
    });
  };

  /** EMIT::edit an user, it call from child component - UserList */
  const emitOnUserEditEventHandler = (keyIndex) => {
    setUser(userList[keyIndex]);
    setEditUserIndex(keyIndex);
  };

  /** EMIT::create & load random users, it call from child component - Header */
  const emitOnLoadUserEventHandler = () => {
    let randomUserBucket = [];
    for (let i = 1; i <= 100; i++) {
      let _tempUser = {
        uuid: uuidv4(),
        firstName: Helper.getRandomString(),
        lastName: Helper.getRandomString(),
        email:
          Helper.getRandomString() + "@" + Helper.getRandomString() + ".onex",
        phoneNumber: Helper.getRandomPhoneNumber(),
      };
      randomUserBucket.push(_tempUser);
    }
    // merge old/previous users with the random created userbucket
    const mergeUserList = [...userList, ...randomUserBucket];
    setUserList(mergeUserList);

    Swal.fire({
      title: "Please wait...",
      html: "System is <strong>processing</strong> your request",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(() => {
      Swal.close();
      toast.success("Random user loaded successfully!");
    });
  };

  /** EMIT::delete all the users, it call from child component - Header */
  const emitOndeleteAllUserEventHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete all the users",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setUserList([]);
        toast.success("All user deleted successfully!");
        onUserFormResetHandler();
      }
    });
  };

  /** check the latest userList in DOM state */
  useEffect(() => {
    console.log(userList);
  }, [userList]);

  /** check the latest user in DOM state */
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <Container fluid="md" className="mt-3">
        <Header
          onLoadUserEventFromChild={emitOnLoadUserEventHandler}
          onDeleteAllUserEventFromChild={emitOndeleteAllUserEventHandler}
          receiveUserListFromParent={userList}
        />
        <Row className="mt-3">
          <Col xs={12} md={8}>
            <UserList
              receiveUserListFromParent={userList}
              onUserDelete={emitOnUserDeleteEventHandler}
              onUserEdit={emitOnUserEditEventHandler}
            />
          </Col>
          <Col xs={12} md={4}>
            <UserForm
              receiveUserStateFromParent={user}
              receiveEditUserIndex={editUserIndex}
              onTakeUserFromChild={emitOnTakeUserEventHandler}
              onUserFormReset={onUserFormResetHandler}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserContainer;
