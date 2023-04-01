import { Button, TextField } from "@mui/material";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { useForm } from "react-hook-form";
import { auth, db, storage } from "../firebase";
import { ModalWrapper } from "./UIComponents";

type formTypes = {
  firstname: string;
  lastname: string;
  email: string;
  bio: string;
};
const EditAccount: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const {
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<formTypes>({
    shouldUnregister: true,
  });

  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const imageRef = ref(storage, `${auth.currentUser!.uid}/profilePic.jpg`);
  const [selectedFile, setSelectedFile] = useState<File>();

  const formSubmit = async (data: formTypes) => {
    try {
      await updateDoc(doc(db, "Users", auth.currentUser!.uid), data);
      if (selectedFile) {
        await uploadFile(imageRef, selectedFile, {
          contentType: "image/jpeg",
        });
        signOut(auth);
      }
    } catch (err) {
      console.log(err);
    }

    setIsOpen(false);
  };

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <ModalWrapper
      title="Edit Account"
      isOpen={isOpen}
      closeModal={() => setIsOpen(false)}
    >
      <form
        onSubmit={handleSubmit(formSubmit)}
        style={{
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <TextField
          inputProps={{ minLength: 2, maxLength: 50 }}
          fullWidth
          id="firstName"
          label="First Name"
          variant="outlined"
          onChange={(e) => {
            setValue("firstname", e.target.value);
          }}
        />
        <TextField
          inputProps={{ minLength: 2, maxLength: 50 }}
          fullWidth
          id="lastname"
          label="Last Name"
          variant="outlined"
          onChange={(e) => {
            setValue("lastname", e.target.value);
          }}
        />
        <TextField
          inputProps={{ minLength: 2, maxLength: 50 }}
          fullWidth
          type="email"
          id="email"
          label="Email"
          variant="outlined"
          onChange={(e) => {
            setValue("email", e.target.value, { shouldValidate: true });
          }}
        />
        <TextField
          inputProps={{ minLength: 2, maxLength: 80 }}
          fullWidth
          id="biography"
          label="Bio"
          variant="outlined"
          multiline
          onChange={(e) => {
            setValue("bio", e.target.value);
          }}
        />

        <TextField
          fullWidth
          variant="standard"
          inputProps={{ accept: "image/*" }}
          type="file"
          helperText="You will need to login again after updating your profile"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.target.files ? setSelectedFile(e.target.files[0]) : undefined;
          }}
        />

        <Button
          disabled={uploading}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </ModalWrapper>
  );
};

export default EditAccount;
