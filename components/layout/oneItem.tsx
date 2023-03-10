import Image, { StaticImageData } from "next/image";
import React, { FunctionComponent } from "react";
type Props = {
  id: number;
  name: string;
  imageUrl: string | StaticImageData;
  price: number;
  qty?: number;
  countInStock?: number;
};

const OneItem: FunctionComponent<Props> = (props) => {
  return (
    <div className="flex gap-x-4 items-center">
      <Image
        src={props.imageUrl}
        width={70}
        className="h-full border-gray-100 border-2"
        height={150}
        alt={props.name}
      />
      <div className="flex flex-col text-sm lg:text-[16px]">
        <h4>
          {props.name
            .split(" ")
            .map((n) => n[0].toUpperCase() + n.slice(1))
            .join(" ")}
        </h4>
        <span>
          {props.qty} x {props.price}$
        </span>
      </div>
    </div>
  );
};
export default OneItem;
