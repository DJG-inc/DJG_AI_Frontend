import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

function RecordForm() {
  const [loading, setLoading] = useState(false);
  const [minutesDocument, setMinutesDocument] = useState("");
  const [fileName, setFileName] = useState(""); // Nuevo estado para el nombre del archivo

  // Manejar la selección de archivos
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Establecer el nombre del archivo seleccionado
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const fileInput = document.getElementById("dropzone-file");
    if (!fileInput.files.length) {
      alert("Please select a file first.");
      return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("audio", file);

    setLoading(true);
    try {
      const response = await fetch(
        "https://djg-ia-backend.onrender.com/generate_reunion",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      setMinutesDocument(result.acta_reunion);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <header>
        <div className="container mx-auto px-6 center py-6">
          <h3 className="text-white text-3xl font-bold">
            Generate Record of Meeting
          </h3>
        </div>
      </header>

      <section className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="dropzone-label relative flex flex-col items-center justify-center w-full h-35 border-2 border-green-500 border-dashed rounded-lg cursor-pointer bg-green-900 hover:bg-green-800 focus:bg-green-900 transition duration-300"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-vinyl"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#FFFFFF"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M16 3.937a9 9 0 1 0 5 8.063" />
                <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M20 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M20 4l-3.5 10l-2.5 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-50">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-300">
                {fileName || "MP3, WAV, AIFF or WMA"} {/* Mostrar el nombre del archivo */}
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} /> {/* Agregar el controlador de cambios */}
          </label>
        </div>
        <div className="flex items-center justify-center w-full mt-4 gap-4">
          <button
            className="px-4 py-2 bg-green-700 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <Link to="/">
            <button className="px-4 py-2 bg-green-900 text-white rounded">
              Go Home
            </button>
          </Link>
        </div>
      </section>

      {loading && (
        <section id="loading" className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-center w-full">
            <div className="loader border-4 border-gray-200 border-t-4 border-t-green-500 rounded-full w-12 h-12 animate-spin"></div>
            <p className="text-white ml-4">Processing...</p>
          </div>
        </section>
      )}

      {minutesDocument && (
        <section id="result" className="container mx-auto px-6 py-6">
          <h3 className="text-white text-2xl font-bold">Meeting Record</h3>
          <div
            id="minutes-document"
            className="text-white bg-gray-800 p-4 rounded"
          >
            <ReactMarkdown>{minutesDocument}</ReactMarkdown>
          </div>
        </section>
      )}
    </div>
  );
}

export default RecordForm;
