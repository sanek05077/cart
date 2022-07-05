import React from "react";
import {
  ICartItem,
    safelyDeleteItem,
  updateItemCount,
  increaseItemCount,
  decreaseItemCount,
  MIN_ITEMS_COUNT
} from "../../store/cart";
import {setPopupOpen} from "../../store/popup"
import { TrashFill } from "react-bootstrap-icons";
import "./styles.scss";

export const CartItem: React.FC<ICartItem> = ({
                                                  id,
                                                  name,
                                                  count,
                                                  price,
                                                  image
                                              }) => {
    return (
        <div className="cart-box">
            <div className="col">
                <div className="cart-product-image">
                    <img src={image} alt="Alt img" />
                </div>
                <strong className="cart-product-name">{name}</strong>
            </div>
            <div className="col">
                <div className="cart-counter">
                    <span className="title-counter">Количество</span>
                    <div className="holder">
                        {count > MIN_ITEMS_COUNT && (
                            <button
                                type="button"
                                className="button-counter"
                                onClick={() => decreaseItemCount({ id })}
                            >
                                -
                            </button>
                        )}
                        <input
                            type="text"
                            className="input-counter"
                            value={count}
                            onChange={(e) =>
                                updateItemCount({ id, count: Number(e.target.value) })
                            }
                        />
                        <button
                            type="button"
                            className="button-counter"
                            onClick={() => increaseItemCount({ id })}
                        >
                            +
                        </button>
                    </div>
                </div>
                <span className="cart-product-price">{price * count} &#8372;</span>
            </div>
            <span
                className="remove"
                onClick={() => {
                    safelyDeleteItem(id);
                    setPopupOpen(true);
                }}
            >
        <TrashFill />
      </span>
        </div>
    );
};
