import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from "./components/UI/Notification";

import { uiSliceActions } from "./store/ui-slice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isCartVisible = useSelector(state => state.ui.isCartVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiSliceActions.showNotification({
        status: "Pending",
        title: "Sending...",
        message: "Sending cart data to firebase!"
      }));
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

      dispatch(uiSliceActions.showNotification({
        status: "success",
        title: "Success!",
        message: "Sent cart data to firebase!"
      }));
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch(error => {
      dispatch(uiSliceActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Sending cart data to firebase failed"
      }));
    }) 
    
  }, [cart, dispatch]);

  return (
    <Fragment>
      {
        notification && <Notification 
          status={notification.status} 
          title={notification.title}
          message={notification.message}
        />
      }
      <Layout>
        { isCartVisible && <Cart /> }
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
