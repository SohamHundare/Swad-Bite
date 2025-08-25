import React, { useState, useEffect } from "react";

function ProfileMenu({ onLogout }) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [formData, setFormData] = useState({
    mobile: "",
    locality: "",
    gender: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser.photo) setPhoto(parsedUser.photo);
      setFormData({
        mobile: parsedUser.mobile || "",
        locality: parsedUser.locality || "",
        gender: parsedUser.gender || "",
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    onLogout?.();
  };

  // Handle photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);

        const updatedUser = { ...user, photo: reader.result };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save updates to localStorage
  const handleSave = () => {
    const updatedUser = { ...user, ...formData, photo };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setOpen(false);
  };

  if (!user) return null;

  return (
    <div style={{ position: "relative" }}>
      {/* Profile Icon */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "transparent",
          border: "2px solid #F97316",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        {photo ? (
          <img
            src={photo}
            alt="profile"
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
        ) : (
          <span style={{ color: "#F97316", fontWeight: "bold" }}>
            {user.email[0].toUpperCase()}
          </span>
        )}
      </button>

      {/* Dropdown Profile Card */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: 0,
            background: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            padding: "16px",
            borderRadius: "12px",
            minWidth: "280px",
            zIndex: 10,
          }}
        >
          {/* Profile Picture */}
          <div style={{ textAlign: "center", marginBottom: "12px" }}>
            <label style={{ cursor: "pointer" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />
              <img
                src={
                  photo ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="profile"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  border: "2px solid #F97316",
                  objectFit: "cover",
                }}
              />
              <p
                style={{
                  fontSize: "12px",
                  marginTop: "4px",
                  color: "#F97316",
                  textDecoration: "underline",
                }}
              >
                Change Photo
              </p>
            </label>
          </div>

          {/* User Info Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <input
              type="text"
              value={user.email}
              readOnly
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                background: "#f8f8f8",
              }}
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile No."
              value={formData.mobile}
              onChange={handleChange}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
            />

            <input
              type="text"
              name="locality"
              placeholder="Locality"
              value={formData.locality}
              onChange={handleChange}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
            <button
              onClick={handleSave}
              style={{
                flex: 1,
                padding: "10px",
                background: "#F97316",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Save
            </button>
            <button
              onClick={handleLogout}
              style={{
                flex: 1,
                padding: "10px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
