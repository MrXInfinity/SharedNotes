import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { MenuComponent, NoDataComponent } from "../../components/UIComponents";
import useAppContext from "../../context";
import useFirestoreDb from "../../hooks/useFirestoreDb";
import { reminderType } from "../../types/firestoreDataTypes";

const ReminderList: React.FC<{
  setData: React.Dispatch<React.SetStateAction<reminderType>>;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setData, toggleModal }) => {
  const {
    dbData: { Reminder: data },
    isLoading,
  } = useAppContext();
  const theme = useTheme();
  const { update, remove } = useFirestoreDb();

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
        <Skeleton
          variant="text"
          sx={{ fontSize: 14, width: "90%" }}
        />
      </Card>
    );
  }

  if (data.length === 0) {
    return <NoDataComponent title="No Reminders Found..." />;
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
            width: "auto",
            alignItems: "start",
            pt: 2.5,
            px: 2,
          }}
          style={{
            borderColor:
              eachData.status === "forthcoming"
                ? theme.palette.background.paper
                : eachData.status === "ongoing"
                ? theme.palette.primary.main
                : eachData.status === "finished"
                ? theme.palette.success.main
                : "transparent",
          }}
          key={eachData.id}
        >
          <CardHeader
            sx={{ p: 0, width: "100%" }}
            action={
              <MenuComponent
                data={[
                  {
                    title: "Edit",
                    icon: <EditIcon />,
                    click: () => {
                      toggleModal(true);
                      setData(eachData);
                    },
                  },
                  {
                    title: !eachData.favorite ? "Favorite" : "Unfavorite",
                    icon: !eachData.favorite ? (
                      <FavoriteBorderIcon />
                    ) : (
                      <FavoriteIcon />
                    ),
                    click: () => {
                      update({
                        id: eachData.id,
                        type: "Reminder",
                        favorite: !eachData.favorite,
                      });
                    },
                  },
                  {
                    title: "Delete",
                    icon: <DeleteIcon />,
                    click: () => {
                      remove("Reminder", eachData.id);
                    },
                  },
                ]}
              />
            }
            title={
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  overflowWrap: "anywhere",
                }}
              >
                {eachData.title}
              </Typography>
            }
          />
          <CardContent
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              py: 1,
              px: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                height: "100%",
              }}
            >
              {moment(parseInt(eachData.startTime)).format("HH:mm")} |{" "}
              {moment(parseInt(eachData.startTime)).calendar()}
            </Typography>
            {eachData.endTime && (
              <Typography
                sx={{
                  fontSize: 14,
                  height: "100%",
                  display: "block",
                }}
              >
                {moment(parseInt(eachData.endTime)).format("HH:mm")} |{" "}
                {moment(parseInt(eachData.endTime)).calendar()}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ReminderList;

// {
//                       title: "Edit",
//                       icon: <EditIcon />,
//                       click: () => {
//                         toggleModal(true);
//                         setData(eachData);
//                       },
//                     },
//                     {
//                       title: !eachData.favorite ? "Favorite" : "Unfavorite",
//                       icon: !eachData.favorite ? (
//                         <FavoriteBorderIcon />
//                       ) : (
//                         <FavoriteIcon />
//                       ),
//                       click: () => {
//                         update({
//                           id: eachData.id,
//                           type: "Reminder",
//                           favorite: !eachData.favorite,
//                         });
//                       }
//                     },
//                     {
//                       title: "Delete",
//                       icon: <DeleteIcon />,
//                       click: () => {
//                         remove("Reminder", eachData.id);
//                       },
//                     }
