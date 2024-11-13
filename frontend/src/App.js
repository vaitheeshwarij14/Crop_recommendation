import React, { useState } from 'react';
import './App.css'; // Ensure you have the CSS file in the same directory
import axios from 'axios';

function Form() {
  const initialFormData = {
    Nitrogen: '',
    Phosphorus: '',
    Potassium: '',
    Temperature: '',
    Humidity: '',
    pH_Value: '',
    Rainfall: ''
  };

  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://crop-recommendation-1-bk1r.onrender.com', formData, {
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

  const handleReset = () => {
    setFormData(initialFormData);
    setResult(null);
  };

  return (
    <div className="container">
      {/* Project description */}
      <section className="project-description">
        <h2>Crop Recommendation System</h2>
        <p>
          This system provides tailored crop recommendations based on environmental and soil parameters, 
          helping farmers select optimal crops for their land. By analyzing factors such as nitrogen, 
          phosphorus, potassium, temperature, humidity, soil pH, and rainfall, it suggests crops that 
          align with current conditions. The backend is hosted on Render for data processing, while 
          Vercel hosts the responsive frontend, making it accessible for farmers and consultants on 
          any device. The system promotes sustainable farming by enhancing productivity and minimizing resource waste.
        </p>
      </section>

      {/* Input Form */}
      <form onSubmit={handleSubmit}>
        <label>Nitrogen (N):</label>
        <input type="number" name="Nitrogen" value={formData.Nitrogen} onChange={handleChange} required />

        <label>Phosphorus (P):</label>
        <input type="number" name="Phosphorus" value={formData.Phosphorus} onChange={handleChange} required />

        <label>Potassium (K):</label>
        <input type="number" name="Potassium" value={formData.Potassium} onChange={handleChange} required />

        <label>Temperature:</label>
        <input type="number" name="Temperature" value={formData.Temperature} onChange={handleChange} required />

        <label>Humidity:</label>
        <input type="number" name="Humidity" value={formData.Humidity} onChange={handleChange} required />

        <label>pH Value:</label>
        <input type="number" name="pH_Value" value={formData.pH_Value} onChange={handleChange} required />

        <label>Rainfall:</label>
        <input type="number" name="Rainfall" value={formData.Rainfall} onChange={handleChange} required />

        <button type="submit">Predict</button>
        <button type="button" onClick={handleReset}>Restart</button>
      </form>

      {/* Display the result */}
      {result && <p>Predicted Crop: {result.crop}</p>}
    </div>
  );
}

export default Form;
