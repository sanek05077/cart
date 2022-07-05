import { createStore, createEvent, sample } from "effector";
import { $totalItemsCount } from "../cart";

export interface IDiscountItem {
    itemsCount: number;
    percent: number;
}

export const $discountSystem = createStore<IDiscountItem[]>([]);

export const initDiscountSystem = createEvent<IDiscountItem[]>();

export const $applicableDiscount = createStore<IDiscountItem>({
    itemsCount: 0,
    percent: 0
});

$discountSystem.on(initDiscountSystem, (_, newData) => newData);

sample({
    source: [$discountSystem, $totalItemsCount],
    fn: ([discountSystem, totalItemsCount]) =>
        discountSystem.reduce(
            function (currentDiscount, item) {
                if (
                    totalItemsCount >= item.itemsCount &&
                    item.itemsCount > currentDiscount.itemsCount
                ) {
                    return item;
                } else {
                    return currentDiscount;
                }
            },
            { itemsCount: 0, percent: 0 }
        ),
    target: $applicableDiscount
});

