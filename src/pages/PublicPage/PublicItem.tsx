import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { ref } from "firebase/storage";
import React from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import avatarIcon from "../../assets/avatarIcon.svg";
import { storage } from "../../firebase";
import {
  useFormattedSerialize,
  useSerialize,
} from "../../hooks/useFormatContent";
import { publicNoteType } from "../../types/firestoreDataTypes";

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
        height: "min-content",
        maxHeight: "200px",
      }}
      key={index}
    >
      <CardActionArea
        sx={{
          height: "100%",
          py: 1.7,
          display: "flex",
          flexDirection: index % 2 ? "row-reverse" : "row",
          justifyContent: "space-between",
          alignItems: "start",
          gap: { xs: 1.5, md: 2 },
          p: 2,
        }}
        onClick={() => {
          setPreviewData({
            title: useSerialize(title),
            content: content
              ? useFormattedSerialize({ children: content })
              : useSerialize(content),
          });
          toggleModal(true);
        }}
      >
        <Stack
          direction={"column"}
          sx={{ width: { xs: "80px" }, flexShrink: 0 }}
        >
          <img
            style={{
              height: "80px",
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
                fontSize: { xs: 12 },
                fontWeight: 500,
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {author ?? "No author name"}
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
        <Stack
          direction="column"
          sx={{ flexGrow: 1 }}
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
            {content ? useSerialize(content) : "No Content"}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default EachPublicItem;
