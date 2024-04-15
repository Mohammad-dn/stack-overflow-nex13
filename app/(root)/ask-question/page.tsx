import Questions from "@/components/forms/Questions";
import React from "react";

const AskQuestion = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <div className="mt-9 ">
        <Questions />
      </div>
    </div>
  );
};

export default AskQuestion;
