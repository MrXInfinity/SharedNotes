import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { reminderType } from "../../types/firestoreDataTypes";
import moment from "moment";
import { eachListType } from "../../types/componentTypes";

const EachReminderList: React.FC<eachListType<reminderType>> = ({
  data,
  setData,
  toggleModal,
}) => {
  const theme = useTheme();
  moment.updateLocale("en", {
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  });

  if (data) {
    console.log(data);
    return (
      <>
        {data.map(({ id, startTime, endTime, title, favorite, status }) => (
          <Card
            sx={{
              borderTop: 5,
              display: "flex",
              flexDirection: "column",
              height: "min-content",
              maxHeight: "200px",
              width: "150px",
              alignItems: "start",
            }}
            style={{
              borderColor:
                status === "forthcoming"
                  ? theme.palette.background.paper
                  : status === "ongoing"
                  ? theme.palette.primary.main
                  : status === "finished"
                  ? theme.palette.success.main
                  : theme.palette.error.main,
            }}
          >
            <CardActionArea
              sx={{
                height: "100%",
                py: 1.7,
                px: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography
                sx={{
                  opacity: 0.6,

                  fontSize: 14,
                  fontWeight: "medium",
                }}
              >
                {moment(parseInt(startTime)).format("MMM Do YY")} |{" "}
                {moment(parseInt(startTime)).format("dddd")}
              </Typography>
              <Typography
                sx={{
                  opacity: 0.6,
                  fontSize: 14,
                  fontWeight: "medium",
                }}
              >
                {moment(parseInt(startTime)).fromNow()}
              </Typography>

              <Typography
                sx={{
                  fontSize: 24,
                  pt: 0.75,
                  fontWeight: "bold",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                {moment(parseInt(startTime)).format("h:mm a")}
                {endTime && (
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      height: "100%",
                    }}
                  >
                    {`- ${moment(parseInt(endTime)).format("h:mm a")}`}
                  </Typography>
                )}
              </Typography>
              <Typography sx={{ fontSize: { xs: 16 }, pt: 0.75 }}>
                {title}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </>
    );
  } else {
    return <></>;
  }
};

export default EachReminderList;
