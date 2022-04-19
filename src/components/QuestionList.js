import React from "react";

function QuestionList({ questions, setQuestions }) {

  function handleDelete(event) {

    const item = event.target.id;

    fetch(`http://localhost:4000/questions/${item}`, {
      method: "DELETE"
    })
    .then((r) => r.json())
    .then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== item);
      setQuestions(updatedQuestions);
      event.target.parentNode.remove();
    });
  }

  // function onUpdateQuestion(updatedQuestion) {
  //   // console.log(updatedQuestion)
  //   const updatedQuestions = questions.map((q) => {
  //     if (q.id === updatedQuestion.id) {
  //       return updatedQuestion
  //     } else {
  //       return q
  //     }
  //   });
  //   setQuestions(updatedQuestions)
  // }

  function handleAnswerChange(e) {

    fetch(`http://localhost:4000/questions/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "correctIndex": parseInt(e.target.value)
      })
    })
    .then((r) => r.json())
    // .then((updatedQuestion) => onUpdateQuestion(updatedQuestion))
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((q) => {
        if (q.id === updatedQuestion.id) {
          return updatedQuestion
        } else {
          return q
        }
      })
      setQuestions(updatedQuestions)
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => {
          return <li key={question.id}>
            {question.prompt}
            <br></br>
            <button onClick={handleDelete} key={question.id} id={question.id} >Delete Question</button>
            <br></br>
            <select name="correctIndex" id={question.id} value={question.correctIndex} onChange={handleAnswerChange} >
              <option value="0">1</option>
              <option value="1">2</option>
              <option value="2">3</option>
              <option value="3">4</option>
            </select>
          </li>
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
