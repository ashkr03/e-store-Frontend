import { useState, useEffect } from 'react';
import axios from 'axios';

function IssueItems() {
  const [department, setDepartment] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  // All items fetch karo on component load
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://estore-serverv2.onrender.com/Store-Items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleItemSelect = (e) => {
    const itemId = e.target.value;
    const item = items.find(i => i._id === itemId);
    setSelectedItem(item);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!department || !selectedItem || !quantity) {
      setMessage('Please fill all fields');
      return;
    }

    if (parseInt(quantity) > parseInt(selectedItem.Qty)) {
      setMessage(`Only ${selectedItem.Qty} units available!`);
      return;
    }

    try {
      const response = await axios.post('https://estore-serverv2.onrender.com/api/issues', {
        department,
        itemId: selectedItem._id,
        itemName: selectedItem.Item,
        itemModel: selectedItem.Model,
        quantity: quantity
      });

      setMessage(`✅ Item Issued, Remaining quantity: ${response.data.updatedQuantity}`);
      
      // Reset form
      setDepartment('');
      setSelectedItem(null);
      setQuantity('');
      
      // Refresh items list to show updated quantities
      fetchItems();
      
    } catch (error) {
      setMessage('❌ Error: ' + (error.response?.data?.error || 'Failed to create issue'));
    }
  };

  return (
    <div className="issue-container">
      <h2>Issue Items</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Department Dropdown */}
        <div className="form-group">
          <label>Department:</label>
          <select 
            value={department} 
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            <option value="Account">Account</option>
            <option value="Services">Services</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Enterprises">Enterprises</option>
          </select>
        </div>

        {/* Item Dropdown */}
        <div className="form-group">
          <label>Select Item:</label>
          <select onChange={handleItemSelect} required>
            <option value="">Choose an item</option>
            {items.map(item => (
              <option key={item._id} value={item._id}>
                {item.Item} - {item.Model} (Available: {item.Qty})
              </option>
            ))}
          </select>
        </div>

        {/* Quantity Input */}
        {selectedItem && (
          <div className="form-group">
            <label>Quantity (Max: {selectedItem.Qty}):</label>
            <input
              type="number"
              min="1"
              max={selectedItem.Qty}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
        )}

        <button className='btn outline' type="submit">Issue Item</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default IssueItems;
