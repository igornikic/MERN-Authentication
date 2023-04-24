import { useEffect } from "react";

const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = title + " - Authentication";
  }, [title]);

  return null;
};

export default PageTitle;
