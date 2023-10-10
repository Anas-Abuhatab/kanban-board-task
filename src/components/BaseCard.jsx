import { useEffect, useState } from "react";
import "../styles/components/baseCard.css";

export default function BaseCard(props) {
  const [formData, setFormData] = useState({
    id: Date.now(),
    title: "",
    status: "To-Do",
    priority: "",
    dueDate: "",
    description: "",
  });
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    props.mode === "Edit" && setFormData({ ...props.task });
  }, []);

  const handleDelete = () => {
    props.setUserData((prevLocalData) =>
      prevLocalData.filter((task) => task.id !== props.task.id)
    );
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevfFormData) => {
      return {
        ...prevfFormData,
        [name]: value,
      };
    });
  };
  
  const formSubmit = (event) => {
    event.preventDefault();
    
    let isValid = !Object.values(formData).some((field) => !field);
    
    if (isValid) {
      setIsValid(true);

      props.mode === "Create" &&
        props.setUserData((prevLocalData) => [...prevLocalData, formData]);

      props.mode === "Edit" &&
        props.setUserData((prevLocalData) => {
          const index = prevLocalData.findIndex((task) => {
            return task.id == props.task.id;
          });
          prevLocalData[index] = formData;
          return [...prevLocalData];
        });
      props.passShowBaseCard(false);
    } else {
      setIsValid(false);
    }
  };

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
              {props.mode === "Create" && "Create New Task"}
              {props.mode === "View" && `${props.task.title} Details`}
              {props.mode === "Delete" && `Delete ${props.task.title}`}
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
            {(props.mode === "Create" || props.mode === "Edit") && (
              <>
                <form
                  onSubmit={(e) => formSubmit(e)}
                  className="container__box-form"
                >
                  <div className="container__box-row">
                    <label
                      className="container__box-form--lable"
                      htmlFor="title"
                    >
                      Title
                    </label>
                    <input
                      value={formData.title}
                      minLength={3}
                      onChange={handleFormChange}
                      className="container__box-form--input"
                      id="title"
                      name="title"
                      placeholder="Task Title"
                      type="text"
                    />
                  </div>

                  <div className="container__box-row">
                    <label
                      className="container__box-form--lable"
                      htmlFor="priority"
                    >
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
                    <label
                      className="container__box-form--lable"
                      htmlFor="dueDate"
                    >
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
                  <div className="container__box-row ">
                    <textarea
                      value={formData.description}
                      onChange={handleFormChange}
                      className="container__box-form--input"
                      id="description"
                      name="description"
                      rows="4"
                      cols="50"
                      placeholder="Describe Task here..."
                    ></textarea>
                  </div>
                  {isValid === false && (
                    <p style={{ color: "red" }}> Please Fill All fields</p>
                  )}
                  <button className="container__box-form--btn"> Submit </button>
                </form>
              </>
            )}
            {props.mode === "View" && (
              <>
                <div className="container__box-row">
                  <h4>ID :</h4>
                  <p>TSK-{props.task.id}</p>
                </div>
                <div className="container__box-row">
                  <h4>Priority :</h4>
                  <p>{props.task.priority}</p>
                </div>
                <div className="container__box-row">
                  <h4>Status :</h4>
                  <p>{props.task.status}</p>
                </div>
                <div className="container__box-row">
                  <h4>DueDate :</h4>
                  <p>{props.task.dueDate}</p>
                </div>
                <div className="container__box-row">
                  <h4>Description :</h4>
                  <article>{props.task.description}</article>
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
