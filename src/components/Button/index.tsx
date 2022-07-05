import "./styles.scss";
import { $cart } from "../../store/cart";
import { useStore } from "effector-react";

export const Button = () => {
  const cart = useStore($cart);

  const completeOrder = () => {
    console.log("Заказ:", cart);
  };

  return (
      <div className="container">
        <div className="row justify-content-right">
          <button type="button" className="btn" onClick={() => completeOrder()}>
            Оформить
          </button>
        </div>
      </div>
  );
};
