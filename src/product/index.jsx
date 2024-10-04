/* eslint-disable react/prop-types */
import "./styles.css";
const Product = ({
  img,
  title,
  price,
  onDragStart,
  onDragOver,
  onDrop,
  onClick,
}) => {
  return (
    <div
      className="card"
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
    >
      <img src={img} alt={title} className="card-image" />
      <div className="card-content">
        <h5 className="card-title">{title}</h5>
        <p className="card-description">${price}</p>
      </div>
    </div>
  );
};
export default Product;
