import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, CardActions, Tooltip, Grid, Typography, Box } from '@mui/material';  // Assuming Material UI is used
import { getAnimalsBySpeciesId, getAnimalsBySpeciesName, deleteAnimal, getAllAnimals } from '../../services/animalService'; // Import the Axios service
import AnimalManagementComponent from './AnimalManagementComponent';
const AnimalComponent = () => {
  const [animals, setAnimals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); const { speciesId, speciesName } = useParams(); // Use speciesId and speciesName from URL

  useEffect(() => {
      if (speciesId) {
          fetchAnimalsBySpeciesId(speciesId);
      } else if (speciesName) {
          fetchAnimalsBySpeciesName(speciesName);
      }
      else{fetchAnimalData();

      }
  }, [speciesId, speciesName]);

  const fetchAnimalsBySpeciesId = async (speciesId) => {
      try {
          const response = await getAnimalsBySpeciesId(speciesId);
          setAnimals(response.data);
      } catch (error) {
          console.error('Error fetching animals by speciesId:', error);
      }
  };

  const fetchAnimalsBySpeciesName = async (speciesName) => {
      try {
          const response = await getAnimalsBySpeciesName(speciesName);
          setAnimals(response.data);
      } catch (error) {
          console.error('Error fetching animals by speciesName:', error);
      }
  };
const fetchAnimalData = async () => {
        try {
            const response = await getAllAnimals(); 
            setAnimals(response.data);
        } catch (error) {
            console.error("Error fetching animal data:", error);
        }
    };
  const handleOpenModal = (animal = null) => {
      if (animal) {
          setSelectedAnimal(animal);
          setIsEditMode(true);
      } else {
          setSelectedAnimal(null);
          setIsEditMode(false);
      }
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      if (!isEditMode) {
          setSelectedAnimal(null); // Only reset if it's in "Add" mode
      }
      setIsEditMode(false);
      setIsModalOpen(false);
  };

  const onDeleteAnimal = async (animalId) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this animal?');
      if (!confirmDelete) return;

      try {
          await deleteAnimal(animalId); // Assuming you have deleteAnimal service
          setAnimals((prevAnimals) => prevAnimals.filter((animal) => animal.id !== animalId));
      } catch (error) {
          console.error('Error deleting animal:', error);
      }
  };

  const refreshAnimals = async () => {
      console.log("Refreshing species list... ")
      if (speciesId) {
         await getAnimalsBySpeciesId(speciesId); // Refresh group-specific species
      } else {
         await fetchAnimalData(); // Refreshes all species
      }
  };
  return (
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h3" align="center" color="black" gutterBottom sx={{ marginBottom: '-8px' }} className="p-4">
              {speciesId ? `Discover Different ${speciesName} Animals!` : "Discover A Diverse Range Of Animals!"}
          </Typography>
          <Box textAlign="center" className="p-4" sx={{ marginTop: '0px' }}>
              <Tooltip title="Add Animal" arrow>
                  <Button variant="contained" onClick={() => handleOpenModal()}>
                      Add Animal
                  </Button>
              </Tooltip>
              <AnimalManagementComponent 
                  open={isModalOpen} 
                  onClose={handleCloseModal} 
                  selectedAnimal={selectedAnimal} 
                  refreshAnimals={refreshAnimals}
                  isEditMode={isEditMode}
              />
          </Box>
          <Grid container spacing={2} justifyContent="left">
              {animals.map((animal) => (
                  <Grid item key={animal.id} xs={12} sm={6} md={4}>
                      <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                          <CardMedia
                              component="img"
                              height="194"
                              image={animal.imgPath}
                              alt="Animal"
                              sx={{
                                  objectFit: "contain",
                                  width: "100%",
                                  height: '75%',
                              }}
                          />
                          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                              <Typography variant="h5">
                                  {animal.name}
                              </Typography>
                              <Typography>
                                  {animal.desc}
                              </Typography>
                          </CardContent>
                          <CardActions style={{ justifyContent: 'center', gap: '8px' }}>
                              <Tooltip title="Edit Animal" arrow>
                                  <Button variant="contained" size="small" color="secondary" onClick={() => handleOpenModal(animal)}>
                                      Edit {animal.name}
                                  </Button>
                              </Tooltip>
                              <Tooltip title="Delete Animal" arrow>
                                  <Button variant="contained" size="small" color="error" onClick={() => onDeleteAnimal(animal.id)}>
                                      Delete {animal.name}
                                  </Button>
                              </Tooltip>
                          </CardActions>
                      </Card>
                  </Grid>
              ))}
          </Grid>
      </div>
  );
};


export default AnimalComponent;
