import { useEffect, useRef, useState } from "react";
import "../styles/components/content.css";
import BoardCard from "./BoardCard";
import data from "/data.js";
import BaseCard from "./BaseCard";

export default function Content() {
  // const [date, setDate] = useState("");
  const [draggables, setDraggables] = useState(null);
  const [droppables, setDroppables] = useState(null);
  const content = useRef(null);
  const [showBaseCard, setShowBaseCard] = useState(false);
  const [baseCardData, setBaseCardData] = useState(null);
  const [baseCardMode, setBaseCardMode] = useState(null);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));

  if (!localStorage.getItem("userData")) {
    localStorage.setItem("userData", JSON.stringify([...data.data]));
  }

  // created event
  useEffect(() => {
    setDroppables(content.current.querySelectorAll(".board-section"));
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

          taskId && setUserData((prevLocalData) => {
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

  let handelChange = (event) => {
    // console.log(event.target.value);
    // console.log(draggables);
  };
  let handelCreatebtn = () => {
    setBaseCardMode('Create');
    setShowBaseCard(true);
  };

  return (
    <div ref={content} className="content">
      <div className="content__head">
        <h2 className="content__head-title">Kanban Board</h2>
        <button className="content__head-btn" onClick={handelCreatebtn}>Add New +</button>
      </div>
      <form>
        <input onChange={(e) => handelChange(e)} type="date"></input>
      </form>
      <div className="content__boards">
        <div className="board">
          <div className="board-section" id="To-Do">
            <h3 className="board-section__title">To Do</h3>
            {userData?.filter(i => i.status === 'To-Do').map((task) => {
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
            {userData?.filter(i => i.status === 'In-Progress').map((task) => {
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
            {userData?.filter(i => i.status === 'In-Testing').map((task) => {
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
            {userData?.filter(i => i.status === 'Done').map((task) => {
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
