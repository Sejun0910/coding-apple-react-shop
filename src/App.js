import { createContext, useState } from 'react';
import './App.css';
import {Nav, Navbar, Container} from 'react-bootstrap';
import bg from './img/bg.png';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail';
import axios from 'axios';
import Cart from './routes/Cart.js';

function Card(props) {
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width={"80%"}/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
    )
}

function About() {
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return(
    <div>
      <h3>오늘의 이벤트</h3>
      <Outlet></Outlet>
    </div>
  )
}


function App() {

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();

  return (
    <div className="App">


      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">tpwnsShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>



      <Routes>
        <Route path='/' element={
          <>
          <div className='main-bg'></div>
          <div className="container">
            <div className="row">
              { shoes.map((a, i)=> {
                  return <Card shoes={shoes[i]} i={i}></Card>
              })}
            </div>
          </div> 
          <button onClick={()=>{
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((결과)=>{ 
              let copy = [...shoes, ...결과.data];
              setShoes(copy);
            })
            .catch(()=>{
              console.log('실패함 ㅅㄱ')
            })
          }}>버튼</button>
          </>
        } />
        <Route path='/detail/:id' element={<Detail shoes={shoes}/>} />
        
        <Route path='/cart' element={ <Cart/> } />


        
        <Route path='/about' element={<About/>}>
          <Route path='member' element={<div>멤버정보임</div>} />
          <Route path='location' element={<div>위치정보임</div>} />
        </Route>
        
        <Route path='/event' element={<Event/>}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path='two' element={<div>생일기념 쿠폰받기</div>}/>
        </Route>



        <Route path='*' element={<div>없는 페이지요</div>} />
      </Routes>
        
    </div>
  );
}

export default App;