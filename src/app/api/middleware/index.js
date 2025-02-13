export const authorization = (apiKey) => {
  return process.env.NEXT_PUBLIC_API_KEY === apiKey;
};
