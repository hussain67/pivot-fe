import React, { useEffect } from "react";

const Page = ({ title, children }) => {
  useEffect(() => {
    document.title = `${title} | Pivot`;
    window.scrollTo(0, 0);
  }, [title]);
  return <div className="page">{children}</div>;
};

export default Page;
