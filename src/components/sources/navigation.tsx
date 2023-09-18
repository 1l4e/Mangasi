"use client";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

const Navigation = ({ sources, page }: any) => {
  const [search, setSearch] = useState("");
  return (
    <nav aria-label="navigation">
      <ul className="flex items-center -space-x-px h-10 mt-2 text-base justify-between">
        <li>
          <Link
            href={`/dashboard/sources/${sources.id}?page=${
              page - 1 <= 1 ? (page = 1) : page - 1
            }`}
            className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </Link>
        </li>
        <div className="flex">
          <Input
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button asChild>
            <Link
              href={`/dashboard/sources/${sources.id}?search=${search}`}
            >
              Search
            </Link>
          </Button>
        </div>
        <li>
          <Link
            href={`/dashboard/sources/${sources.id}?page=${page + 1}`}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
