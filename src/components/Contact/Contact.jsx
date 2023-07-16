import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Card } from 'react-bootstrap';
import styles from './style.module.css';

function Contact() {
  return (
    <div className={styles.contact_container}>
      <Card className={styles.contact_card}>
        <Card.Body>
          <Card.Title className={styles.contact_title}>Contact Us</Card.Title>
          <div className={styles.contact_info}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.contact_icon} />
            <span className={styles.contact_text}>example@example.com</span>
          </div>
          <div className={styles.contact_info}>
            <FontAwesomeIcon icon={faPhone} className={styles.contact_icon} />
            <span className={styles.contact_text}>123-456-7890</span>
          </div>
          <div className={styles.contact_social}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className={styles.social_icon} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className={styles.social_icon} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className={styles.social_icon} />
            </a>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Contact;
