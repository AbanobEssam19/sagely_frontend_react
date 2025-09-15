import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "../../states/reducers/alertSlice";

export const useAlert = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.alert);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const onClose = () => dispatch(clearAlert());

  return { message, type, onClose };
};
