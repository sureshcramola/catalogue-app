import { ADD_PRODUCT } from "../constants/action-types";
export function addProduct(payload) {
    return { type: ADD_PRODUCT, payload };
}