import React from "react";
import { useStore } from "effector-react";
import { $sum } from "../../store/cart"
import { $applicableDiscount } from "../../store/discountSystem"

import "./styles.scss";

export const Total: React.FC = () => {
  const sum = useStore($sum);
  const applicableDiscount = useStore($applicableDiscount);

  const discountSum = (sum * applicableDiscount.percent) / 100;
  const totalSum = sum - discountSum;

  return (
      <div className="container">
        <div className="row justify-content-right text-right">
          <div className="total-block">
            <span className="total-title">Общая сумма</span>
            <strong className="total">{sum} &#8372;</strong>
            <span className="total-title">
            Скидка {discountSum > 0 && `(${applicableDiscount.percent}%)`}
          </span>
            <strong className="total">
              {discountSum > 0 && "-"} {discountSum} &#8372;{" "}
            </strong>
            <span className="total-title">Сумма к оплате</span>
            <strong className="total">{totalSum} &#8372;</strong>
          </div>
        </div>
      </div>
  );
};