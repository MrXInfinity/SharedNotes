import { useState } from "react";
import { PageLayout } from "../../components/UIComponents";
import { taskType } from "../../types/firestoreDataTypes";
import TaskList from "./TaskList";
import UpdateTaskModal from "./UpdateTaskModal";

const Task = () => {
  const [selectedTaskData, setSelectedTaskData] = useState<taskType>(
    {} as taskType
  );
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <PageLayout
      title="Task"
      pageList={
        <TaskList
          setData={setSelectedTaskData}
          toggleModal={setIsTaskModalOpen}
        />
      }
      modal={
        Object.keys(selectedTaskData).length > 0 ? (
          <UpdateTaskModal
            isOpen={isTaskModalOpen}
            setIsOpen={setIsTaskModalOpen}
            data={selectedTaskData}
            setData={setSelectedTaskData}
          />
        ) : (
          <></>
        )
      }
    />
  );
};

export default Task;
