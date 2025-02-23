"use client";

import React, { useState } from "react";

const DashboardCard = ({ indx, col, isMobile, item }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div key={indx} className={`${col} ${isMobile ? "mb-4" : ""}`}>
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={`shadow position-relative rounded-1 h-100 ${
          isHover ? "text-light bg-midnight" : "text-midnight bg-light"
        } `}
        style={{ overflow: "hidden" }}
      >
        <div
          className="d-flex flex-column h-100 jcb px-3 py-2"
          style={{ zIndex: 1 }}
        >
          {isMobile ? <h6>{item.name}</h6> : <h5>{item.name}</h5>}
          <h2 className="text-end">
            {item.value < 10
              ? `0${item.value}`
              : item?.value?.toLocaleString("en-US")}
          </h2>
        </div>

        <span
          className="bg-midnight position-absolute start-0 top-0 h-100"
          style={{
            width: isHover ? "100%" : "4%",
            zIndex: 0, // Lower than the text
            opacity: isHover ? 0 : 1,
          }}
        ></span>
      </div>
    </div>
  );
};

export default DashboardCard;
