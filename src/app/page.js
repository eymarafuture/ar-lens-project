"use client";
import { useEffect, useState } from "react";
import { account } from "./appwrite";
import { Button, Input } from "@/components/common/FormFields";
import Dashboard from "@/components/Dashboard";

const LoginPage = () => {
  const [loggedInUser, setLoggedInUser] = useState({ name: "bilal" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  const [loader, setLoader] = useState(false);
  const [authLoader, setAuthLoader] = useState(false);

  const login = async () => {
    try {
      setAuthLoader(true);
      await account.createEmailPasswordSession(email, password);
      let user = await account.get();
      setLoggedInUser(user);
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
      setLoggedInUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // console.log(account);
    async function fetch() {
      try {
        const response = await account.get();
        setLoggedInUser(response);
        setLoader(false); // Redirect to dashboard page if authenticated
      } catch (error) {
        setLoggedInUser(null);
        setLoader(false); // Redirect to login page if not authenticated
      }
    }
    // fetch();
  }, [account]);

  if (!loader) {
    if (loggedInUser) {
      return <Dashboard />;
    }
    return (
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
    );
  } else {
    <div>
      <p>loading.........</p>
    </div>;
  }
};

export default LoginPage;
