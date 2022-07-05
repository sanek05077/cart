import { createStore, createEvent } from "effector";

export const $isPopupOpen = createStore<boolean>(false);

export const setPopupOpen = createEvent<boolean>();

$isPopupOpen.on(setPopupOpen, (_, isOpen) => isOpen);
