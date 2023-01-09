import React, { useRef } from "react";
import { v4 as uuidV4 } from "uuid";

export default function Login({ setLogin }) {
  const login = useRef();
  function onSubmit(e) {
    //prevents the page from refreshing
    e.preventDefault();
    setLogin(login.current.value);
  }

  function createLogin() {
    setLogin(uuidV4());
  }

  return (
    <div className="container h-100 d-flex align-items-center justify-content-center">
      <form onSubmit={onSubmit}>
        <div className="row justify-content-center">
          <label>Enter your login</label>
        </div>
        <div className="row">
          <input type="text" ref={login} required></input>
        </div>
        <div className="row justify-content-center">
          <button className="btn btn-primary m-2" type="submit">
            Login{" "}
          </button>
          <button className="btn btn-secondary m-2" onClick={createLogin}>
            Get login{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
