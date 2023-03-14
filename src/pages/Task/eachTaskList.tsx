import React, { useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { eachListType } from "../../types/componentTypes";
import { taskType } from "../../types/firestoreDataTypes";
import moment from "moment";

const EachTaskList: React.FC<eachListType<taskType>> = ({
  data,
  setData,
  toggleModal,
}) => {
  const theme = useTheme();
  return (
    <>
      {data.map((eachData) => (
        <Card
          sx={{
            borderTop: 5,
            display: "flex",
            flexDirection: "column",
            height: "min-content",
            maxHeight: "200px",
            width: "150px",
            alignItems: "start",
            pt: 2,
            px: 2,
          }}
          style={{
            borderColor:
              eachData.status === "forthcoming"
                ? theme.palette.primary.main
                : eachData.status === "finished"
                ? theme.palette.success.main
                : eachData.status === "missed"
                ? theme.palette.error.main
                : theme.palette.background.paper,
          }}
          key={eachData.id}
        >
          <CardContent
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              p: 0,
            }}
          >
            <Typography
              style={{
                fontSize: 14,
                opacity: 0.6,
                height: "100%",
                display: "block",
              }}
            >
              {moment(parseInt(eachData.dueDateTime)).format("M/D/YY")} |{" "}
              {moment(parseInt(eachData.dueDateTime)).calendar()}
            </Typography>

            <Typography
              sx={{
                fontSize: 22,
                fontWeight: "bold",
                textOverflow: "ellipsis",
                overflow: "hidden",
                height: "100%",
              }}
            >
              {moment(parseInt(eachData.dueDateTime)).format("h:mm a")}
            </Typography>

            <Typography sx={{ fontSize: { xs: 16 }, pt: 0.75 }}>
              {eachData.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default EachTaskList;
