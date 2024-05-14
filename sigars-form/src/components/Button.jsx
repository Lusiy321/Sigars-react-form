import styles from "../../styles/Button.css";

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      Закрыть
    </button>
  );
};

export default Button;
