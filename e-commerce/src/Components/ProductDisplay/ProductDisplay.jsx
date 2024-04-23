import React from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext';

export const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = React.useContext(ShopContext);
    const {removeFromCart} = React.useContext(ShopContext);
  return (
    <div className='product-display'>
        <div className="product-display-left">
            <div className="product-display-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>

            <div className="product-display-img">
                <img src={product.image} className='product-display-main-img'alt="" />
            </div>

        </div>

        <div className="product-display-right">
            <h1>{product.name}</h1>

            <div className="product-display-right-stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                
                <p>(122)</p>
            </div>

            <div className="product-display-right-prices">
                <div className="product-display-right-prices-old">
                    ${product.old_price}
                </div>

                <div className="product-display-right-prices-new">
                    ${product.new_price}
                </div>
            </div>

            <div className="product-display-right-description">
                A lightweight, usually knitted, pullover shirt, close-fitting and with a round neck and short sleeves, worn as an undershirt or outer garment.
            </div>
            
            <div className="product-display-right-size">
                <h1>Select Size</h1>

                <div className="product-display-right-sizes">
                   <select name="option-size" id="size">
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                          <option value="extra-large">Extra Large</option>
                   </select>
                </div>
            </div>

            <button onClick={() => {addToCart(product.id)}}>ADD TO CART</button>
            <p className="product-display-right-category"><span>Category :</span> Women, T-Shirt, Crop Top </p>
            <p className="product-display-right-category"><span>Tags :</span> Modern, Latest </p>
            </div>
        </div>
  )
}

export default ProductDisplay
