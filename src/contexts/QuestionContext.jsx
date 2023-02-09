import { createContext, useState, useEffect } from "react";

const QuestionContext = createContext();

function QuestionProvider({ children }) {

  const [questionList, setQuestionList] = useState(null);

  async function fetchUserQuestions() {
    const jsonData = await fetch("http://localhost:3000/userQuestions/")
      .then(res => res.json());
    
      setQuestionList(jsonData)
  };

  useEffect(() => {
    fetchUserQuestions();
  }, []);

  async function updateQuestion(targetQuestion) {
    const index = questionList.findIndex(question => question.id === targetQuestion.id);
    setQuestionList(current => current.map((question, i) => {
      if(i === index) {
        return targetQuestion;
      } else {
        return question;
      }
    }));
    await fetch(`http://localhost:3000/userQuestions/${targetQuestion.id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(targetQuestion)
    });
  }

  function deleteQuestion(deleteTargetId) {
    setQuestionList(current => current.filter(question => question.id !== deleteTargetId));
    fetch(`http://localhost:3000/userQuestions/${deleteTargetId}`, {
      method: "DELETE"
    });
  }

  function postQuestion(newQuestion) {
    setQuestionList([...questionList, newQuestion]);
    fetch("http://localhost:3000/userQuestions/", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newQuestion)
    });
  }

  function handleSort(sortType, answerNumberHelper) {
    let sortedQuestionList = [...questionList];
    if(sortType === "mostAnswers") {
      sortedQuestionList.sort((a,b) => answerNumberHelper(b).length - answerNumberHelper(a).length);
    } else if(sortType === "leastAnswers") {
      sortedQuestionList.sort((a,b) => answerNumberHelper(a).length - answerNumberHelper(b).length);
    }
    setQuestionList(sortedQuestionList);
  }

  return (
    <QuestionContext.Provider
      value={{
        questionList,
        deleteQuestion,
        updateQuestion,
        postQuestion,
        handleSort
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export { QuestionProvider };

export default QuestionContext;