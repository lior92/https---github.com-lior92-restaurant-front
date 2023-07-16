import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <p>
          Made with <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} /> by me
        </p>
        <div className={styles.socialIcons}>
          <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
          <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
          <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
