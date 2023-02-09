import styles from "./styles.module.css";
import { useContext } from "react";
import QuestionContext from "../../contexts/QuestionContext";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  questionTitle: yup.string().required('Please enter the post title').max(80, "Question title cannot exceed 80 characters"),
  questionContent: yup.string().required('Please enter the question description').max(500, "Question description cannot exceed 500 characters"),
}).required();

function AskQuestionPage() {
  
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const navigation = useNavigate();

  const { postQuestion } = useContext(QuestionContext);
  const { userloggedIn } = useContext(UserContext);

  const onSubmit = data => {
    const newQuestion = {
      id: crypto.randomUUID(),
      userId: userloggedIn.id,
      questionTitle: data.questionTitle,
      questionContent: data.questionContent,
      likes: [],
      dislikes: [],
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