"use client";
import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import docsIcon from "@/public/docs.png";
import logoutIcon from "@/public/logout.png";
import copyIcon from "@/public/copy.png";
import historyIcon from "@/public/history.png";
import historyBlueIcon from "@/public/history-blue.png";
import M from "materialize-css";

const languages = [
  { code: "ar", name: "العربية" }, // Arapça
  { code: "az", name: "Azeri" },
  { code: "de", name: "Deutsch" }, // Almanca
  { code: "en", name: "English" },
  { code: "fa", name: "فارسی" }, // Farsça
  { code: "fr", name: "Français" },
  { code: "ja", name: "日本語" }, // Japonca
  { code: "nl", name: "Nederlands" }, // Felemenkçe
  { code: "no", name: "Norsk" }, // Norveççe
  { code: "uz", name: "Oʻzbekcha" },
  { code: "so", name: "Soomaali" },
  { code: "tr", name: "Türkçe" },
];

export default function Home() {
  const { data: session, status } = useSession();
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState(languages[3].code);
  const [targetLanguage, setTargetLanguage] = useState(languages[11].code);
  const [history, setHistory] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [showStar, setShowStar] = useState(false);
  const [sourceDropdownOpen, setSourceDropdownOpen] = useState(false);
  const [targetDropdownOpen, setTargetDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [recentSourceLanguages, setRecentSourceLanguages] = useState([
    "en",
    "tr",
    "ar",
  ]);
  const [recentTargetLanguages, setRecentTargetLanguages] = useState([
    "tr",
    "en",
    "ar",
  ]);

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: session.user.email,
          provider: session.user.provider,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setHistory(data.history);
      } else {
        console.error("Failed to fetch history");
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };
  const entriesToDisplay = showAll ? history : history.slice(0, 5);

  const addStar = async (objectID, add) => {
    console.log(objectID);
    try {
      const res = await fetch("/api/saveTranslation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail,
          provider,
          objectID,
          add,
        }),
      });
      fetchHistory();
      if (!res.ok) {
        console.error("Error from save translation API:", res.statusText);
        return;
      }
    } catch (error) {
      console.error("Error in addStar:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchHistory();
    }
  }, [session]);

  if (!session) {
    setTimeout(function () {}, 1000);
  }
  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-8xl">
        ◌
      </div>
    );
  }
  const dropdowns = document.querySelectorAll(".dropdown-trigger");
  M.Dropdown.init(dropdowns);

  const mail = session.user.email;
  const provider = session.user.provider;

  const handleTranslate = async (e) => {
    setText(e);
    if (text.length > 4096) {
      setTranslatedText("Please enter a shorter text");
      return;
    }
    if (!translatedText.includes(".."))
      setTranslatedText(`${translatedText} ..`);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          sourceLanguage,
          targetLanguage,
          mail,
          provider,
        }),
      });

      if (!res.ok) {
        console.error("Error from translate API:", res.statusText);
        setTranslatedText("Translation failed");
        return;
      }
      const data = await res.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error("Error in handleTranslate:", error);
      setTranslatedText("Translation failed");
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleTranslate(event.target.result);
      };
      reader.readAsText(file);
    }
  };
  const switchLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
  };
  const handleHistoryButton = () => {
    setShowHistory(true);
    setShowStar(false);
  };
  const handleStarButton = () => {
    setShowHistory(false);
    setShowStar(true);
  };
  const sourceLanguageChange = (lang) => {
    setSourceLanguage(lang);
    setRecentSourceLanguages(() => {
      const updatedLanguages = [...recentSourceLanguages];
      updatedLanguages.unshift(lang);
      updatedLanguages.pop();
      return updatedLanguages;
    });
  };
  const targetLanguageChange = (lang) => {
    setTargetLanguage(lang);
    setRecentTargetLanguages(() => {
      const updatedLanguages = [...recentTargetLanguages];
      updatedLanguages.unshift(lang);
      updatedLanguages.pop();
      return updatedLanguages;
    });
  };
  const toggleDropdownSource = () => setSourceDropdownOpen(!sourceDropdownOpen);
  const toggleDropdownTarget = () => setTargetDropdownOpen(!targetDropdownOpen);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center p-2">
        <h1 className="text-2xl font-bold">Mütercim</h1>
        <div className="flex space-x-4 items-center">
          <button
            className="flex justify-center items-center p-2 h-10 w-24 hover:bg-f4f7fc rounded-lg text-sm"
            onClick={() => fileInputRef.current.click()}
          >
            <Image
              className="p-1 rounded-md items-center justify-center"
              src={docsIcon}
              width={32}
              height={32}
              alt="Document Icon"
            />
          </button>
          <input
            id="fileInput"
            ref={fileInputRef}
            type="file"
            accept=".txt"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            className="flex justify-center items-center h-10 w-28 hover:bg-f4f7fc text-sm rounded-lg"
            onClick={() => signOut()}
          >
            <Image
              className="p-1 rounded-md"
              src={logoutIcon}
              width={32}
              height={32}
              alt="Logout Icon"
            />
          </button>
        </div>
      </div>

      <div className="relative flex flex-row mt-4 w-full h-80">
        <button
          className="h-10 w-12 z-10 absolute bottom-[20%] left-[48.5%]
              flex items-center justify-center p-2 bg-d3e3fd text-gray-900 rounded-lg hover:bg-c8e6fc"
          onClick={switchLanguages}
        >
          ⇆
        </button>
        <div className="relative flex flex-col w-1/2 h-full">
          <div className="flex justify-start space-x-2 items-center m-4">
            {recentSourceLanguages.map((lang) => (
              <button
                key={lang}
                className={`h-10 w-24 p-2 rounded-lg hover:bg-f4f7fc ${
                  lang === sourceLanguage ? "bg-c8e6fc" : ""
                }`}
                onClick={() => sourceLanguageChange(lang)}
              >
                {languages.find((l) => l.code === lang)?.name}
              </button>
            ))}
            <button
              className={`btn p-2 rounded-md ${
                sourceDropdownOpen ? "bg-d3e3fd" : "hover:bg-d3e3fd"
              }`}
              onClick={toggleDropdownSource}
            >
              {sourceDropdownOpen ? "︿" : "﹀"}
            </button>
            <ul
              className={`absolute z-10 grid grid-cols-2 gap-1 top-[20%] left-[40%] p-1 mt-2 w-52 rounded shadow-lg ${
                sourceDropdownOpen ? "block" : "hidden"
              }`}
            >
              {languages.map((lang) => (
                <li key={lang.code}>
                  <a
                    href="#"
                    className="block p-2 text-gray-800 hover:bg-c8e6fc rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      sourceLanguageChange(lang.code);
                    }}
                  >
                    {lang.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <textarea
            className="w-full h-full relative p-3 px-5 pb-5 border-t rounded-lg resize-none outline-none"
            rows="8"
            value={text}
            onChange={(e) => handleTranslate(e.target.value)}
            placeholder="Enter text here..."
          ></textarea>
          <p className="h-6 w-16 absolute z-10 bottom-[4%] right-[2%] p-1 text-xs text-gray-800">
            {text.length}/4096
          </p>
        </div>

        <div className="relative flex flex-col w-1/2 h-full bg-f4f7fc">
          <div className="flex justift-start space-x-2 items-center m-4">
            {recentTargetLanguages.map((lang) => (
              <button
                key={lang}
                className={`h-10 w-24 p-2 rounded-lg hover:bg-gray-200 ${
                  lang === targetLanguage ? "bg-c8e6fc" : ""
                }`}
                onClick={() => targetLanguageChange(lang)}
              >
                {languages.find((l) => l.code === lang)?.name}
              </button>
            ))}
            <button
              className={`btn p-2 rounded-md ${
                targetDropdownOpen ? "bg-d3e3fd" : "hover:bg-d3e3fd"
              }`}
              onClick={toggleDropdownTarget}
            >
              {targetDropdownOpen ? "︿" : "﹀"}
            </button>
            <ul
              className={`absolute z-10 grid grid-cols-2 gap-1 top-[20%] left-[40%] p-1 mt-2 w-52 rounded shadow-lg ${
                targetDropdownOpen ? "block" : "hidden"
              }`}
            >
              {languages.map((lang) => (
                <li key={lang.code}>
                  <a
                    href="#"
                    className="block p-2 text-gray-800 hover:bg-c8e6fc rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      targetLanguageChange(lang.code);
                    }}
                  >
                    {lang.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full h-full p-3 px-5 pb-5 border-t rounded-lg">
            <p>{translatedText}</p>
          </div>
          <button
            className="h-8 w-8 absolute bottom-[4%] right-[5%] p-1 rounded-lg hover:bg-gray-200"
            onClick={() => navigator.clipboard.writeText(translatedText)}
          >
            <Image
              className="p-1 rounded-md"
              src={copyIcon}
              width={32}
              height={32}
              alt="Copy Icon"
            />
          </button>
        </div>
      </div>

      <div className="ml-6 flex">
        <button
          className={`p-1 flex items-center justify-center rounded-md text-s ${
            showHistory
              ? "text-blue-500 border-b-2 border-blue-700"
              : "hover:bg-f4f7fc"
          }`}
          onClick={handleHistoryButton}
        >
          <Image
            className="p-1 flex items-center justify-center rounded-md"
            src={showHistory ? historyBlueIcon : historyIcon}
            width={24}
            height={24}
            alt="History Icon"
          />
          History
        </button>
        <button
          className={`ml-2 p-1 flex items-center justify-center rounded-md text-xl ${
            showStar
              ? "text-blue-500 border-b-2 border-blue-700"
              : "hover:text-gray-500"
          }`}
          onClick={handleStarButton}
        >
          ★<span className="text-base">&nbsp;Saved</span>
        </button>
      </div>

      <div className="grid gap-x-8 gap-y-4 grid-cols-3 p-8">
        {showHistory &&
          entriesToDisplay.map((entry) => (
            <div
              key={entry._id}
              className="p-4 bg-f4f7fc rounded-lg h-fit w-full"
            >
              <div className="flex pr-2 justify-between items-center">
                <h3 className="w-fit p-2 bg-c8e6fc rounded-lg">
                  {languages.find((lang) => lang.code === entry.sourceLanguage)
                    ?.name +
                    ">" +
                    languages.find((lang) => lang.code === entry.targetLanguage)
                      ?.name}
                </h3>
                <button
                  className="flex items-center justify-center rounded-md px-1 text-xl hover:text-gray-500"
                  onClick={() => addStar(entry._id, !entry.isStar)}
                >
                  {entry.isStar ? "★" : "☆"}
                </button>
              </div>
              <br />

              <p className="font-medium">{entry.originalText}</p>
              <br />
              <p>{entry.translatedText}</p>
            </div>
          ))}
        {showHistory && !showAll && history.length > 5 && (
          <button
            onClick={() => setShowAll(true)}
            className="flex items-center justify-center m-12 p-4 bg-f4f7fc rounded-lg hover:bg-c8e6fc"
          >
            Show All
          </button>
        )}
        {showStar &&
          history
            .filter((entry) => entry.isStar === true)
            .map((entry) => (
              <div
                key={entry._id.$oid}
                className="p-4 bg-f4f7fc rounded-lg h-fit w-full"
              >
                <div className="flex pr-2 justify-between items-center">
                  <h3 className="w-fit p-2 bg-c8e6fc rounded-lg">
                    {languages.find(
                      (lang) => lang.code === entry.sourceLanguage
                    )?.name +
                      ">" +
                      languages.find(
                        (lang) => lang.code === entry.targetLanguage
                      )?.name}
                  </h3>
                  <button
                    className="flex items-center justify-center rounded-md px-1 text-xl hover:text-gray-500"
                    onClick={() => addStar(entry._id, false)}
                  >
                    ★
                  </button>
                </div>
                <br />

                <p className="font-medium">{entry.originalText}</p>
                <br />
                <p>{entry.translatedText}</p>
              </div>
            ))}
      </div>
    </div>
  );
}
