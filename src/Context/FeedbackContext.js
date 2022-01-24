import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] =useState(true)
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(()=>{
    fetchFeedback()
  },[])

  // Fetch Feedback

  const fetchFeedback = async ()=>{
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
  }

  // Add Feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback),
    })

      const data = await response.json()

    setFeedback([data, ...feedback]);
  };
  // Delete Feedback
  const deleteFeedback = async(id) => {
    await fetch(`/feedback/${id}`, {
      method: "DELETE"
    })
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
  const updateFeedback = async(id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(updItem)
    })

    const data = await response.json()


    setFeedback(feedback.map((item) =>(item.id === id ? {...item, ...data } : item))
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
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
