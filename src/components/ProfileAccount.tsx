import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import avatarIcon from "../assets/avatarIcon.svg";
import useFirestoreContext from "../firestoreContext";
import useAuth from "../hooks/useAuth";
import EditAccount from "./EditAccount";
import { modalStateTypes } from "./Navigation";
import { ModalWrapper } from "./UIComponents";

const ProfileAccount: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<modalStateTypes>>;
}> = ({ isOpen, setIsOpen }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    userData: { firstname, lastname, email, bio },
    fetchProfilePics: { picValue, isPicLoading, picError },
  } = useFirestoreContext();

  const { logout } = useAuth();

  return (
    <>
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
            src={picError || isPicLoading ? avatarIcon : picValue}
          />
          <Stack sx={{}}>
            <Typography sx={{ fontSize: { xs: 16 }, fontWeight: 500 }}>
              {firstname} {lastname}
            </Typography>
            <Typography sx={{ fontSize: { xs: 14 } }}>{email}</Typography>
            {bio ? (
              <Typography sx={{ fontSize: { xs: 14 }, fontStyle: "italic" }}>
                "{bio}"
              </Typography>
            ) : (
              <></>
            )}
          </Stack>
        </Stack>
        <Stack
          direction="row"
          sx={{ justifyContent: "flex-end" }}
        >
          <Button
            onClick={() => setIsEditModalOpen(true)}
            sx={{ fontSize: { xs: 12 } }}
          >
            Edit
          </Button>
          <Button
            onClick={() => logout()}
            sx={{ fontSize: { xs: 12 } }}
          >
            {" "}
            Logout
          </Button>
        </Stack>
      </ModalWrapper>
      <EditAccount
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      />
    </>
  );
};

export default ProfileAccount;
