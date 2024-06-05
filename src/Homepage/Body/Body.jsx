import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Body.module.css';
import img2 from '../../Images/istockphoto-542577988-612x612.jpg';
import img3 from '../../Images/modal-blend-shirt-with-button-down-collar.jpg';
import img4 from '../../Images/360_F_182334324_Snk2BsBEBSgCUWw1KcevXhe3iuyBbRyu.jpg';
import img5 from '../../Images/71GY246XqyL._AC_UL320_.jpg';
import img6 from '../../Images/510K3+bBn4L._AC_UL320_.jpg';
import img7 from '../../Images/61Zl4Onuq+L._SY741_.jpg';
import img8 from '../../Images/61sS8E75iFL._SX679_.jpg';
import img9 from '../../Images/41WCRmd6DYL._AC_UL320_.jpg';
import img10 from '../../Images/51yIybqYFTL._AC_UL320_.jpg';
import img11 from '../../Images/317Jvwy8toL._AC_UL320_.jpg';
import img12 from '../../Images/61s0hdYdQ3L._AC_UL320_.jpg';
import img13 from '../../Images/51eZbtT-wvL._AC_UL320_.jpg';
import img14 from '../../Images/81D+KVOvp2L._AC_UL320_.jpg';
import img15 from '../../Images/81ZfDha1c5L._AC_UL320_.jpg';
import img16 from '../../Images/81S++MvcavL._AC_UL320_.jpg';
import img17 from '../../Images/Screenshot 2024-04-04 161841.png';
import img18 from '../../Images/Screenshot 2024-04-04 162540.png';

