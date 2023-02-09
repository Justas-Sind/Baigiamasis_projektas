import styles from "./styles.module.css";
import { useContext, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import AnswerContext from "../../../contexts/AnswerContext";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  answerContent: yup.string().required('Please enter the answer').max(500, "The answer content cannot exceed 500 characters"),
}).required();

function Answer( {answerData} ) {

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const { userList, userloggedIn } = useContext(UserContext);
  const { updateAnswer, deleteAnswer } = useContext(AnswerContext)

  const [isEditable, setIsEditable] = useState(false);

  const answerCreator = userList.find(user => user.id === answerData.userId);

  function handleLikes() {
    if(!answerData.likes.includes(userloggedIn.id) && !answerData.dislikes.includes(userloggedIn.id)) {
      const updatedanswerData = {...answerData, likes:[...answerData.likes, userloggedIn.id]};

      updateAnswer(updatedanswerData);

    } else if(answerData.dislikes.includes(userloggedIn.id)) {
      const updatedanswerData = {...answerData, likes:[...answerData.likes, userloggedIn.id]};
      updatedanswerData.dislikes = updatedanswerData.dislikes.filter(id => id !== userloggedIn.id);

      updateAnswer(updatedanswerData);
    }
  }

  function handleDislikes() {
    if(!answerData.likes.includes(userloggedIn.id) && !answerData.dislikes.includes(userloggedIn.id)) {
      const updatedanswerData = {...answerData, dislikes:[...answerData.dislikes, userloggedIn.id]};

      updateAnswer(updatedanswerData);

    } else if(answerData.likes.includes(userloggedIn.id)) {
      const updatedanswerData = {...answerData, dislikes:[...answerData.dislikes, userloggedIn.id]};
      updatedanswerData.likes = updatedanswerData.likes.filter(id => id !== userloggedIn.id);

      updateAnswer(updatedanswerData);
    }
  }

  async function handleDelete() {
    deleteAnswer(answerData.id)
  }

  const onSubmit = data => {
    const updatedanswerData = {...answerData, answerContent: data.answerContent, isEdited: true};
    updateAnswer(updatedanswerData);
    setIsEditable(false);
  };
  
  return (
    <div className={styles.answer}>
      <div className={styles.answerLikesContainer}>
        {userloggedIn ? 
          <AiFillCaretUp className={answerData.likes.includes(userloggedIn.id) ? styles.suspendedButton : styles.activeButton} onClick={() => handleLikes()}/> : 
          <AiFillCaretUp className={styles.disabledAction}/>}
        <p>{answerData.likes.length - answerData.dislikes.length}</p>
        {userloggedIn ? 
          <AiFillCaretDown className={answerData.dislikes.includes(userloggedIn.id) ? styles.suspendedButton : styles.activeButton} onClick={() => handleDislikes()}/> : 
          <AiFillCaretDown className={styles.disabledAction}/>}
      </div>
      <div className={styles.answerTextContentContainer}>
        <div className={styles.answerTextContent}>
          {
            isEditable ?
              <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                  <textarea defaultValue={answerData.answerContent} {...register("answerContent")}/>
                  <p>{errors.answerContent?.message}</p>
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
              <p>{answerData.answerContent}</p>
          }
        </div>
        {
          !isEditable && userloggedIn.id === answerCreator.id &&
            <div className={styles.buttonContainer}>
              <button className={styles.editBtn} onClick={() => setIsEditable(true)}>Edit</button>
              <button className={styles.deleteButton} onClick={() => handleDelete()}>Delete</button>
            </div>
        }
        {
          (!userloggedIn || userloggedIn.id !== answerCreator.id) &&
            <div className={styles.userContainer}>
              <div className={styles.userAvatarContainer}>
                <img src={answerCreator.avatar} alt="question creator's avatar" />
              </div>
              <p>{answerCreator.userName}</p>
            </div>
        }
      </div>
  </div>
  );
}

export default Answer;