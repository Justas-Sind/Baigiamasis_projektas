import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionContext from "../../contexts/QuestionContext";
import UserContext from "../../contexts/UserContext";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

function QuestionPage() {

  const navigation = useNavigate();

  const { questionList, deleteQuestion, updateQuestion } = useContext(QuestionContext);
  const { userList, userloggedIn } = useContext(UserContext);

  const { id } = useParams();
  const questionData = questionList.find(question => question.id === id);

  async function updateQuestionToServer(question) {
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

      updateQuestionToServer(updatedQuestionData);
      updateQuestion(updatedQuestionData);

    } else if(questionData.dislikes.includes(userloggedIn.id)) {
      const updatedQuestionData = {...questionData, likes:[...questionData.likes, userloggedIn.id]};
      updatedQuestionData.dislikes = updatedQuestionData.dislikes.filter(id => id !== userloggedIn.id);

      updateQuestionToServer(updatedQuestionData);
      updateQuestion(updatedQuestionData);
    }
  }

  function handleDislikes() {
    if(!questionData.likes.includes(userloggedIn.id) && !questionData.dislikes.includes(userloggedIn.id)) {
      const updatedQuestionData = {...questionData, dislikes:[...questionData.dislikes, userloggedIn.id]};

      updateQuestionToServer(updatedQuestionData);
      updateQuestion(updatedQuestionData);

    } else if(questionData.likes.includes(userloggedIn.id)) {
      const updatedQuestionData = {...questionData, dislikes:[...questionData.dislikes, userloggedIn.id]};
      updatedQuestionData.likes = updatedQuestionData.likes.filter(id => id !== userloggedIn.id);

      updateQuestionToServer(updatedQuestionData);
      updateQuestion(updatedQuestionData);
    }
  }

  async function handleDelete() {
    await fetch(`http://localhost:3000/userQuestions/${questionData.id}`, {
      method: "DELETE"
    });
    deleteQuestion(questionData.id)
    navigation("/questions");
  }

  return (
    <div className={styles.questionPage}>
      <div className={styles.questionPageContainer}>
        <div className={styles.questionTitleContainer}>
          <h2>{questionData.questionTitle}</h2>
          <button onClick={() => handleDelete()}>Delete</button>
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