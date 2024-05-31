import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

function ElicitationForm() {
  const [formData, setFormData] = useState({
    nivel_disponibilidad: "alta",
    experiencia_previa: "si",
    conocimiento_tecnico: "alto",
    conocimiento_tecnologias_existentes: "alto",
    tiempo_disponible: "alto",
    preferencias_comunicacion: "en persona",
    comprension_problemas: "alto",
    nivel_influencia: "alto",
    preferencias_entregables: "documento",
    expectativas_comunicacion: "alta",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    console.log(formData);
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://djg-ia-backend.onrender.com/get-elicitations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ elicitation: formData }),
        }
      );
      const data = await response.json();
      console.log(data);
      setResult(data.response);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header>
        <div className="container mx-auto px-6 center py-6">
          <h3 className="text-white text-3xl font-bold">
            Find the best elicitation technique
          </h3>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow border-2 border-green-500 border-dashed rounded-lg cursor-pointer bg-green-900 hover:bg-green-800 focus:bg-green-900 transition duration-300">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="nivel_disponibilidad"
            className="block text-lg font-medium text-gray-50 capitalize"
          >
            Availability Level
          </label>
          <select
            name="nivel_disponibilidad"
            id="nivel_disponibilidad"
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700"
          >
            <option value="alta">High</option>
            <option value="media">Medium</option>
            <option value="baja">Low</option>
          </select>

          <label
            htmlFor="experiencia_previa"
            className="block text-lg font-medium text-gray-50 capitalize"
          >
            Does the stakeholder have previous experience?
          </label>
          <select
            name="experiencia_previa"
            id="experiencia_previa"
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700"
          >
            <option value="si">Yes</option>
            <option value="no">No</option>
          </select>

          <label
            htmlFor="conocimiento_tecnico"
            className="block text-lg font-medium text-gray-50 capitalize"
          >
            Technical knowledge
          </label>
          <select
            name="conocimiento_tecnico"
            id="conocimiento_tecnico"
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700"
          >
            <option value="alto">High</option>
            <option value="medio">Medium</option>
            <option value="bajo">Low</option>
          </select>

          <label
            htmlFor="conocimiento_tecnologias_existentes"
            className="block text-lg font-medium text-gray-50 capitalize"
          >
            Knowledge of existing technologies
          </label>
          <select
            name="conocimiento_tecnologias_existentes"
            id="conocimiento_tecnologias_existentes"
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700"
          >
            <option value="alto">High</option>
            <option value="medio">Medium</option>
            <option value="bajo">Low</option>
          </select>

          <label
            htmlFor="tiempo_disponible"
            className="block text-lg font-medium text-gray-50 capitalize"
          >
            Available time
          </label>
          <select
            name="tiempo_disponible"
            id="tiempo_disponible"
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700"
          >
            <option value="alto">High</option>
            <option value="medio">Medium</option>
            <option value="bajo">Low</option>
          </select>

          <label
            htmlFor="preferencias_comunicacion"
            className="block text-lg font-medium text-gray-50 capitalize"
          >
            Communication preferences
          </label>
          <select
            name="preferencias_comunicacion"
            id="preferencias_comunicacion"
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700"
          >
            <option value="en persona">In Site Oral</option>
            <option value="videoconferencia">Video Call</option>
            <option value="llamada">Call</option>
            <option value="correo">Email</option>
          </select>

          <label
            htmlFor="comprension_problemas"
            className="block text-lg font-medium text-gray-50 capitalize"
          >
            Problem understanding
          </label>
          <select
            name="comprension_problemas"
            id="comprension_problemas"
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700"
          >
            <option value="alto">High</option>
            <option value="medio">Medium</option>
            <option value="bajo">Low</option>
          </select>

          <label
            htmlFor="nivel_influencia"
            className="block text-lg font-medium text-gray-50 capitalize"
          >
            Influence level
          </label>
          <select
            name="nivel_influencia"
            id="nivel_influencia"
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700"
          >
            <option value="alto">High</option>
            <option value="medio">Medium</option>
            <option value="bajo">Low</option>
          </select>

          <label
            htmlFor="preferencias_entregables"
            className="block text-lg font-medium text-gray-50 capitalize"
          >
            Deliverables preferences
          </label>
          <select
            name="preferencias_entregables"
            id="preferencias_entregables"
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700"
          >
            <option value="documento">Document</option>
            <option value="presentacion">Presentation</option>
            <option value="prototipo">Prototype</option>
            <option value="otro">Other</option>
          </select>

          <label
            htmlFor="expectativas_comunicacion"
            className="block text-lg font-medium text-gray-50 capitalize"
          >
            Communication expectations
          </label>
          <select
            name="expectativas_comunicacion"
            id="expectativas_comunicacion"
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700"
          >
            <option value="alta">High</option>
            <option value="media">Medium</option>
            <option value="baja">Low</option>
          </select>

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
        </form>
        {loading && <p>Loading...</p>}
        {result && <ReactMarkdown>{result}</ReactMarkdown>}
      </div>
    </>
  );
}

export default ElicitationForm;
