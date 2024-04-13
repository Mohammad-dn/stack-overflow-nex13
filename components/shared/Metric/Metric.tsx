import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MetrikProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}: MetrikProps) => {
  const MetrikContent = () => (
    <>
      <Image
        src={imgUrl}
        height={16}
        width={16}
        className={`object-contain ${href ? "rounded-full" : ""}`}
        alt={alt}
      />
      <p className={`${textStyles} flex items-center gap-1 `}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}
        >
          {title}
        </span>
      </p>
    </>
  );
  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        <MetrikContent />
      </Link>
    );
  }
  return (
    <div className="flex-center flex-wrap gap-1 ">{<MetrikContent />}</div>
  );
};

export default Metric;
