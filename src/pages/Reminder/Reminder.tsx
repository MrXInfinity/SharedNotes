import { useState } from "react";
import { PageLayout } from "../../components/UIComponents";
import { reminderType } from "../../types/firestoreDataTypes";
import ReminderList from "./ReminderList";
import UpdateReminderModal from "./UpdateReminderModal";

const Reminder = () => {
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  const [selectedReminderData, setSelectedReminderData] =
    useState<reminderType>({} as reminderType);

  return (
    <PageLayout
      title="Reminders"
      pageList={
        <ReminderList
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
