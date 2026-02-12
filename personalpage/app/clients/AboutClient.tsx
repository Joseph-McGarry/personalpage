"use client";
import dynamic from "next/dynamic";

const About = dynamic(() => import("../about"), { ssr: false });
export default function AboutClient() {
  return <About />;
}
