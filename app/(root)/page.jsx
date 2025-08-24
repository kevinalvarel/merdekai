import React from "react";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Testimonial } from "@/components/home/Testimonial";
import { FAQ } from "@/components/home/FAQ";

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Testimonial />
      <FAQ />
    </>
  );
}

export default Home;
