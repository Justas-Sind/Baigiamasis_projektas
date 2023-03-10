import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import QuestionContext from "../../contexts/QuestionContext";
import UserContext from "../../contexts/UserContext";
import AnswerContext from "../../contexts/AnswerContext";
import { useContext, useState } from "react";
import QuestionCard from "./QuestionCard/QuestionCard";
import { IoFilterSharp } from "react-icons/io5";
import FilterSort from "./FilterSort/FilterSort";

function QuestionsPage() {

  const { questionList } = useContext(QuestionContext);
  const { answerList } = useContext(AnswerContext);
  const { userList, userloggedIn } = useContext(UserContext);

  const [filteredList, setFilteredList] = useState(null);
  const [filterSortOpen, setFilterSortOpen] = useState(false);

  const navigation = useNavigate();

  if(!questionList || !answerList || !userList) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.gifContainer}>
          <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="loading" />
        </div>
      </div>
    )
  } else if(questionList.length === 0) {
    return (
      <div className={styles.messageContainer}>
        <div className={styles.message}>
          <h2>Sorry, currently there are no posts :/</h2>
        </div>
      </div>
    )
  }

  function answerNumberHelper(question) {
    return answerList.filter(answer => answer.questionId === question.id);
  }

  function handleFilterSort(filterType, sortType) {
    let filteredQuestionList = [...questionList];

    if(sortType === "mostAnswers") {
      filteredQuestionList.sort((a,b) => answerNumberHelper(b).length - answerNumberHelper(a).length);
    } else if(sortType === "leastAnswers") {
      filteredQuestionList.sort((a,b) => answerNumberHelper(a).length - answerNumberHelper(b).length);
    }

    if(filterType === "allQuestions") {
      setFilteredList(filteredQuestionList);
    } else if(filterType === "noAnswers") {
      filteredQuestionList = filteredQuestionList.filter(question => !(answerList.some(answer => answer.questionId === question.id)));
      setFilteredList(filteredQuestionList);
    } else if(filterType === "withAnswers") {
      filteredQuestionList = filteredQuestionList.filter(question => answerList.some(answer => answer.questionId === question.id));
      setFilteredList(filteredQuestionList);
    }
    setFilterSortOpen(false);
  }

  return (
    <div className={styles.questionsPage}>
      <div className={styles.questionsPageContainer}>
        <div className={styles.questionsPageContentTop}>
          <div className={styles.actionContainer}>
            <h2>
              All questions
            </h2>
            <button className={styles.askButton} onClick={() => userloggedIn ? navigation("/askquestion") : navigation("/login")} >Ask Question</button>
          </div>
          <div className={styles.sortFilterContainer}>
            <div className={styles.sortFilterButton} onClick={() => filterSortOpen ? setFilterSortOpen(false) : setFilterSortOpen(true)}>
              <IoFilterSharp className={styles.filter} />
              <p>Filter</p>
            </div>
            {filterSortOpen && <FilterSort handleFilterSort={handleFilterSort} />}
          </div>
        </div>
        <div className={styles.questionsPageContentBottom}>
          <div className={styles.questionsContainer}>
            {!filteredList ?
              questionList.map(question => {
                const questionAnswers = answerList.filter(answer => answer.questionId === question.id);
                const questionOwner = userList.find(user => user.id === question.userId);
                return (
                  <QuestionCard questionData={question} key={question.id} answerNumber={questionAnswers.length} questionOwner={questionOwner} />
                )
              })
              :
              filteredList.map(question => {
                const questionAnswers = answerList.filter(answer => answer.questionId === question.id);
                const questionOwner = userList.find(user => user.id === question.userId);
                return (
                  <QuestionCard questionData={question} key={question.id} answerNumber={questionAnswers.length} questionOwner={questionOwner} />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsPage;