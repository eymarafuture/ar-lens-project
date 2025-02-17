import { portraitMobile } from "@/lib/mediaQueries";
import { sidebar } from "@/lib/sidemenu";
import { useStateValue } from "@/lib/StateProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { LiaTimesSolid } from "react-icons/lia";

const SibdeBarSection = ({ logout }) => {
  const isMobile = useMediaQuery(portraitMobile);

  const pathname = usePathname();
  const [{ loggedInUser, toggleMenu }, dispatch] = useStateValue();
  return (
    <div
      className={
        toggleMenu
          ? "d-none"
          : `col-xl-2 col-lg-3 col-md-4 col-10 vh-100 ${
              isMobile && "position-absolute"
            }`
      }
    >
      <div className="bg-light p-2 h-100">
        <div className="p-2 mb-2 position-relative">
          {isMobile && (
            <LiaTimesSolid
              size={28}
              onClick={() => {
                dispatch({
                  type: "TOGGLE_MENU",
                });
              }}
              className="position-absolute top-0 end-0 mt-2 me-2"
            />
          )}
          <img
            src="/assets/optics_logo.png"
            style={{
              width: isMobile ? "40%" : "90%",
              display: "block",
              margin: "0px auto",
            }}
          />
        </div>
        <div className="text-light bg-theme p-2 py-4 rounded-1 shadow mb-2 d-flex flex-column aic jcc">
          <span>{loggedInUser?.name}</span>
          <span>
            {loggedInUser?.email?.slice(0, 5)}...
            {loggedInUser?.email?.slice(12)}
          </span>
          <span>{loggedInUser?.labels?.map((item) => item)}</span>

          <span
            onClick={logout}
            className="fw-bold mt-3"
            style={{
              cursor: "pointer",
            }}
          >
            Logout
          </span>
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
                fontSize: "1rem",
              }}
              onClick={() => {
                if (isMobile) {
                  dispatch({
                    type: "TOGGLE_MENU",
                  });
                }
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

export default SibdeBarSection;
