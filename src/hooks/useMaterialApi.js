import { useState } from 'react';
import { toast } from 'react-toastify';

const axios = require('axios').default;

const API_URL = 'http://localhost:4000/v1/materials'; // TODO: refactor me!

export default function useMaterialApi() {
  const [materials, setMaterials] = useState([]);

  function fetchMaterials() {
    return axios.get(API_URL)
      .then(function (response) {
        setMaterials(response.data);
      })
      .catch(function (error) {
        throw error;
      })
  }

  function updateMaterial(material) {
    const previousBooks = materials;

    setMaterials((prev) => {
      const materialIndex = prev.findIndex((m) => m.id === material.id);
      return [...prev.slice(0, materialIndex), material, ...prev.slice(materialIndex + 1)];
    });

    return axios.put(`${API_URL}/${material.id}`, material)
      .catch((error) => {
      setMaterials(previousBooks);
      throw error;
    });
  }

  function deleteMaterial(material) {
    const previousMaterials = materials;

    setMaterials((prev) => prev.filter((m) => m.id !== material.id));

    return axios.delete(`${API_URL}/${material.id}`)
      .then(response => {
        // TODO: check if status is 200 or 404
      })
      .catch((error) => {
      toast.error(`Failed to delete ${material.name}`, {
        autoClose: false,
        hideProgressBar: true
      });

      setMaterials(previousMaterials);

      throw error;
    });
  }

  function generateFakeId() {
    const min = 1000000;
    const max = 9999999;
    return Math.floor(Math.random() * (max - min) + min);
  }

  function addMaterial(materialObj) {
    const tempId = -1 * generateFakeId();
    const material = { id: tempId, ...materialObj };

    const previousBooks = materials;

    // instantly add the material
    setMaterials((prev) => [...prev, material]);

    const payload = { ...material }
    delete payload.id;

    return axios.post(API_URL, payload)
      .then(response => {
        const newMaterial = response.data
        // update the id of the material after the POST completes
        setMaterials((prev) => {
          const materialIndex = prev.indexOf(material);
          return [
            ...prev.slice(0, materialIndex),
            newMaterial,
            ...prev.slice(materialIndex + 1)
          ];
        });
      })
      .catch((error) => {
        setMaterials(previousBooks);
        throw error;
      });
  }

  return {
    materials,
    fetchMaterials,
    addMaterial,
    updateMaterial,
    deleteMaterial
  };
}
