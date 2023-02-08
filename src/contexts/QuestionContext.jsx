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

  function updateQuestion(targetQuestion) {
    const index = questionList.findIndex(question => question.id === targetQuestion.id);
    setQuestionList(current => current.map((question, i) => {
      if(i === index) {
        return targetQuestion;
      } else {
        return question;
      }
    }))
  }

  function deleteQuestion(deleteTargetId) {
    setQuestionList(current => current.filter(question => question.id !== deleteTargetId))
  }

  return (
    <QuestionContext.Provider
      value={{
        questionList,
        deleteQuestion,
        updateQuestion,
        setQuestionList
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export { QuestionProvider };

export default QuestionContext;