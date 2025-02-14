"use client";

import { account } from "@/lib/appwrite";
import React, { useEffect, useState } from "react";
import { Button, Input } from "./FormFields";
import SibdeBarSection from "./SibdeBarSection";
import { useStateValue } from "@/lib/StateProvider";
import SibdeBarSmall from "./SideBarSmall";

const RenderSection = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(true);
  const [authLoader, setAuthLoader] = useState(false);

  const [{ loggedInUser }, dispatch] = useStateValue();

  const login = async () => {
    try {
      setAuthLoader(true);
      await account.createEmailPasswordSession(email, password);
      let user = await account.get();
      dispatch({
        type: "LOGIN",
        payload: user,
      });
      setAuthLoader(false);
    } catch (err) {
      console.log(err);
      alert(err);
      setAuthLoader(false);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      localStorage.clear();
      dispatch({
        type: "LOGIN",
        payload: null,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function fetch() {
      try {
        const response = await account.get();
        dispatch({
          type: "LOGIN",
          payload: response,
        });
        setLoader(false); // Redirect to dashboard page if authenticated
      } catch (error) {
        dispatch({
          type: "LOGIN",
          payload: null,
        });
        setLoader(false); // Redirect to login page if not authenticated
      }
    }

    fetch();
  }, [account]);

  return (
    <>
      {!loader ? (
        loggedInUser ? (
          <div className="bg-light container-fluid vh-100">
            {/* <SibdeBarSmall /> */}
            <div className="row h-100 ">
              <SibdeBarSection logout={logout} />
              {children}
            </div>
          </div>
        ) : (
          <div className="vh-100">
            <div className="container-fluid h-100">
              <div className="row h-100">
                <div className="col-lg-6 ">
                  <div className=" d-flex aic jcc h-100">
                    <img
                      src="/assets/optics_logo.png"
                      style={{
                        width: "90%",
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className=" h-100 d-flex aic jcc">
                    <form className="shadow rounded p-2 p-md-4 h-75 w-75 d-flex flex-column jcc gap-2">
                      <div className="d-flex aic jcc">
                        <img
                          src="/assets/optics_logo.png"
                          style={{
                            width: "30%",
                          }}
                        />
                      </div>

                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <Button
                        onClick={login}
                        text={authLoader ? "Logging in..." : "Login"}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div>
          <p>loading.........</p>
        </div>
      )}
    </>
  );
};

export default RenderSection;
