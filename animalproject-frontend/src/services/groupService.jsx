import axios from "axios";

const API_URL = "http://localhost:8080/api/group";
  

// Get all groups
  export const getAllGroups = () => axios.get(API_URL);

// Get group by ID
  export const getGroupById = (id) => axios.get(`${API_URL}/${id}`);

// Get groups by species name
  export const getGroupsBySpecies = (speciesName) => axios.get(`${API_URL}/species/${speciesName}`);

// Add a new group
  export const addGroup = (groupData) => axios.post(API_URL, groupData);

// Update group by ID
  export const updateGroup = (id, updatedGroup) => axios.put(`${API_URL}/${id}`, updatedGroup);

// Delete group by ID
  export const deleteGroup = (id) => axios.delete(`${API_URL}/${id}`);
