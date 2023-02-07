import styles from "./styles.module.css";

function QuestionCard( {questionData, answerNumber, questionOwner} ) {



  return (
    <div className={styles.question}>
      <div className={styles.likesAndAnswersContainer}>
        <div className={styles.likeNumber}>
          <p>{questionData.likeNumber} likes</p>
        </div>
        <div className={styles.answerNumber}>
          <p>{answerNumber} answers</p>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.questionTextContent}>
          <h3>{questionData.questionTitle}</h3>
        </div>
        <div className={styles.userContainer}>
          <div className={styles.userAvatarContainer}>
            <img src={questionOwner.avatar} alt="question creator's avatar" />
          </div>
          <p>{questionOwner.userName}</p>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;