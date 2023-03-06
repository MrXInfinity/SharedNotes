import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

const EachReminderList = () => {
  return (
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
          title
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
            content
          </Typography>
        </CardContent>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mx: 2, pt: 1 }}
        >
          <Typography sx={{ fontSize: { xs: 10 } }}>date</Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default EachReminderList;
