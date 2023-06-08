import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

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
      const existingProduct = products.find((product) => product.name === name);

      if (existingProduct) {
        const updatedProducts = products.map((product) =>
          product.name === name ? { ...product, quantity: product.quantity + 1 } : product
        );
        setProducts(updatedProducts);
      } else {
        const newProduct = {
          name,
          description,
          price: parseFloat(price),
          quantity: 1,
        };

        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
      }

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
    const updatedTotalPrice = totalPrice - removedProduct.price * removedProduct.quantity;

    const updatedProducts = products.filter((_, index) => index !== productIndex);
    setProducts(updatedProducts);
    setTotalPrice(updatedTotalPrice);
  };

  const handleIncrementQuantity = (productIndex) => {
    const updatedProducts = products.map((product, index) =>
      index === productIndex ? { ...product, quantity: product.quantity + 1 } : product
    );
    setProducts(updatedProducts);

    const updatedTotalPrice = totalPrice + updatedProducts[productIndex].price;
    setTotalPrice(updatedTotalPrice);
  };

  const handleDecrementQuantity = (productIndex) => {
    const updatedProducts = products.map((product, index) =>
      index === productIndex ? { ...product, quantity: product.quantity - 1 } : product
    );
    setProducts(updatedProducts);

    const updatedTotalPrice = totalPrice - updatedProducts[productIndex].price;
    setTotalPrice(updatedTotalPrice);
  };

  return (
    <div className="container">
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
        <p className="total-price">
          <FaShoppingCart size={20} style={{ marginRight: '5px' }} />
          Total Price: ${totalPrice.toFixed(2)}
        </p>
        {products.map((product, index) => (
          <div className="product" key={index}>
            <h3>
              {product.name} ({product.quantity})
            </h3>
            {product.description && <p>Description: {product.description}</p>}
            <p>Price: ${product.price.toFixed(2)}</p>
            <button type="button" onClick={() => handleRemoveProduct(index)}>
              Remove
            </button>
            <button type="button" onClick={() => handleIncrementQuantity(index)}>
              +
            </button>
            <button
              type="button"
              onClick={() => handleDecrementQuantity(index)}
              disabled={product.quantity === 1}
            >
              -
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;