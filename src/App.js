import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCrawl = async () => {
    if (!url) return alert("Please enter a URL!");

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.data);
      }
    } catch (err) {
      setError("Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}> Web Crawler</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter website URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleCrawl} style={styles.button}>
          Crawl
        </button>
      </div>

      {loading && <p style={styles.info}> Crawling...</p>}
      {error && <p style={styles.error}> {error}</p>}
      {result && (
        <div style={styles.resultBox}>
          <h3> Crawled Successfully</h3>
          <p><strong>URL:</strong> {result.url}</p>
          <p><strong>Title:</strong> {result.title}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "60px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    color: "#222",
    fontSize: "28px",
  },
  inputContainer: {
    marginTop: "20px",
  },
  input: {
    padding: "10px",
    width: "300px",
    borderRadius: "8px",
    border: "1px solid #aaa",
    marginRight: "10px",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  info: { color: "#555", marginTop: "20px" },
  error: { color: "red", marginTop: "20px" },
  resultBox: {
    marginTop: "30px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    display: "inline-block",
    textAlign: "left",
    backgroundColor: "#f9f9f9",
  },
};

export default App;
