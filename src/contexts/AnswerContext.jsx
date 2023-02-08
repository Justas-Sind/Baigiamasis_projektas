import { createContext, useState, useEffect } from "react";

const AnswerContext = createContext();

function AnswerProvider({ children }) {

  const [answerList, setAnswerList] = useState(null);

  async function fetchUserAnswers() {
    const jsonData = await fetch("http://localhost:3000/userAnswers/")
      .then(res => res.json());
    
      setAnswerList(jsonData)
  };

  useEffect(() => {
    fetchUserAnswers();
  }, []);

  return (
    <AnswerContext.Provider
      value={{
        answerList
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
}

export { AnswerProvider };

export default AnswerContext;