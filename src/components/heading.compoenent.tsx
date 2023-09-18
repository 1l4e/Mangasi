import React, { ReactNode } from "react";

const Heading = ({ children }: { children: ReactNode }) => {
  return (
    <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
      <div className="flex flex-col  space-y-4 lg:p-8 pt-6 justify-center items-center text-center">
        {children}
      </div>
    </div>
  );
};

export default Heading;
