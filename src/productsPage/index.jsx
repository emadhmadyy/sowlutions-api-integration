import { useEffect, useState } from "react";
import { _get } from "../helpers/apiClient";
import Product from "../product";
import "./styles.css";
import Popup from "../popup";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedProductIndex, setDraggedProductIndex] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };
  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  const onDragStart = (index) => {
    setDraggedProductIndex(index);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (index) => {
    if (draggedProductIndex === null) return;
    const newProducts = [...data];
    const draggedItem = newProducts[draggedProductIndex];
    newProducts.splice(draggedProductIndex, 1);
    newProducts.splice(index, 0, draggedItem);
    setData(newProducts);
    localStorage.setItem("productsData", JSON.stringify(newProducts));
    setDraggedProductIndex(null);
  };
  useEffect(() => {
    const cachedData = localStorage.getItem("productsData");
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setLoading(false);
    } else {
      fetchData();
    }
  }, []);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await _get("/products");
      setData(response.data);
      localStorage.setItem("productsData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  return loading ? (
    <p>is loading</p>
  ) : (
    <div className="products">
      {data.map((item, index) => {
        return (
          <Product
            key={item.id}
            img={item.image}
            title={item.title}
            price={item.price}
            onDragStart={() => onDragStart(index)}
            onDragOver={onDragOver}
            onDrop={() => onDrop(index)}
            onClick={() => handleProductClick(item)}
          ></Product>
        );
      })}
      <Popup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        product={selectedProduct}
      />
    </div>
  );
};
export default Products;
