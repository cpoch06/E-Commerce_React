import React from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    const [image, setImage] = React.useState(false);
    const [productDetials, setProductDetails] = React.useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
    });

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandle = (e) => {
        setProductDetails({...productDetials, [e.target.name]: e.target.value});
    }

    const Add_Product = async () => {
        console.log(productDetials);
        let responseData;
        let product = productDetials;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers:{
                Accept: 'application/json',
            },
            body:formData,
        }).then((resp) => resp.json()).then((data) => {responseData = data});

            product.image = responseData.image_url;
            console.log(product);

            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => {
                data.success?alert('Product Added'):alert('Failed to add product');
            });
        
    }

  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input value={productDetials.name} onChange={changeHandle} type="text" name='name' placeholder='Type Here' />
        </div>

        <div className="addproduct-price">
           <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetials.old_price} onChange={changeHandle} type="text" name='old_price' placeholder='Type Here' />
           </div>

           <div className="addproduct-itemfield">
                <p> Offer Price</p>
                <input value={productDetials.new_price} onChange={changeHandle} type="text" name='new_price' placeholder='Type Here' />
           </div>
        </div>

        <div className="addproduct-itemfield">
            <p> Product Category</p>
                <select name="category" id="" value={productDetials.category} onChange={changeHandle} className='addproduct-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kids</option>
                </select>
        </div>

        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail' alt="" />
            </label>
            <input onChange={handleImage} value={productDetials.image} type="file" id='file-input' name='image' hidden />
        </div>

        <button onClick={() => {Add_Product()}} className='addproduct-btn'>Add Product</button>
    </div>
  )
}

export default AddProduct