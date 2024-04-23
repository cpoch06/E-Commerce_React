import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='description-box'>
        <div className="desctiption-box-navigator">
            <div className="description-box-nav-box">Description</div>
            <div className="description-box-nav-box fade">Reviews (122)</div>
        </div>

        <div className="description-box-description">
            <p>
                An E-Commerce Website is an online platform that facilitates online transactions 
                of goods and services through means of the transfer of information and funds over 
                the Internet. In the early days, e-commerce was done partially through emails and 
                phone calls. Now, with a single website, anything and everything that a transaction 
                needs, can be executed online.
            </p>

            <p>
                E-Commerce website typically display products or services for sale. It serves as a virtual marketplace where businesses
                and consumers can come together to conduct transactions. The most common example of an E-Commerce website is an online shopping portal
                where 
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox