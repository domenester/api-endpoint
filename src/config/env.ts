export const NODE_HOST = () => {
  if (
    process.env.NODE_ENV === "production" || 
    process.env.NODE_ENV === "test-prod") { return process.env.NODE_HOST; }
  else { return process.env.NODE_HOST_LOCAL; }
};

export const NODE_URL = () => {
  if (
    process.env.NODE_ENV === "production" || 
    process.env.NODE_ENV === "test-prod") { return process.env.NODE_URL; }
  else { return process.env.NODE_URL_LOCAL; }
};

export const NODE_PORT = () => {
  return +process.env.NODE_PORT;
}