import { useStateValue } from "@/lib/StateProvider";
import React from "react";
import { IoIosMenu } from "react-icons/io";

const HeaderSection = () => {
  const [{ loggedInUser }, dispatch] = useStateValue();

  return (
    <div className="bg-transparent text-theme rounded-1 shadow p-2 px-3 d-flex aic jcb mb-2">
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
  );
};

export default HeaderSection;
