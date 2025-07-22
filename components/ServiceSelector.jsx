'use client';
import { useState } from 'react';
import { servicesData } from '@/data/serviceData';

export default function ServiceSelector() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleCategory = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSubcategoryToggle = (subcategory) => {
    setSelectedSubs((prev) =>
      prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory]
    );
  };

  const handleSave = async () => {
    if (selectedSubs.length === 0) {
      alert('Please select at least one subcategory.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/save-treatments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedServices: selectedSubs }),
      });

      const data = await res.json();

      if (data.success) {
        alert('Selections saved successfully!');
        setSelectedSubs([]);
        setExpandedIndex(null);
      } else {
        alert('Failed to save selections.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Select Medical Services</h2>

      <div className="space-y-4">
        {servicesData.map((service, index) => (
          <div key={index} className="border rounded-lg shadow-md">
            <div
              className="bg-blue-100 px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-blue-200 transition"
              onClick={() => toggleCategory(index)}
            >
              <span className="text-lg font-semibold text-blue-900">{service.category}</span>
              <span className="text-sm text-blue-600">{expandedIndex === index ? '▲' : '▼'}</span>
            </div>

            {expandedIndex === index && (
              <div className="p-4 space-y-2 bg-white">
                {service.subcategories.map((sub, i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedSubs.includes(sub)}
                      onChange={() => handleSubcategoryToggle(sub)}
                      className="accent-blue-600 w-4 h-4"
                    />
                    <span className="text-gray-700">{sub}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected Items */}
      {selectedSubs.length > 0 && (
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded p-4">
          <h4 className="font-semibold text-gray-800 mb-2">Selected Subcategories:</h4>
          <ul className="list-disc list-inside text-gray-700">
            {selectedSubs.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Save Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleSave}
          disabled={loading}
          className={`px-6 py-2 text-white rounded-lg shadow-md ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Saving...' : 'Save Selections'}
        </button>
      </div>
    </div>
  );
}
