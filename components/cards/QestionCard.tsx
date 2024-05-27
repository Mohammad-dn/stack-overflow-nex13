import Link from "next/link";
import RenderTag from "../shared/RenderTag/RenderTag";
import Metric from "../shared/Metric/Metric";
import { formatAndDivideNumber, getTimeStamp } from "@/lib/utils";

interface QestionProps {
  title: string;
  upvotes: string[];
  answers: Array<object>;
  _id: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  views: number;
  createdAt: Date;
}
const QestionCard = ({
  title,
  upvotes,
  answers,
  _id,
  tags,
  author,
  views,
  createdAt,
}: QestionProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row">
        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {getTimeStamp(createdAt)}
        </span>
        <Link href={`/qestions/${_id}`}>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1 ">
            {title}
          </h3>
        </Link>
      </div>
      {/* if sign in add edit delete action */}
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag?._id} name={tag?.name} _id={tag?._id} />
        ))}
      </div>
      <div className="flex-between mt-6  w-full flex-wrap gap-3">
        <Metric
          imgUrl={author?.picture}
          alt="user"
          value={author?.name}
          title={` - asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author?._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          title=" vots"
          textStyles="smal-medium text-dark400_light800"
          value={formatAndDivideNumber(upvotes?.length)}
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Message"
          title=" Message"
          textStyles="smal-medium text-dark400_light800"
          value={formatAndDivideNumber(answers?.length)}
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          title=" Views"
          textStyles="smal-medium text-dark400_light800"
          value={formatAndDivideNumber(views)}
        />
      </div>
    </div>
  );
};

export default QestionCard;
