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
          <CardActionArea
            sx={{
              height: "100%",
              py: 1.7,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{
                px: 2,
                fontSize: 16,
                fontWeight: "medium",
              }}
            >
              {title}
            </Typography>
            <CardContent
              sx={{
                pt: 0.75,
                display: "flex",
                maxHeight: "100px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  opacity: 0.6,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                {content}
              </Typography>
            </CardContent>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mx: 2, pt: 1 }}
            >
              <Typography sx={{ fontSize: { xs: 10 } }}>
                {dateCreated?.toDate().toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
              {favorite && (
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

export default EachNoteList;
