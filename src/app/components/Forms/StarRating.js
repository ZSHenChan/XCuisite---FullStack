import styles from "./forms.module.scss";

const StarRating = ({ rating, onRatingChange }) => {
  const handleClick = (index) => {
    onRatingChange(index + 1);
  };

  return (
    <div className={styles.starRating}>
      {[...Array(5)].map((star, index) => (
        <span
          key={index}
          className={index < rating ? styles.filledStar : styles.emptyStar}
          onClick={() => handleClick(index)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
