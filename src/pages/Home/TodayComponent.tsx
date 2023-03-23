import {
  Box,
  Card,
  CardActionArea,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import React from "react";
import useFirestoreContext from "../../firestoreContext";
import { reminderType, taskType } from "../../types/firestoreDataTypes";

const mockupData = [
  {
    dateOfStart: "09:20",
    dateOfEnd: "11:30",
    title: "House Chores & Web Activity",
    description: "this is desc1",
    status: "completed",
  },
  {
    dateOfStart: "15:30",
    dateOfEnd: null,
    title: "Cooking Lunch for the Family",
    description: "this is desc2",
    status: "missed",
  },
  {
    dateOfStart: "17:20",
    dateOfEnd: null,
    title: "BEBE Time",
    description: "this is desc3",
    status: "current",
  },
  {
    dateOfStart: "19:20",
    dateOfEnd: null,
    title: "Relaxing Time",
    description: "this is desc4",
    status: "forthcoming",
  },
];

type MockUpDataType = {
  dateOfStart: string;
  dateOfEnd: string | null;
  title: string;
  description: string;
  status: string;
};

const TodayComponent: React.FC<{ category: "Reminder" | "Tasks" }> = ({
  category,
}) => {
  const theme = useTheme();
  const { dbData } = useFirestoreContext();

  return (
    <Box>
      <Typography
        sx={{ fontWeight: "medium", fontSize: { xs: 18, md: 20 }, mb: 1 }}
      >
        Today's {category}
      </Typography>
      <Box sx={{ overflowX: "auto" }}>
        <Box
          sx={{
            width: `${mockupData.length * 110}px`,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {category === "Reminder"
            ? dbData[category].map((eachData: reminderType) => (
                <Card key={eachData.id}>
                  <CardActionArea
                    sx={{
                      width: "100px",
                      height: "100px",
                      display: "inline-flex",
                      flexDirection: "column",
                      alignItems: "start",
                      borderTop: 5,
                      px: 1,
                      pb: 1,
                    }}
                    style={{
                      borderBlockColor:
                        status === "completed"
                          ? theme.palette.success.main
                          : status === "missed"
                          ? theme.palette.error.main
                          : status === "current"
                          ? theme.palette.primary.main
                          : theme.palette.background.paper,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        mx: "auto",
                      }}
                    >
                      <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
                        {moment(parseInt(eachData.startTime)).format("HH:mm")} |{" "}
                        {moment(parseInt(eachData.startTime)).calendar()}
                      </Typography>
                      {eachData.endTime && (
                        <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                          {moment(parseInt(eachData.endTime)).format("HH:mm")} |{" "}
                          {moment(parseInt(eachData.endTime)).calendar()}
                        </Typography>
                      )}
                    </Box>
                    <Typography
                      noWrap={true}
                      sx={{
                        fontSize: { xs: 12, md: 14 },
                        mt: "auto",
                        textAlign: "center",
                      }}
                    >
                      {eachData.title}
                    </Typography>
                  </CardActionArea>
                </Card>
              ))
            : dbData[category].map((eachData: taskType) => (
                <Card key={eachData.id}>
                  <CardActionArea
                    sx={{
                      width: "100px",
                      height: "100px",
                      display: "inline-flex",
                      flexDirection: "column",
                      alignItems: "start",
                      borderTop: 5,
                      px: 1,
                      pb: 1,
                    }}
                    style={{
                      borderBlockColor:
                        status === "completed"
                          ? theme.palette.success.main
                          : status === "missed"
                          ? theme.palette.error.main
                          : status === "current"
                          ? theme.palette.primary.main
                          : theme.palette.background.paper,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        mx: "auto",
                      }}
                    >
                      <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
                        {moment(parseInt(eachData.dueDateTime)).format("HH:mm")}{" "}
                        | {moment(parseInt(eachData.dueDateTime)).calendar()}
                      </Typography>
                    </Box>
                    <Typography
                      noWrap={true}
                      sx={{
                        fontSize: { xs: 12, md: 14 },
                        mt: "auto",
                        textAlign: "center",
                      }}
                    >
                      {eachData.title}
                    </Typography>
                  </CardActionArea>
                </Card>
              ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TodayComponent;
