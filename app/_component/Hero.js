"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Authentication } from "./Authentication";
import { useAuthContext } from "../provider";
import Link from "next/link";

export const Hero = () => {
  const { user } = useAuthContext();

  return (
    <section className="p-10 flex flex-col items-center justify-center mt-24 md:px-20 lg:px-36 xl:px-48 max-w-5xl mx-auto">
      <h1 className="font-extrabold text-5xl sm:text-6xl text-center leading-tight">
        Create Stunning AI-Powered YouTube Shorts in Seconds
      </h1>
      <p className="mt-5 max-w-3xl text-center text-lg sm:text-xl text-gray-600 tracking-wide">
        Let AI handle your scripts, images, and voiceovers automatically. <br /> 
        Effortlessly create, edit, and publish engaging short videos — no experience required!
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-6">
        <Button variant="secondary" className="px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform duration-200">
          Explore Videos
        </Button>

        {!user ? (
          <Authentication>
            <Button className="px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform duration-200">
              Get Started Now
            </Button>
          </Authentication>
        ) : (
          <Link href="/dashboard" passHref>
            <Button as="a" className="px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform duration-200">
              Go to Dashboard
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};
