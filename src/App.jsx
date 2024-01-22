import React from "react";
import "./App.css";
import Todo from "./components/Todo";

// https://large-phoenix-56.hasura.app/v1/graphql

function App() {
  return (
    <div className=" border-2 border-black">
      <Todo />
    </div>
  );
}

export default App;
