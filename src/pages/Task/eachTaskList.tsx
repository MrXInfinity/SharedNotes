import React, { useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
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
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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
                : "transparent",
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
              sx={{
                fontSize: 18,
                fontWeight: "bold",
                height: "100%",
              }}
            >
              {eachData.title}
            </Typography>

            <Typography
              sx={{
                fontSize: 14,
                height: "100%",
                pt: 0.6,
              }}
            >
              {moment(parseInt(eachData.dueDateTime)).format("HH:mm")} |{" "}
              {moment(parseInt(eachData.dueDateTime)).calendar()}
            </Typography>
          </CardContent>
          <CardActions sx={{ p: 0 }}>
            <Stack direction="row">
              <IconButton
                color="primary"
                aria-label=""
              >
                <CheckIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton
                color="primary"
                aria-label=""
              >
                <FavoriteBorderIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton
                color="primary"
                aria-label=""
              >
                <EditIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton
                color="primary"
                aria-label=""
              >
                <DeleteIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Stack>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default EachTaskList;
