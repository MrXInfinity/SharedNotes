import React from "react";
import { eachListType } from "../../types/componentTypes";
import { taskType } from "../../types/firestoreDataTypes";

const EachTaskList: React.FC<eachListType<taskType>> = ({
  data,
  setData,
  toggleModal,
}) => {
  return <div></div>;
};

export default EachTaskList;
