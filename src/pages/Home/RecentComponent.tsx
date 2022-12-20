import { useState } from "react";
import { Box, Card, CardActionArea, Typography } from "@mui/material";

const mockupData = [
  {
    id: "adsdfsdfsdf",
    createdAt: new Date(),
    title: "My Favorite Bands",
    description: "lorem",
    updatedAt: new Date(Date.now()),
  },
  {
    id: "asdjaksdhakjdkasdhkjd",
    createdAt: new Date(),
    title: "Accountancy Reviewer",
    description: "lorem",
    updatedAt: new Date(Date.now()),
  },
  {
    id: "asdjargsgfdgf",
    createdAt: new Date(),
    title: "List of Manhwa",
    description: "lorem",
    updatedAt: new Date(Date.now()),
  },
];

type RecentComponentProps = {
  header: string;
  category: string;
};

type APIDataTypes = {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  updatedAt: Date;
};
const RecentComponent = ({ header, category }: RecentComponentProps) => {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{ fontWeight: "medium", fontSize: { xs: 18, md: 20 }, mb: 1 }}
      >
        Recently {header}
      </Typography>
      <Card sx={{ p: { xs: 1.5 }, borderRadius: 5 }}>
        {mockupData.map(({ id, title }: APIDataTypes) => (
          <CardActionArea
            sx={{ p: 1.5 }}
            key={id}
            onClick={() => setIsNoteModalOpen(true)}
          >
            <Typography>{title}</Typography>
          </CardActionArea>
        ))}
      </Card>
    </Box>
  );
};

export default RecentComponent;
