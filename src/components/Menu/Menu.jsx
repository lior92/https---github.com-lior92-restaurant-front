import React, { useEffect, useState } from "react";
import { Image, Nav, Tab, Spinner } from "react-bootstrap";
import styles from "./style.module.css";
import axios from "axios";
import { useLocation } from "react-router";

const Menu = () => {
  const location = useLocation();
  const { state } = location;

  const [activeTab, setActiveTab] = useState(state || "Appetizers");
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://restaurant-server-nqis.onrender.com/dishes/all_dishes")
      .then((res) => {
        setDishes(res.data.dishes);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTabSelect = (eventKey) => {
    setActiveTab(eventKey);
  };

  return (
    <div className={styles.menu_container}>
      <div className={styles.background_image_container}>
        <Image
          src="https://images.pexels.com/photos/313700/pexels-photo-313700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Example Image"
        />
      </div>

      <Tab.Container
        activeKey={activeTab}
        className={styles.menu_container}
        onSelect={handleTabSelect}
      >
        <Nav justify variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="Appetizers">Appetizers</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Mains">Mains</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Desserts">Desserts</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Drinks">Drinks</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className={styles.menu_content}>
          {isLoading ? ( // Show spinner while loading
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            dishes.map((dish, i) => {
              if (dish.category === activeTab) {
                return (
                  <Tab.Pane key={i} eventKey={activeTab} className={activeTab}>
                    <div className={styles.dish_container}>
                      <h3 className={styles.dish_title}>{dish.title}</h3>
                      <p className={styles.dish_description}>
                        {dish.description}
                      </p>
                    </div>
                  </Tab.Pane>
                );
              }
            })
          )}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default Menu;
