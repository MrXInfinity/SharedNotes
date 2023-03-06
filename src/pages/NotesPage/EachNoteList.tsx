import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSerialize } from "../../hooks/useFormatContent";
import { noteType } from "../../types/firestoreDataTypes";

const EachNoteList: React.FC<{
  setNoteData: React.Dispatch<React.SetStateAction<noteType>>;
  data: noteType[];
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setNoteData, data, toggleModal }) => {
  if (data) {
    return (
      <>
        {data.map((eachData: noteType, arr) => (
          <Card
            sx={{
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              height: "min-content",
              maxHeight: "200px",
              width: "150px",
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
              onClick={() => {
                console.log(eachData);
                setNoteData(eachData);
                toggleModal(true);
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
                sx={{ mx: 2, pt: 1 }}
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
                {eachData.favorite && (
                  <FavoriteIcon
                    sx={{}}
                    color="primary"
                  />
                )}
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

export default EachNoteList;
