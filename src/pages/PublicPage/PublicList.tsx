import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { ref } from "firebase/storage";
import React from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { storage } from "../../firebase";
import useFirestoreContext from "../../firestoreContext";
import {
  useFormattedSerialize,
  useSerialize,
} from "../../hooks/useFormatContent";
import { publicNoteType } from "../../types/firestoreDataTypes";
import avatarIcon from "../../assets/avatarIcon.svg";

const EachPublicItem: React.FC<{
  data: publicNoteType;
  index: number;
  setPreviewData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      content: string;
    }>
  >;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  data: { title, content, author, profilePicId, dateCreated },
  index,
  setPreviewData,
  toggleModal,
}) => {
  const [picValue, isPicLoading, picError] = useDownloadURL(
    ref(storage, profilePicId)
  );
  return (
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
      key={index}
    >
      <CardActionArea
        sx={{
          height: "100%",
          py: 1.7,
          display: "flex",
          flexDirection: index % 2 ? "row" : "row-reverse",
          justifyContent: "space-between",
          alignItems: "start",
          gap: { xs: 1.5, md: 2 },

          p: 2,
        }}
        onClick={() => {
          setPreviewData({
            title: useSerialize(title),
            content: content ? useSerialize(content) : useSerialize(content),
          });
          toggleModal(true);
        }}
      >
        <Stack
          direction="column"
          sx={{ maxWidth: { xs: "60%", lg: "50%" }, flexGrow: 1 }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: "medium",
            }}
          >
            {useSerialize(title)}
          </Typography>

          <Typography
            sx={{
              pt: 1,
              fontSize: 14,
              opacity: 0.6,
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxHeight: "100px",
              height: "100%",
            }}
          >
            {useSerialize(content) === ""
              ? "No Content"
              : useSerialize(content)}
          </Typography>
        </Stack>

        <Stack
          direction={"column"}
          sx={{ maxWidth: { xs: "100px" } }}
        >
          <img
            style={{
              height: "100px",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
            src={picError || isPicLoading ? avatarIcon : picValue}
          />
          <Stack
            direction="column"
            spacing={2}
            sx={{
              mt: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 14 },
                fontWeight: 500,
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {author}
            </Typography>
            <Typography
              style={{
                marginTop: 0,
              }}
              sx={{ fontSize: { xs: 12 } }}
            >
              {dateCreated?.toDate().toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default EachPublicItem;
