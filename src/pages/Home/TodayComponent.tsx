import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import moment from "moment";

function TodayComponent<T>({
  data,
  category,
}: {
  data: T[];
  category: "Reminder" | "Tasks";
}) {
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
            width: `${data.length * 130}px`,
            display: "flex",
            gap: 2,
          }}
        >
          {data.map((eachData: any) => (
            <Card
              key={eachData.id}
              sx={{ display: "grid", width: "120px" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderTop: 5,
                  justifyContent: "center",
                  px: 1,
                  pt: 1,
                  pb: 1.5,
                }}
                style={{
                  borderBlockColor:
                    eachData.status === "finished"
                      ? theme.palette.success.main
                      : eachData.status === "missed"
                      ? theme.palette.error.main
                      : eachData.status === "forthcoming"
                      ? theme.palette.primary.main
                      : theme.palette.background.paper,
                }}
              >
                <Typography sx={{ fontSize: { xs: 20 }, fontWeight: "medium" }}>
                  {moment(
                    parseInt(eachData.startTime ?? eachData.dueDateTime)
                  ).format("HH:mm")}
                </Typography>
                {eachData.endTime && (
                  <Typography
                    sx={{
                      fontSize: { xs: 12 },
                      textAlign: "center",
                      opacity: 0.6,
                      pb: 0.5,
                    }}
                  >
                    until {moment(parseInt(eachData.endTime)).format("HH:mm")} |{" "}
                    {moment(parseInt(eachData.endTime)).calendar()}
                  </Typography>
                )}
                <Typography
                  noWrap={true}
                  sx={{
                    fontSize: { xs: 14, md: 14 },
                    mt: "auto",
                  }}
                >
                  {eachData.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default TodayComponent;
