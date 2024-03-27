import React, { useState, useEffect } from "react";

import "./App.css";
import { Products } from "./features/products/Products";
import { Cart } from "./features/cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "./features/cart/cartSlice";

function App() {
  const [showcart, setShowcart] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsync());
  }, []);

  return (
    <div className="App">
      <button onClick={() => setShowcart(!showcart)}>
        {!showcart ? `Cart [${items.length}]` : "Show Products"}
      </button>
      {showcart ? <Cart></Cart> : <Products></Products>}
    </div>
  );
}

export default App;
