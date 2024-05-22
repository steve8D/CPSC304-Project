import React, { useState } from "react";
import InputForm from "../inputForm/inputForm";
import OutputPanel from "../outputPanel/outputPanel";

function Display() {
  const [items, setItems] = useState([])

  const handleItemsChange= (newItems) => {
    setItems(newItems)
  }
  return (
    <>
      <div>
        <h1>Book of Hour database</h1>
        <h3>A video game developed by WeatherFactory</h3>
      </div>
      <div style={{ height: "2rem" }}></div>
      <InputForm onItemsChange = {handleItemsChange} />
      <div style={{ height: "2rem" }}></div>
      <OutputPanel data = {items} />
    </>
  );
}

export default Display;