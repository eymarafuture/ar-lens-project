"use client";
import React from "react";
import reducer, { initialState } from "@/lib/reducer";
import { StateProvider } from "@/lib/StateProvider";
import RenderSection from "./RenderSection";
const RootLayoutComponent = ({ children }) => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <RenderSection children={children} />
    </StateProvider>
  );
};

export default RootLayoutComponent;
