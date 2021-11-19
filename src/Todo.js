import React, { useState, useEffect } from "react";
import "./Todo.css";

//get data from local storage
function getlocaldata() {
  const lists = localStorage.getItem("Todolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
}
function Todo() {
  let [input, setInput] = useState("");
  let [item, setItem] = useState(getlocaldata());
  let [isEdit, setIsEdit] = useState("");
  let [toggle, setToggle] = useState(false);
//add items by enter key press

  //add items
  const additems = () => {
    if (!input) {
      alert("please insert item");
    } else if (input && toggle) {
      setItem(
        item.map((curElem) => {
          if (curElem.id === isEdit) {
            return { ...curElem, name: input };
          }
         
          return curElem;
        })
      );
      setToggle(false);
    } else {
      let finalinput = {
        id: new Date().getTime().toString(),
        name: input,
      };
      setItem([...item, finalinput]);
    }
    setInput("");
  };

  //delete item
  const deleteitem = (id) => {
    const updatItems = item.filter((ind) => {
      return ind.id !== id;
    });
    setItem(updatItems);
  };

  //clear all item
  const ClearAll = () => {
    setItem([]);
  };

  //edit item
  const Editeitem = (index) => {
    setToggle(true);
    const editeditem = item.find((curElem) => {
      return curElem.id === index;
    });
    setInput(editeditem.name);
    setIsEdit(index);
    setToggle(true);
  };

  //set local storage
  useEffect(() => {
    localStorage.setItem("Todolist", JSON.stringify(item));
  }, [item]);

  return (
    <div>
      <h1 className="header">To-Do</h1>
      <div>
        <input
          type="text"
          className="dataEnter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {//toggle button 
        toggle ? (
          <button className="itembtn" title="Edit item" onClick={additems} >
            #
          </button>
        ) : (
          <button title="add item" className="databtn" onClick={additems} >
            +
          </button>
        )}
      </div>
      {item.map((elm) => {
        return (
          <div key={elm.id}>
            <h3 className="items">{elm.name}</h3>
            <button
              className="itembtn"
              title="Delet item"
              onClick={() => deleteitem(elm.id)}
            >
              x
            </button>
            <button
              className="itembtn"
              title="Edit item"
              onClick={() => Editeitem(elm.id)}
            >
              #
            </button>
          </div>
        );
      })}
      <button className="submitbtns" onClick={ClearAll}>
        Clear all
      </button>
    </div>
  );
}

export default Todo;
