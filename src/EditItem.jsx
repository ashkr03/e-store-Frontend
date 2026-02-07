import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export default function EditItem() {
  const { id } = useParams();
  const [Item, setItem] = useState("");
  const [Model, setModel] = useState("");
  const [Qty, setQty] = useState("");
  const url = `https://estore-server-3cyl.onrender.com/Store-Items/${id}`;
  const navigate = useNavigate();

  useEffect(() => {
    getItemData();
  }, []);

  const getItemData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Edit data:", data);

      if (data) {
        setItem(data.Item || "");
        setModel(data.Model || "");
        setQty(data.Qty || "");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };


 const updateItemData = async () => {
    // Confirm box - OK/Cancel option
    if (window.confirm("Are you sure you want to update this item?")) {
        
        // Agar user ne OK kiya
        console.log("Updating:", Item, Model, Qty);
        
        try {
            let response = await fetch(url, {
                method: "PUT",  // PUT (capital)
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    Item, 
                    Model, 
                    Qty 
                }),
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                alert("✅ Item updated successfully!");
                navigate("/");  // List pe wapas
            } else {
                alert("❌ Update failed: " + (result.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("❌ Network error. Please try again.");
        }
    } else {
        // Cancel kiya
        console.log("Update cancelled by user");
    }
};



  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-header">
          <h2>Edit Item</h2>
          <p>Update the details of the selected item.</p>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              value={Item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Model</label>
            <input
              type="text"
              value={Model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={Qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
        </div>

        <div className="form-actions">
          <button className="btn outline" onClick={() => navigate("/")}>
            Back
          </button>
          <button className="btn primary" onClick={updateItemData}>
            Update Item
          </button>
        </div>
      </div>
    </div>
  );
}