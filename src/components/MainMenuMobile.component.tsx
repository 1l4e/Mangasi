"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  LayoutDashboard,
  Settings,
  Shapes,
  Workflow,
  X,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { updateUserSafe } from "@/app/dashboard/profile/action";
import { ThemeSwitcher } from "@/components/themeSwitcher";
import { usePathname  } from "next/navigation";
import ButtonAction from "./serverActionSubmitButton";

const menus = [
  { id: 1, title: "Trang chủ", slug: "/", icon: Home },
  /*   { id: 2, title: "Dashboard", slug: "/dashboard", icon: LayoutDashboard }, */
  { id: 3, title: "Collections", slug: "/dashboard/collections", icon: Shapes },
  { id: 5, title: "Sources", slug: "/dashboard/sources", icon: Workflow },
  {
    id: 4,
    title: "Setting",
    slug: "/dashboard/profile",
    icon: Settings,
    child: {},
  },
];

export default function MainMenuMobile({ safe }: { safe: boolean }) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(NaN);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const prevScrollPos = useRef(0);
 const dynamicRoute = usePathname ()

  useEffect(()=> {
    setIsOpen(NaN);
    setIsHeaderVisible(true)
  },[dynamicRoute])
  const toggleSubmenu = (id: number) => {
    if (id === isOpen) {
      setIsOpen(NaN);
      return;
    }
    setIsOpen(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsHeaderVisible(prevScrollPos.current - currentScrollPos >= 0);
      prevScrollPos.current = currentScrollPos;
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    setIsOpen(NaN);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`${
        isHeaderVisible ? "visible" : "hidden"
      } bg-white dark:bg-black fixed bottom-0 left-0 h-16 w-full  border-t z-[999]`}
    >
      <div
        className={`${
          !isOpen && "hidden"
        } overlay fixed top-0 right-0 w-full h-full `}
        onClick={() => setIsOpen(NaN)}
      ></div>
      <ul className="flex justify-around ">
        {menus.map((item: any, index: number) => {
          const Icon = item.icon;
          return (
            <li key={index} className="relative flex-1 flex justify-center">
              {item.child ? (
                <button className="" onClick={(e) => toggleSubmenu(index)}>
                  <span className="h-16 flex relative text-sm justify-center items-center flex-col w-full text-center font-light">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ rotate: isOpen ? 360 : 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                    >
                      {!isNaN(isOpen) ? <X size={24} /> : <Icon size={24} />}
                    </motion.div>
                    <span>{!isNaN(isOpen) ? "Close" : item.title}</span>
                  </span>
                </button>
              ) : (
                <Link href={`${item.slug}`} title={item.title}>
                  <span className="h-16 flex relative text-sm justify-center items-center flex-col w-full text-center font-light">
                    <Icon size={24} />
                    <span>{item.title}</span>
                  </span>
                </Link>
              )}

              {isOpen === index && (
                <AnimatePresence>
                  {item.child && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="fixed bottom-16 left-0 w-full h-96 bg-white dark:bg-black  z-10 pt-2 border-t"
                    >
                      {status === "authenticated" ? (
                        <div className="h-34 flex justify-center items-center flex-col gap-4">
                          <Avatar>
                            <AvatarImage src="/images/icon.png" />
                            <AvatarFallback>Avatar</AvatarFallback>
                          </Avatar>
                          <Button onClick={() => signOut()}>Log out</Button>

                          {/* <ul className="grid grid-cols-4  items-center justify-center rounded-md p-1 text-muted-foreground gap-1 w-full">
                            {sources.map((subItem, subIndex) => {
                                const Icon = subItem.icon
                                return(
                            <motion.li   
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.5 },
                              }}
                               whileTap={{scale:0.97}} onClick={()=>setIsOpen(NaN)} key={subIndex} className='  px-2 py-2 min-w-[5rem]'>
                                <Link href={`/${subItem.slug}`} className="focus:outline-none text-sm flex relative justify-center items-center flex-col text-center font-light">
                                    <Icon size={24} />
                                <span>{subItem.title}</span>
                                </Link>
                            </motion.li>
                        )})}
                    </ul> */}
                        </div>
                      ) : (
                        <div className="h-24 flex justify-center items-center">
                          <Button onClick={() => signIn()}>Log in</Button>
                          <Button asChild>
                            <Link href="/register">Register</Link>
                          </Button>
                        </div>
                      )}

                      <div className="h-34 flex justify-center items-center flex-col">
                        <h2 className="text-2xl text-center py-2">
                          {item.title}
                        </h2>
                        <div className="flex items-center space-x-2">
                          <form
                            className="flex flex-col gap-4"
                            action={updateUserSafe}
                          >
                            <div className="flex justify-center items-center">
                              <input
                                type="hidden"
                                value={session?.user.email}
                              ></input>
                              <Checkbox
                                name="safe"
                                id="safe"
                                defaultChecked={safe}
                              />
                              <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Safe Mode
                              </label>
                            </div>
                            <ButtonAction title="Save"/>
                          </form>
                        </div>
                      </div>
                      <div className="py-4">
                      <ThemeSwitcher />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
