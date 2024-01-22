import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";

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

const Todo = () => {
  const [todoData, setTodoData] = useState({
    titleVal: "",
    contentVal: "",
  });

  const { loading, data } = useQuery(GET_TODOS);

  const [addTodo] = useMutation(ADD_TODOS);

  if (loading) return <p>Loading...</p>;

  const HandleChange = (e) => {
    const { value, name } = e.target;
    setTodoData((prevData) => ({ ...prevData, [name]: value }));
  };

  const SubmitHandler = (e) => {
    e.preventDefault();

    console.log(todoData);

    if (todoData.contentVal && todoData.titleVal) {
      console.log("entered");
      addTodo({
        variables: {
          title: todoData.titleVal,
          content: todoData.contentVal,
        },
        refetchQueries: [{ query: GET_TODOS }],
      });

      console.log("left");
    } else {
      console.log("empty values are there");
    }
  };

  return (
    <div className=" flex flex-col w-80">
      <h1>Todo App</h1>

      <form onSubmit={SubmitHandler} className=" flex flex-col ">
        <label htmlFor="titleVal">Title:</label>
        <input
          id="titleVal"
          name="titleVal"
          type="text"
          value={todoData.titleVal}
          onChange={HandleChange}
          required
        />
        <label htmlFor="contentVal">Content:</label>
        <input
          id="contentVal"
          name="contentVal"
          type="text"
          value={todoData.contentVal}
          onChange={HandleChange}
          required
        />

        <button type="submit">Add Todo</button>
      </form>

      <ul>
        {data?.Todo?.map((val) => {
          return (
            <div key={val.id}>
              <p>{val?.content}</p>
              <p>{val?.title}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
