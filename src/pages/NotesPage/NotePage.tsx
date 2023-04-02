import React from "react";
import { PageLayout } from "../../components/UIComponents";
import NoteList from "./NoteList";

const NotePage: React.FC<{ category: "Private" | "Shared" }> = ({
  category,
}) => {
  return (
    <PageLayout
      title={`${category} Notes`}
      pageList={<NoteList category={category} />}
    />
  );
};

export default NotePage;
