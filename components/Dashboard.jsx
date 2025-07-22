'use client';
import { useEffect, useState } from 'react';

export default function TreatmentList() {
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    fetch('/api/get-treatments')
      .then(res => res.json())
      .then(data => setTreatments(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/delete-treatment/${id}`, { method: 'DELETE' });
    setTreatments(treatments.filter(item => item._id !== id));
  };

  const handleEdit = (id) => {
    // Navigate to edit page or open modal
    console.log("Edit ID: ", id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Saved Treatments</h2>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Subcategories</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {treatments.length > 0 ? (
              treatments.map((treatment) => (
                <tr key={treatment._id} className="border-t">
                  <td className="px-6 py-4 text-sm text-gray-900">{treatment.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {treatment.subcategories.join(', ')}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(treatment._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(treatment._id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No treatments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
