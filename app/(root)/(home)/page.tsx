import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link className="flex justify-end max-sm:w-full" href={"/ask-question"}>
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 ">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col  sm:items-center ">
        <LocalSearchBar
          route={""}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="search for question"
          otherClasses="flex-1"
        />{" "}
        <Filter
          filters={HomePageFilters}
          containerClasses="min-h-[56px] sm:min-w-[170px]"
          otherClasses="hidden max-md:flex"
        />
      </div>
    </>
  );
};

export default Home;
