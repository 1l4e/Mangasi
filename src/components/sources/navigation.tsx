"use client";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SourceSelector } from "@/types/types";
import { toBase64 } from "@/lib/utils";

const Navigation = ({ sources, page }: any) => {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const mext = new URLSearchParams(Array.from(searchParams.entries()));
    const brev = new URLSearchParams(Array.from(searchParams.entries()));
    if (mext.has("page")) mext.delete("page");
    if (brev.has("page")) brev.delete("page");
    mext.set("page", parseInt(page) + 1 + "");
    brev.set("page", parseInt(page) - 1 < 1 ? "1" : parseInt(page) - 1 + "");
    const obj:SourceSelector = sources.selector;
    let defaultCat = obj.home[0].slug
    if (defaultCat && defaultCat !== '/'){
        if (!mext.has("category")){
            mext.set("category", toBase64( defaultCat))
            }
        if (!brev.has("category")){
            brev.set("category", toBase64(defaultCat))
            }
        }

    useEffect(() => {
        let timeoutId : NodeJS.Timeout | undefined
        if (search) {
        timeoutId = setTimeout(() => {

            router.push(`/dashboard/sources/${sources.id}?search=${search}`);
        }, 500);
        }else{
        timeoutId = setTimeout(()=>{
            router.push(`/dashboard/sources/${sources.id}`)},500)
        }
        return () => {
            clearTimeout(timeoutId);
        };

    }, [search]);

    return (
        <nav aria-label="navigation">
            <ul className="flex items-center -space-x-px h-10 mt-2 text-base justify-between">
                <li>
                    <Link
                        href={`${pathName}?${brev.toString()}`}
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
                        autoComplete= "off"
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
                        href={`${pathName}?${mext.toString()}`}
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
