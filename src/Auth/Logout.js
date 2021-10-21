import React, { useContext, useState } from "react";
import { UserContext } from "../context/user-context";
import { Button, Spinner } from "react-bootstrap";
import { useHistory } from "react-router";

const LogoutButton = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const [animate, setAnimate] = useState(false);

  function closeSesion() {
    setAnimate(true);
    setTimeout(() => {
      setUser(null);
      window.localStorage.clear("user");
      history.push("/");
    }, 2000);
  }

  return (
    <Button
      id="test"
      variant="danger"
      className="btn-margin"
      onClick={() => {
        closeSesion();
      }}
    >
      {animate ? (
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        ""
      )}
      {!animate ? "Logout" : "Loading..."}
    </Button>
  );
};

export default LogoutButton;
