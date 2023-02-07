import { createContext, useState, useEffect } from "react";

const QuestionContext = createContext();

function QuestionProvider({ children }) {

  const [questionList, setQuestionList] = useState(null);
  const [answerList, setAnswerList] = useState(null);

  async function fetchUserQuestions() {
    const jsonData = await fetch("http://localhost:3000/userQuestions/")
      .then(res => res.json());
    
      setQuestionList(jsonData)
  };

  async function fetchUserAnswers() {
    const jsonData = await fetch("http://localhost:3000/userAnswers/")
      .then(res => res.json());
    
      setAnswerList(jsonData)
  };

  useEffect(() => {
    fetchUserQuestions();
    fetchUserAnswers();
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        questionList,
        setQuestionList,
        answerList
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export { QuestionProvider };

export default QuestionContext;