import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {new Date().getFullYear()} MyMoviz App — Made with ❤️ by Elisa Gomez
      </p>
    </footer>
  );
}
export default Footer;
