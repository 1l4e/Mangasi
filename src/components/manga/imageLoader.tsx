"use client"
import { useCallback, useEffect, useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  errorSrc: string;
}

const ImageLoader = ({ src, errorSrc, ...props }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const onLoad = useCallback(() => {
    setIsLoading(false);
  }, [src]);

  const onError = useCallback(() => {
    if (retryCount < 3) {
      // Retry loading the image
      console.log("Retrying ", src)
      setRetryCount((prevRetryCount) => prevRetryCount + 1);
      setIsLoading(true);
      const img = new Image();
      img.src = src as string;
      img.addEventListener("load", onLoad);
    } else {
      // Show the onError image after 3 retries
      setIsLoading(false);
    }
  }, [src, retryCount, onLoad]);

  useEffect(() => {
    const img = new Image();
    img.src = src as string;
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);

    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [src, onLoad, onError]);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center w-full h-[50vh]">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading ...
        </div>
      )}
      <img
        {...props}
        alt="Image"
        src={src}
        onError={(e) => {
          e.currentTarget.src = errorSrc;
          setIsLoading(false);
        }}
      />
    </>
  );
};

export default ImageLoader;
