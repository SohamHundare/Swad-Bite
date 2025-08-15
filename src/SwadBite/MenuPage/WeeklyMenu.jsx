// src/Menu.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../HomePAge/Navbar' 
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
    breakfast: [20, 60],  // Budget-friendly breakfast
    lunch: [50, 120],     // Practical lunch
    dinner: [60, 150],    // Affordable dinner
  };
  
  const [min, max] = ranges[mealType] || [40, 100]; // Default range if mealType not found
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

/* Image helper: returns mapped URL or an Unsplash fallback */
function imageFor(name) {
  if (!name) return `https://source.unsplash.com/featured/?indian-food`;
  if (imageMap[name]) return imageMap[name];
  const q = encodeURIComponent(name.split(" ").slice(0, 4).join(" "));
  return `https://source.unsplash.com/featured/?${q},indian-food`;
}

/* ===== COMPONENT ===== */
export default function Menu() {
  const [selectedMeal, setSelectedMeal] = useState("breakfast"); // 'breakfast'|'lunch'|'dinner'

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

  const [cart, setCart] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => setSelectedIndex(0), [selectedMeal]);

  const selectedItem = items[selectedIndex] || null;
  const navigate = useNavigate();

  const handleOrderNow = (mealType, mealName) => {
  const dish = items.find(item => item.name === mealName && item.day === selectedItem.day);
  if (!dish) return;

  localStorage.setItem(
    "swadbite_selectedMeal",
    JSON.stringify({
      mealType,
      mealName,
      price: dish.price,
      day: dish.day,
      image: dish.image,
      description: dish.description,
    })
  );

  navigate("/payment");
};

const handleAddToCart = (mealType, mealName) => {
  const dish = items.find(item => item.name === mealName && item.day === selectedItem.day);
  if (!dish) return;

  const newCartItem = {
    mealType,
    mealName: dish.name,
    price: dish.price,
    day: dish.day,
    image: dish.image,
    description: dish.description,
  };

  // Save to localStorage
  const existingCart = JSON.parse(localStorage.getItem("swadbite_cart") || "[]");
  localStorage.setItem("swadbite_cart", JSON.stringify([...existingCart, newCartItem]));

  alert(`${dish.name} has been added to your cart!`);
};



