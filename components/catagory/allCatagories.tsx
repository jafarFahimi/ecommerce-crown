import React from "react";
import Catagory from "./catagory";
import { rolexwatches, bagCollection, jacket, sneakers, hatsCollection } from "public/images";

export default function AllCatagories() {
  return (
    <section className="w-full">
      <div className="flex flex-col items-center w-full flex-wrap sm:flex-row justify-center gap-x-4 gap-y-4 mb-2">
        <Catagory srcProp={hatsCollection} cat="hats" />
        <Catagory srcProp={jacket} cat="jackets" />
        <Catagory srcProp={sneakers} cat="sneakers" />
        <Catagory srcProp={rolexwatches} cat="watches" />
        <Catagory srcProp={bagCollection} cat="bags" />
      </div>
    </section>
  );
}
