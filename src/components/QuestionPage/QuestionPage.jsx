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
  const questionDataExtracted = questionList.find(question => question.id === id);

  const [questionData, setQuestionData] = useState(questionDataExtracted);

  async function updateQuestionLikes(question) {
    await fetch(`http://localhost:3000/userQuestions/${questionData.id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(question)
    });
  }

  function handleLikes() {
    if(!questionData.likes.includes(userloggedIn.id) && !questionData.dislikes.includes(userloggedIn.id)) {
      const updatedQuestionData = {...questionData, likes:[...questionData.likes, userloggedIn.id]};
      setQuestionData(updatedQuestionData);
      updateQuestionLikes(updatedQuestionData);

    } else if(questionData.dislikes.includes(userloggedIn.id)) {
      const updatedQuestionData = {...questionData, likes:[...questionData.likes, userloggedIn.id]};
      updatedQuestionData.dislikes = updatedQuestionData.dislikes.filter(id => id !== userloggedIn.id);
      setQuestionData(updatedQuestionData);
      updateQuestionLikes(updatedQuestionData);
    }
  }

  function handleDislikes() {
    if(!questionData.likes.includes(userloggedIn.id) && !questionData.dislikes.includes(userloggedIn.id)) {
      const updatedQuestionData = {...questionData, dislikes:[...questionData.dislikes, userloggedIn.id]};
      setQuestionData(updatedQuestionData);
      updateQuestionLikes(updatedQuestionData);

    } else if(questionData.likes.includes(userloggedIn.id)) {
      const updatedQuestionData = {...questionData, dislikes:[...questionData.dislikes, userloggedIn.id]};
      updatedQuestionData.likes = updatedQuestionData.likes.filter(id => id !== userloggedIn.id);
      setQuestionData(updatedQuestionData);
      updateQuestionLikes(updatedQuestionData);
    }
  }

  return (
    <div className={styles.questionPage}>
      <div className={styles.questionPageContainer}>
        <div className={styles.questionTitleContainer}>
          <h2>{questionData.questionTitle}</h2>
        </div>
        <div className={styles.questionContentContainer}>
          <div className={styles.questionLikesContainer}>
            {userloggedIn ? 
              <AiFillCaretUp className={questionData.likes.includes(userloggedIn.id) ? styles.suspendedButton : styles.activeButton} onClick={() => handleLikes()}/> : 
              <AiFillCaretUp className={styles.disabledAction}/>}
            <p>{questionData.likes.length - questionData.dislikes.length}</p>
            {userloggedIn ? 
              <AiFillCaretDown className={questionData.dislikes.includes(userloggedIn.id) ? styles.suspendedButton : styles.activeButton} onClick={() => handleDislikes()}/> : 
              <AiFillCaretDown className={styles.disabledAction}/>}
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