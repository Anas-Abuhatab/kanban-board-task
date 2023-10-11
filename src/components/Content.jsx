import { useEffect, useRef, useState } from "react";
import "../styles/components/content.css";
import BoardCard from "./BoardCard";
// import data from "../data.js";
import BaseCard from "./BaseCard";

export default function Content() {
  const [draggables, setDraggables] = useState(null);
  const [droppables, setDroppables] = useState(null);
  const content = useRef(null);
  const [showBaseCard, setShowBaseCard] = useState(false);
  const [baseCardData, setBaseCardData] = useState(null);
  const [baseCardMode, setBaseCardMode] = useState(null);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const [formData, setFormData] = useState({
    priority: "",
    dueDate: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevfFormData) => {
      return {
        ...prevfFormData,
        [name]: value,
      };
    });
  };
  // for building purposes
  const data = {
    data: [
      {
        id: 1,
        title: "First Task",
        status: "To-Do",
        priority: "Low",
        dueDate: "2023-10-17",
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
      },
      {
        id: 2,
        title: "Second Task",
        status: "To-Do",
        priority: "High",
        dueDate: "2023-10-10",
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
      },
      {
        id: 3,
        title: "Third Task",
        status: "To-Do",
        priority: "Medium",
        dueDate: "2023-10-12",
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
      },
      {
        id: 4,
        title: "4Th Task",
        status: "To-Do",
        priority: "Highest",
        dueDate: "2023-10-10",
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
      },
    ],
  };
  
  // created event
  useEffect(() => {
    setDroppables(content.current.querySelectorAll(".board-section"));
    if (!localStorage.getItem("userData")) {
      localStorage.setItem("userData", JSON.stringify([...data.data]));
    }
  }, []);

  //watcher
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  //watcher
  useEffect(() => {
    if (draggables && droppables) {
      let onhandCard;
      draggables.forEach((card) => {
        card.addEventListener("dragstart", () => {
          card.classList.add("at-dragging");
        });
        card.addEventListener("dragend", () => {
          card.classList.remove("at-dragging");
        });
      });

      droppables.forEach((targetColumn) => {
        targetColumn.addEventListener("dragover", (event) => {
          event.preventDefault();

          onhandCard = document.querySelector(".at-dragging");
        });

        targetColumn.addEventListener("drop", (event) => {
          event.preventDefault();
          let taskId = onhandCard?.getAttribute("id");

          taskId &&
            setUserData((prevLocalData) => {
              const index = prevLocalData.findIndex((object) => {
                return object.id == taskId;
              });
              prevLocalData[index].status = targetColumn.getAttribute("id");
              return [...prevLocalData];
            });
        });
      });
    }
  }, [draggables, droppables]);

  const handelCreatebtn = () => {
    setBaseCardMode("Create");
    setShowBaseCard(true);
  };

  const handleClearForm = () => {
    setFormData({
      priority: "",
      dueDate: "",
    });
  };

  const dataHandler = (column) => {
    if (userData) {
      let data = [...userData]?.filter((i) => i.status === column);
      if (formData.dueDate) {
        data = data.filter((i) => i.dueDate === formData.dueDate);
      }
      if (formData.priority) {
        data.sort((a, b) => {
          if (a.priority === formData.priority) return -1;
          if (b.priority === formData.priority) return 1;
          return 0;
        });
      }
      return data;
    }
    return [];
  };

  return (
    <div ref={content} className="content">
      <div className="content__head">
        <h2 className="content__head-title">Kanban Board</h2>
        <button className="content__head-btn" onClick={handelCreatebtn}>
          Add New +
        </button>
      </div>
      <form className="content__form">
        <div className="container__box-row">
          <h3>Sort By Priority</h3>
          <label className="container__box-form--lable" htmlFor="priority">
            Priority
          </label>
          <select
            value={formData.priority}
            onChange={handleFormChange}
            className="container__box-form--input"
            id="priority"
            name="priority"
          >
            <option value="" defaultValue disabled>
              Choose Priority
            </option>

            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Highest">Highest</option>
          </select>
        </div>

        <div className="container__box-row">
          <h3>Filter By Date</h3>
          <label className="container__box-form--lable" htmlFor="dueDate">
            Due Date
          </label>
          <input
            value={formData.dueDate}
            onChange={handleFormChange}
            className="container__box-form--input"
            id="dueDate"
            name="dueDate"
            type="date"
          />
        </div>

        <button
          onClick={handleClearForm}
          className="content__form-btn"
          type="button"
        >
          Clear filters
        </button>
      </form>
      <div className="content__boards">
        <div className="board">
          <div className="board-section" id="To-Do">
            <h3 className="board-section__title">To Do</h3>
            {dataHandler("To-Do").map((task) => {
              return (
                <div key={task.id}>
                  <BoardCard
                    setBaseCardData={setBaseCardData}
                    setBaseCardMode={setBaseCardMode}
                    passShowBaseCard={setShowBaseCard}
                    draggables={setDraggables}
                    task={{ ...task }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="board">
          <div className="board-section" id="In-Progress">
            <h3 className="board-section__title">In Progress</h3>
            {dataHandler("In-Progress").map((task) => {
              return (
                <div key={task.id}>
                  <BoardCard
                    setBaseCardData={setBaseCardData}
                    setBaseCardMode={setBaseCardMode}
                    passShowBaseCard={setShowBaseCard}
                    draggables={setDraggables}
                    task={{ ...task }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="board">
          <div className="board-section" id="In-Testing">
            <h3 className="board-section__title">In Testing</h3>
            {dataHandler("In-Testing").map((task) => {
              return (
                <div key={task.id}>
                  <BoardCard
                    setBaseCardData={setBaseCardData}
                    setBaseCardMode={setBaseCardMode}
                    passShowBaseCard={setShowBaseCard}
                    draggables={setDraggables}
                    task={{ ...task }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="board">
          <div className="board-section" id="Done">
            <h3
              style={{ backgroundColor: "green" }}
              className="board-section__title"
            >
              Done
            </h3>
            {dataHandler("Done").map((task) => {
              return (
                <div key={task.id}>
                  <BoardCard
                    setBaseCardData={setBaseCardData}
                    setBaseCardMode={setBaseCardMode}
                    passShowBaseCard={setShowBaseCard}
                    draggables={setDraggables}
                    task={{ ...task }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {showBaseCard && (
        <BaseCard
          mode={baseCardMode}
          setUserData={setUserData}
          task={baseCardData}
          passShowBaseCard={setShowBaseCard}
        />
      )}
    </div>
  );
}
