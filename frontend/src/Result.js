import React from 'react';

const Result = ({ crop }) => {
  return (
    <div>
      <h1>Prediction Result</h1>
      <p>Predicted Crop: {crop}</p>
    </div>
  );
};

export default Result;
