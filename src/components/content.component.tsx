import React, { ReactNode } from "react";

const Content = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container overflow-hidden rounded-[0.5rem] border bg-background shadow">
      <div className="flex-1 space-y-4 lg:p-8 pt-6">{children}</div>
    </div>
  );
};

export default Content;
