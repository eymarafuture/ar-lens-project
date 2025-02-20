import { NextResponse } from "next/server";

export const apiResponse = (success, message, data) => {
  return {
    success,
    message,
    data,
  };
};
