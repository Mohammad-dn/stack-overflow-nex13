"use client";

import React from "react";
import { Button } from "../ui/button";
import { HomePageFilters } from "@/constants/filters";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const HomeFilters = ({ filters, otherClasses, containerClasses }: Props) => {
  const active = "newest";
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500"
          }`}
          key={item.value}
          onClick={() => {}}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
