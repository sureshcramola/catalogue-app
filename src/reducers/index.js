import { ADD_PRODUCT } from "../constants/action-types";
const initialState = {
    products: []
};
function rootReducer(state = initialState, action) {
    if (action.type === ADD_PRODUCT) {
        return Object.assign({}, state, {
            products: state.products.concat(action.payload)
        });
    }
    return state;
}
export default rootReducer;