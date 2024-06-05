import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Homepage/Navbar';
import Prodect from './Prodect';
import Body from './Homepage/Body/Body';
import Tshirtitems from './Empitems/Tshirtitems';
import Shirtitems from './Empitems/Shirtitems';
import Jeansitems from './Empitems/jeansitems';
import Porder1 from './Porders/Porder1';
import Porder2 from './Porders/Porder2';
import Porder3 from './Porders/Porder3';
import Porder4 from './Porders/Porder4';
import Porder5 from './Porders/Porder5';
import Porder6 from './Porders/Porder6';
import Porder7 from './Porders/Porder7';
import Porder8 from './Porders/Porder8';
import Porder9 from './Porders/Porder9';
import Porder10 from './Porders/Porder10';
import Porder11 from './Porders/Porder11';
import Porder12 from './Porders/Porder12';
import Signup from './Signup';
import Cart from './Cart';
import Login from './Login';
import Order from './Order';
import Payment from './Payment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './AdminLogin';
import Admin1 from './Admin/Admin1';

function App() {
  return (
    <div className='App'>
     <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<>
            <Navbar />
            <Prodect />
          </>} />
          {/* Define other routes here */}
          <Route path='/items' element={<Tshirtitems/>}></Route>
          <Route path='/shirt' element={<Shirtitems/>}></Route>
          <Route path='/jeans' element={<Jeansitems/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/placeorder1' element={<Porder1/>}></Route>
          <Route path='/placeorder2' element={<Porder2/>}></Route>
          <Route path='/placeorder3' element={<Porder3/>}></Route>
          <Route path='/placeorder4' element={<Porder4/>}></Route>
          <Route path='/placeorder5' element={<Porder5/>}></Route>
          <Route path='/placeorder6' element={<Porder6/>}></Route>
          <Route path='/placeorder7' element={<Porder7/>}></Route>
          <Route path='/placeorder8' element={<Porder8/>}></Route>
          <Route path='/placeorder9' element={<Porder9/>}></Route>
          <Route path='/placeorder10' element={<Porder10/>}></Route>
          <Route path='/placeorder11' element={<Porder11/>}></Route>
          <Route path='/placeorder12' element={<Porder12/>}></Route>
          <Route path='/payment' element={<Payment/>}></Route>
          <Route path='/order' element={<Order/>}></Route>
          <Route path='/admin1' element={<Admin1/>}></Route>
          <Route path='/adminlogin' element={<AdminLogin/>}></Route>
        </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
