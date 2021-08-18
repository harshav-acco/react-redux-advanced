import { cartActions } from "./cart-slice";
import { uiSliceActions } from "./ui-slice";

export const fetchItemsFromCart = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch(
                'https://react-redux-advanced-d66cf-default-rtdb.firebaseio.com/cart.json'
            );
        
            if (!response.ok) {
                throw new Error("Could not fetch data");
            }

            const data = await response.json()

            return data;
        }

        try {
            const data = await fetchData();
            dispatch(cartActions.replaceCart({
                items: data.items || [],
                totalQuantity: data.totalQuantity,
            }));
        } catch (error) {
            dispatch(uiSliceActions.showNotification({
                status: "error",
                title: "Error!",
                message: "Fetching cart data from firebase failed"
            }));
        }
    }
}

export const sendItemsToCart = cart => {
    return async dispatch => {
        dispatch(uiSliceActions.showNotification({
            status: "Pending",
            title: "Sending...",
            message: "Sending cart data to firebase!"
        }));

        const sendRequest = async () => {
            const response = await fetch(
                'https://react-redux-advanced-d66cf-default-rtdb.firebaseio.com/cart.json', 
                { 
                  method: "PUT",
                  body: JSON.stringify(cart),
                }
            );
        
            if (!response.ok) {
                throw new Error("Sending cart data to firebase failed");
            }
        }

        try {
            await sendRequest();

            dispatch(uiSliceActions.showNotification({
                status: "success",
                title: "Success!",
                message: "Sent cart data to firebase!"
            }));
        } catch (error) {
            dispatch(uiSliceActions.showNotification({
                status: "error",
                title: "Error!",
                message: "Sending cart data to firebase failed"
            }));
        }
    }
}
