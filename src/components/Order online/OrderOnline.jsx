import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { Card, Button, Spinner } from "react-bootstrap";
import { myContext } from "../../App";

function OrderOnline() {
  const [dishes, setDishes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true); // New state for loading spinner

  // ContextData
  const { cart, setCart, setCartStatus } = useContext(myContext);

  useEffect(() => {
    axios
      .get("https://restaurant-server-nqis.onrender.com/dishes/all_dishes")
      .then((res) => {
        setDishes(res.data.dishes);
        setIsLoading(false); // Data loaded, set isLoading to false
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredDishes = activeCategory
    ? dishes.filter((dish) => dish.category === activeCategory)
    : dishes;

  const handleAddToCart = (dishId) => {
    if (cart.length > 7) {
      alert("Maximum 7 orders");
      return;
    }

    const dish = dishes.find((dish) => dish._id === dishId);

    const existingDish = cart.find((item) => item._id === dish._id);
    if (existingDish) {
      const updatedCart = cart.map((item) =>
        item._id === existingDish._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart((prevCartItems) => [...prevCartItems, { ...dish, quantity: 1 }]);
    }

    setCartStatus(true);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Order Online</h2>

      <div className={styles.categories}>
        <button
          className={activeCategory === "" ? styles.activeCategory : ""}
          onClick={() => setActiveCategory("")}
        >
          All
        </button>
        <button
          className={
            activeCategory === "Appetizers" ? styles.activeCategory : ""
          }
          onClick={() => setActiveCategory("Appetizers")}
        >
          Appetizers
        </button>
        <button
          className={activeCategory === "Mains" ? styles.activeCategory : ""}
          onClick={() => setActiveCategory("Mains")}
        >
          Main Courses
        </button>
        <button
          className={activeCategory === "Desserts" ? styles.activeCategory : ""}
          onClick={() => setActiveCategory("Desserts")}
        >
          Desserts
        </button>
        <button
          className={activeCategory === "Drinks" ? styles.activeCategory : ""}
          onClick={() => setActiveCategory("Drinks")}
        >
          Drinks
        </button>
      </div>

      <div className={styles.gridContainer}>
        {isLoading ? ( // Show spinner while loading
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          filteredDishes.map((dish) => (
            <Card key={dish._id} className={styles.card}>
              <Card.Img
                variant="top"
                src={dish.image}
                className={styles.cardImage}
              />
              <Card.Body className={styles.cardBody}>
                <Card.Title>{dish.title}</Card.Title>
                <Card.Text>{dish.description}</Card.Text>
                <div className={styles.price}>
                  <span className={styles.price}>Price: {dish.price}</span>
                </div>
                <div className={styles.quantity}>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleAddToCart(dish._id)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default OrderOnline;
