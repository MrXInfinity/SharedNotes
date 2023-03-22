import { Preview } from "@mui/icons-material";
import { TextField, Button } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ModalWrapper } from "../../components/UIComponents";
import useFirestoreDb from "../../hooks/useFirestoreDb";
import { reminderType } from "../../types/firestoreDataTypes";
import { reminderFormTypes } from "../../types/modalContentTypes";

const updateReminderModal: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: reminderType;
  setData: React.Dispatch<React.SetStateAction<reminderType>>;
}> = ({
  isOpen,
  setIsOpen,
  data: { id, title, startTime, endTime },
  setData,
}) => {
  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<reminderFormTypes>({
    shouldUnregister: true,
  });

  console.log(watch());

  const { updateReminder } = useFirestoreDb();

  const formSubmit = (data: reminderFormTypes) => {
    if (Object.keys(data).length < 1) return alert("There is no new data");
    console.log(data);
    updateReminder({ id, ...data });
    setIsOpen(false);
    reset();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      title="Update Reminder"
      closeModal={() => {
        setIsOpen(false);
        reset();
      }}
    >
      <form
        onSubmit={handleSubmit(formSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          marginTop: "1rem",
        }}
      >
        <TextField
          defaultValue={title}
          variant="outlined"
          required
          label="Title"
          aria-label="title-text-field"
          error={errors?.title ? true : false}
          helperText={errors?.title?.message}
          onChange={(e) => {
            setValue("title", e.target.value);
            setData((prev) => ({ ...prev, title: e.target.value }));
          }}
        />

        <DateTimePicker
          renderInput={(props) => (
            <TextField
              {...props}
              required
              error={errors?.startTime ? true : false}
              helperText={errors?.startTime?.message}
            />
          )}
          label="Starting Due Date"
          value={
            typeof startTime === "string" ? parseInt(startTime) : startTime
          }
          onChange={(data) => {
            setValue("startTime", data.format("x"));
            setData((prev) => ({ ...prev, startTime: data }));
          }}
          maxDateTime={
            endTime
              ? typeof endTime === "string"
                ? moment(parseInt(endTime))
                : typeof endTime === "object"
                ? endTime
                : moment(endTime)
              : null
          }
        />
        <DateTimePicker
          renderInput={(props) => (
            <TextField
              {...props}
              error={errors?.endTime ? true : false}
              helperText={
                errors?.endTime?.message ??
                "This is optional for reminders that have a start and end time"
              }
            />
          )}
          label="Ending Due Date"
          value={typeof endTime === "string" ? parseInt(endTime) : endTime}
          onChange={(data) => {
            setValue("endTime", data.format("x"));
            setData((prev) => ({ ...prev, endTime: data }));
          }}
          minDateTime={
            startTime
              ? typeof startTime === "string"
                ? moment(parseInt(startTime))
                : typeof startTime === "object"
                ? startTime
                : moment(startTime)
              : null
          }
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ alignSelf: "flex-end", mt: 2.5 }}
        >
          Uodate Reminder
        </Button>
      </form>
    </ModalWrapper>
  );
};

export default updateReminderModal;
