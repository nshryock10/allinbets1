import '../App';
import './Questions.css';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCard';
import { getQuestions } from '../utils/utils';
import { useState } from 'react';

//Get questions from a data base of questions

function Questions() {

  let navigate = useNavigate();
  
  const location = useLocation();
  const user = {email: location.state?.email, 
                name: location.state?.name,
                userName: location.state?.userName,
                mm: location.state?.mm,
                dd: location.state?.dd,
                yyyy: location.state?.yyyy
                };

  //Questions will need to be imported from separate file
  const questions = getQuestions();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    for(let i=0; i < questions.length; i++){
      if(questions[i].answer === ''){
        alert('Fill out all questions!');
        return false;
      }
    }

    navigate("/submit", {state:{questions:questions, user:user}});
    //Incorporate this to backend once ready
    /*
    let result = await submitForm(event.target);
    if (result.error) {
      setError(result.error);
    } else {
      navigate('success');
    }
    */
    
  } 

    return (
    <div className='main'>
        <h1>{`${user.name}, make your bets!`}</h1>
          {questions.map((question, index) => (
              <QuestionCard question={question} key={index}/>
          ))}
          <Link  onClick={handleSubmit} state={{questions:questions, user:user}} to='/checkout' >
              <button id="hero-button" type="submit" value="Submit Answers">Submit Answers</button>
          </Link>
        
    </div>
  )
};

export default Questions;