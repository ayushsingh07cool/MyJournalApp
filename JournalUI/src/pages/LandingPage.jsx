import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

      <nav className="navbar">
        <h2 className="logo">
          📖 JournalApp
        </h2>

        <div className="nav-buttons">
          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button
            className="signup-btn"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </nav>

      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-tag">
            ✨ Your private digital journal
          </span>

          <h1>
            Every Thought Deserves
            <br />
            A Safe Place.
          </h1>

          <p>
            Write your ideas, capture unforgettable memories,
            and organize your daily life in one beautiful,
            secure journal.
          </p>

          <div className="hero-buttons">

            <button
              className="start-btn"
              onClick={() => navigate("/signup")}
            >
              Start Writing
            </button>

            <button
              className="learn-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          </div>

        </div>

        <div className="hero-image">

          📔

        </div>

      </section>

    </div>
  );
};

export default LandingPage;