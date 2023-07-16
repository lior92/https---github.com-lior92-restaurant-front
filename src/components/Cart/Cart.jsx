import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { faShieldAlt, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { myContext } from "../../App";
import styles from "./style.module.css";
import axios from "axios";
import { useNavigate } from "react-router";

function Cart() {
  //Hooks
  const Navigate = useNavigate();

  // ContextData
  const { cart, setCart, setCartStatus } = useContext(myContext);
  const [showModal, setShowModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    address: "",
    payment: "",
  });

  // Alert config
  const [randomNumber, setRandomNumber] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className={styles.empty_cart}>
        <h1>Your cart is empty</h1>
      </div>
    );
  }

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => {
    //  console.log(Number(item.price.split('$')[1]))
    return sum + Number(item.price.split("$")[1]);
  }, 0);

  const handleBuy = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevOrderDetails) => ({
      ...prevOrderDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const generatedNumber = Math.floor(Math.random() * 10);
    setRandomNumber(generatedNumber);
    setShowAlert(true);

    handleCloseModal();

    //Fake payment
    setTimeout(() => {
      if (generatedNumber % 2 == 0) {
        const dishes = cart.map((dish) => {
          return {
            category: dish.category,
            price: 20,
            description: dish.price.split("$")[1],
            quantity: dish.quantity,
          };
        });

        const data = {
          dishes,
        };

        //Post request to save the order in the db
        axios
          .post("https://restaurant-server-nqis.onrender.com/orders/add_order", data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {

            if (res.data.success) {
              //Reset Cart/CartStatus
              setCart([]);
              setCartStatus(false);
              Navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 2000);
  };

  return (
    <div className={styles.cart_container}>
      <h2 className="text-center">Cart</h2>
      <ul className="list-group">
        {cart.map((item) => (
          <li
            key={item._id}
            className="list-group-item d-flex justify-content-between"
          >
            <div>{item.title}</div>

            <div>
              Quantity:{item.quantity}{" "}
              <span className={styles.price}>{item.price}</span>{" "}
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.total_price}>
        <span>Total Price:</span>
        <span className={styles.total_price}>${totalPrice.toFixed()}</span>
      </div>
      <div className="text-center mt-4">
        <Button variant="primary" onClick={handleBuy}>
          Buy
        </Button>
      </div>

      {/* Modal for order details */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.formSection}>
            <h4>
              <FontAwesomeIcon icon={faShieldAlt} /> Payment Details
            </h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="name"
                  value={orderDetails.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCreditCardNumber">
                <Form.Label>Credit Card Number</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="creditCardNumber"
                  value={orderDetails.creditCardNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formSafetyNumber">
                <Form.Label>Safety Number</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="safetyNumber"
                  value={orderDetails.safetyNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Form>
          </div>
          <div className={styles.formSection}>
            <h4>
              <FontAwesomeIcon icon={faMapMarkedAlt} /> Address
            </h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="address"
                  value={orderDetails.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="city"
                  value={orderDetails.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="street"
                  value={orderDetails.street}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBuildingNumber">
                <Form.Label>Building Number</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="buildingNumber"
                  value={orderDetails.buildingNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEntrance">
                <Form.Label>Entrance</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="entrance"
                  value={orderDetails.entrance}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formHouseNumber">
                <Form.Label>House Number</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="houseNumber"
                  value={orderDetails.houseNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                onClick={handleBuy}
              >
                Submit Order
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>

      {/* Alert for success/danger random number */}
      {showAlert && randomNumber !== null && (
        <Alert
          variant={randomNumber % 2 === 0 ? "success" : "danger"}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {randomNumber % 2 === 0
            ? "Thank you! the order is on the way"
            : "Wrong card details"}
        </Alert>
      )}
    </div>
  );
}

export default Cart;
