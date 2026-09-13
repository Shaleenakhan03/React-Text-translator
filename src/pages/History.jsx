import { useEffect, useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import PageHeader from "../UI/PageHeader";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("history")) || [];

    setHistory(savedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };

  const deleteItem = (id) => {
    const updated = history.filter((item) => item.id !== id);

    localStorage.setItem("history", JSON.stringify(updated));

    setHistory(updated);
  };

  return (
    <div className="min-h-screen p-8">

      <div className="flex justify-between items-center mb-8">

        <PageHeader title="Translation History"
          subtitle="View and manage your recent translations."
        />

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Clear All
          </button>
        )}

      </div>

      {history.length === 0 ? (
        <p className="text-gray-500 text-lg">
          No translations yet.
        </p>
      ) : (
        history.map((item) => (
          <Card key={item.id} className="mb-5">
            <p>
              <strong>From:</strong> {item.sourceText}
            </p>

            <p className="mt-2">
              <strong>To:</strong> {item.translatedText}
            </p>

            <p className="text-sm text-gray-500 mt-3">
              {item.fromLanguage} ➜ {item.toLanguage}
            </p>

            <p className="text-sm text-gray-500">
              {item.date}
            </p>

            <div className="flex gap-3 mt-4">

              <Button
                variant="success"
                onClick={() =>
                  navigator.clipboard.writeText(item.translatedText)
                }
              >
                📋 Copy
              </Button>
              <Button
                variant="danger"
                onClick={() => deleteItem(item.id)}
              >
                🗑 Delete
              </Button>

            </div>
          </Card>
        ))
      )}
    </div>
  );
}

export default History;