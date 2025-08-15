// src/Menu.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../HomePAge/Navbar';

// --- (menuData, helpers, and imageMap are the same as your provided code) ---
const menuData = {
  Monday: {
    breakfast: ["Poha"],
    lunch: ["Dal Tadka", "Jeera Rice", "Mixed Veg Sabzi", "Salad"],
    dinner: ["Paneer Butter Masala", "Tawa Roti", "Cucumber Raita", "Halwa"],
  },
  Tuesday: {
    breakfast: ["Upma"],
    lunch: ["Chole", "Bhature", "Halwa"],
    dinner: ["Vegetable Pulao", "Raita", "Boondi Laddu"],
  },
  Wednesday: {
    breakfast: ["Aloo Paratha"],
    lunch: ["Rajma", "Steamed Rice", "Dal Tadka", "Papad"],
    dinner: ["Matar Paneer", "Tandoori Roti", "Onion Raita", "Rasgulla"],
  },
  Thursday: {
    breakfast: ["Idli with Sambar"],
    lunch: ["Sambar Rice", "Beans Poriyal", "GulabJamun", "Appalam"],
    dinner: ["Kadhi Pakora", "Moong Dal Khichdi", "Fried Papad", "Halwa"],
  },
  Friday: {
    breakfast: ["Masala Dosa"],
    lunch: ["Paneer Bhurji", "Chapati", "Green Salad"],
    dinner: ["Lauki Kofta", "Tandoori Roti", "Fried Papad", "Rice Kheer"],
  },
  Saturday: {
    breakfast: ["Bread Pakora"],
    lunch: ["Pav Bhaji", "Onion Rings (side)", "Lemonade"],
    dinner: ["Vegetable Biryani", "Onion Raita", "Gajar Halwa"],
  },
  Sunday: {
    breakfast: ["Sheera"],
    lunch: ["Poori", "Aloo Sabzi", "Green Salad", "Shrikhand (sweet)"],
    dinner: ["Veg Hakka Noodles", "Manchurian Gravy", "Lemonade"],
  },
};

/* ===== HELPERS ===== */

// Deterministic price generator (keeps price stable)
function deterministicPrice(name, mealType) {
  let s = 0;
  for (let i = 0; i < name.length; i++) s = (s * 31 + name.charCodeAt(i)) >>> 0;
  const ranges = {
    breakfast: [25, 120],
    lunch: [80, 260],
    dinner: [100, 400],
  };
  const [min, max] = ranges[mealType] || [60, 220];
  return min + (s % (max - min + 1));
}

function makeDescription(name, mealType, day) {
  return `${name} — a classic ${mealType} option for ${day}. Freshly prepared, home-style flavors.`;
}

