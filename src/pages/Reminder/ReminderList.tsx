import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import React from "react";
import MenuComponent from "../../components/MenuComponent";
import useFirestoreContext from "../../firestoreContext";
import { listType } from "../../types/componentTypes";
import { reminderType } from "../../types/firestoreDataTypes";

const ReminderList: React.FC<listType<reminderType>> = ({
  setData,
  toggleModal,
}) => {
  const {
    dbData: { Reminder: data },
  } = useFirestoreContext();
  const theme = useTheme();

  if (data) {
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
                  eachData={eachData}
                  setData={setData}
                  toggleModal={toggleModal}
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
  } else {
    return <></>;
  }
};

export default ReminderList;
