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
    // if (!localStorage.getItem("userData")) {
    //   setUserData(JSON.parse(localStorage.getItem("userData")));
    // }
  }, []);

  useEffect(() => {
      localStorage.setItem("userData", JSON.stringify(userData));
    
  }, [userData]);

  useEffect(() => {
    if (draggables && droppables) {
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

          const buttomCard = findButtomCard(targetColumn, event.clientY);
          const onhandCard = document.querySelector(".at-dragging");
          if (!buttomCard) {
            targetColumn.appendChild(onhandCard);
          } else {
            targetColumn.insertBefore(
              onhandCard,
              document.querySelector("#To-Do") === targetColumn
                ? buttomCard.nextSibling
                : buttomCard
            );
          }
        });

        targetColumn.addEventListener("drop", (event) => {
          event.preventDefault();
          const onhandCard = document.querySelector(".at-dragging");
          let taskId = onhandCard.getAttribute("id");
          setUserData((prevLocalData) => {
            const index = prevLocalData.findIndex((object) => {
              return object.id == taskId;
            });
            prevLocalData[index].status = targetColumn.getAttribute("id");
            return [...prevLocalData];
          });
        });
      });

      const findButtomCard = (targetColumn, mouseYPosition) => {
        const cards = targetColumn.querySelectorAll(
          ".board__card:not(.at-dragging)"
        );

        let closestCard = null;
        let closestOffset = Number.NEGATIVE_INFINITY;

        cards.forEach((card) => {
          const { top } = card.getBoundingClientRect();

          const offset = mouseYPosition - top;
          if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestCard = card;
          }
        });
        return closestCard;
      };
    }
  }, [draggables, droppables]);

  let handelChange = (event) => {
    // console.log(event.target.value);
    // console.log(draggables);
  };

  return (
    <div ref={content} className="content">
      <div className="content__head">
        <h2 className="content__head-title">Kanban Board</h2>
        <button className="content__head-btn">Add New +</button>
      </div>
      <form>
        <input onChange={(e) => handelChange(e)} type="date"></input>
      </form>
      <div className="content__boards">
        <div className="board">
          <div className="board-section" id="To-Do">
            <h3 className="board-section__title">To Do</h3>
            {userData?.map((task) => {
              return (
                <div draggable="true" key={task.id}>
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
          </div>
        </div>
        <div className="board">
          <div className="board-section" id="In-Testing">
            <h3 className="board-section__title">In Testing</h3>
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
          </div>
        </div>
      </div>
      {showBaseCard && (
        <BaseCard
          mode={baseCardMode}
          setUserData={setUserData}
          data={baseCardData}
          passShowBaseCard={setShowBaseCard}
        />
      )}
    </div>
  );
}
