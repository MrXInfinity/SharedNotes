import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";
import type { dbDataType } from "../hooks/useFirestoreDb";

const EachNoteList: React.FC<{ data: dbDataType[] }> = ({ data }) => {
  return (
    <>
      {data.map(({ title, content, dateCreated, favorite }: dbDataType) => (
        <Card
          sx={{
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            height: "min-content",
            maxHeight: "200px",
            width: "150px",
            alignItems: "start",
          }}
        >
          <CardActionArea sx={{ height: "100%", py: 1.7 }}>
            <Typography
              sx={{
                px: 2,
                fontSize: 16,
                fontWeight: "medium",
              }}
            >
              {title}
            </Typography>
            <CardContent sx={{ pt: 0.75, display: "flex", height: "50%" }}>
              <Typography
                sx={{
                  fontSize: 14,
                  opacity: 0.6,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {content}
              </Typography>
            </CardContent>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mx: 2 }}
            >
              <Typography sx={{ fontSize: { xs: 10 } }}>
                {dateCreated.toDate().toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
              <IconButton sx={{ p: 0 }}>
                {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Stack>
          </CardActionArea>
        </Card>
      ))}
    </>
  );
};

export default EachNoteList;
