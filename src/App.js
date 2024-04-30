import { useState } from "react";


export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItems(id) {
    setItems(items.filter((item) => item.id !== id));
  }
  function handleToggle(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDelete={handleDeleteItems}
        onToggle={handleToggle}
      />
      <Stats items={items}/>
    </div>
  );
}

function Logo() {
  return <h1>🧶 Far Away 🎇</h1>;
}

function Form({ onAddItems }) {
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState(1);

  function HandleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);
    setdescription("");
  }

  return (
  <>
    <h3 style={{textAlign:"center"}}>What do you need for your 🎪 trip? </h3>

<form className="add-form" onSubmit={HandleSubmit}>
  <select
    value={quantity}
    onChange={(e) => setquantity(Number(e.target.value))}
  >
    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
      <option value={num} key={num}>
        {" "}
        {num}{" "}
      </option>
    ))}
  </select>
  <input
    type="text"
    value={description}
    onChange={(e) => setdescription(e.target.value)}
    placeholder="Item..."
  />
  <button>Add</button>
</form>
  </>
  );
}

function PackingList({ items, onDelete, onToggle }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onDelete, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggle(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "Line-through" } : {}}>
        {`${item.quantity} ${item.description}`}
      </span>
      <button onClick={() => onDelete(item.id)}> ❌</button>
    </li>
  );
}

function Stats({items}) {
  if(!items.length)
  return(
<p className="stats">
  <em>Start adding some items to your list</em>
</p>
)
  const itemsNum = items.length
  const packedItem = items.filter((item) => item.packed).length


  return (
    <footer className="stats">
      <em>You have {itemsNum} items on your list, and you already packed {packedItem}</em>
    </footer>
  );
}
