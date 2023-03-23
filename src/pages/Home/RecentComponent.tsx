import { useState } from "react";
import { Box, Card, CardActionArea, Typography } from "@mui/material";
import useFirestoreContext from "../../firestoreContext";
import { noteType } from "../../types/firestoreDataTypes";
import { useSerialize } from "../../hooks/useFormatContent";

const RecentComponent: React.FC<{ category: "Private" | "Shared" }> = ({
  category,
}) => {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const { dbData } = useFirestoreContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography
        sx={{ fontWeight: "medium", fontSize: { xs: 18, md: 20 }, mb: 1 }}
      >
        Recently {category}
      </Typography>
      <Card sx={{ p: { xs: 1.5 }, borderRadius: 5 }}>
        {dbData[category].map((eachData: noteType, index) => {
          if (index < 3)
            return (
              <CardActionArea
                sx={{ p: 1.5 }}
                key={eachData.id}
                onClick={() => setIsNoteModalOpen(true)}
              >
                <Typography>{useSerialize(eachData.title)}</Typography>
              </CardActionArea>
            );
        })}
      </Card>
    </Box>
  );
};

export default RecentComponent;
