import React, { useState } from 'react';
import './index.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    {
      name: 'Aarav Deshmukh',
      image: 'https://images.unsplash.com/photo-1605733517503-5c0f5e68efad?auto=format&fit=crop&w=200&q=80',
      quote: 'Campus Bites completely changed how I manage my meals. The food is always fresh, and I never skip breakfast anymore!',
    },
    {
      name: 'Priya Nair',
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80',
      quote: 'Affordable, tasty, and convenient! I recommend it to all my hostel friends. The All Access plan is a lifesaver.',
    },
    {
      name: 'Rohan Patil',
      image: 'https://images.unsplash.com/photo-1577907982214-d854829fb137?auto=format&fit=crop&w=200&q=80',
      quote:'I love the variety in the lunch and dinner menus. Plus, the late-night snack discounts are amazing for my midnight cravings!',
    },
    {
      name: 'Sneha Kulkarni',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
      quote:'The staff is super friendly, and the meals are always served hot. Best decision I made this semester!',
    },
    {
      name: 'Dev Mehra',
      image: 'https://images.unsplash.com/photo-1613145995013-8ed423b0c183?auto=format&fit=crop&w=200&q=80',
      quote:'Mess food that actually tastes good? Yes, please! I’ve been eating here for months and still love it.',
    },
  ]);

  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    quote: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quote) return;

    setTestimonials((prev) => [
      ...prev,
      {
        name: formData.name,
        image:
          formData.image ||
          'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        quote: formData.quote,
      },
    ]);

    setFormData({ name: '', image: '', quote: '' });
    setFormVisible(false);
  };

  return (
    <section id="testimonials" className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">What Students Say</h2>
        <div className="w-20 h-1 
         mx-auto mb-12"></div>

        {/* Testimonials Slider */}
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 px-2 snap-x snap-mandatory mb-12">
          {testimonials.map((t, index) => (
            <div
              key={index}
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
        Image URL (optional)
      </label>
      <input
        type="url"
        name="image"
        value={formData.image}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200"
      />
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
