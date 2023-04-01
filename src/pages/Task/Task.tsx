import React, { useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import useFirestoreContext from "../../firestoreContext";
import { taskType } from "../../types/firestoreDataTypes";
import TaskList from "./TaskList";
import UpdateTaskModal from "./UpdateTaskModal";
import PageLayout from "../../components/PageLayout";

const Task = () => {
  const [selectedTaskData, setSelectedTaskData] = useState<taskType>(
    {} as taskType
  );
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <PageLayout
      title="Reminders"
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
