import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.css';
import { myContext } from '../App';
import ImageLogo from '../../public/logo.png'

function NabBar() {
  // ContextData
  const { cartStatus } = useContext(myContext);

  return (
    <Navbar bg="light" expand="md">
      <Container>
      <img src={ImageLogo} alt="Logo" className={styles.logo} />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className={styles.navbar_links} id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/order_online">
              Order online
            </Nav.Link>
            <Nav.Link as={Link} to="/book_table">
              Book table
            </Nav.Link>
            <Nav.Link as={Link} to="/menu">
              Menu
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartStatus && (
                <span className={styles.cartBadge}>
                  <FontAwesomeIcon icon={faCheckCircle} />
                </span>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NabBar;
