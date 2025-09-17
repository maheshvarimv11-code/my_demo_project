import { useState } from 'react';
import './App.css';

function App() {
  // CRUD state: list of items and form state
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Add or update item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    if (editIndex !== null) {
      setItems(items.map((item, idx) => (idx === editIndex ? input : item)));
      setEditIndex(null);
    } else {
      setItems([...items, input]);
    }
    setInput('');
  };

  // Edit item
  const handleEdit = (idx) => {
    setInput(items[idx]);
    setEditIndex(idx);
  };

  // Delete item
  const handleDelete = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
    if (editIndex === idx) {
      setInput('');
      setEditIndex(null);
    }
  };

  return (
    <div className="container">
      <h1>Simple CRUD App</h1>
      <form onSubmit={handleSubmit} className="crud-form">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter item"
        />
        <button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
      </form>
      <ul className="crud-list">
        {items.length === 0 && <li>No items yet.</li>}
        {items.map((item, idx) => (
          <li key={idx} className="crud-list-item">
            <span>{item}</span>
            <button onClick={() => handleEdit(idx)}>Edit</button>
            <button onClick={() => handleDelete(idx)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
