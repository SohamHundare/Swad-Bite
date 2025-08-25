import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    quote: '',
  });

  // Fetch testimonials from backend on mount
  useEffect(() => {
    axios.get('https://swadbite-backend-2.onrender.com/api/testimonials')
      .then(res => setTestimonials(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quote) return;

    axios.post('https://swadbite-backend-2.onrender.com/api/testimonials', {
      name: formData.name,
      image: formData.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      quote: formData.quote,
    })
      .then(res => {
        setTestimonials(prev => [...prev, res.data]);
        setFormData({ name: '', image: '', quote: '' });
        setFormVisible(false);
      })
      .catch(err => console.error(err));
  };

  return (
    <section id="testimonials" className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">What Students Say</h2>
        <div className="w-20 h-1 mx-auto mb-12"></div>

        {/* Testimonials Slider */}
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 px-2 snap-x snap-mandatory mb-12">
          {testimonials.map((t, index) => (
            <div
              key={t._id || index}
              className="min-w-[320px] max-w-sm bg-white p-6 rounded-xl shadow-md snap-center shrink-0 hover:shadow-xl transition duration-300"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-amber-400 object-cover"
              />
              <p className="text-gray-700 italic mb-4">"{t.quote}"</p>
              <h4 className="text-lg font-semibold text-gray-800">{t.name}</h4>
            </div>
          ))}
        </div>

        {!formVisible && (
          <button
            onClick={() => setFormVisible(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-lg transition transform hover:scale-105 shadow-md"
          >
            Share Your Experience
          </button>
        )}

        {/* Feedback Form */}
        {formVisible && (
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10 text-left animate-fadeIn transition-all duration-700"
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Upload Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200"
              />
              {/* Preview uploaded image */}
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-16 h-16 rounded-full mt-2 object-cover"
                />
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Feedback *</label>
              <textarea
                name="quote"
                required
                rows="4"
                value={formData.quote}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200"
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-lg transition transform hover:scale-105 shadow-md"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setFormVisible(false)}
                className="text-red-500 font-medium hover:underline hover:text-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Testimonials;