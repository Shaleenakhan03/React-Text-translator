import { useEffect, useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import PageHeader from "../UI/PageHeader";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(saved);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((item) => item.id !== id);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );

    setFavorites(updated);
  };

  return (
    <div className="min-h-screen p-8">

      <PageHeader
        title="⭐ Favorites"
        subtitle="Your saved translations."
      />

      {favorites.length === 0 ? (
        <p>No favorites added.</p>
      ) : (
        favorites.map((item) => (
          <Card key={item.id} className="mb-5">
            <p>
              <strong>From:</strong> {item.sourceText}
            </p>

            <p className="mt-2">
              <strong>To:</strong> {item.translatedText}
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
                onClick={() => removeFavorite(item.id)}
              >
                🗑 Remove
              </Button>

            </div>

          </Card>
        ))
      )}
    </div>
  );
}

export default Favorites;