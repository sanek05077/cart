import {useStore} from "effector-react";
import { $totalItemsCount } from "./store/cart";
import {Cart} from "./components/Cart";
import { Button } from "./components/Button/";
import { Total } from "./components/Total/";
import "./App.scss";

function App() {
  const totalItemsCount = useStore($totalItemsCount);
  return (
    <div className="App">
      <Cart />
      {totalItemsCount > 0 && (
        <>
          <Total />
          <Button />
        </>
      )}
    </div>
  );
}

export default App;
