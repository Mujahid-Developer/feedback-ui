import { v4 as uuidv4 } from "uuid";
import { createContext, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This is feedback item 1",
      rating: 5,
    },
    {
      id: 2,
      text: "This is feedback item 2",
      rating: 10,
    },
    {
      id: 3,
      text: "This is feedback item 3",
      rating: 9,
    },
    {
      id: 4,
      text: "This is feedback item 4",
      rating: 4,
    },
    {
      id: 5,
      text: "This is feedback item 5",
      rating: 6,
    },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // Add Feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };
  // Delete Feedback
  const deleteFeedback = (id) => {
    // if (window.confirm("are you sure want to delete?")) {
    //   setFeedback(feedback.filter((item) => item.id !== id));
    // }
    setFeedback(feedback.filter((item)=>item.id !== id))
  };
  // Set Item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  // Update Feedback Item
  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) =>(item.id === id ? {...item, ...updItem } : item))
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
