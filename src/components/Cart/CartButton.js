import { useDispatch, useSelector } from "react-redux";

import { uiSliceActions } from "../../store/ui-slice";
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const quantity = useSelector(state => state.cart.totalQuantity);
  const cartHandler = () => {
    dispatch(uiSliceActions.toggleCart());
  };

  return (
    <button className={classes.button} onClick={cartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
