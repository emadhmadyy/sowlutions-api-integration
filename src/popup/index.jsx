/* eslint-disable react/prop-types */
import "./styles.css";

const Popup = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {product && (
          <div>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category:{product.category}</p>
            <p>Rating: {product.rating.rate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
