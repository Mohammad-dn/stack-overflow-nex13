import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";

interface Props {
  _id: number;
  totalQuestion?: number;
  name: string;
  showCount?: boolean;
}
const RenderTag = ({ _id, totalQuestion, name, showCount }: Props) => {
  return (
    <Link className="flex justify-between gap-2" href={`/tags/${_id}`}>
      <Badge className="subtle-medium background-light900_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestion}</p>
      )}
    </Link>
  );
};

export default RenderTag;
