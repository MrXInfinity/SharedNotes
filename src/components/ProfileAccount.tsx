import React, { useEffect, useState } from "react";
import { modalStateTypes } from "./Navigation";
import { useDownloadURL, useUploadFile } from "react-firebase-hooks/storage";
import { ModalWrapper } from "./UIComponents";
import { auth, storage } from "../firebase";
import { getStorage, ref } from "firebase/storage";
import {
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { Stack } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";

const ProfileAccount: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<modalStateTypes>>;
}> = ({ isOpen, setIsOpen }) => {
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const storageRef = ref(storage, `${auth.currentUser!.uid}/profilePic.jpg`);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [value, loading, picError] = useDownloadURL(
    ref(storage, `${auth.currentUser!.uid}/profilePic.jpg`)
  );
  const [updateProfile, updating, autherror] = useUpdateProfile(auth);
  console.log(auth.currentUser!.metadata);

  const bio =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, a commodo consequat.";

  const upload = async () => {
    if (selectedFile) {
      const result = await uploadFile(storageRef, selectedFile, {
        contentType: "image/jpeg",
      });
      console.log(result?.metadata);
    }
  };
  useEffect(() => {
    updateProfile({ displayName: "Francine Amber Sajor" });
  }, []);

  return (
    <ModalWrapper
      isOpen={isOpen}
      title="Your Profile"
      closeModal={() => {
        setIsOpen({
          isOpen: false,
          type: "",
        });
      }}
    >
      <Stack
        direction="row"
        sx={{
          display: "flex",
          alignItems: "center",
          width: "auto",
          px: 1,
          pb: 2,
        }}
      >
        <img
          style={{
            height: "100px",
            width: "100px",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "100%",
            marginRight: "2rem",
          }}
          src={value}
        />
        <Stack sx={{}}>
          <Typography sx={{ fontSize: { xs: 16 }, fontWeight: 500 }}>
            {auth.currentUser!.displayName}
          </Typography>
          <Typography sx={{ fontSize: { xs: 14 } }}>
            {auth.currentUser!.email}
          </Typography>
        </Stack>
      </Stack>
      {true && (
        <Typography sx={{ pb: 2, fontSize: { xs: 12 } }}>{bio}</Typography>
      )}
      <Stack
        direction="row"
        sx={{ justifyContent: "flex-end" }}
      >
        <Button sx={{ fontSize: { xs: 12 } }}>Edit</Button>
        <Button sx={{ fontSize: { xs: 12 } }}> Logout</Button>
      </Stack>
    </ModalWrapper>
  );
};

export default ProfileAccount;
