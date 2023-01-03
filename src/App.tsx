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
  const [card,setCard] = useState({isOpen: false, isMovingOut: false, title: question.category, text: question.question});
  
  function openCard(){
    setCard({...card, isOpen: true});
  }
  
  function nextCard(){
    setCard({...card, isOpen: false, isMovingOut: true});
    // delay until flip animation finishes
    setTimeout(() => {
        const question = getQuestion();
        setCard({isOpen: false, isMovingOut: false, title: question.category, text: question.question});
    }, 300); 
  }
  
  return (
    <div className="app">
      <div className="top">
      {
        !card.isOpen ?
        <h1>
          Tap on the card to reveal the question for an insightful 1-to-1 meeting
        </h1>
        : 
        <button className="btn" onClick={nextCard}>Next card</button>
      }
      </div>
      <div className={'card ' + (card.isOpen ? 'card_open' : '') + ' ' +  (card.isMovingOut ? 'card_movingout' : '')}>
        <div className="card__flipper">
          <div className="card__front" onClick={openCard}>
          </div>
          <div className="card__back">
            <div className="card__title">{card.title}</div>
            <div>
              {card.text} ❧
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        Made with&nbsp;
        <span role="img" aria-label="love">
          💜
        </span>{" "}
        by&nbsp;Andrey&nbsp;@&nbsp;
        <a href="https://www.byteminds.co.uk">ByteMinds</a>
        <div>
          <a href="https://github.com">Github</a>
        </div>
      </div>
    </div>
  );
}
