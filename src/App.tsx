import "normalize.css";
import "./styles.css";
import questions from "./questions.json";
import React, { useState } from 'react';

function getQuestion(){
  let index = Math.floor(Math.random() * questions.length);
  return questions[index];
}

export default function App() {
  const question = getQuestion();
  const [card,setCard] = useState({isOpen: false, title: question.category, text: question.question});
  
  function openCard(){
    setCard({...card, isOpen: true});
  }
  
  function nextCard(){
    const question = getQuestion();
    setCard({isOpen: false, title: question.category, text: question.question});
  }
  
  let cardClassName = "card " + (card.isOpen ? "card_open" : "" );
  

  return (
    <div className="app">
      <div className="top">
      {
        !card.isOpen && 
        <h1>
          Tap on the card to reveal the question for an insightful 1-to-1 meeting
        </h1>
      }
      { 
        card.isOpen && 
        <button className="btn" onClick={nextCard}>Next card</button>
      }
      </div>

      <div className={cardClassName} onClick={openCard}>
        <div className="card__title">{card.title}</div>
        <div>
          {card.text} ❧
        </div>
      </div>
      {/* <button className="btn">Take 5 cards</button>
      <button className="btn">Select topics</button> */}
      <div className="footer">
        Made with ️
        <span role="img" aria-label="love">
          💜
        </span>{" "}
        by Andrey&nbsp;@&nbsp;
        <a href="https://www.byteminds.co.uk">ByteMinds</a>
        <div>
          <a href="https://github.com">Github</a>
        </div>
      </div>
    </div>
  );
}
