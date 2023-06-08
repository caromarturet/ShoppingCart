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

<p className="total-price">
  <FaShoppingCart size={20} style={{ marginRight: '5px' }} />
  Total Price: ${totalPrice.toFixed(2)}
</p>

export default ShoppingCart;
