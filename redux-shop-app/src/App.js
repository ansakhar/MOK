import React, {useEffect} from 'react'
import { Provider, useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { createStore } from "redux";
import './App.css';

//Actions
function initProducts(data) {
  return { type: "INIT_PRODUCTS", data: data};
}

function buyProduct(product) {
  return { type: "BUY_PRODUCT", product: product, index: Math.random()};
}

function removeProduct(index, price) {
  return { type: "REMOVE_PRODUCT", index: index, price: price};
}

// Redux Reducer
function productsReducer(state = { products:[], cart:[], total: 0 }, action)  {
  console.log('action', action)
  switch (action.type) {
    case 'INIT_PRODUCTS':
      return { 
        ...state,
        products: state.products.concat(action.data)
    }
    case 'BUY_PRODUCT':
      return { 
        ...state,
        //cart: state.cart.concat(action.product),
        cart: [...state.cart, {title: action.product.title, image: action.product.image, price: action.product.price, index: action.index}],
        total: state.total + action.product.price
    }
    case 'REMOVE_PRODUCT':
      /*const deletedProduct = state.cart.find(product => product.index === action.index);
      const price = deletedProduct.price;*/
      const newProducts = state.cart.filter(product => product.index !== action.index);
      return {
        ...state, 
        cart: newProducts,
        total: state.total - action.price
      }
    default: return state;
  }
}

//Components
function Product(props) {
  const dispatch = useDispatch();
  return (
    <div className="Product">
    <button onClick={() => dispatch(buyProduct(props.product))}>Buy</button>
    <img src={props.product.image} alt="foto"></img>
    <p className="Product-Title">{props.product.title}</p>
    <div>{props.product.price} €</div>
    <p>{props.product.description}</p>
    <div className="Product-Category">{props.product.category}</div>
    </div>
  )
}

function Product2(props) {
  const dispatch = useDispatch();
  return (
    <div className="Product2">
    <button onClick={() => dispatch(removeProduct(props.product.index, props.product.price))}> X </button>
    <img src={props.product.image} alt="foto"></img>
    <p>{props.product.title}</p>
    <div>{props.product.price} €</div>
    </div>
  )
}

function Products() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

 useEffect(() => {
  axios
  .get('https://fakestoreapi.com/products')
  .then(response => {
  dispatch(initProducts(response.data))
  //console.log(response.data)
})
},[dispatch])

const productItems = products.map((product,index) =>
  <Product key={index} product={product}/>
);
console.log("ProductItems: ",productItems)
  return (
    <div className="Window1">
      <div className="Title">Products</div>
    <ul>
      {productItems}
    </ul>
    </div>
  )
}

function ShoppingChart() {
  const cart = useSelector(state => state.cart);
  const total = useSelector(state => state.total);

  const ShoppingChart = cart.map((product,index) =>
  <Product2 key={index} product={product}/>
);
console.log("ShoppingChart: ",ShoppingChart)
  return (
    <div className="Window2">
      <div className="Title">ShoppingChart</div>
      <ul>
      {ShoppingChart}
    </ul>
    <div className="Total">Total: {total.toFixed(2)} €</div>
    </div>
  )
}

function App() {
  const store = createStore(productsReducer)
  return (
    <Provider store={store}>
      
    <Products/>
    <ShoppingChart/>

  </Provider>
);
}

export default App;
