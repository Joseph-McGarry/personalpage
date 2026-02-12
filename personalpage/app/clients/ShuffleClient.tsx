"use client";
import dynamic from "next/dynamic";

const Shuffle = dynamic(() => import("../shuffle"), { ssr: false });
export default function ShuffleClient() {
  return <Shuffle />;
}
