import "normalize.css";
import "./styles.css";
import questions from "./questions.json";
import topics from "./topics.json";
import React, { useState } from "react";

function getQuestion(selectedTopics: Array<string>) {
  let filtered = questions.filter(
    (value) => selectedTopics.indexOf(value.category) >= 0
  );
  let index = Math.floor(Math.random() * filtered.length);
  return filtered[index];
}

export default function App() {
  const selectedTopics = topics.map((t) => t.topic);
  const question = getQuestion(selectedTopics);
  const [card, setCard] = useState({
    isOpen: false,
    isTopicSelect: false,
    isTopicMovingOut: false,
    isMovingOut: false,
    title: question.category,
    text: question.question,
    selectedTopics: selectedTopics,
  });

  function openCard() {
    setCard({ ...card, isOpen: true });
  }

  function nextCard() {
    setCard({ ...card, isOpen: false, isMovingOut: true });
    // delay until flip & slide animation finishes
    setTimeout(() => {
      const question = getQuestion(card.selectedTopics);
      setCard({
        isOpen: false,
        isTopicSelect: false,
        isTopicMovingOut: false,
        isMovingOut: false,
        title: question.category,
        text: question.question,
        selectedTopics: card.selectedTopics,
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
      const selectedTopics =
        card.selectedTopics.length === 0
          ? topics.map((value) => value.topic)
          : card.selectedTopics;

      const question = getQuestion(selectedTopics);

      setCard({
        isOpen: false,
        isTopicSelect: false,
        isTopicMovingOut: false,
        isMovingOut: false,
        title: question.category,
        text: question.question,
        selectedTopics: selectedTopics,
      });
    }, 300);
  }

  function checkTopic(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const topic = target.value;
    const checked = target.checked;
    let selectedTopics = card.selectedTopics;
    if (checked) {
      selectedTopics.push(topic);
    } else {
      selectedTopics = selectedTopics.filter((value) => value !== topic);
    }
    setCard({ ...card, selectedTopics: selectedTopics });
  }

  let topicCards = topics.map((topic) => (
    <div className="topics__card" key={topic.topic}>
      <label className="topics__title checkbox-contain">
        <span>{topic.topic}</span>
        <input
          value={topic.topic}
          type="checkbox"
          checked={card.selectedTopics.indexOf(topic.topic) >= 0}
          onChange={checkTopic}
        />
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
