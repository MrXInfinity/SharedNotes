import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Card,
  CardActionArea,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { NoDataComponent } from "../../components/UIComponents";
import useAppContext from "../../context";
import { useSerialize } from "../../hooks/useFormatContent";
import { noteType } from "../../types/firestoreDataTypes";

const NoteList: React.FC<{ category: "Private" | "Shared" }> = ({
  category,
}) => {
  const { dbData, setIsNoteEditorModalOpen, setNoteContentData, isLoading } =
    useAppContext();

  if (isLoading) {
    return (
      <Card
        sx={{
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          height: "min-content",
          maxHeight: "200px",
          alignItems: "start",
          px: 2,
          py: 1.7,
        }}
      >
        <Skeleton
          variant="text"
          sx={{ fontSize: 16, width: "60%" }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: 64, width: "100%" }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: 14, width: "50%" }}
        />
      </Card>
    );
  }

  if (dbData[category].length === 0) {
    return <NoDataComponent title={`No ${category} Notes Found...`} />;
  }

  return (
    <>
      {dbData[category].map((eachData: noteType, arr) => (
        <Card
          sx={{
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            height: "min-content",
            maxHeight: "200px",
            alignItems: "start",
          }}
          key={arr}
        >
          <CardActionArea
            sx={{
              px: 2,
              height: "100%",
              py: 1.7,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
            onClick={() => {
              setNoteContentData(eachData);
              setIsNoteEditorModalOpen(true);
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: "medium",
              }}
            >
              {useSerialize(eachData.title)}
            </Typography>
            <Typography
              sx={{
                pt: 0.75,
                fontSize: 14,
                opacity: 0.6,
                textOverflow: "ellipsis",
                overflow: "hidden",
                height: "100%",
                maxHeight: "100px",
                whiteSpace: "pre-wrap",
              }}
            >
              {useSerialize(eachData.content)}
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                pt: 1,
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: { xs: 10 } }}>
                {eachData.dateCreated?.toDate().toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
              {eachData.favorite && (
                <FavoriteIcon
                  sx={{}}
                  color="primary"
                />
              )}
            </Stack>
          </CardActionArea>
        </Card>
      ))}
    </>
  );
};

export default NoteList;
