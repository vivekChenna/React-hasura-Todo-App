import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const UpdateSubmitHandler = () => {
  console.log("hello");
};

const Modal = ({ onUpdate, id }) => {
  const [newTodoData, setNewTodoData] = useState({
    titleVal: "",
    contentVal: "",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;

    setNewTodoData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Update</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form onSubmit={UpdateSubmitHandler} className=" flex flex-col gap-5">
            <div className=" flex flex-col gap-1">
              <label htmlFor="titleVal" className=" text-xl font-semibold">
                Title:
              </label>
              <input
                id="titleVal"
                name="titleVal"
                type="text"
                required
                placeholder="new todo..."
                onChange={HandleChange}
                className=" outline-none border rounded-md p-1"
                value={newTodoData.titleVal}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label htmlFor="contentVal" className="text-xl font-semibold">
                Content:
              </label>
              <input
                id="contentVal"
                name="contentVal"
                type="text"
                required
                placeholder="new content..."
                onChange={HandleChange}
                className=" outline-none border rounded-md p-1"
                value={newTodoData.contentVal}
              />
            </div>
          </form>

          <AlertDialogFooter>
            <AlertDialogCancel className=" bg-red-600 text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                onUpdate(id, newTodoData.titleVal, newTodoData.contentVal)
              }
            >
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Modal;
