import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import Header from "./Header";
import toast from "react-hot-toast";

const GET_TODOS = gql`
  query {
    Todo {
      content
      title
      id
    }
  }
`;

const ADD_TODOS = gql`
  mutation AddTodo($title: String!, $content: String!) {
    insert_Todo_one(object: { title: $title, content: $content }) {
      id
      content
      title
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    delete_Todo_by_pk(id: $id) {
      title
    }
  }
`;

const TodoComponent = () => {
  const [todoData, setTodoData] = useState({
    titleVal: "",
    contentVal: "",
  });

  const { loading, data } = useQuery(GET_TODOS);

  const [addTodo] = useMutation(ADD_TODOS);

  const [deleteTodo] = useMutation(DELETE_TODO);

  if (loading)
    return (
      <div className=" w-screen h-screen  flex items-center justify-center">
        <p className=" text-4xl font-semibold">Loading...</p>
      </div>
    );

  const HandleChange = (e) => {
    const { value, name } = e.target;
    setTodoData((prevData) => ({ ...prevData, [name]: value }));
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    if (todoData.contentVal.length > 5 && todoData.titleVal.length > 5) {
      await addTodo({
        variables: {
          title: todoData.titleVal,
          content: todoData.contentVal,
        },
        refetchQueries: [{ query: GET_TODOS }],
      });

      setTodoData({ titleVal: "", contentVal: " " });

      toast.success("Successfully created Todo");
    } else {
      return;
    }
  };

  const deleteHandler = async (id) => {
    await deleteTodo({
      variables: { id },
      refetchQueries: [{ query: GET_TODOS }],
    });
    toast.error("deleted Todo");
  };

  return (
    <div className=" flex flex-col">
      <Header />

      <div className="flex flex-col justify-center items-center">
        <h1 className=" text-3xl mb-2 font-semibold">Create Todo</h1>
        <form
          onSubmit={SubmitHandler}
          className=" flex flex-col border-2 w-96 shadow-md  p-3"
        >
          <label htmlFor="titleVal" className=" text-xl font-semibold mb-1">
            Title:
          </label>
          <input
            id="titleVal"
            name="titleVal"
            type="text"
            value={todoData.titleVal}
            onChange={HandleChange}
            required
            className=" border border-gray-300 rounded-md p-1 mb-4 outline-none"
          />
          <label htmlFor="contentVal" className=" font-semibold text-xl">
            Content:
          </label>
          <input
            id="contentVal"
            name="contentVal"
            type="text"
            required
            value={todoData.contentVal}
            onChange={HandleChange}
            className="border border-gray-300 rounded-md p-1 mb-4 outline-none"
          />

          <button
            type="submit"
            className=" border rounded-md w-max py-1 px-2 font-semibold bg-green-400"
          >
            Add Todo
          </button>
        </form>
      </div>

      <div className=" flex flex-wrap gap-4 mt-8 mx-3">
        {data?.Todo?.map((val) => {
          return (
            <div
              key={val.id}
              className=" w-60 h-40 border shadow-md flex flex-col justify-between p-2
            "
            >
              <div>
                <p>
                  <span className=" font-semibold ">Title: </span>
                  {val?.title}
                </p>
                <p>
                  <span className=" font-semibold ">Content: </span>
                  {val?.content}
                </p>
              </div>

              <button
                className=" rounded-md bg-red-500 text-white px-2 py-1 w-max"
                onClick={() => deleteHandler(val.id)}
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoComponent;
