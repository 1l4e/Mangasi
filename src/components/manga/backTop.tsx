import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

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
        <button
          onClick={scrollToTop}
          className={`bg-green-500 px-4 py-2 rounded-full`}
        >
          <ArrowUp className="inline-block w-6 h-6" /> TOP
        </button>
      )}
    </>
  );
};

export default GoToTopButton;