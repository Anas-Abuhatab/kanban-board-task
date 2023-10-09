import "../styles/components/setting.css";

export default function Settings(props) {
  return (
    <div className="settings">
      <div className="container">
        <div className="container__header">
          <h2 className="container__header--title">
            Select Your Favorite Theme
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

          <div className="container__box-card">
            <h3>Light Mode</h3>
          </div>

          <div className="container__box-card">
            <h3>Dark Mode</h3>
          </div>

          <div className="container__box-card">
            <h3>Custom Mode</h3>
          </div>

        </div>
      </div>
    </div>
  );
}
