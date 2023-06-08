import React, { useState } from 'react';
import ShoppingCart from './components/ShoppingCart';

const App = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleAddProduct = () => {
    if (name && price) {
      const newProduct = {
        name,
        description,
        price: parseFloat(price),
      };

      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);

      const updatedTotalPrice = totalPrice + parseFloat(price);
      setTotalPrice(updatedTotalPrice);

      // Limpiar los campos del formulario
      setName('');
      setDescription('');
      setPrice('');
    }
  };

  const handleRemoveProduct = (productIndex) => {
    const removedProduct = products[productIndex];
    const updatedTotalPrice = totalPrice - removedProduct.price;

    const updatedProducts = products.filter((_, index) => index !== productIndex);
    setProducts(updatedProducts);
    setTotalPrice(updatedTotalPrice);
  };

  return (
    <div>
      <h1>My Shopping App</h1>
      <div className="add-product">
        <h2>Add Product</h2>
        <form>
          <label htmlFor="nameInput">Name:</label>
          <input id="nameInput" type="text" value={name} onChange={handleNameChange} />
          <br />
          <label htmlFor="descriptionInput">Description:</label>
          <input id="descriptionInput" type="text" value={description} onChange={handleDescriptionChange} />
          <br />
          <label htmlFor="priceInput">Price:</label>
          <input id="priceInput" type="number" value={price} onChange={handlePriceChange} />
          <br />
          <button type="button" onClick={handleAddProduct} disabled={!name || !price}>
            Add
          </button>
        </form>
        </div>
        <div className="cart">
          <h2>Shopping Cart</h2>
          <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
          {products.map((product, index) => (
          <div key={index}>
            <h3>{product.name}</h3>
            {product.description && <p>Description: {product.description}</p>}
            <p>Price: ${product.price.toFixed(2)}</p>
            <button type="button" onClick={() => handleRemoveProduct(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;