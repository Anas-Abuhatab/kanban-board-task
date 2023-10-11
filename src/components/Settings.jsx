import { useEffect, useState } from "react";
import "../styles/components/setting.css";

export default function Settings(props) {
  const root = document.querySelector(":root");
  const setVariables = (vars) =>
    Object.entries(vars).forEach((v) => root.style.setProperty(v[0], v[1]));

  const [formData, setFormData] = useState({
    "--font-color": "#fff;",
    "--font-family": "Helvetica",
    "--background-color": "#f9f8f8",
    "--theme-color": "#0074CC",
  });

  useEffect(()=>{
    if (localStorage.getItem("theme")) {
      setFormData(JSON.parse(localStorage.getItem("theme")))
    }
  },[])

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevfFormData) => {
      return {
        ...prevfFormData,
        [name]: value,
      };
    });
    setVariables(formData);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("theme", JSON.stringify(formData));
    props.passShowSettings(false);
  };

  return (
    <div className="settings">
      <div className="container">
        <div className="container__header">
          <h2 className="container__header--title">
            Create Your Favorite Theme
          </h2>
          <svg
            onClick={() => props.passShowSettings(false)}
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
          <form onSubmit={(e) => formSubmit(e)} className="container__box-form">

            <div className="container__box-row">
              <label className="container__box-form--lable" htmlFor="fontFamily">
                Font Family
              </label>
              <select
                value={formData['--font-family']}
                onInput={handleFormChange}
                className="container__box-form--input"
                id="fontFamily"
                name="--font-family"
              >
                <option value="" defaultValue disabled>
                  Choose font Family
                </option>

                <option value="Helvetica">Helvetica</option>
                <option value="Montez">Montez</option>
                <option value="Satisfy">Satisfy</option>
                <option value="Righteous">Righteous</option>
              </select>
            </div>

            <div className="container__box-row">
              <label className="container__box-form--lable" htmlFor="fontColor">
              Font Color
              </label>
              <input
                value={formData['--font-color']}
                onInput={handleFormChange}
                className="container__box-form--input"
                id="fontColor"
                name="--font-color"
                type="color"
              />
            </div>

            <div className="container__box-row">
              <label className="container__box-form--lable" htmlFor="backgroundColor">
              Background Color
              </label>
              <input
                value={formData['--background-color']}
                onInput={handleFormChange}
                className="container__box-form--input"
                id="backgroundColor"
                name="--background-color"
                type="color"
              />
            </div>

            <div className="container__box-row">
              <label className="container__box-form--lable" htmlFor="themeColor">
              Theme Color
              </label>
              <input
                value={formData['--theme-color']}
                onInput={handleFormChange}
                className="container__box-form--input"
                id="themeColor"
                name="--theme-color"
                type="color"
              />
            </div>
            <button className="container__box-form--btn"> Save </button>
          </form>
        </div>
      </div>
    </div>
  );
}
