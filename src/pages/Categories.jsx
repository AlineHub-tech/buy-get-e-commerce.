import React, { useState } from 'react';
import '../styles/Categories.css'; 


import ElectronicsImg from '../assets/images/images7.jpeg';
import FashionImg from '../assets/images/8.png';
import BeautyImg from '../assets/images/11.png';
import HomeImg from '../assets/images/images21.jpeg';
import SportsImg from '../assets/images/shoo2.jpeg';
import BooksImg from '../assets/images/shop2.jpg';
import KidsImg from '../assets/images/shoo7.jpeg';
import JewelryImg from '../assets/images/10.png';
import RemoteImg from '../assets/images/ekuter1.jpg';
import ShoesCatImg from '../assets/images/download5.jpeg';

const initialCategories = [
  { id: 1, name: 'Electronics', img: ElectronicsImg, description: 'Latest gadgets and devices', price: '$200 - $2000' },
  { id: 2, name: 'Fashion', img: FashionImg, description: 'Trendy clothes and accessories', price: '$10 - $200' },
  { id: 3, name: 'Beauty', img: BeautyImg, description: 'Cosmetics and personal care', price: '$5 - $100' },
  { id: 4, name: 'Home', img: HomeImg, description: 'Furniture and home essentials', price: '$20 - $1500' },
  { id: 5, name: 'Sports', img: SportsImg, description: 'Sporting goods and fitness', price: '$15 - $500' },
  { id: 6, name: 'Books', img: BooksImg, description: 'Books for all ages', price: '$5 - $80' },
  { id: 7, name: 'Kids', img: KidsImg, description: 'Toys and kids products', price: '$5 - $150' },
  { id: 8, name: 'Jewelry', img: JewelryImg, description: 'Rings, necklaces, and more', price: '$50 - $1000' },
  { id: 9, name: 'Remote', img: RemoteImg, description: 'Electronics remote controls', price: '$10 - $150' },
  { id: 10, name: 'Shoes', img: ShoesCatImg, description: 'Footwear for all occasions', price: '$20 - $250' },
];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImageFile, setNewImageFile] = useState(null); 

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]); 
    }
  };

  const addCategory = () => {

    if (!newName || !newDescription || !newPrice || !newImageFile) {
      return alert('Fill all fields and select an image!');
    }

  
    const imageUrl = URL.createObjectURL(newImageFile);

    const newCategory = {
      id: categories.length + 1,
      name: newName,
      description: newDescription,
      price: newPrice,
      img: imageUrl 
    };

    setCategories([...categories, newCategory]);
    
   
    setNewName('');
    setNewDescription('');
    setNewPrice('');
    setNewImageFile(null);
 
    document.getElementById('imageUploadInput').value = ''; 
  };

  return (
    <div className="categories-container">
      <h2 className="section-title">Product Categories</h2>

      
      <div className="add-category-form">
        <input
          type="text"
          placeholder="Category Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price Range"
          value={newPrice}
          onChange={e => setNewPrice(e.target.value)}
        />
        
   
        <input
          id="imageUploadInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        
      
        <label htmlFor="imageUploadInput" className="file-upload-label">
            <i className="fas fa-camera"></i> 
          
            {newImageFile ? "photo" : "choose photo"}
        </label>


        <button className="btn" onClick={addCategory}>Add New Category</button>
      </div>


      <section className="categories-grid">
        {categories.map(cat => (
          <div key={cat.id} className="category-card">
            <img src={cat.img} alt={cat.name} />
            <div className="category-info">
                <h4>{cat.name}</h4>
                <p>{cat.description}</p>
                <p className="category-price">{cat.price}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Categories;
