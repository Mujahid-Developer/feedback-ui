import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import Card from "./Shared/Card";

const FeedbackItem = ({ item, handleDelete }) => {
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button
        onClick={() => {
          handleDelete(item.id);
        }}
        className="close"
      >
        <FaTimes color="purple" />
      </button>
      <div className="tex-display">{item.text}</div>
    </Card>
  );
};

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FeedbackItem;
