import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

function SRSForm() {
    const [requirements, setRequirements] = useState([
        { Requisito: '', Tipo: '', Prioridad: '' }
    ]);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRequirementChange = (index, event) => {
        const newRequirements = requirements.map((requirement, reqIndex) => {
            if (index === reqIndex) {
                return { ...requirement, [event.target.name]: event.target.value };
            }
            return requirement;
        });
        setRequirements(newRequirements);
    };

    const addRequirement = () => {
        setRequirements([...requirements, { Requisito: '', Tipo: '', Prioridad: '' }]);
    };

    const removeRequirement = (index) => {
        const filteredRequirements = requirements.filter((_, reqIndex) => index !== reqIndex);
        setRequirements(filteredRequirements);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('https://djg-ia-backend.onrender.com/generate_srs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ requirements: requirements.map((req, index) => ({ ...req, Numero: index + 1 })) })
            });
            const data = await response.json();
            setResult(data.srs_document);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing your request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 rounded-lg shadow bg-green-900 hover:bg-green-800 transition duration-300">
            <form onSubmit={handleSubmit} className="space-y-4">
                {requirements.map((requirement, index) => (
                    <div key={index} className="p-4 bg-green-700 rounded-md shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-lg font-medium text-gray-50">Index</label>
                                <span className="block mt-1 py-2 px-3 bg-gray-200 rounded-md text-gray-800">{index + 1}</span>
                            </div>
                            
                            <div className="col-span-2 md:col-span-1">
                                <label htmlFor={`Tipo${index}`} className="block text-lg font-medium text-gray-50 capitalize">Type</label>
                                <select
                                    name="Tipo"
                                    id={`Tipo${index}`}
                                    value={requirement.Tipo}
                                    onChange={(event) => handleRequirementChange(index, event)}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700"
                                >
                                    <option value="RF">RF</option>
                                    <option value="RNF">RNF</option>
                                </select>
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label htmlFor={`Prioridad${index}`} className="block text-lg font-medium text-gray-50 capitalize">Priority</label>
                                <select
                                    name="Prioridad"
                                    id={`Prioridad${index}`}
                                    value={requirement.Prioridad}
                                    onChange={(event) => handleRequirementChange(index, event)}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700"
                                >
                                    <option value="M">M</option>
                                    <option value="S">S</option>
                                    <option value="C">C</option>
                                    <option value="W">W</option>
                                </select>
                            </div>

                            <div className="col-span-3">
                                <label htmlFor={`Requisito${index}`} className="block text-lg font-medium text-gray-50 capitalize">Requirement</label>
                                <textarea
                                    name="Requisito"
                                    id={`Requisito${index}`}
                                    value={requirement.Requisito}
                                    onChange={(event) => handleRequirementChange(index, event)}
                                    className="mt-1 block w-full text-gray-800 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 h-32 resize-none"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-2">
                            <button
                                type="button"
                                onClick={() => removeRequirement(index)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addRequirement}
                    className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 transition duration-300"
                >
                    Add Requirement
                </button>
                <div className="flex items-center justify-center w-full mt-4 gap-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 transition duration-300"
                    >
                        Submit
                    </button>
                    <Link to="/">
                        <button className="px-4 py-2 bg-green-900 text-white rounded hover:bg-green-800 transition duration-300">
                            Go Home
                        </button>
                    </Link>
                </div>
            </form>
            {loading && <div className="text-center">Loading...</div>}
            {result && (
                <div className="mt-4 p-4 bg-green-800 rounded shadow">
                    <ReactMarkdown>{result}</ReactMarkdown>
                </div>
            )}
        </div>
    );
}

export default SRSForm;
