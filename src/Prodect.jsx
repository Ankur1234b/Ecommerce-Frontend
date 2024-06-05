import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Prodect.module.css';
import img2 from './Images/istockphoto-542577988-612x612.jpg';
import img3 from './Images/modal-blend-shirt-with-button-down-collar.jpg';
import img4 from './Images/360_F_182334324_Snk2BsBEBSgCUWw1KcevXhe3iuyBbRyu.jpg';
import img17 from './Images/Screenshot 2024-04-04 161841.png';
import img18 from './Images/Screenshot 2024-04-04 162540.png';

const Body = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
          console.log('Fetched Data:', data);
        } else {
          throw new Error('Fetched data is not an array');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (product) => {
    console.log('Selected Product Details:');
    console.log({
      pdid: product.pdid,
      Brand: product.brand,
      Description: product.description,
      Price: product.price,
      Link: product.link
    });
  };

  // Filter out disabled products
  const activeProducts = products.filter(product => !product.disabled);

  return (
    <>
      <div className={styles.card_main}>
        <div className={styles.card1}>
          <img src={img2} className={styles.card_img_top1} />
          <div className={styles.card_body}>
            <h5 className={styles.card_title}>T-Shirt</h5>
            <p className={styles.card_text}>Good quality T-Shirt available with discount for polo T-SHIRT and for many more brands.</p>
            <Link to="/items" className="btn btn-primary">T-Shirt</Link>
          </div>
        </div>

        <div className={styles.card}>
          <img src={img3} className={styles.card_img_top} />
          <div className={styles.card_body}>
            <h5 className={styles.card_title}>Shirt</h5>
            <p className={styles.card_text}>Shirt Available with good brands and best quality in less Price.</p>
            <Link to="/shirt" className="btn btn-primary">Shirt</Link>
          </div>
        </div>

        <div className={styles.card}>
          <img src={img4} className={styles.card_img_top} />
          <div className={styles.card_body}>
            <h5 className={styles.card_title}>JEANS</h5>
            <p className={styles.card_text}>Good quality, flexible and stretchable Jeans. Many varieties Available for all Generation.</p>
            <Link to="/jeans" className="btn btn-primary">Jeans</Link>
          </div>
        </div>
      </div>

      <div className={styles.productGrid}>
        {activeProducts.map(product => (
          <div key={product.pdid} className={styles.productCard}>
            <div className={styles.productImage}>
              <img src={product.image} className={styles.card_img_top5} alt={product.description} />
            </div>
            <div className={styles.card_body}>
              <h5 className={styles.card_title}>{product.brand}</h5>
              <p className={styles.card_text}>{product.description}</p>
              <p>{product.price}</p>
              <Link to={product.link} className={`btn btn-primary ${styles.card_link}`} onClick={() => handleViewDetails(product)}>View Details</Link>
            </div>
          </div>
        ))}
      </div>

      <img src={img17} className={styles.kk} />
      <div className={styles.lineAboveImg}>
        <img src={img18} className={styles.kk1} />
      </div>
    </>
  );
};

export default Body;
