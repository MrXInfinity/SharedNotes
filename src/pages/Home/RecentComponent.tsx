import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { CardActions, CardContent } from "@mui/material";

const mockupData = [
  {
    id: "asdjaksdhakjdkasdhkjd",
    createdAt: new Date(),
    title: "Title1",
    description: "lorem",
    updatedAt: new Date(Date.now()),
  },
  {
    id: "asdjaksdhakjdkasdhkjd",
    createdAt: new Date(),
    title: "Title1",
    description: "lorem",
    updatedAt: new Date(Date.now()),
  },
  {
    id: "asdjaksdhakjdkasdhkjd",
    createdAt: new Date(),
    title: "Title1",
    description: "lorem",
    updatedAt: new Date(Date.now()),
  },
];

type RecentComponentProps = {
  title: string;
  category: string;
};

type APIDataTypes = {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  updatedAt: Date;
};
const RecentComponent = ({ title, category }: RecentComponentProps) => {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  return (
    <>
      <CardContent>
        {mockupData.map(({ id, title }: APIDataTypes) => (
          <CardActions
            key={id}
            onClick={() => setIsNoteModalOpen(true)}
          >
            {title}
          </CardActions>
        ))}
      </CardContent>
    </>
  );
};

export default RecentComponent;
