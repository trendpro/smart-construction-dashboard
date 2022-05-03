import React, { useState, useEffect } from 'react';

import './index.css';

import MaterialList from '../MaterialList';
import MaterialForm from '../MaterialForm';

import useMaterialApi from '../../hooks/useMaterialApi';

function App() {
  const {
    materials,
    addMaterial,
    fetchMaterials,
    updateMaterial,
    deleteMaterial,
  } = useMaterialApi();

  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);


  function onSave(material) {
    setSelectedMaterial(null);

    // add or update the book
    material.id >= 0 ? updateMaterial(material) : addMaterial(material);

    //TODO: handle errors on UI
  }

  function onDeleteMaterial() {
    deleteMaterial(selectedMaterial).catch(() => { });
    setSelectedMaterial(null);
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>
          Materials
        </h1>
      </header>
      <div className="app-body">
        <div className="action-buttons">
          <button
            type="button"
            className="add-btn"
            onClick={() => setSelectedMaterial({
              name: '',
              volume: '',
              deliveryDate: '',
              color: '',
              cost: '',
            })}
          >Add</button>
          <button 
            disabled={!selectedMaterial}
            type="button"
            className="delete-btn"
            onClick={onDeleteMaterial}
          >Delete</button>
        </div>
        <div className="materials">
          <div className="materials-list">
            <MaterialList
              materials={materials}
              selectedMaterial={selectedMaterial}
              onSelectMaterial={(material) => {
                setSelectedMaterial(material === selectedMaterial ? null : material);
              }}
            />
          </div>
          <div className="materials-form">
            {selectedMaterial ? (
              <MaterialForm
                key={selectedMaterial.id}
                material={selectedMaterial}
                onSave={onSave}
              />
            ) : null}
          </div>
        </div>
        <div className="total-cost-label">
          <p>Total Cost</p>
          <p>{materials.reduce((acc, mat) => acc + mat.cost * mat.volume, 0)}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
