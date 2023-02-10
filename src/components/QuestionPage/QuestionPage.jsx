import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionContext from "../../contexts/QuestionContext";
import UserContext from "../../contexts/UserContext";
import AnswerContext from "../../contexts/AnswerContext";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Answer from "./Answer/Answer";
import AnswerForm from "./AnswerForm/AnswerForm";

const schema = yup.object({
  questionContent: yup.string().required('Please enter the question description').max(5000, "The question cannot exceed 5000 characters").min(50, "The question should be at least 50 characters long"),
}).required();

function QuestionPage() {

  const navigation = useNavigate();
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const { answerList } = useContext(AnswerContext)
  const { questionList, deleteQuestion, updateQuestion } = useContext(QuestionContext);
  const { userList, userloggedIn } = useContext(UserContext);

  const { id } = useParams();

  const [isEditable, setIsEditable] = useState(false);

  if(!questionList || !userList || !answerList) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.gifContainer}>
          <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="loading" />
        </div>
      </div>
    )
  } 

  const questionData = questionList.find(question => question.id === id);
  const questionCreator = userList.find(user => user.id === questionData.userId);
  const questionAnswers = answerList.filter(answer => answer.questionId === questionData.id);

  function handleLikes() {
    if(!questionData.likes.includes(userloggedIn.id) && !questionData.dislikes.includes(userloggedIn.id)) {
      const updatedQuestionData = {...questionData, likes:[...questionData.likes, userloggedIn.id]};

      updateQuestion(updatedQuestionData);

    } else if(questionData.dislikes.includes(userloggedIn.id)) {
      const updatedQuestionData = {...questionData, likes:[...questionData.likes, userloggedIn.id]};
      updatedQuestionData.dislikes = updatedQuestionData.dislikes.filter(id => id !== userloggedIn.id);

      updateQuestion(updatedQuestionData);
    }
  }

  function handleDislikes() {
    if(!questionData.likes.includes(userloggedIn.id) && !questionData.dislikes.includes(userloggedIn.id)) {
      const updatedQuestionData = {...questionData, dislikes:[...questionData.dislikes, userloggedIn.id]};

      updateQuestion(updatedQuestionData);

    } else if(questionData.likes.includes(userloggedIn.id)) {
      const updatedQuestionData = {...questionData, dislikes:[...questionData.dislikes, userloggedIn.id]};
      updatedQuestionData.likes = updatedQuestionData.likes.filter(id => id !== userloggedIn.id);

      updateQuestion(updatedQuestionData);
    }
  }

  async function handleDelete() {
    deleteQuestion(questionData.id)
    navigation("/questions");
  }

  const onSubmit = data => {
    const updatedQuestionData = {...questionData, questionContent: data.questionContent, isEdited: true};
    updateQuestion(updatedQuestionData);
    setIsEditable(false);
  };

  return (
    <div className={styles.questionPage}>
      <div className={styles.questionPageContainer}>
        <div className={styles.questionTitleContainer}>
          <div className={styles.questionTitleContainerLeft}>
            <h2>{questionData.questionTitle}</h2>
            {questionData.isEdited && <p>(Edited)</p>}
          </div>
          {userloggedIn.id === questionCreator.id && 
            <button className={styles.deleteButton} onClick={() => handleDelete()}>Delete</button>
          }
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
            <div className={styles.questionTextContent}>
              {
                isEditable ?
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                      <textarea defaultValue={questionData.questionContent} {...register("questionContent")}/>
                      <p>{errors.questionContent?.message}</p>
                    </label>
                    <div className={styles.buttonContainer}>
                      <button className={styles.completeBtn} type="submit">
                        Complete
                      </button>
                      <button className={styles.cancelBtn} onClick={() => setIsEditable(false)}>
                        Cancel
                      </button>
                    </div>
                  </form> 
                  : 
                  <p>{questionData.questionContent}</p>
              }
            </div>
            {
              !isEditable && userloggedIn.id === questionCreator.id &&
                <div className={styles.buttonContainer}>
                  <button className={styles.editBtn} onClick={() => setIsEditable(true)}>Edit</button>
                </div>
            }
            {
              (!userloggedIn || userloggedIn.id !== questionCreator.id) &&
                <div className={styles.userContainer}>
                  <div className={styles.userAvatarContainer}>
                    <img src={questionCreator.avatar} alt="question creator's avatar" />
                  </div>
                  <p>{questionCreator.userName}</p>
                </div>
            }
          </div>
        </div>
        <div className={styles.questionAnswers}>
          <div className={styles.questionAnswerscontainer}>
            <h3>Answers</h3>
            <div className={styles.questionAnswersList}>
              {questionAnswers.length > 0 ?
                questionAnswers.map(answer => <Answer answerData={answer} key={answer.id} />)
                :
                <p>There are 0 answers to this question</p>
              }
            </div>
          </div>
        </div>
        {userloggedIn && <AnswerForm questionId={questionData.id} />}
      </div>
    </div>
  );
}

export default QuestionPage;