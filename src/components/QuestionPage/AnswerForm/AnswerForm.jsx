import styles from "./styles.module.css";
import { useContext } from "react";
import AnswerContext from "../../../contexts/AnswerContext";
import UserContext from "../../../contexts/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  answerContent: yup.string().required('Please enter the answer').max(5000, "The answer cannot exceed 5000 characters").min(50, "The answer should be at least 50 characters long"),
}).required();

function AnswerForm( {questionId} ) {

  const { register, resetField, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  const { postAnswer } = useContext(AnswerContext);
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
    const newAnswer = {
      id: crypto.randomUUID(),
      questionId: questionId,
      userId: userloggedIn.id,
      answerContent: data.answerContent,
      likes: [],
      dislikes: [],
      answerDate: currentDate(),
      isEdited: false
    };
    postAnswer(newAnswer);
    resetField("answerContent");
  };

  return (
    <div className={styles.questionAnswerFormContainer}>
      <h3>Your Answer</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <textarea {...register("answerContent")}/>
          <p>{errors.answerContent?.message}</p>
        </label>
        <button className={styles.postBtn} type="submit">
          Post
        </button>
      </form>
    </div>

  );
}

export default AnswerForm;