import axios from "axios";

const API_URL = "http://localhost:8080/api/animal";

// Get all animals
export const getAllAnimals = () => axios.get(API_URL);

// Get animal by ID
export const getAnimalById = (id) => axios.get(`${API_URL}/${id}`);

// Get animals by Species ID
export const getAnimalsBySpeciesId = (speciesId) => axios.get(`${API_URL}/species/${speciesId}`);

// Get animals by Species Name
export const getAnimalsBySpeciesName = (speciesName) => axios.get(`${API_URL}/speciesname/${speciesName}`);

// Add a new animal
export const addAnimal = (animalData) => axios.post(API_URL, animalData);

// Update animal by ID
export const updateAnimal = (id, updatedAnimal) => axios.put(`${API_URL}/${id}`, updatedAnimal);

// Delete animal by ID
export const deleteAnimal = (id) => axios.delete(`${API_URL}/${id}`);