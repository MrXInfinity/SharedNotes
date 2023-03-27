import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import useFirestoreContext from "../../firestoreContext";
import { reminderType } from "../../types/firestoreDataTypes";
import EachReminderList from "./EachReminderList";
import UpdateReminderModal from "./UpdateReminderModal";

const Reminder = () => {
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  const [selectedReminderData, setSelectedReminderData] =
    useState<reminderType>({} as reminderType);

  return (
    <PageLayout
      title="Reminders"
      pageList={
        <EachReminderList
          toggleModal={setIsReminderModalOpen}
          setData={setSelectedReminderData}
        />
      }
      modal={
        Object.keys(selectedReminderData).length > 0 ? (
          <UpdateReminderModal
            isOpen={isReminderModalOpen}
            setIsOpen={setIsReminderModalOpen}
            data={selectedReminderData}
            setData={setSelectedReminderData}
          />
        ) : (
          <></>
        )
      }
    />
  );
};

export default Reminder;
