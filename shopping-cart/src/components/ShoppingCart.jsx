import React from 'react';
import Product from './Product';

const ShoppingCart = ({ cartItems }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item, index) => (
        <Product key={index} name={item.name} price={item.price} />
      ))}
    </div>
  );
};

export default ShoppingCart;
