import { createStore, createEvent, sample } from "effector";

export interface ICartItem {
  id: number;
  name: string;
  count: number;
  price: number;
  image: string;
}

export const MIN_ITEMS_COUNT = 1;

export const $cart = createStore<ICartItem[]>([]);
export const $sum = createStore<number>(0);
export const $totalItemsCount = createStore<number>(0);

export const initCart = createEvent<ICartItem[]>();

export const safelyDeleteItem = createEvent<number>();
export const restoreCart = createEvent();
const deleteItem = createEvent<number>();

export const updateItemCount = createEvent<{ id: number; count: number }>();

export const increaseItemCount = createEvent<{ id: number }>();

export const decreaseItemCount = createEvent<{ id: number }>();

const createSnapshot = createEvent();
export const $snapshot = createStore<ICartItem[]>([]);

sample({
  source: $cart,
  clock: createSnapshot,
  target: $snapshot
});

const deleteItemHandler = (oldData: ICartItem[], id: number) =>
  oldData.filter((item) => item.id !== id);

const updateItemCountHandler = (
  oldData: ICartItem[],
  { id, count }: { id: number; count: number }
) =>
  oldData.map((item) => {
    if (item.id === id) {
      const newCountVal =
        item.count < MIN_ITEMS_COUNT ? MIN_ITEMS_COUNT : item.count;
      return { ...item, newCountVal };
    } else {
      return item;
    }
  });

const increaseItemCountHandler = (
  oldData: ICartItem[],
  { id }: { id: number }
) =>
  oldData.map((item) =>
    item.id === id ? { ...item, count: item.count + 1 } : item
  );

const decreaseItemCountHandler = (
  oldData: ICartItem[],
  { id }: { id: number }
) =>
  oldData.map((item) => {
    if (item.id === id) {
      const newCountVal =
        item.count - 1 < MIN_ITEMS_COUNT ? MIN_ITEMS_COUNT : item.count - 1;
      return { ...item, count: newCountVal };
    } else {
      return item;
    }
  });

$cart.on(initCart, (_, newData) => newData);

$cart.on(deleteItem, deleteItemHandler);

$cart.on(increaseItemCount, increaseItemCountHandler);

$cart.on(decreaseItemCount, decreaseItemCountHandler);

$cart.on(updateItemCount, updateItemCountHandler);

sample({ clock: safelyDeleteItem, target: createSnapshot });
sample({ clock: createSnapshot, source: safelyDeleteItem, target: deleteItem });
sample({ clock: restoreCart, source: $snapshot, target: $cart });

sample({
  source: $cart,
  fn: (cart) =>
    cart.reduce(function (sum, item) {
      return sum + item.count * item.price;
    }, 0),
  target: $sum
});

sample({
  source: $cart,
  fn: (cart) =>
    cart.reduce(function (sum, item) {
      return sum + item.count;
    }, 0),
  target: $totalItemsCount
});
