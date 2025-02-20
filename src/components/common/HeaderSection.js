import { useStateValue } from "@/lib/StateProvider";
import React from "react";
import { IoIosMenu } from "react-icons/io";

const HeaderSection = () => {
  const [{ toggleMenu, loggedInUser }, dispatch] = useStateValue();

  return (
    <div
      className={
        toggleMenu ? "col-12" : "col-xl-10 col-lg-9 col-md-8 col-12 bg-info"
      }
    >
      <div className="bg-light rounded-1 shadow p-2 px-3 d-flex aic jcb mb-2">
        {/* header section */}
        <IoIosMenu
          size={22}
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch({
              type: "TOGGLE_MENU",
            });
          }}
        />
        {loggedInUser?.name}
      </div>
    </div>
  );
};

export default HeaderSection;
