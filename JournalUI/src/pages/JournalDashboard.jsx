import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";
import "./JournalDashboard.css";

export default function JournalDashboard() {
  const [journals, setJournals] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/journal", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJournals(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/journal",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTitle("");
      setContent("");

      setShowModal(false);

      fetchJournals();
    } catch (error) {
      console.log(error);
    }
  };



  const handleDelete = async (_id) => {

  try {

    const token = localStorage.getItem("token");

    await API.delete(`/journal/id/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchJournals();

  } catch (error) {
    console.log(error);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Journal Dashboard</h1>

            <p className="dashboard-subtitle">
              Write and manage your daily journals.
            </p>
          </div>

          <div className="header-buttons">
            <button onClick={() => setShowModal(true)} className="add-button">
              +
            </button>

            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>

        {journals.length === 0 ? (
          <div className="empty-state">
            <h2 className="empty-title">No Journal Entries Yet</h2>

            <p className="empty-subtitle">
              Click the plus button to create your first journal.
            </p>
          </div>
        ) : (
          <div className="journal-grid">
 {journals?.map((journal) => (
  <div key={journal.id} className="journal-card">
    <h2 className="journal-card-title">
      {journal.title}
    </h2>

    <p className="journal-card-content">
      {journal.content}
    </p>

    <button
      onClick={() => handleDelete(journal.id)}
      className="delete-button"
    >
      Delete
    </button>
  </div>
))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2 className="modal-title">New Journal Entry</h2>

            <input
              type="text"
              placeholder="Journal Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="journal-input"
            />

            <textarea
              placeholder="Write your thoughts here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="journal-textarea"
            />

            <div className="modal-actions">
              <button
                onClick={() => setShowModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>

              <button onClick={handleSave} className="save-button">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}