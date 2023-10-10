import { useEffect } from "react";

export default function BoardCard(props) {
//   console.log("props", props);

  useEffect(() => {
    props.draggables([...document.querySelectorAll(".board__card")]);
  }, []);
  return (
    <div
      draggable="true"
      style={{ marginBottom: "1rem" }}
      className="board__card"
      id={props.task.id}
    >
      <div className="board__card-head">
        <h5>{props.task.dueDate}</h5>
        <div className="board__card-head--actions">
          <svg //view
            onClick={() => {
              props.passShowBaseCard(true);
              props.setBaseCardData(props.task);
              props.setBaseCardMode("View");
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="18"
            height="18"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
          </svg>

          <svg //edit
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="18"
            height="18"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            ></path>
          </svg>

          <svg //delete
            onClick={() => {
              props.passShowBaseCard(true);
              props.setBaseCardData(props.task);
              props.setBaseCardMode("Delete");
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="18"
            height="18"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </div>
      </div>
      <div className="board__card-body">
        <h4>{props.task.title}</h4>
        <p>{props.task.description}</p>
      </div>
      <div className="board__card-footer">
        <span>status: {props.task.status}</span>
        <span>priority: {props.task.priority}</span>
      </div>
    </div>
  );
}
