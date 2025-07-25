"use client";

import { account } from "@/lib/appwrite";
import React, { useEffect, useState } from "react";
import { Button, Input } from "./FormFields";
import SibdeBarSection from "./SibdeBarSection";
import { useStateValue } from "@/lib/StateProvider";
import SibdeBarSmall from "./SideBarSmall";
import { useMediaQuery } from "usehooks-ts";
import { portraitMobile } from "@/lib/mediaQueries";
import HeaderSection from "./HeaderSection";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const RenderSection = ({ children }) => {
  const isMobile = useMediaQuery(portraitMobile);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(true);
  const [authLoader, setAuthLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      // console.log(err);
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
      // console.log(err);
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
              {/* <HeaderSection /> */}
              {children}
            </div>
          </div>
        ) : (
          <div className="vh-100">
            <div className="container-fluid h-100">
              <div className="row h-100">
                <div className="col-lg-6 d-none d-md-block">
                  <div className=" d-flex aic jcc h-100">
                    <img
                      src="/assets/optics_logo.png"
                      style={{
                        width: "90%",
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="h-100 d-flex aic jcc">
                    <form
                      className={`shadow rounded bg-light 
                    p-2 p-md-4 h-75 ${isMobile ? "w-100" : "w-75"}  d-flex 
                    flex-column jcc gap-2`}
                    >
                      <div className="d-flex aic jcc">
                        <img
                          src="/assets/optics_logo.png"
                          style={{
                            width: isMobile ? "70%" : "30%",
                          }}
                        />
                      </div>



                      <Input
                        type="email"
                        placeholder="Email"
                        className="text-midnight border-lacecap"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="position-relative">
                        <span
                          style={{
                            color: "#1e1e1e",
                            cursor: "pointer"
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                          className="position-absolute end-0 mt-2 me-2">
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="text-midnight border-lacecap"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

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
