import React from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png'


const CardItems = () => {
  const {getTotalCartAmount, all_product, cartItems, removeFromCart} = React.useContext(ShopContext);

  return (
    <div className='carts-item'>
      <div className="carts-item-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <hr />

      {all_product.map((e) => {
        if (cartItems[e.id] > 0) 
          return  <div>
                      <div className="carts-item-format carts-item-format-main">
                        <img src={e.image} className='carticon-product-icon' alt="" />
                        <p>{e.name}</p>
                        <p>$ {e.new_price}</p>
                        <button className='carts-item-quantity'>{cartItems[e.id]}</button>
                        <p>${e.new_price * cartItems[e.id]}</p>
                        <img src={remove_icon} className='cart-items-remove-icon' onClick={() => {removeFromCart(e.id)}} alt="" />
                      </div>
                      <hr />
                  </div>
        })}

      <div className="carts-item-down">
        <div className="carts-item-total">
          <h1>Cart Totals</h1>
          
          <div>
            <div className="carts-item-total-items">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="carts-item-total-items">
              <p>Shipping Fees</p>
              <p>Free</p>
            </div>

            <hr />

            <div className="carts-item-total-items">
              <h3>Total: </h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>

          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="carts-item-promo-code">
          <p>If you have a voucer code, Enter here</p>
          <div className="carts-item-promo-box">
            <input type="text" placeholder="Promo Code"name="" id="" />

            <button>APPLY</button>
          </div>
        </div>
      </div>

      </div>
  )
}

export default CardItems