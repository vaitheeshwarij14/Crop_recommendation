import React, { useState } from 'react';
import './App.css'; // Ensure this CSS file exists in the same directory
import axios from 'axios';

function Form() {
  // Initial form data, including temperature pre-set to 2
  const initialFormData = {
    Nitrogen: '',
    Phosphorus: '',
    Potassium: '',
    Temperature: 2, // Temperature fixed to 2 for prediction
    Humidity: '',
    pH_Value: '',
    Rainfall: ''
  };

  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to the backend
    axios.post('https://crop-5.onrender.com/predict', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
        setResult(response.data);
      })
      .catch(error => {
        console.error('Error making prediction:', error.response ? error.response.data : error.message);
      });
  };

  // Function to reset the form and result
  const handleReset = () => {
    setFormData(initialFormData);
    setResult(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nitrogen (N):</label>
      <input
        type="number"
        name="Nitrogen"
        value={formData.Nitrogen}
        onChange={handleChange}
        required
      />
      <label>Phosphorus (P):</label>
      <input
        type="number"
        name="Phosphorus"
        value={formData.Phosphorus}
        onChange={handleChange}
        required
      />
      <label>Potassium (K):</label>
      <input
        type="number"
        name="Potassium"
        value={formData.Potassium}
        onChange={handleChange}
        required
      />
      <label>Temperature:</label>
      <input
        type="number"
        name="Temperature"
        value={formData.Temperature}
        onChange={handleChange}
        disabled // Temperature field is fixed
      />
      <label>Humidity:</label>
      <input
        type="number"
        name="Humidity"
        value={formData.Humidity}
        onChange={handleChange}
        required
      />
      <label>pH Value:</label>
      <input
        type="number"
        name="pH_Value"
        value={formData.pH_Value}
        onChange={handleChange}
        required
      />
      <label>Rainfall:</label>
      <input
        type="number"
        name="Rainfall"
        value={formData.Rainfall}
        onChange={handleChange}
        required
      />
      <button type="submit">Predict</button>
      <button type="button" onClick={handleReset}>Restart</button>

      {/* Display the result */}
      {result && <p>Predicted Crop: {result.crop}</p>}
    </form>
  );
}

export default Form;
