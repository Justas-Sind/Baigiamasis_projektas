import styles from "./styles.module.css";
import { useContext } from "react";
import QuestionContext from "../../contexts/QuestionContext";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  questionTitle: yup.string().required('Please enter the post title').max(80, "Question title cannot exceed 80 characters").min(5, "Question title should be at least 5 characters long"),
  questionContent: yup.string().required('Please enter the question description').max(5000, "The question cannot exceed 5000 characters").min(50, "The question should be at least 50 characters long"),
}).required();

function AskQuestionPage() {
  
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const navigation = useNavigate();

  const { postQuestion } = useContext(QuestionContext);
  const { userloggedIn } = useContext(UserContext);

  function currentDate() {
    let date = new Date();
    let today = date.toLocaleDateString();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;

    const currentTime = today + " " + hours + ":" + minutes;
    return currentTime
  }

  const onSubmit = data => {
    const newQuestion = {
      id: crypto.randomUUID(),
      userId: userloggedIn.id,
      questionTitle: data.questionTitle,
      questionContent: data.questionContent,
      likes: [],
      dislikes: [],
      postDate: currentDate(),
      isEdited: false
    };

    postQuestion(newQuestion);
    navigation('/questions')
  };

  return (
    <div className={styles.askQuestionPage}>
      <div className={styles.askQuestionPageContainer}>
        <div className={styles.askQuestionPageContainerTop}>
          <div className={styles.infoWrapper}>
            <h2>Writing a good question</h2>
            <p>Steps:</p>
            <ul>
              <li>Summarize your problem in a one-line title.</li>
              <li>Describe your problem in more detail.</li>
              <li>Describe what you tried and what you expected to happen.</li>
              <li>Review your question and post it to the site.</li>
            </ul>
          </div>
        </div>
        <div className={styles.askQuestionPageContainerBottom}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              Title
              <br />
              <input {...register("questionTitle")} />
              <p>{errors.questionTitle?.message}</p>
            </label>
            <label>
              Describe your problem in more detail
              <br />
              <textarea {...register("questionContent")}/>
              <p>{errors.questionContent?.message}</p>
            </label>
            <button className={styles.postBtn} type="submit">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AskQuestionPage;