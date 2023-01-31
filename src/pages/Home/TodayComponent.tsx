import {
  Box,
  Card,
  CardActionArea,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

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

const TodayComponent: React.FC<{ category: string }> = ({ category }) => {
  const theme = useTheme();
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
          {mockupData.map(
            ({ dateOfStart, dateOfEnd, title, status }: MockUpDataType) => (
              <Card>
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
                      {dateOfStart}
                    </Typography>
                    {dateOfEnd && (
                      <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                        {dateOfEnd}
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
                    {title}
                  </Typography>
                </CardActionArea>
              </Card>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TodayComponent;
