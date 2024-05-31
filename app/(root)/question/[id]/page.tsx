import Answer from "@/components/forms/Answer";
import Metric from "@/components/shared/Metric/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag/RenderTag";
import { getQuestionById } from "@/lib/actions/question.actions";
import { formatAndDivideNumber, getTimeStamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params, searchParams }) => {
  const result = await getQuestionById({ questionId: params.id });

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between  gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            className="flex items-center justify-start gap-1"
            href={`/profile/${result.author.clerkId}`}
          >
            <Image
              src={result.author.picture}
              alt="profile"
              className="rounded-full"
              width={22}
              height={22}
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">Voting</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          title=" Asked"
          textStyles="smal-medium text-dark400_light800"
          value={`asked ${getTimeStamp(result.createdAt)}`}
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Message"
          title=" Answer"
          textStyles="smal-medium text-dark400_light800"
          value={formatAndDivideNumber(result?.answers?.length)}
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          title=" Views"
          textStyles="smal-medium text-dark400_light800"
          value={formatAndDivideNumber(result?.views)}
        />
      </div>

      <ParseHTML data={result.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {result?.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>
      <Answer />
    </>
  );
};

export default page;
