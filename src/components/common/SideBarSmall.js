import { sidebar } from "@/lib/sidemenu";
import { useStateValue } from "@/lib/StateProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoIosMenu } from "react-icons/io";

const SibdeBarSmall = () => {
  const pathname = usePathname();
  const [{ loggedInUser, toggleMenu }, dispatch] = useStateValue();
  return (
    <div
      className={
        toggleMenu ? "d-none" : "d-block d-md-none position-absolute start-0"
      }
    >
      <IoIosMenu
        size={22}
        style={{ cursor: "pointer" }}
        onClick={() => {
          dispatch({
            type: "TOGGLE_MENU",
          });
        }}
      />
      <div className="bg-dark p-2 h-100">
        <div className="p-2 mb-2">
          <img
            src="/assets/optics_logo.png"
            style={{
              width: "90%",
            }}
          />
        </div>
        <div className="text-light bg-theme p-2 py-4 rounded-1 shadow mb-2 d-flex flex-column aic jcc">
          <span>{loggedInUser?.name}</span>
          <span>
            {loggedInUser?.email?.slice(0, 5)}..
            {loggedInUser?.email?.slice(12)}
          </span>
          <span>{loggedInUser?.labels?.map((item) => item)}</span>
        </div>
        <div className="p-2 mt-4 d-flex flex-column">
          {sidebar.map((item) => (
            <Link
              className="mb-2 text-decoration-none"
              key={item.name}
              href={item.href}
              style={{
                color: item.href === pathname ? "var(--themeColor--)" : "#000",
                fontWeight: item.href === pathname ? "bolder" : "lighter",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SibdeBarSmall;
