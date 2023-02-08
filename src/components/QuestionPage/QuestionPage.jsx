import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import QuestionContext from "../../contexts/QuestionContext";
import UserContext from "../../contexts/UserContext";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

function QuestionPage() {

  const { questionList } = useContext(QuestionContext);
  const { userList, userloggedIn } = useContext(UserContext);

  const { id } = useParams();
  const questionData = questionList.find(question => question.id === id);
  
  

  function handleLikes() {
    
  }

  function handleDislikes() {

  }

  return (
    <div className={styles.questionPage}>
      <div className={styles.questionPageContainer}>
        <div className={styles.questionTitleContainer}>
          <h2>{questionData.questionTitle}</h2>
        </div>
        <div className={styles.questionContentContainer}>
          <div className={styles.questionLikesContainer}>
            <AiFillCaretUp onClick={() => handleLikes()}/>
            <p>{'x'}</p>
            <AiFillCaretDown onClick={() => handleDislikes()}/>
          </div>
          <div className={styles.questionTextContentContainer}>
            {questionData.questionContent}
          </div>
        </div>
        <div className={styles.questionAnswersContainer}>

        </div>
        <div className={styles.questionAnswerFormContainer}>

        </div>
      </div>
    </div>
  );
}

export default QuestionPage;