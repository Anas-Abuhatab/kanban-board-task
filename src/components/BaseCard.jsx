import "../styles/components/baseCard.css";

export default function BaseCard(props) {

    let handleDelete = () => {
        props.setUserData((prevLocalData) =>
        prevLocalData.filter((task) => task.id !== props.data.id)
      );
    }
  return (
    <>
      <div className="baseCard__shadow"></div>
      <div className="baseCard">
        <div
          className="container"
          style={props.mode === "Delete" ? { width: "400px" } : {}}
        >
          <div className="container__header">
            <h2 className="container__header--title">
              {props.mode === "View" && `${props.data.title} Details`}
              {props.mode === "Delete" && `Delete ${props.data.title}`}
            </h2>
            <svg
              onClick={() => props.passShowBaseCard(false)}
              className="container__header--close"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="container__box">
            {props.mode === "View" && (
              <>
                <div className="container__box-row">
                  <h4>ID :</h4>
                  <p>TSK-{props.data.id}</p>
                </div>
                <div className="container__box-row">
                  <h4>Priority :</h4>
                  <p>{props.data.priority}</p>
                </div>
                <div className="container__box-row">
                  <h4>Status :</h4>
                  <p>{props.data.status}</p>
                </div>
                <div className="container__box-row">
                  <h4>DueDate :</h4>
                  <p>{props.data.dueDate}</p>
                </div>
                <div className="container__box-row">
                  <h4>Description :</h4>
                  <article>{props.data.description}</article>
                </div>
              </>
            )}
            {props.mode === "Delete" && (
              <>
                <p>Are You Sure?</p>
                <div className="delete__btn">
                  <button
                    onClick={() => {
                      props.passShowBaseCard(false);
                      handleDelete();
                    }}
                    className="delete__btn--1"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => props.passShowBaseCard(false)}
                    className="delete__btn--0"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
