import { useState } from "react";
import { Box, Card, CardActionArea, Typography } from "@mui/material";
import useAppContext from "../../context";
import { noteType } from "../../types/firestoreDataTypes";
import { useSerialize } from "../../hooks/useFormatContent";

const RecentComponent: React.FC<{ category: "Private" | "Shared" }> = ({
  category,
}) => {
  const { dbData, setIsNoteEditorModalOpen, setNoteContentData } =
    useAppContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography
        sx={{
          fontWeight: "medium",
          fontSize: { xs: 16, sm: 18, md: 20 },
          mb: 1,
        }}
      >
        Recently {category}
      </Typography>
      {Object.keys(dbData[category]).length > 0 ? (
        <Card
          sx={{
            p: { xs: 1.5 },
            borderRadius: 5,
          }}
        >
          {dbData[category].map((eachData: noteType, index) => {
            if (index < 3)
              return (
                <CardActionArea
                  sx={{
                    p: 1.5,
                    display: "block",
                    justifyContent: "flex-start",
                  }}
                  key={eachData.id}
                  onClick={() => {
                    console.log("clicked");
                    setIsNoteEditorModalOpen(true);
                    setNoteContentData(eachData);
                  }}
                >
                  <Typography
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {useSerialize(eachData.title)}
                  </Typography>
                </CardActionArea>
              );
          })}
        </Card>
      ) : (
        <Card
          sx={{
            fontSize: { xs: 12, md: 14 },
            opacity: 0.8,
            textAlign: "center",
            py: 1,
          }}
        >
          No Content...
        </Card>
      )}
    </Box>
  );
};

export default RecentComponent;
