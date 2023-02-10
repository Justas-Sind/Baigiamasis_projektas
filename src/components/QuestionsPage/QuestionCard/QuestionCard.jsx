import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";


function QuestionCard( {questionData, answerNumber, questionOwner} ) {

  const navigation = useNavigate();

  const likeNumber = questionData.likes.length - questionData.dislikes.length;

  return (
    <div className={styles.question} onClick={() => navigation(`/questions/${questionData.id}`)} >
      <div className={styles.likesAndAnswersContainer}>
        <div className={styles.likeNumber}>
          <p>{likeNumber} likes</p>
        </div>
        <div className={styles.answerNumber}>
          <p>{answerNumber} answers</p>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.questionTextContent}>
          <h3>{questionData.questionTitle}</h3>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.dateContainer}>
            <p>{questionData.postDate}</p>
          </div>
          <div className={styles.userContainer}>
            <div className={styles.userAvatarContainer}>
              <img src={questionOwner.avatar} alt="question creator's avatar" />
            </div>
            <p>{questionOwner.userName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;