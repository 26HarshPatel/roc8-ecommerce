"use client";

import React, { useEffect, useState, type FC } from "react";
import { api } from "~/trpc/react";

interface Category {
  id: number;
  name: string;
}

interface User {
  email?: string;
}

const Categories: FC = () => {
  const [currentCategories, setCurrentCategories] = useState<Category[]>([]);
  const [markedCategories, setMarkedCategories] = useState<number[]>([]);
  const [email, setEmail] = useState<string>("");
  const [initialDataSetup, setInitialDataSetup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPagesArray, setCurrentPagesArray] = useState<
    (string | number)[] | null[]
  >([]);

  const updateMarkedCategoriesMutation =
    api.user.updateUserMarkedCatetories.useMutation({
      onSuccess: (data) => {
        if (data) {
          console.log("response = ", data);
        } else {
          console.log("Invalid Login Details.");
        }
      },
      onError: (error) => {
        console.error("Error user password verification:", error);
      },
    });

  useEffect(() => {
    const localStorageData: string | null = localStorage.getItem("user");
    if (localStorageData) {
      try {
        const parsedData: unknown = JSON.parse(localStorageData);
        if (
          parsedData &&
          typeof parsedData === "object" &&
          "email" in parsedData
        ) {
          const user: User = parsedData as User;
          const localStorageEmail = user.email ?? "";
          setEmail(localStorageEmail);
          setInitialDataSetup(true);
        }
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
      }
    }
  }, []);

  const userMarkedCategoriesQuery = api.user.gerUser.useQuery(
    {
      email: email,
    },
    {
      enabled: initialDataSetup,
    },
  );

  useEffect(() => {
    if (userMarkedCategoriesQuery.data?.markedCategories) {
      setMarkedCategories(userMarkedCategoriesQuery.data.markedCategories);
    }
  }, [userMarkedCategoriesQuery.data]);

  function handleCheckboxChange(addCategoryCondition: boolean, id: number) {
    const oldMarkedCategories = [...markedCategories];
    let newMarkedCategories = [];
    if (addCategoryCondition) {
      oldMarkedCategories.push(id);
      newMarkedCategories = oldMarkedCategories;
    } else {
      newMarkedCategories = oldMarkedCategories.filter(
        (element) => element !== id,
      );
    }
    updateMarkedCategoriesMutation.mutate({
      email,
      markedCategories: newMarkedCategories,
    });
    setMarkedCategories(newMarkedCategories);
  }

  const categoriesQuery = api.category.getPaginated.useQuery({
    page: currentPage,
    limit: 6,
  });
  useEffect(() => {
    function generateFirstPageArray() {
      if (totalPages <= 5) {
        return [...Array(totalPages).keys()].map((n) => n + 1);
      } else {
        return [1, 2, 3, 4, 5, "..."];
      }
    }
    if (categoriesQuery.data) {
      const { category, count } = categoriesQuery.data;
      if (category && count) {
        setCurrentCategories(category);
        setTotalPages(count);
        if (currentPage === 1) setCurrentPagesArray(generateFirstPageArray());
      }
    }
  }, [categoriesQuery.data, currentPage, totalPages]);

  const handlePageChange = (newPage: number | string | null) => {
    if (typeof newPage === "number") {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
        setCurrentPagesArray(() => {
          const array = generatePagesArray(newPage);
          return array;
        });
      }
    }
  };
  function generatePagesArray(currentPage: number) {
    if (totalPages <= 5) {
      return [...Array(totalPages).keys()].map((n) => n + 1);
    } else {
      if (currentPage <= 3) {
        return [1, 2, 3, 4, 5, "..."];
      } else if (currentPage > totalPages - 3) {
        return [
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        return [
          "...",
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          "...",
        ];
      }
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="my-8 rounded-lg border border-slate-200 px-8 py-5">
        <h2 className="my-5 text-3xl font-bold">Please mark your interests!</h2>
        <p className="text-center text-sm">We will keep you notified.</p>
        <p className="mb-2 mt-5 text-base font-semibold">My saved interests!</p>
        <div className="flex flex-col justify-center gap-3">
          {currentCategories.map((el) => (
            <div key={el.id} className="relative flex items-center">
              <input
                type="checkbox"
                id={el.id.toString()}
                name={el.name}
                checked={markedCategories.includes(el.id)}
                className="peer relative h-4 w-4 cursor-pointer appearance-none rounded-sm bg-gray-300 checked:bg-gray-700"
                onChange={() => {
                  handleCheckboxChange(
                    !markedCategories.includes(el.id),
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
                htmlFor={el.id.toString()}
                className="ml-2 cursor-pointer text-sm font-semibold"
              >
                {el.name}
              </label>
            </div>
          ))}
        </div>
        <div className="pageNumbers my-5">
          <button
            className="text-gray-400"
            onClick={() => handlePageChange(1)}
          >{`<<`}</button>
          <button
            className="mx-2 text-gray-400"
            onClick={() => handlePageChange(currentPage - 1)}
          >{`<`}</button>{" "}
          <span className="text-gray-400">
            {currentPagesArray.map((page, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={`mx-1 ${
                  page === currentPage ? "text-black" : "text-gray-400"
                }`}
              >
                {page}
              </button>
            ))}
          </span>
          <button
            className="mx-2 text-gray-400"
            onClick={() => handlePageChange(currentPage + 1)}
          >{`>`}</button>
          <button
            className="text-gray-400"
            onClick={() => handlePageChange(totalPages)}
          >{`>>`}</button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
