import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const GoToTopButton = ({className}:any) => {
  const [isVisible, setIsVisible] = useState(false);



  const scrollToTop = () => {
    if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <Button
        className="flex justify-between gap-2"
          onClick={scrollToTop}
        >
          <ArrowUp size={16} className="" /> TOP
        </Button>
      )}
    </>
  );
};

export default GoToTopButton;