import React, { useState } from 'react';

import './index.css';

function MaterialForm({ onSave, material: initialMaterial }) {
  const [material, setMaterial] = useState(initialMaterial);
  console.log(initialMaterial)

  return (
    <div className="form-container">
      <form 
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSave(material);
        }}
        >
        <div className="form-left-col">
          
          <div className="form-field">
            <label className="form-label">Name</label> <br />
            <input
              type="text"
              className="form-input"
              value={material.name}
              onChange={(e) => setMaterial({ ...material, name: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Volume (m<sup>3</sup>)</label> <br />
            <input
              type="number"
              className="form-input"
              value={material.volume}
              onChange={(e) => setMaterial({ ...material, volume: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Delivery Date</label> <br />
            <input
              type="date"
              className="form-input"
              value={material.deliveryDate}
              onChange={(e) => setMaterial({ ...material, deliveryDate: e.target.value })}
            />
          </div>

        </div>
        <div className="form-right-col">

          <div className="form-field">
            <label className="form-label">Color</label> <br />
            <input
              type="color"
              className="form-input"
              value={material.color}
              onChange={(e) => setMaterial({ ...material, color: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Cost (USD per <sup>3</sup>)</label> <br />
            <input
              type="text"
              className="form-input"
              value={material.cost}
              onChange={(e) => setMaterial({ ...material, cost: e.target.value })}
            />
          </div>

          <div className="form-field">
            <button type="submit">Submit</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default MaterialForm;
