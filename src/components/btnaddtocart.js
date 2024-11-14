import { addToCart } from "@/redux/slices/cartSlices";
import { useDispatch } from "react-redux";

const AddCartButton = ({ data, quantity, selectedSize, selectedColor, children }) => {
  const dispatch = useDispatch();

  if (!data || !data._id) {
    console.error('Invalid data provided:', data);
    return null;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: data._id,
      quantity,
      size: selectedSize,
      color: selectedColor
    }));
  };

  return (
    <button
      className="detail_addtocart"
      onClick={handleAddToCart}
    >
      {children}
    </button>
  );
};

export default AddCartButton;
