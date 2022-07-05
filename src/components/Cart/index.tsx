import React from "react";
import { useStore } from "effector-react";
import { $cart, initCart } from "../../store/cart";
import { initDiscountSystem } from "../../store/discountSystem";
import { CartItem } from "../CartItem";
import { Popup } from "../Popup"
import "./styles.scss";

export const Cart = () => {
  React.useEffect(() => {
    const cart = [
      {
        id: 1,
        name: "Название товара 1",
        count: 1,
        price: 10,
        image:
            "https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png"
      },
      {
        id: 2,
        name: "Название товара 2",
        count: 1,
        price: 20,
        image:
            "https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png"
      },
      {
        id: 3,
        name: "Название товара 3",
        count: 2,
        price: 30,
        image:
            "https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png"
      },
      {
        id: 4,
        name: "Название товара 4",
        count: 3,
        price: 40,
        image:
            "https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png"
      }
    ];

    const discounts = [
      { itemsCount: 3, percent: 7 },
      { itemsCount: 4, percent: 10 }
    ];

    initCart(cart);
    initDiscountSystem(discounts);
  }, []);

  const storeCart = useStore($cart);

  return (
      <div className="container">
        <Popup />
        <div className="cart">
          <h1>Корзина</h1>
          <div className="cart-list">
            {storeCart.length > 0 &&
            storeCart.map((item) => {
              return (
                  <CartItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      count={item.count}
                      price={item.price}
                      image={item.image}
                  />
              );
            })}
            {storeCart.length === 0 && <span>Корзина пуста</span>}
          </div>
        </div>
      </div>
  );
};
