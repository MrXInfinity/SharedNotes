import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ModalWrapper } from "./UIComponents";
import useFirestoreDb from "../hooks/useFirestoreDb";
import { modalStateTypes } from "./Navigation";
import useFirestoreContext from "../firestoreContext";

type NewNoteFormType = {
  type: string;
  title: string;
  tags: string[];
};

const NewNoteModal: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<modalStateTypes>>;
}> = ({ isOpen, setIsOpen }) => {
  const [personName, setPersonName] = useState<string[]>([]);
  const { addNote } = useFirestoreDb();
  const {
    userData: { firstname, lastname },
  } = useFirestoreContext();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<NewNoteFormType>({
    defaultValues: {
      type: "",
      title: "",
      tags: [""],
    },
    shouldUnregister: true,
  });

  const tagList = [
    "Adventure",
    "Educational",
    "Fantasy",
    "Inspiration",
    "NSFW",
    "Romantic",
  ];

  const closeModal = () => {
    setIsOpen({
      isOpen: false,
      type: "",
    });
    setPersonName([]);
  };

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const formSubmit: SubmitHandler<NewNoteFormType> = ({
    type,
    title,
    tags,
  }) => {
    addNote(type, title, tags);
    closeModal();
  };

  useEffect(() => {
    if (personName) {
      setValue("tags", personName);
      if (personName.length > 5) {
        setError("tags", {
          type: "length",
          message: "Only five (5) tags allowed.",
        });
      } else {
        clearErrors("tags");
      }
    }
  }, [personName]);

  return (
    <ModalWrapper
      isOpen={isOpen}
      title="New Note"
      closeModal={closeModal}
    >
      <form
        style={{ display: "flex", flexDirection: "column", gap: 6 }}
        onSubmit={handleSubmit(formSubmit)}
      >
        <FormControl fullWidth>
          <FormLabel
            sx={{ fontWeight: "medium" }}
            id="type-radio-label"
          >
            Type
          </FormLabel>
          {errors?.type?.message && (
            <FormLabel
              sx={{ fontSize: 10, color: "red", mt: 1 }}
              id="type-radio-label"
            >
              {errors.type.message}
            </FormLabel>
          )}
          <Controller
            rules={{
              required: "Choose a type of note.",
            }}
            control={control}
            name="type"
            render={({ field }) => (
              <RadioGroup
                row
                aria-labelledby="type-radio-buttons"
                {...field}
              >
                <FormControlLabel
                  value="Private"
                  control={<Radio />}
                  label="Private"
                />
                <FormControlLabel
                  value="Shared"
                  control={<Radio />}
                  label="Shared"
                />
              </RadioGroup>
            )}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel
            error={errors?.title ? true : false}
            sx={{ fontWeight: "medium" }}
            id="title-text-input-label"
          >
            Title
          </FormLabel>
          <OutlinedInput
            label="Title"
            required
            {...register("title", {
              required: "Please specify the title.",
              minLength: {
                value: 2,
                message: "Please provide more characters for your title.",
              },
              maxLength: {
                value: 30,
                message: "Please remove some characters from your title.",
              },
            })}
          />
          <FormHelperText>{errors?.title?.message}</FormHelperText>
        </FormControl>
        <FormControl
          fullWidth
          error={errors?.tags ? true : false}
        >
          <FormLabel
            sx={{ fontWeight: "medium" }}
            id="Tags-select-label"
          >
            Tags
          </FormLabel>
          {errors?.tags?.message && (
            <FormLabel
              sx={{ fontSize: 10, color: "red", mt: 1 }}
              id="type-radio-label"
            >
              {errors.tags.message}
            </FormLabel>
          )}
          <Select
            labelId="multiple-tags-label"
            multiple
            value={personName}
            onChange={handleChange}
            input={
              <OutlinedInput
                id="select-multiple-chip"
                label="Chip"
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                  />
                ))}
              </Box>
            )}
          >
            {tagList.map((eachTag) => (
              <MenuItem
                key={eachTag}
                value={eachTag}
              >
                {eachTag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ alignSelf: "flex-end", mt: 2.5 }}
          endIcon={<NoteAddIcon />}
        >
          Create New Note
        </Button>
      </form>
    </ModalWrapper>
  );
};

export default NewNoteModal;
