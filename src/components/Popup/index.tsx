import React from "react";
import { useStore } from "effector-react";
import { $isPopupOpen, setPopupOpen } from "../../store/popup";
import { restoreCart } from "../../store/cart";
import "./styles.scss";

export const Popup: React.FC = () => {
  const isPopupOpen = useStore($isPopupOpen);

  const handleClose = () => setPopupOpen(false);
  return (
      <>
        {isPopupOpen && (
            <div className="popup">
              <div className="popup_inner">
                <h4>Товар был удален</h4>
                <div className="btns-block">
                  <button
                      className="btn"
                      onClick={() => {
                        handleClose();
                        restoreCart();
                      }}
                  >
                    Отменить
                  </button>
                  <button className="btn" onClick={handleClose}>
                    Ок
                  </button>
                </div>
              </div>
            </div>
        )}
      </>
  );
};
