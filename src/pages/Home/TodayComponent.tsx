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
    <Box sx={{ minWidth: { sm: "150px" } }}>
      <Typography
        sx={{
          fontWeight: "medium",
          fontSize: { xs: 16, sm: 18, md: 20 },
          mb: 1,
        }}
      >
        Today's {category}
      </Typography>
      {data.length > 0 ? (
        <Box sx={{ overflowX: "auto" }}>
          <Box
            style={{ width: data ? `${data.length * 130}px` : `100%` }}
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            {data.map((eachData: any) => (
              <Card
                key={eachData.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "120px",
                  maxHeight: "120px",
                }}
              >
                <CardContent
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderTop: 5,
                    justifyContent: "center",
                    px: 1,
                    pt: 1,
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
                    paddingBottom: "0.5rem",
                  }}
                >
                  <Typography
                    sx={{ fontSize: { xs: 20 }, fontWeight: "medium" }}
                  >
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
                      until {moment(parseInt(eachData.endTime)).format("HH:mm")}{" "}
                      | {moment(parseInt(eachData.endTime)).calendar()}
                    </Typography>
                  )}
                  <Typography
                    noWrap={true}
                    sx={{
                      fontSize: { xs: 14, md: 14 },
                      mt: "auto",
                      width: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal",
                      overflowWrap: "break-word",
                      textAlign: "center",
                    }}
                  >
                    {eachData.title}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      ) : (
        <Card
          sx={{
            width: "100%",
            fontSize: { xs: 12, md: 14 },
            opacity: 0.8,
            textAlign: "center",
            py: 1,
          }}
        >
          No {category} for today...
        </Card>
      )}
    </Box>
  );
}

export default TodayComponent;
