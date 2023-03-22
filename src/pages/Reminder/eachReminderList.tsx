import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
import { reminderType } from "../../types/firestoreDataTypes";
import moment from "moment";
import { eachListType } from "../../types/componentTypes";
import MenuComponent from "../../components/MenuComponent";

const EachReminderList: React.FC<eachListType<reminderType>> = ({
  data,
  setData,
  toggleModal,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  moment.updateLocale("en", {
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    calendar: {
      lastDay: "[Yesterday]",
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      lastWeek: "[last] dddd",
      nextWeek: "dddd",
      sameElse: "L",
    },
  });

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
              pt: 2,
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
                  : theme.palette.error.main,
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
                    opacity: 0.6,
                    fontSize: 14,
                    fontWeight: "medium",
                  }}
                >
                  {moment(parseInt(eachData.startTime)).calendar()} |{" "}
                  {moment(parseInt(eachData.startTime)).format("dddd")}
                </Typography>
              }
            />
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
                  fontSize: 24,
                  fontWeight: "bold",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                {moment(parseInt(eachData.startTime)).format("h:mm a")}
                {eachData.endTime && (
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      height: "100%",
                      display: "block",
                    }}
                  >
                    {`- ${moment(parseInt(eachData.endTime)).format("h:mm a")}`}
                  </span>
                )}
              </Typography>
              <Typography sx={{ fontSize: { xs: 16 }, pt: 0.75 }}>
                {eachData.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </>
    );
  } else {
    return <></>;
  }
};

export default EachReminderList;

// moment(parseInt(startTime)).fromNow();
