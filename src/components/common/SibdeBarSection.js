import { portraitMobile } from "@/lib/mediaQueries";
import { sidebar } from "@/lib/sidemenu";
import { useStateValue } from "@/lib/StateProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { LiaTimesSolid } from "react-icons/lia";
import { jsPDF } from "jspdf";
import { Button } from "./FormFields";

const SibdeBarSection = ({ logout }) => {
  const isMobile = useMediaQuery(portraitMobile);

  const pathname = usePathname();
  const [{ loggedInUser, toggleMenu }, dispatch] = useStateValue();
  return (
    <div
      className={
        toggleMenu
          ? "d-none"
          : `col-xl-2 col-lg-3 col-md-4 col-10 bg-lacecap h-auto ${isMobile && "position-absolute z-1"
          }`
      }
    >
      <div className="bg-transparent p-2 h-100">
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
              className={`mb-2 text-decoration-none ${item.href === pathname
                ? "fw-bold text-theme"
                : "fw-normal text-midnight"
                }`}
              key={item.name}
              href={item.href}
              style={{
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
        <Button
          className="btn btn-theme mt-4"
          style={{ fontSize: "1rem" }}
          onClick={() => {
            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text("AR Lens Management Platform - Client Guide", 10, 15);
            doc.setFontSize(12);
            doc.text(
              "\nWelcome!\n" +
              "This platform is designed to help you easily manage your collection of AR (Augmented Reality) lenses and their brands.\n" +
              "\nProject Goal:\n" +
              "- To provide a simple, user-friendly dashboard for organizing, updating, and showcasing your AR lenses and brands.\n" +
              "\nWhat You Can Do:\n" +
              "- View all your AR lenses and brands in one place.\n" +
              "- Add new lenses or brands with just a few clicks.\n" +
              "- Edit details or images for any lens or brand.\n" +
              "- Remove lenses you no longer need.\n" +
              "- Upload images for each lens and brand to keep your catalog visually appealing.\n" +
              "\nHow to Use the Platform:\n" +
              "1. Use the sidebar to switch between Dashboard, Brands, and Lenses.\n" +
              "2. To add a new item, click the 'Add' button at the top of the page.\n" +
              "3. To edit, click the 'Edit' button next to any item.\n" +
              "4. To delete, click the 'Delete' button and confirm your choice.\n" +
              "5. For each lens or brand, you can upload an image to make your catalog more attractive.\n" +
              "6. All changes are saved instantly and you will see an updated records after every action.\n" +
              "\nSupport:\n" +
              "If you have any questions or need help, please contact your project manager or support team.\n" +
              "\nThank you for using the AR Lens Management Platform!\n",
              10, 25, { maxWidth: 190 }
            );
            doc.save("ar-lens-client-guide.pdf");
          }}
          text="PDF Documentation"
        >
        </Button>
      </div>
    </div>
  );
};

export default SibdeBarSection;
