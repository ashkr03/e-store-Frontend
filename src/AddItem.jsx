import { useNavigate } from "react-router";
import { useState } from "react";

export default function AddItem() {
  const [Item, setName] = useState("");
  const [Model, setModel] = useState("");
  const [Qty, setQty] = useState("");
  const navigate = useNavigate();

  const createUser = async () => {
    const url = "https://estore-server-3cyl.onrender.com/Store-Items";

    try {
      let response = await fetch(url, {
        method: "POST",                             //Post Method
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ Item, Model, Qty }),
      });

      if (response.ok) {
        alert("✅ Item Added!");
        navigate("/");
      } else {
        const error = await response.json();
        alert("❌ " + error.error);
      }
    } catch (error) {
      alert("❌ Network error");
    }
  };


  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-header">
          <h2>Add New Item</h2>
          <p>Fill the details to add a new item in the store.</p>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              value={Item}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Laptop, Mouse"
            />
          </div>

          <div className="form-group">
            <label>Model</label>
            <input
              type="text"
              value={Model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. Brand Name or type"
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={Qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="e.g. 10"
            />
          </div>
        </div>

        <div className="form-actions">
          <button className="btn outline" onClick={() => navigate("/Itemlist")}>
            Cancel
          </button>
          <button className="btn primary" onClick={createUser}>
            Save Item
          </button>
        </div>
      </div>
    </div>
  );
}