function Body() {
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

      <div className={styles.k1}>
        <div className={styles.k2}>
          <div className={styles.k8}>
            <h1 className={styles.k12}>T-Shirt</h1>
            <div className={styles.k11}>
              <Link to="/placeorder1" className={styles.card8} style={{ textDecoration: 'none', color: 'black' }}>
                <img src={img5} className={styles.card_img_top5} />
                <div className={styles.card_body}>
                  <h5 className={styles.card_title}>Jockey</h5>
                  <p className={styles.card_text}>MV02 Men's Super Combed Cotton Blend Graphic Printed Round Neck </p>
                  <p>₹1,049</p>
                </div>
              </Link>
              <Link to="/placeorder2" className={styles.card8} style={{ textDecoration: 'none', color: 'black' }}>
                <img src={img6} className={styles.card_img_top5} />
                <div className={styles.card_body}>
                  <h5 className={styles.card_title}>THE FUNKTEE STORE</h5>
                  <p className={styles.card_text}>Men's Printed Pure Cotton T-Shirt - Regular Fit, Half Sleeve, Round </p>
                  <p>₹364 M.R.P: ₹1,199 (70% off)</p>
                </div>
              </Link>
              <Link to="/placeorder3" className={styles.card8} style={{ textDecoration: 'none', color: 'black' }}>
                <img src={img7} className={styles.card_img_top5} />
                <div className={styles.card_body}>
                  <h5 className={styles.card_title}>Jockey</h5>
                  <p className={styles.card_text}>MV01 Men's Super Combed Cotton Blend Solid Round Neck Half </p>
                  <p>₹1,019</p>
                </div>
              </Link>
              <Link to="/placeorder4" className={styles.card8} style={{ textDecoration: 'none', color: 'black' }}>
                <img src={img8} className={styles.card_img_top5} />
                <div className={styles.card_body}>
                  <h5 className={styles.card_title}>XYXX</h5>
                  <p className={styles.card_text}>Men's Pace 100% Cotton Regular Fit Crew Neck T-Shirt </p>
                  <p>50+ bought in past month</p>
                  <p>₹365 M.R.P: ₹449 (19% off)</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.k2}>
          <div className={styles.k8}>
            <h1 className={styles.k12}>Shirt</h1>
            <div className={styles.k11}>
              <Link to="/placeorder5" className={styles.card8} style={{ textDecoration: 'none', color: 'black' }}>
                <img src={img9} className={styles.card_img_top5} />
                <div className={styles.card_body}>
                  <h5 className={styles.card_title}>Peter England</h5>
                  <p className={styles.card_text}>Men's Slim Fit 100% Cotton Printed Shirt </p>
                  <p>₹929 M.R.P: ₹1,599 (42% off)</p>
                </div>
              </Link>
              <Link to="/placeorder6" className={styles.card8} style={{ textDecoration: 'none', color: 'black' }}>
                <img src={img10} className={styles.card_img_top5} />
                <div className={styles.card_body}>
                  <h5 className={styles.card_title}>Dennis Lingo</h5>
                  <p className={styles.card_text}>Men's Solid Slim Fit Cotton Casual Shirt with Spread Collar & Full </p>
                  <p>₹499 M.R.P: ₹1,849 (73% off)</p>
                </div>
              </Link>
              <Link to="/placeorder7" className={styles.card8} style={{ textDecoration: 'none', color: 'black' }}>
                <img src={img11} className={styles.card_img_top5} />
                <div className={styles.card_body}>
                  <h5 className={styles.card_title}>Pinkmint</h5>
                  <p className={styles.card_text}>Mens Long Sleeve Button Down Shirt for Men Collared Casual </p>
                  <p>₹349 M.R.P: ₹1,999 (83% off)</p>
                </div>
              </Link>
              <Link to="/placeorder8" className={styles.card8} style={{ textDecoration: 'none', color: 'black' }}>
                <img src={img12} className={styles.card_img_top5} />
                <div className={styles.card_body}>
                  <h5 className={styles.card_title}>The Indian Garage Co</h5>
                  <p className={styles.card_text}>Men's Regular Fit Shirt </p>
                  <p>₹409 M.R.P: ₹1,999 (80% off)</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.k2}>
          <div className={styles.k8}>
            <h1 className={styles.k12}>JEANS</h1>
            <div className={styles.k11}>
              <Link to="/placeorder9" className={styles.card8} style={{ textDecoration: 'none', color: 'black' }}>
                <img src={img13} className={styles.card_img_top5} />
                <div className={styles.card_body}>
                  <h5 className={styles.card_title}>Alpha Array</h5>
                  <p className={styles.card_text}>Comfort Slim Fit Jeans for Men </p>
                  <p>₹1,699 M.R.P: ₹4,999 (66% off)</p>
                </div>
              </Link>
              <Link to="/placeorder10" className={styles.card8} style={{ textDecoration: 'none', color: 'black' }}>
                <img src={img14} className={styles.card_img_top5} />
                <div className={styles.card_body}>
                  <h5 className={styles.card_title}>Amazon Brand - Symbol</h5>
                  <p className={styles.card_text}>Men Cotton Rich Stretchable Jeans </p>
                  <p>₹816.50 M.R.P: ₹1,899 (57% off)</p>
                </div>
              </Link>
              <Link to="/placeorder11" className={styles.card8} style={{ textDecoration: 'none', color: 'black' }}>
                <img src={img15} className={styles.card_img_top5} />
                <div className={styles.card_body}>
                  <h5 className={styles.card_title}>Amazon Brand - Symbol</h5>
                  <p className={styles.card_text}>Men's Cotton Lycra Stretchable Jeans</p>
                  <p>₹624 M.R.P: ₹2,499 (75% off)</p>
                </div>
              </Link>
              <Link to="/placeorder12" className={styles.card8} style={{ textDecoration: 'none', color: 'black' }}>
                <img src={img16} className={styles.card_img_top5} />
                <div className={styles.card_body}>
                  <h5 className={styles.card_title}>Neostreak</h5>
                  <p className={styles.card_text}>Men's Slim Fit Stretchable Jeans </p>
                  <p>₹659 M.R.P: ₹1,599 (59% off)</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <img src={img17} className={styles.kk} />
      <div className={styles.lineAboveImg}>
        <img src={img18} className={styles.kk1} />
      </div>
    </>
  );
}

export default Body;