useEffect(() => {
  // Optionally clear both on mount
  localStorage.removeItem("swadbite_selectedMeal");
  localStorage.removeItem("swadbite_selectedPlan");
}, []);

  return (
    <>
    <Navbar/>
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

        @media (max-width:900px) { .layout { grid-template-columns: 1fr; } .big-img { height:200px; } }
        .subscription-section {
          padding: 3rem 2rem;
          background: #fff4d9;
          border-top: 2px solid #e1c78f;
          text-align: center;
          
        }

        .subscription-title {
          font-size: 2rem;
          color: #7a5c3e;
          margin-bottom: 2rem;
          letter-spacing: 1px;
        }

        .subscription-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          justify-content: center;
        }

        .subscription-card {
          background-color: #fff9ed;
          border: 1px solid #e8d5b7;
          border-left: 6px solid #e0b861;
          border-radius: 12px;
          padding: 1.8rem 1.2rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
          transition: all 0.3s ease;
        }

        .subscription-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }

        .subscription-card h3 {
          font-size: 1.4rem;
          color: #7a5c3e;
          margin-bottom: 0.5rem;
        }

        .subscription-card .price {
          font-size: 1.6rem;
          color: #3d2e1e;
        }

        .subscription-card .price span {
          font-size: 0.9rem;
          color: #7e6a54;
        }

        .subscription-card ul {
          list-style: none;
          padding: 0;
          margin: 1rem 0;
          text-align: left;
          color: #4f4031;
        }

        .subscription-card ul li {
          margin-bottom: 0.5rem;
        }

        .subscription-card button {
          background-color: #f59e0b; /* amber-500 */
          color: white;
          border: none;
          padding: 0.6rem 1.3rem;
          font-size: 0.95rem;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .subscription-card button:hover {
          background-color: #d97706; /* darker amber for hover */
        }
      `}</style>

      <div className="header">
        <h2 className="title">Weekly Menu — Breakfast / Lunch / Dinner</h2>
        <div className="buttons" role="tablist" aria-label="Meals">
          {["breakfast", "lunch", "dinner"].map((m) => (
            <button
              key={m}
              className={`meal-btn ${selectedMeal === m ? "active" : ""}`}
              onClick={() => { setSelectedMeal(m)}}
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
          {Object.entries(menuData).map(([day, meals]) => {
            const list = meals[selectedMeal] || [];
            if (!list || list.length === 0) return null;
            return (
              <div className="day-group" key={day}>
                <div className="day-title">{day}</div>
                {list.map((dish, idx) => {
                  // compute the global index consistent with items[] ordering
                  const days = Object.keys(menuData);
                  let prior = 0;
                  for (const d of days) {
                    if (d === day) break;
                    const arr = menuData[d][selectedMeal] || [];
                    prior += arr.length;
                  }
                  const globalIndex = prior + idx;
                  const price = deterministicPrice(dish, selectedMeal);
                  const img = imageFor(dish);

                  return (
                    <div
                      key={`${day}-${dish}-${idx}`}
                      className={`dish-row ${selectedIndex === globalIndex ? "selected" : ""}`}
                      onClick={() => setSelectedIndex(globalIndex)}
                      role="listitem"
                      aria-label={`${dish} on ${day}`}
                    >
                      <img className="thumb" src={img} alt={`${dish} ${day}`} />
                      <div className="meta">
                        <div className="name">{dish}</div>
                        <div className="price">₹{price}</div>
                        <div style={{ fontSize: "0.9rem", color: "#8f7b61", fontWeight: 600, textTransform: "capitalize" }}>
                          {selectedMeal}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* RIGHT: details */}
        <div className="right">
          {selectedItem ? (
            <>
              <img className="big-img" src={selectedItem.image} alt={selectedItem.name} />
              <h3 className="detail-name">{selectedItem.name}</h3>
              <div className="detail-day">
                {selectedItem.day} • {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}
              </div>
              <div className="detail-price">₹{selectedItem.price} / serving</div>
              <div className="detail-desc">{selectedItem.description}</div>

              <div className="actions">
                <button
                  className="subscribe"
                  onClick={() => {
                  localStorage.removeItem("swadbite_selectedPlan");
                  handleOrderNow(selectedMeal, selectedItem.name);
                }}
                >
                  Subscribe
                </button>
                <div style={{ color: "#8f7b61", fontSize: "0.95rem" }}>Serves 1 • Home-style</div>
              </div>
              <br></br>
               <button className="add-to-cart" style={{
                    marginTop: '6px',
                    padding: '4px 10px',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    }}
                onClick={e=>{
                e.stopPropagation(); // prevents selecting the dish when clicking
                handleAddToCart(selectedMeal, selectedItem.name); }}>Add to Cart</button>  
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
            <button
                onClick={() => {
                  localStorage.removeItem("swadbite_selectedMeal");
                  localStorage.setItem(
                    "swadbite_selectedPlan",
                    JSON.stringify({
                      plan: "Basic",
                      price: 799,
                      meals: "Breakfast Only",
                      duration: "7 Days",
                      details: "Home-Style Meals",
                    })
                  );
                  navigate('/payment');
                }}
              >
                Subscribe
          </button>
          
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
              onClick={() => {
                localStorage.removeItem("swadbite_selectedMeal");
                localStorage.setItem(
                  "swadbite_selectedPlan",
                  JSON.stringify({
                    plan: "Standard",
                    price: 1299,
                    meals: "Lunch + Dinner",
                    duration: "7 Days",
                    details: "Fresh Ingredients",
                  })
                );
                navigate('/payment');
              }}
            >
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
              onClick={() => {
                localStorage.removeItem("swadbite_selectedMeal");
                localStorage.setItem(
                  "swadbite_selectedPlan",
                  JSON.stringify({
                    plan: "Premium",
                    price: 1799,
                    meals: "All 3 Meals",
                    duration: "7 Days",
                    details: "Priority Service",
                  })
                );
                navigate('/payment');
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

