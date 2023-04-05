import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { NoDataComponent } from "../../components/UIComponents";
import useAppContext from "../../context";
import useFirestoreDb from "../../hooks/useFirestoreDb";
import { taskType } from "../../types/firestoreDataTypes";

const TaskList: React.FC<{
  setData: React.Dispatch<React.SetStateAction<taskType>>;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setData, toggleModal }) => {
  const theme = useTheme();
  const { update, remove } = useFirestoreDb();
  const {
    dbData: { Tasks: data },
    isLoading,
  } = useAppContext();

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
          sx={{ fontSize: 14, width: "90%" }}
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 2,
            width: "100%",
          }}
        >
          <Skeleton
            variant="text"
            sx={{ fontSize: 16 }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: 16 }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: 16 }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: 16 }}
          />
        </Box>
      </Card>
    );
  }

  if (data.length === 0) {
    return <NoDataComponent title="No Tasks Found..." />;
  }

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

export default TaskList;