/* ===== IMAGE MAP (Unsplash-style search links) ===== */
const imageMap = {
  // Breakfast
  Poha: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/11/poha.jpg",
  Upma: "https://www.shutterstock.com/image-photo/upma-made-samolina-rava-most-260nw-1904780032.jpg",
  "Aloo Paratha": "https://www.shutterstock.com/image-photo/aloo-paratha-popular-north-indian-600nw-2547389027.jpg",
  "Idli with Sambar": "https://t4.ftcdn.net/jpg/04/39/31/29/360_F_439312935_lxOEQSqasYc5GeyHKgYJXWCIFm8gmQUN.jpg",
  "Masala Dosa": "https://t4.ftcdn.net/jpg/01/89/45/21/360_F_189452136_gJBG4ZRXY9NnZZCGV2s8QhObmpeerJTO.jpg",
  "Bread Pakora": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy8e3173QSKmujZElaFMvMjHI2P8hv-gKFrA&s",
  Sheera: "https://i.ytimg.com/vi/oLfpQmbl6cY/maxresdefault.jpg",

  // Breakfast beverages & sides (if shown)
  "Masala Chai": "https://source.unsplash.com/featured/?masala-chai,tea",
  "Filter Coffee": "https://source.unsplash.com/featured/?filter-coffee,coffee",
  "Masala Tea": "https://source.unsplash.com/featured/?masala-tea,tea",
  Banana: "https://source.unsplash.com/featured/?banana,fruit",
  "Toast with Butter": "https://source.unsplash.com/featured/?butter-toast,toast",
  Curd: "https://source.unsplash.com/featured/?curd,yogurt",
  Pickle: "https://source.unsplash.com/featured/?achar,pickle",
  Lassi: "https://source.unsplash.com/featured/?lassi,yogurt-drink",

  // Lunch & Dinner mains and sides
  "Dal Tadka": "https://www.shutterstock.com/image-photo/dal-tadka-indian-vegetarian-restaurant-600nw-2490144925.jpg",
  "Jeera Rice": "https://vaya.in/recipes/wp-content/uploads/2019/01/Jeera-Rice.jpg",
  "Mixed Veg Sabzi": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhFmMGJlfxGvp0zGmsGjUijCWxynckzwvYfQ&s",
  Salad: "https://cdn1.foodviva.com/static-content/food-images/salad-recipes/vegetable-salad-recipe/vegetable-salad-recipe.jpg",
  Rajma: "data:image/jpeg;base64,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",
  "Steamed Rice": "https://assets.epicurious.com/photos/57d70c8ade27564257b657c6/master/pass/perfect-steamed-rice.jpg",
  "Bhindi Fry": "https://www.whiskaffair.com/wp-content/uploads/2020/11/Bhindi-Masala-2-3.jpg",
  Papad: "https://gurukripahotel.com/wp-content/uploads/2025/04/Roasted-Papad.png",
  Chole: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/08/chole-recipe.jpg",
  Bhature: "https://foodsandflavorsbyshilpi.com/wp-content/uploads/2016/09/FB-Thumnails-website-old-2.jpg",
  "Onion Salad": "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/07/onion-salad-recipe.jpg",
  "Sambar Rice": "https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2018/03/cabbage-sambar-recipe.jpg?ssl=1",
  "Beans Poriyal": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSovC8bl72Feug9Zk3NIx4-bUUQp9_yk0g1Lg&s",
  Appalam: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd6tlQy1127mo1FI5hiTDSpAzRoXE6_UU7ew&s",
  "Paneer Butter Masala": "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/07/paneer-butter-masala-recipe.jpg",
  "Tawa Roti": "https://parafit.in/wp-content/uploads/2019/03/Tawa-Roti.jpg",
  "Cucumber Raita": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxFHSbLq1c4ZfkSUwlVlpLOGzhuivQGcEUrw&s",
  GulabJamun: "https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2016/10/gulab-jamun-using-mix.jpg?w=1200&ssl=1",
  "Vegetable Pulao": "https://www.indianveggiedelight.com/wp-content/uploads/2019/07/veg-pulao-featured.jpg",
  Raita: "https://www.indianveggiedelight.com/wp-content/uploads/2017/06/cucumber-raita-recipe-featured.jpg",
  "Boondi Laddu": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScG770Mqyh1wKjZCTUl6BgVYHjpGiROfnB1A&s",
  "Matar Paneer": "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/03/matar-paneer.jpg",
  "Tandoori Roti": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfqOHcz4FS240YCbDV-DVsu1PtYMyrK5PPog&s",
  Rasgulla: "https://prashantcorner.com/cdn/shop/files/RasgullaSR-1_f6196154-1993-44e5-af5b-51e2ada24d3d.png?v=1720595119",
  "Kadhi Pakora": "https://www.vegrecipesofindia.com/wp-content/uploads/2012/01/punjabi-kadhi-pakora-recipe-1.jpg",
  "Moong Dal Khichdi": "https://www.vegrecipesofindia.com/wp-content/uploads/2021/02/khichdi-recipe-4-500x500.jpg",
  "Fried Papad": "https://cdn.jhattse.com/resize?width=640&url=https://jhattse.com/api/v1/file/?key=images/product/114599/108419/MI896EAA-Fry-papad-1.jpg&quality=75&type=webp",
  Halwa: "https://www.vegrecipesofindia.com/wp-content/uploads/2021/11/gajar-halwa-carrot-halwa.jpg",
  "Paneer Bhurji": "https://vegecravings.com/wp-content/uploads/2022/04/Paneer-Bhurji-Recipe-Step-By-Step-Instructions.jpg",
  Chapati: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9VbdMoqOHcHqZq5AI9CBkPdBQlU2tv0BFqA&s",
  "Green Salad": "https://cdn.loveandlemons.com/wp-content/uploads/2021/04/green-salad-1.jpg",
  "Lauki Kofta": "https://cdn1.foodviva.com/static-content/food-images/lunch-recipes/lauki-kofta-curry/lauki-kofta-curry.jpg",
  "Rice Kheer": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ62xXC1psHAvh3eLvWwDJUgiJWvxEQQrl0ug&s",
  "Pav Bhaji": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxrcdz1CvJlUCzN10Zl1DpMcReubv57ujLw&s",
  "Onion Rings (side)": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkeYXgqqs2m0LIy6bowMqi8fn3YQY9QBoSIg&s",
  "Vegetable Biryani": "https://i.ytimg.com/vi/Do7ZdUodDdw/maxresdefault.jpg",
  "Onion Raita": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaKChFvqZV7xPtwAHF8rwGEEfyJKuny3luVg&s",
  "Gajar Halwa": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Cuisine_%28268%29_44.jpg/640px-Cuisine_%28268%29_44.jpg",
  Poori: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-aMUAYtAuFnjtomDgtFCDyKB9VPTrwnmjuA&s",
  "Aloo Sabzi": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLoCLCrgAwOPaZQCzNOaRKRZ7RL4znNdZQqA&s",
  "Shrikhand (sweet)": "https://www.indianhealthyrecipes.com/wp-content/uploads/2019/10/shrikhand-recipe.jpg",
  "Veg Hakka Noodles": "https://vegecravings.com/wp-content/uploads/2017/03/veg-hakka-noodles-recipe-with-step-by-step-instructions.jpg",
  "Manchurian Gravy": "https://i.ytimg.com/vi/2-uu7l3Qwuo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDu4pVhJlAGfm0QAOjP5ndUGyy-LQ",
  Lemonade: "https://assets.bonappetit.com/photos/62aba9d5b433b325383e9ca9/4:3/w_4400,h_3300,c_limit/0616-lemonade-recipe-lede.jpg",
};

