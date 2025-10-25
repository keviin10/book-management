import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { updateBook, fetchBookById } from "../store/slices/booksSlice";
import "./AddBook.css";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [book, setBook] = useState({
    title: "",
    genre: "",
    author: "",
    publicationDate: "",
    description: "",
    pages: "",
    price: "",
    rating: "",
    language: "English",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const result = await dispatch(fetchBookById(id)).unwrap();
        setBook({
          title: result.title || "",
          genre: result.genre || "",
          author: result.author || "",
          publicationDate: result.publicationDate
            ? result.publicationDate.split("T")[0]
            : "",
          description: result.description || "",
          pages: result.pages || "",
          price: result.price || "",
          rating: result.rating || "",
          language: result.language || "English",
        });
        setLoading(false);
      } catch (err) {
        alert("Failed to load book data.");
        console.error(err);
        setLoading(false);
      }
    };

    loadBook();
  }, [id, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await dispatch(updateBook({ id, bookData: book })).unwrap();
      alert("Book updated successfully!");
      navigate(`/book/${id}`);
    } catch (err) {
      console.error("Error updating book:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading book data...</p>;

  return (
    <div className="add-book-page">
      <h1>Edit Book</h1>
      <p className="mini-title">
        Update the book details below and save your changes
      </p>

      <form className="add-book-form" onSubmit={handleSubmit}>
        {/* Row 1: Title + Author */}
        <div className="form-row">
          <div className="form-group">
            <label>Book Title *</label>
            <input
              type="text"
              name="title"
              placeholder="e.g., The Great Gatsby"
              value={book.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Author *</label>
            <input
              type="text"
              name="author"
              placeholder="e.g., F. Scott Fitzgerald"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Row 2: Genre + Language */}
        <div className="form-row">
          <div className="form-group">
            <label>Genre *</label>
            <select
              name="genre"
              value={book.genre}
              onChange={handleChange}
              required
            >
              <option value="">Select a genre</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Thriller">Thriller</option>
              <option value="Historical">Historical</option>
              <option value="Fiction">Fiction</option>
              <option value="Nonfiction">Nonfiction</option>
              <option value="Biography">Biography</option>
              <option value="Self-Help">Self-Help</option>
            </select>
          </div>
          <div className="form-group">
            <label>Language *</label>
            <select
              name="language"
              value={book.language}
              onChange={handleChange}
              required
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="Arabic">Arabic</option>
              <option value="German">German</option>
              <option value="Italian">Italian</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Russian">Russian</option>
              <option value="Chinese">Chinese</option>
              <option value="Japanese">Japanese</option>
            </select>
          </div>
        </div>

        {/* Row 3: Publication Date + Pages */}
        <div className="form-row">
          <div className="form-group">
            <label>Publication Date *</label>
            <input
              type="date"
              name="publicationDate"
              value={book.publicationDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Number of Pages *</label>
            <input
              type="number"
              name="pages"
              placeholder="e.g., 320"
              value={book.pages}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>

        {/* Row 4: Price + Rating */}
        <div className="form-row">
          <div className="form-group">
            <label>Price ($) *</label>
            <input
              type="number"
              name="price"
              placeholder="e.g., 14.99"
              value={book.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="form-group">
            <label>Rating (1-5) *</label>
            <select
              name="rating"
              value={book.rating}
              onChange={handleChange}
              required
            >
              <option value="">Select rating</option>
              <option value="1">⭐ (1 Star)</option>
              <option value="2">⭐⭐ (2 Stars)</option>
              <option value="3">⭐⭐⭐ (3 Stars)</option>
              <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
              <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
            </select>
          </div>
        </div>

        {/* Row 5: Description */}
        <div className="form-row">
          <div className="form-group full-width">
            <label>Description *</label>
            <textarea
              name="description"
              placeholder="Enter a brief description of the book..."
              value={book.description}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>
        </div>

        {/* Row 6: Cover Image */}
        <div className="form-row">
          <div className="form-group full-width">
            <label>Cover Image</label>
            <div className="file-upload-box">
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                id="coverInput"
                onChange={handleFileChange}
              />
              {coverImage ? (
                <div>
                  <p>✅ Selected: {coverImage.name}</p>
                  <p style={{ fontSize: "0.8rem", color: "#666", marginTop: "5px" }}>
                    Click the button below to change the image
                  </p>
                </div>
              ) : (
                <p>Current image will be kept. Select a new image to change it.</p>
              )}
              <button 
                type="button"
                onClick={() => document.getElementById("coverInput").click()}
                className="upload-button"
              >
                Change Cover Image
              </button>
            </div>
          </div>
        </div>

        <div className="buttonn">
          <button type="submit" disabled={submitting}>
            {submitting ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;