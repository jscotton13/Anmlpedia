import axios from "axios";

const API_URL = "http://localhost:8080/api/species";

  // Get all species
  export const getAllSpecies = () => axios.get(API_URL);

  // Get species by ID
  export const getSpeciesById = (id) => axios.get(`${API_URL}/${id}`);

  // Get species by Group ID
  export const getSpeciesByGroupId = (groupId) => axios.get(`${API_URL}/group/${groupId}`);

  // Get species by Group Name
  export const getSpeciesByGroupName = (groupName) => axios.get(`${API_URL}/${groupName}`);

  // Add a new species
  export const addSpecies = (speciesData) => axios.post(API_URL, speciesData);

  // Update species by ID
  export const updateSpecies = (id, updatedSpecies) => axios.put(`${API_URL}/${id}`, updatedSpecies);

  // Delete species by ID
  export const deleteSpecies = (id) => axios.delete(`${API_URL}/${id}`)