/* Image helper: returns mapped URL or an Unsplash fallback
*/
function imageFor(name) {
  if (!name) return `https://source.unsplash.com/featured/?indian-food`;
  if (imageMap[name]) return imageMap[name];
  const q = encodeURIComponent(name.split(" ").slice(0, 4).join(" "));
  return `https://source.unsplash.com/featured/?${q},indian-food`;
}

/* ===== COMPONENT ===== */
export default function Menu() {
  const [selectedMeal, setSelectedMeal] = useState("breakfast");
  // 'breakfast'|'lunch'|'dinner'

  // Flatten items of the selected meal into Monday->Sunday order
  const items = useMemo(() => {
    const arr = [];
    const days = Object.keys(menuData);
    for (const day of days) {
      const list = menuData[day][selectedMeal] || [];
      for (const dish of list) {
        arr.push({
          day,
          name: dish,
          price: deterministicPrice(dish, selectedMeal),
          image: imageFor(dish),
          description: makeDescription(dish, selectedMeal, day),
        });
      }
    }
    return arr;
  }, [selectedMeal]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => setSelectedIndex(0), [selectedMeal]);

  const [cart, setCart] = useState([]);
  const selectedItem = items[selectedIndex] || null;
  const navigate = useNavigate();
const handleAddToCart = (item) => {
  // Read existing cart from localStorage
      localStorage.removeItem("swadbite_selectedMeal");
  let savedCart = JSON.parse(localStorage.getItem("swadbite_cart")) || { items: [] };

  // Ensure savedCart has an items array
  if (!savedCart.items) savedCart.items = [];

  // Make the cart item
  const cartItem = {
    mealName: item.name,
    description: item.description || "",
    image: item.image || "",
    price: item.price || 0,
    quantity: 1,
    day: item.day || ""
  };

  // Add item to cart
  savedCart.items.push(cartItem);

  // Save back to localStorage
  localStorage.setItem("swadbite_cart", JSON.stringify(savedCart));

  // Alert user
  alert(`${item.name} added to cart!`);
};
const handleWeek = () => {
                  localStorage.removeItem("swadbite_cart");
                  localStorage.removeItem("swadbite_selectedMeal");
                  localStorage.setItem(
                    "swadbite_selectedPlan",
                    JSON.stringify({
                      plan: "Basic",
                      price: 799,
                      meals: "Breakfast Only",
                      duration: "7 Days",
                      details: "Home-Style Meals",
                        }))
                  navigate("/payment");
                      
                }

      const handleLunch = () => {
                  localStorage.removeItem("swadbite_cart");
                  localStorage.removeItem("swadbite_selectedMeal");
                localStorage.setItem(
                  "swadbite_selectedPlan",
                  JSON.stringify({
                    plan: "Standard",
                    price: 1299,
                    meals: "Lunch + Dinner",
                    duration: "7 Days",
                    details: "Fresh Ingredients",
                  }))
                    navigate("/payment");
                }
          const handleAllMeals = () => {
             localStorage.removeItem("swadbite_cart");
             localStorage.removeItem("swadbite_selectedMeal");
                localStorage.setItem(
                  "swadbite_selectedPlan",
                  JSON.stringify({
                    plan: "Premium",
                    price: 1799,
                    meals: "All 3 Meals",
                    duration: "7 Days",
                    details: "Priority Service",
                  }))
                    navigate("/payment");
          }

const handleOrderNow = (mealType, mealName, dish) => {
      dish = items.find(item => item.name === mealName && item.day === selectedItem.day);
  if (!dish) return;

  // dish object comes from your menu items (with price, image, description)
  localStorage.setItem(
    "swadbite_selectedMeal",
    JSON.stringify({
      mealType,
      mealName,
      price: dish.price,
      day: dish.day || "",
      image: dish.image,
      description: dish.description,
      quantity: 1
    })
  );

  // Clear previous plan/cart to avoid confusion
  localStorage.removeItem("swadbite_selectedPlan");
  localStorage.removeItem("swadbite_cart");

  navigate("/payment"); // go to OrderSummary page
};


  return (
    <>
      <Navbar />
      <div className="weekly-menu-root">
        <style>{`
          :root { --amber-500: #f59e0b; --bg: #fffaf0; --card: #fff8ea; --text: #4b3e2b; }
          * { box-sizing: border-box; }
          body { margin-top: 6rem; font-family: 'Segoe UI', Roboto, Arial; background: #fdf6e3; }

          .weekly-menu-root { max-width: 1100px; margin: 20px auto; padding: 18px; background: var(--bg); color: var(--text); border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.06); }

          .header { display:flex; justify-content: space-between; align-items:center; gap: 12px; }
          .title { margin:0; font-size:1.6rem; color:#7a5c3e; }
          .buttons { display:flex; gap:10px; }
          .meal-btn { border: 2px solid var(--amber-500); background: transparent; color: var(--amber-500); padding: 8px 12px; font-weight:700; border-radius: 8px; cursor:pointer; }
          .meal-btn.active { background: var(--amber-500); color: white; box-shadow: 0 8px 20px rgba(245,158,11,0.14); }

          .layout { display:grid; grid-template-columns: 1fr 1fr; gap:16px; margin-top:14px; }

          .left { background: var(--card); padding: 12px; border-radius: 10px; border:1px solid #f0e0c1; max-height: 72vh; overflow:auto; }
          .day-group { margin-bottom: 14px; }
          .day-title { font-weight:800; color:#6b4f35; margin:0 0 8px 6px; }

          .dish-row { display:flex; gap:12px; align-items:center; padding:8px; border-radius:8px; cursor:pointer; transition: background 0.12s ease, transform 0.08s ease; margin-bottom:8px; }
          .dish-row:hover { background: rgba(0,0,0,0.02); transform: translateY(-2px); }
          .dish-row.selected { outline: 3px solid rgba(245,158,11,0.14); background: rgba(245,158,11,0.06); }

          .thumb { width:110px; height:72px; border-radius:8px; object-fit:cover; background:#eee; flex-shrink:0; }
          .meta { display:flex; flex-direction:column; gap:3px; }
          .meta .name { font-weight:700; color:#432f20; }
          .meta .price { color:var(--amber-500); font-weight:800; }

          .right { background: #fff9f2; padding: 14px; border-radius: 10px; border:1px solid #f1e0c9; min-height: 320px; }
          .big-img { width:100%; height:260px; object-fit:cover; border-radius:10px; background:#eee; margin-bottom:12px; }
          .detail-name { margin:0; font-size:1.25rem; color:#3e2d21; }
          .detail-day { color:#86694a; margin-top:4px; }
          .detail-price { color:var(--amber-500); font-size:1.35rem; font-weight:800; margin-top:8px; }
          .detail-desc { color:#5b4c3a; margin-top:12px; line-height:1.45; }

          .actions { margin-top:14px; display:flex; gap:10px; align-items:center; }
          .subscribe { background: var(--amber-500); color:white; border:none; padding:10px 16px; border-radius:8px; cursor:pointer; font-weight:700; }
          .add-to-cart { background: transparent; color: var(--amber-500); border: 2px solid var(--amber-500); padding: 10px 16px; border-radius: 8px; cursor: pointer; font-weight: 700; transition: background 0.2s ease, color 0.2s ease; }
          .add-to-cart:hover { background: var(--amber-500); color: white; }

          @media (max-width:900px) { .layout { grid-template-columns: 1fr; } .big-img { height:200px; } }
          .subscription-section { padding: 3rem 2rem; background: #fff4d9; border-top: 2px solid #e1c78f; text-align: center; }
          .subscription-title { font-size: 2rem; color: #7a5c3e; margin-bottom: 2rem; letter-spacing: 1px; }
          .subscription-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2rem; justify-content: center; }
          .subscription-card { background-color: #fff9ed; border: 1px solid #e8d5b7; border-left: 6px solid #e0b861; border-radius: 12px; padding: 1.8rem 1.2rem; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07); transition: all 0.3s ease; }
          .subscription-card:hover { transform: translateY(-5px); box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); }
          .subscription-card h3 { font-size: 1.4rem; color: #7a5c3e; margin-bottom: 0.5rem; }
          .subscription-card .price { font-size: 1.6rem; color: #3d2e1e; }
          .subscription-card .price span { font-size: 0.9rem; color: #7e6a54; }
          .subscription-card ul { list-style: none; padding: 0; margin: 1rem 0; text-align: left; color: #4f4031; }
          .subscription-card ul li { margin-bottom: 0.5rem; }
          .subscription-card button { background-color: #f59e0b; /* amber-500 */ color: white; border: none; padding: 0.6rem 1.3rem; font-size: 0.95rem; border-radius: 6px; cursor: pointer; transition: background 0.3s ease; }
          .subscription-card button:hover { background-color: #d97706; /* darker amber for hover */ }
        `}</style>

        <div className="header">
          <h2 className="title">Weekly Menu</h2>
          <div className="buttons" role="tablist" aria-label="Meals">
            {["breakfast", "lunch", "dinner"].map((m) => (
              <button
                key={m}
                className={`meal-btn ${selectedMeal === m ? "active" : ""}`}
                onClick={() => { setSelectedMeal(m) }}
                aria-pressed={selectedMeal === m}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="layout">
          {/* LEFT: grouped by day */}
          <div className="left" role="list">
            {Object.entries(menuData).map(([day, meals]) => (
              <div key={day} className="day-group">
                <h3 className="day-title">{day}</h3>
                {meals[selectedMeal] && meals[selectedMeal].length > 0 ? (
                  meals[selectedMeal].map((dish, index) => {
                    const dishData = items.find(item => item.name === dish && item.day === day);
                    const flatIndex = items.findIndex(item => item.name === dish && item.day === day);
                    return dishData ? (
                      <div
                        key={dish}
                        className={`dish-row ${flatIndex === selectedIndex ? "selected" : ""}`}
                        onClick={() => setSelectedIndex(flatIndex)}
                        role="button"
                        tabIndex={0}
                        aria-pressed={flatIndex === selectedIndex}
                      >
                        <img src={dishData.image} alt={dishData.name} className="thumb" />
                        <div className="meta">
                          <span className="name">{dishData.name}</span>
                          <span className="price">₹{dishData.price}</span>
                        </div>
                      </div>
                    ) : null;
                  })
                ) : (
                  <p className="no-items-message">No {selectedMeal} menu available for {day}.</p>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT: Selected Item Details */}
          <div className="right">
            {selectedItem ? (
              <>
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="big-img"
                />
                <h3 className="detail-name">{selectedItem.name}</h3>
                <p className="detail-day">{selectedItem.day} ({selectedMeal})</p>
                <p className="detail-price">₹{selectedItem.price}</p>
                <p className="detail-desc">{selectedItem.description}</p>
                <div className="actions">
                  <button
                    className="subscribe"
                    onClick={() => handleOrderNow(selectedMeal, selectedItem.name)}
                  >
                    Order Now
                  </button>
                  
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(selectedItem)}
                  >
                    Add to Cart
                  </button>
                </div>
                  <div style={{ color: "#8f7b61", fontSize: "0.95rem" }}>Serves 1 • Home-style</div>
                         </>
          ) : (
            <p style={{ color: "#7d6a53" }}>Click any dish on the left to see details here.</p>
          )}
        </div>
      </div>
      <div className="subscription-section">
        <h2 className="subscription-title">Subscription Plans</h2>
        <div className="subscription-grid">
          <div className="subscription-card basic">
            <h3>Basic Plan</h3>
            <p className="price">₹799 <span>/ Week</span></p>
            <ul>
              <li>✔ Breakfast Only</li>
              <li>✔ 7 Days Access</li>
              <li>✔ Home-Style Meals</li>
            </ul>
           <button onClick={() => handleWeek()}>
                       Subscribe</button>

          </div>

          <div className="subscription-card standard">
            <h3>Standard Plan</h3>
            <p className="price">₹1299 <span>/ Week</span></p>
            <ul>
              <li>✔ Lunch + Dinner</li>
              <li>✔ 7 Days Access</li>
              <li>✔ Fresh Ingredients</li>
            </ul>
            <button
              onClick={() => handleLunch()}>
              Subscribe
            </button>
          </div>

          <div className="subscription-card premium">
            <h3>Premium Plan</h3>
            <p className="price">₹1799 <span>/ Week</span></p>
            <ul>
              <li>✔ All 3 Meals</li>
              <li>✔ 7 Days Access</li>
              <li>✔ Priority Service</li>
            </ul>
            <button
                onClick={() => handleAllMeals()}>
            
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
