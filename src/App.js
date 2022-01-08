import React from "react";
import {v4 as uuidv4} from 'uuid'
import { useState } from "react"; 
import FeedbackForm from "./Components/FeedbackForm";
import FeedbackList from "./Components/FeedbackList";
import FeedbackStats from "./Components/FeedbackStats";
import Header from "./Components/Header";
import FeedbackData from "./data/FeedbackData";

const App = () => {
    const [feedback, setFeedback] = useState(FeedbackData)

    const addFeedback = (newFeedback) => {
      newFeedback.id = uuidv4()
      setFeedback([newFeedback,...feedback])
    };

    const deleteFeedback = (id)=> {
      if (window.confirm('are you sure want to delete?')){
        setFeedback(feedback.filter((item)=> item.id !== id))
      }
    }


  return (
    <>
      <Header />
      <div className="container">
        <FeedbackForm handleAdd= {addFeedback} />
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>
  );
};

export default App;
