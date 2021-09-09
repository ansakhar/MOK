import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';


function Product(props) {
  return (
    <div className="Product">
    <button>Buy</button>
    <img src={props.product.image} alt="foto"></img>
    <p className="Product-Title">{props.product.title}</p>
    <div>{props.product.price} €</div>
    <p>{props.product.description}</p>
    <div className="Product-Category">{props.product.category}</div>
    </div>
  )
}

function ShoppingChart() {
  return (
    <div>
      <h3>ShoppingChart</h3>
    </div>
  )
}

function App() {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data)
      })
  }, [])

const productItems = products.map((product,index) =>
  <Product key={index} product={product}/>
);

  return (
    <div >
      
     <div className="Window1">
      <h3>Products</h3>
    <ul>
      {productItems}
    </ul>
    </div>

    <div className="Window2">
    <ShoppingChart/>
    </div>
   
  </div>
);
}

export default App;
