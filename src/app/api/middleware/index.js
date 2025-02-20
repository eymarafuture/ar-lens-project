export const authorization = (req) => {
  const reqHeaders = new Headers(req.headers);
  return reqHeaders.get("authorization") === process.env.NEXT_PUBLIC_API_KEY;
};
