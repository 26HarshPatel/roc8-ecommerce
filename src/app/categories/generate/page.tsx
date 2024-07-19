"use client";

import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { api } from "~/trpc/react";

const GenerateFakerCategories = () => {
  const [categoriesGenerated, setCategoriesGenerated] = useState(false);
  const generateCategoryMutation = api.category.create.useMutation({
    onSuccess: (data) => {
      console.log("Category created successfully ", data);
    },
    onError: (error) => {
      console.log("Error creating category ", error);
    },
  });

  function handleGenerateRandomCategories() {
    return faker.commerce.product();
  }
  function generateCategories(num: number) {
    for (let i = 0; i < num; i++) {
      const currCategory = handleGenerateRandomCategories();
      generateCategoryMutation.mutate({
        name: currCategory,
      });
    }
    setCategoriesGenerated(true);
  }

  return (
    <div className="flex items-center justify-center text-center">
      <div className="my-8 h-max w-max rounded-2xl border border-slate-200 px-8 py-5">
        <p>welcome to create the categories.</p>

        <button
          className="my-6 w-full rounded bg-black px-8 py-2 font-semibold text-white"
          onClick={() => generateCategories(100)}
        >
          Click me to generate 100 Categories
        </button>

        <div>
          <p>Categories generated: {JSON.stringify(categoriesGenerated)}</p>
        </div>
      </div>
    </div>
  );
};

export default GenerateFakerCategories;
