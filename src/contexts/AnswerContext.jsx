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

  async function updateAnswer(targetAnswer) {
    const index = answerList.findIndex(answer => answer.id === targetAnswer.id);
    setAnswerList(current => current.map((answer, i) => {
      if(i === index) {
        return targetAnswer;
      } else {
        return answer;
      }
    }));
    await fetch(`http://localhost:3000/userAnswers/${targetAnswer.id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(targetAnswer)
    });
  }

  function deleteAnswer(deleteTargetId) {
    setAnswerList(current => current.filter(answer => answer.id !== deleteTargetId));
    fetch(`http://localhost:3000/userAnswers/${deleteTargetId}`, {
      method: "DELETE"
    });
  }

  function postAnswer(answer) {
    setAnswerList([...answerList, answer]);
    fetch("http://localhost:3000/userAnswers/", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(answer)
    });
  }

  return (
    <AnswerContext.Provider
      value={{
        answerList,
        updateAnswer,
        deleteAnswer,
        postAnswer
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
}

export { AnswerProvider };

export default AnswerContext;