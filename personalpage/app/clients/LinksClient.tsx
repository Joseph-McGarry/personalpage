"use client";
import dynamic from "next/dynamic";

const Links = dynamic(() => import("../links"), { ssr: false });
export default function LinksClient() {
  return <Links />;
}