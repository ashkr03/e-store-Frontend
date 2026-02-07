import { NavLink, useNavigate } from "react-router";
import { useState, useEffect } from "react";

function ItemList() {
  const [itemData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const url = "https://estore-server-3cyl.onrender.com/Store-Items";


  useEffect(() => {
    setLoading(true);
    getItemsData();
  }, []);

  const getItemsData = async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setItemsData(data);
    setLoading(false);
  };


  const deleteItem = async (id) => {
    // Ye line confirm box dikhayegi (OK / Cancel)
    if (window.confirm("Are you sure you want to delete this item?")) {

      // Agar user ne OK kiya, tabhi ye code chalega
      try {
        console.log("Deleting ID:", id);
        let response = await fetch("https://estore-server-3cyl.onrender.com/Store-Items/" + id, {
          method: "delete"
        });

        response = await response.json();

        if (response.success) {
          alert("Record deleted successfully!"); // Success message
          getItemsData(); // List refresh
        } else {
          alert("Could not delete item.");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      // Agar user ne Cancel kiya
      console.log("Delete action cancelled by user");
    }
  };



  const editItem = (item) => {
    navigate(`/edit/${item._id}`);
  };

  return (
    <div className="page-container">
      <div className="table-header">
        <h1>Store Items List</h1>
        {/* <button className="btn primary" onClick={() => navigate("/add")}>
          + Add New Item
        </button> */}
      </div>

      {loading ? (
        <div className="loader">Loading items...</div>
      ) : itemData.length === 0 ? (
        <div className="empty-state">
          <p>No items found. Add your first item.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="items-table">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Item</th>
                <th>Model</th>
                <th>Quantity</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {itemData.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{index + 1}</td>
                  <td>{item.Item}</td>
                  <td>{item.Model}</td>
                  <td>{item.Qty}</td>
                  <td className="actions-cell">
                    <button
                      className="btn outline"
                      onClick={() => editItem(item)}>Edit</button>
                    <button
                      className="btn danger"
                      onClick={() => deleteItem(item._id.toString())}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ItemList;