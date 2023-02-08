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

  return (
    <QuestionContext.Provider
      value={{
        questionList,
        setQuestionList
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export { QuestionProvider };

export default QuestionContext;