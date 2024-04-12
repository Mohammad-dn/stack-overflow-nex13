"use client";
import React from "react";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const HomeFilters = ({ filters, otherClasses, containerClasses }: Props) => {
  return <div className="mt-10 hidden flex-wrap gap-3 md:flex"></div>;
};

export default HomeFilters;
