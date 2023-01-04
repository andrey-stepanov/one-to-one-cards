import "normalize.css";
import "./styles.css";
import questions from "./questions.json";
import topics from "./topics.json";
import React, { useState } from "react";

function getQuestion() {
  let index = Math.floor(Math.random() * questions.length);
  return questions[index];
}

export default function App() {
  const question = getQuestion();
  const [card, setCard] = useState({
    isOpen: false,
    isTopicSelect: false,
    isTopicMovingOut: false,
    isMovingOut: false,
    title: question.category,
    text: question.question,
  });

  function openCard() {
    setCard({ ...card, isOpen: true });
  }

  function nextCard() {
    setCard({ ...card, isOpen: false, isMovingOut: true });
    // delay until flip & slide animation finishes
    setTimeout(() => {
      const question = getQuestion();
      setCard({
        isOpen: false,
        isTopicSelect: false,
        isTopicMovingOut: false,
        isMovingOut: false,
        title: question.category,
        text: question.question,
      });
    }, 300 + 100); // sum of animation and delay times
  }

  function selectTopics() {
    setCard({ ...card, isMovingOut: true });
    // delay until flip & slide animation finishes
    setTimeout(() => {
      setCard({ ...card, isTopicSelect: true });
    }, 300);
  }

  function setTopics() {
    setCard({ ...card, isTopicMovingOut: true });
    // delay until slide animation finishes
    setTimeout(() => {
      const question = getQuestion();
      setCard({
        isOpen: false,
        isTopicSelect: false,
        isTopicMovingOut: false,
        isMovingOut: false,
        title: question.category,
        text: question.question,
      });
    }, 300);
  }

  let topicCards = topics.map((topic) => (
    <div className="topics__card" key={topic.topic}>
      <label className="topics__title checkbox-contain">
        <span>{topic.topic}</span>
        <input type="checkbox" />
        <div className="checkbox-input"></div>
      </label>

      <div>{topic.description}</div>
    </div>
  ));

  let view = !card.isTopicSelect ? (
    <div
      className={
        "card " +
        (card.isOpen ? "card_open" : "") +
        " " +
        (card.isMovingOut ? "card_movingout" : "")
      }
    >
      <div className="card__flipper">
        <div className="card__front" onClick={openCard}></div>
        <div className="card__back">
          <div className="card__title">{card.title}</div>
          <div>{card.text} ❧</div>
        </div>
      </div>
    </div>
  ) : (
    <div className={"topics " + (!card.isTopicMovingOut ? "topics_open" : "")}>
      {topicCards}
    </div>
  );

  let top = card.isTopicSelect ? (
    <button className="btn" onClick={setTopics}>
      Set topics
    </button>
  ) : !card.isOpen ? (
    <h1>
      Tap on the card to reveal the question for an insightful 1-to-1 meeting
    </h1>
  ) : (
    <button className="btn" onClick={nextCard}>
      Next card
    </button>
  );

  return (
    <div className="app">
      <div className="top">{top}</div>

      <div className="view">{view}</div>

      {!card.isTopicSelect && (
        <button className="btn" onClick={selectTopics}>
          Select topics
        </button>
      )}

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
