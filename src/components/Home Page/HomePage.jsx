import React from "react";
import styles from "./style.module.css";
import { Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router";

function HomePage() {
  
  //Hooks
  const Navigate = useNavigate();

  return (
    <div className={styles.home_container}>
      <Container className={styles.about}>
        <div className={`${styles["about-wrapper"]} container`}>
          <div className={styles["about-text"]}>
            <p className={`${styles.small}`}>About Us</p>
            <h2>Your Trusted Healthy Food Provider</h2>
            <p>
              For a decade, we have been dedicated to crafting nutritious and
              delicious food options. Our commitment to quality and taste has
              made us a trusted name in the industry.
            </p>
          </div>
          <div className={styles["about-img"]}>
            <img
              src="https://i.postimg.cc/mgpwzmx9/about-photo.jpg"
              alt="food"
            />
          </div>
        </div>
      </Container>

      <section className={styles.food}>
        <h2>Types of food</h2>
        <div className={`${styles["food-container"]} container`}>
          <div>
            <div className={styles.img_container}>
              <img
                src="https://images.pexels.com/photos/1028637/pexels-photo-1028637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="error"
              />
              <div className={styles.img_content}>
                <h3>Drinks</h3>
                <Nav.Link
                  onClick={() => Navigate("/menu", { state: "Drinks" })}
                >
                  menu
                </Nav.Link>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.img_container}>
              <img
                src="https://images.pexels.com/photos/2059151/pexels-photo-2059151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="error"
              />
              <div className={styles.img_content}>
                <h3>Mains</h3>
                <Nav.Link onClick={() => Navigate("/menu", { state: "Mains" })}>
                  menu
                </Nav.Link>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.img_container}>
              <img
                src="https://images.pexels.com/photos/1485805/pexels-photo-1485805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="error"
              />
              <div className={styles.img_content}>
                <h3>Desserts</h3>
                <Nav.Link
                  onClick={() => Navigate("/menu", { state: "Desserts" })}
                >
                  menu
                </Nav.Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
