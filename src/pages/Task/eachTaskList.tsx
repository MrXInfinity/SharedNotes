import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { eachListType, listType } from "../../types/componentTypes";
import { taskType } from "../../types/firestoreDataTypes";
import moment from "moment";
import useFirestoreDb from "../../hooks/useFirestoreDb";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useFirestoreContext from "../../firestoreContext";

const EachTaskList: React.FC<listType<taskType>> = ({
  setData,
  toggleModal,
}) => {
  const theme = useTheme();
  const { update, remove } = useFirestoreDb();
  const {
    dbData: { Tasks: data },
  } = useFirestoreContext();
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
            alignItems: "center",
            pt: 2,
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
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              p: 0,
              px: 2,
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
          <CardActions sx={{ px: 0, py: 0.5 }}>
            <Stack direction="row">
              <IconButton
                color="primary"
                aria-label=""
                sx={{ fontSize: 20 }}
                onClick={() => {
                  update({
                    id: eachData.id,
                    type: "Task",
                    status:
                      eachData.status === "finished"
                        ? moment().isBefore(parseInt(eachData.dueDateTime))
                          ? "forthcoming"
                          : "missed"
                        : "finished",
                  });
                }}
              >
                {eachData.status === "finished" ? <CloseIcon /> : <CheckIcon />}
              </IconButton>
              <IconButton
                color="primary"
                aria-label=""
                onClick={() => {
                  update({
                    id: eachData.id,
                    type: "Task",
                    favorite: !eachData.favorite,
                  });
                }}
              >
                {eachData.favorite ? (
                  <FavoriteIcon sx={{ fontSize: 20 }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                )}
              </IconButton>
              <IconButton
                color="primary"
                aria-label=""
                onClick={() => {
                  setData(eachData);
                  toggleModal(true);
                }}
              >
                <EditIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton
                color="primary"
                aria-label=""
                onClick={() => {
                  remove("Task", eachData.id);
                }}
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
