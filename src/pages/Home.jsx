import TranslatorCard from "../components/TranslatorCard";
import { useTheme } from "../context/ThemeContext";

    function Home() {

        const { darkMode,fontsize } = useTheme();

        return (

            <div
                className={`min-h-screen flex justify-center items-center p-6 transition-all duration-500 ${darkMode
                        ? "bg-gray-900"
                        : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
                    }`}
            >
                <TranslatorCard />
            </div>
        );
    }

    export default Home;