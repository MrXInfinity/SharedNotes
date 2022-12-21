import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  MenuItem,
  Modal,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";

const NewNoteModal: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const [personName, setPersonName] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      title: "",
      tags: [""],
    },
  });

  const tagList = [
    "Adventure",
    "Educational",
    "Fantasy",
    "Inspiration",
    "NSFW",
    "Romantic",
  ];
  console.log(personName);

  const closeModal = () => {
    setIsOpen(false);
    setPersonName([]);
  };

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const formSubmit = (e: any) => {
    console.log(e);
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

    return () => {
      setValue("tags", [""]);
    };
  }, [personName]);

  console.log(errors);

  return (
    <Modal
      open={isOpen}
      onClose={() => closeModal()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack
          direction="row"
          sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
        >
          <Typography
            id="new-note-modal-title"
            sx={{ fontWeight: "bold", fontSize: { xs: 28, md: 32 } }}
          >
            New Note
          </Typography>
          <IconButton onClick={() => closeModal()}>
            <CloseIcon />
          </IconButton>
        </Stack>

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
              shouldUnregister={true}
              control={control}
              name="type"
              render={({ field }) => (
                <RadioGroup
                  row
                  aria-labelledby="type-radio-buttons"
                  {...field}
                >
                  <FormControlLabel
                    value="private"
                    control={<Radio />}
                    label="Private"
                  />
                  <FormControlLabel
                    value="shared"
                    control={<Radio />}
                    label="Shared"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel
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
                shouldUnregister: true,
              })}
            />
            <FormHelperText></FormHelperText>
          </FormControl>
          <FormControl fullWidth>
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
      </Box>
    </Modal>
  );
};

export default NewNoteModal;
