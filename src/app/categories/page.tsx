"use client";

import React, { useState, type FC } from "react";

interface Category {
  id: number;
  name: string;
}

const Categories: FC = () => {
  const [currentCategories, setCurrentCategories] = useState<Category[]>([
    { name: "Shoes", id: 1 },
    { name: "Men T-shirts", id: 2 },
    { name: "Makeup", id: 3 },
    { name: "Jewellery", id: 4 },
    { name: "Women T-shirts", id: 5 },
    { name: "Furniture", id: 6 },
  ]);

  const [markedCategories, setMarkedCategories] = useState<number[]>([1, 4, 5]);

  function handleCheckboxChange(condition: boolean, id: number) {
    const oldMarkedCategories = [...markedCategories];
    let newMarkedCategories = [];
    if (condition) {
      oldMarkedCategories.push(id);
      newMarkedCategories = oldMarkedCategories;
    } else {
      newMarkedCategories = oldMarkedCategories.filter(
        (element) => element !== id,
      );
    }
    setMarkedCategories(newMarkedCategories);
  }

  return (
    <div className="flex items-center justify-center">
      <div className="my-8 rounded-lg border border-slate-200 px-8 py-5">
        <h2 className="my-5 text-3xl font-bold">Please mark your intertsts!</h2>
        <p className="text-center text-sm">We will keep you notified.</p>
        <p className="mb-2 mt-5 text-base font-semibold">My saved interests!</p>
        <div className="flex flex-col justify-center gap-3">
          {currentCategories.map((el, eli) => {
            return (
              <div key={eli} className="relative flex items-center">
                <input
                  type="checkbox"
                  id={el.id?.toString()}
                  name={JSON.stringify(el.name) ?? "name"}
                  checked={markedCategories.includes(el.id ? el.id : 0)}
                  className="peer relative h-4 w-4 cursor-pointer appearance-none rounded-sm bg-gray-300 checked:bg-gray-700"
                  onChange={() => {
                    handleCheckboxChange(
                      !markedCategories.includes(el.id ? el.id : 0),
                      el.id,
                    );
                  }}
                />
                <svg
                  className="pointer-events-none absolute hidden h-4 w-4 peer-checked:block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 7 10 17 5 12"></polyline>
                </svg>

                <label
                  htmlFor={el.id?.toString()}
                  className="ml-2 cursor-pointer text-sm font-semibold"
                >
                  {el.name}
                </label>
              </div>
            );
          })}
        </div>
        <div className="pageNumbers my-5">
          <button className="text-gray-400">{`<<`}</button>
          <button className="mx-2 text-gray-400">{`<`}</button>{" "}
          {/* editing remianing here. */}
          <span className="text-gray-400">1 2 3 4 5 6 7 ... </span>{" "}
          <button className="mx-2 text-gray-400">{`>`}</button>
          <button className="text-gray-400">{`>>`}</button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
