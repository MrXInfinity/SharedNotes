import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  CardActionArea,
  Stack,
} from "@mui/material";
import moment from "moment";
import React from "react";
import MenuComponent from "../../components/MenuComponent";
import useFirestoreContext from "../../firestoreContext";
import { useSerialize } from "../../hooks/useFormatContent";
import theme from "../../theme";
import { noteType } from "../../types/firestoreDataTypes";

const PublicList = () => {
  const { publicData: data } = useFirestoreContext();
  if (data) {
    console.log(data);
    return (
      <>
        {data.map((eachData: noteType, arr) => (
          <Card
            sx={{
              width: "100%",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              height: "min-content",
              maxHeight: "200px",

              alignItems: "start",
            }}
            key={arr}
          >
            <CardActionArea
              sx={{
                height: "100%",
                py: 1.7,
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography
                sx={{
                  px: 2,
                  fontSize: 16,
                  fontWeight: "medium",
                }}
              >
                {useSerialize(eachData.title)}
              </Typography>
              <CardContent
                sx={{
                  pt: 0.75,
                  display: "flex",
                  maxHeight: "100px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    opacity: 0.6,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    height: "100%",
                  }}
                >
                  {useSerialize(eachData.content)}
                </Typography>
              </CardContent>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  px: 2,
                  pt: 1,
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: { xs: 10 } }}>
                  {eachData.dateCreated
                    ?.toDate()
                    .toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </Typography>
              </Stack>
            </CardActionArea>
          </Card>
        ))}
      </>
    );
  } else {
    return <></>;
  }
};

export default PublicList;
