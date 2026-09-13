import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import PageHeader from "../ui/PageHeader";
import { languages } from "../data/languages";

function TranslatorCard() {
    const { darkMode, fontSize } = useTheme();
    const [text, setText] = useState("");
    const [fromLanguage, setFromLanguage] = useState("en");
    const [language, setLanguage] = useState("hi");
    const [translatedText, setTranslatedText] = useState("");
    const [loading, setLoading] = useState(false);
    const headingSize = {
        small: "text-3xl",
        medium: "text-4xl",
        large: "text-5xl",
    };

    const subHeadingSize = {
        small: "text-lg",
        medium: "text-xl",
        large: "text-2xl",
    };
    const [recentLanguages, setRecentLanguages] = useState(() => {
        return JSON.parse(localStorage.getItem("recentLanguages")) || [];
    });

    const translateText = async () => {
        if (!text.trim()) {
            alert("Please enter some text.");
            return;
        }

        const url = `https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=${fromLanguage}&to=${language}&query=${encodeURIComponent(text)}`;

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
                "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
            },
            body: JSON.stringify({
                translate: "rapidapi",
            }),
        };

        try {
            setLoading(true);

            const response = await fetch(url, options);
            const result = await response.json();

            const translated = result.translation;

            setTranslatedText(translated);
            updateRecentLanguages(fromLanguage); updateRecentLanguages(language);

            // Save to History
            const history = JSON.parse(localStorage.getItem("history")) || [];

            history.unshift({
                id: Date.now(),
                sourceText: text,
                translatedText: translated,
                fromLanguage,
                toLanguage: language,
                date: new Date().toLocaleString(),
            });

            localStorage.setItem("history", JSON.stringify(history));

        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const copyTranslation = () => {
        navigator.clipboard.writeText(translatedText);
        alert("Translation copied!");
    };
    const updateRecentLanguages = (langCode) => {
        let updated = [
            langCode,
            ...recentLanguages.filter((code) => code !== langCode),
        ];

        // Keep only last 5
        updated = updated.slice(0, 5);

        setRecentLanguages(updated);

        localStorage.setItem(
            "recentLanguages",
            JSON.stringify(updated)
        );

    };

    return (
        <Card className="w-full max-w-3xl">

            <PageHeader
                title="🌍 AI Translator"
                subtitle="Translate between multiple languages instantly"
            />

            <Textarea
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something..."
            />

            <div className="grid md:grid-cols-2 gap-4 mt-6">

                <div>

                    <label className="font-semibold">
                        From
                    </label>

                    <Select
                        value={fromLanguage}
                        onChange={(e) => setFromLanguage(e.target.value)}
                    >
                        {recentLanguages.length > 0 && (
                            <optgroup label="⭐ Recently Used">
                                {recentLanguages.map((code) => {
                                    const lang = languages.find((l) => l.code === code);

                                    return (
                                        <option key={code} value={code}>
                                            {lang?.name}
                                        </option>
                                    );
                                })}
                            </optgroup>
                        )}

                        <optgroup label="🌍 All Languages">
                            {languages.map((lang) => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </optgroup>
                    </Select>

                </div>

                <div>

                    <label className="font-semibold">
                        To
                    </label>

                    <Select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full border rounded-xl p-3 mt-2"
                    >
                        {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                                {lang.name}
                            </option>
                        ))}
                    </Select>

                </div>

            </div>

            <div className="flex justify-center mt-5">

                <Button
                    variant="secondary"
                    onClick={() => {
                        const temp = fromLanguage;
                        setFromLanguage(language);
                        setLanguage(temp);
                    }}
                    className="bg-indigo-100 hover:bg-indigo-200 px-5 py-2 rounded-xl"
                >
                    🔄 Swap Languages
                </Button>

            </div>

            <Button
                variant="primary"
                className="w-full mt-6"
                onClick={translateText}
            >
                {loading ? "Translating..." : "Translate"}
            </Button>

            <div className="mt-8">

                <h2 className="text-2xl font-bold">
                    Translation
                </h2>

                <div className="border rounded-xl p-4 mt-3 min-h-[120px]">
                    {translatedText}
                </div>

            </div>

            <div className="flex gap-3 mt-5 flex-wrap">
                <Button
                    variant="success"
                    onClick={copyTranslation}
                >
                    📋 Copy
                </Button>
                <Button
                    variant="warning"
                    onClick={() => {
                        if (!translatedText) {
                            alert("Translate something first!");
                            return;
                        }

                        const favorites =
                            JSON.parse(localStorage.getItem("favorites")) || [];

                        favorites.unshift({
                            id: Date.now(),
                            sourceText: text,
                            translatedText,
                            fromLanguage,
                            toLanguage: language,
                        });

                        localStorage.setItem(
                            "favorites",
                            JSON.stringify(favorites)
                        );

                        alert("Added to Favorites ⭐");
                    }}
                    className="bg-yellow-500 text-white px-5 py-2 rounded-xl hover:bg-yellow-600"
                >
                    ⭐ Favorite
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {
                        setText("");
                        setTranslatedText("");
                    }}
                    className="bg-red-500 text-white px-5 py-2 rounded-xl"
                >
                    🗑 Clear
                </Button>

            </div>

        </Card>
    );
}

export default TranslatorCard;