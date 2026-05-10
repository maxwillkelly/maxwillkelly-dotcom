import { headers } from "next/headers";

export const getIpAddress = async () => {
  const readonlyHeaders = await headers();

  const forwardedFor = readonlyHeaders.get("x-forwarded-for");
  const realIp = readonlyHeaders.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  return "0.0.0.0";
};
