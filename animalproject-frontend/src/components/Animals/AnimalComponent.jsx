import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CardMedia } from '@mui/material';  // Assuming Material UI is used
import { getAnimalsBySpeciesId } from '../services/animalService'; // Import the Axios service

const AnimalComponent = () => {
  const [speciesName, setSpeciesName] = useState('');
  const [speciesId, setSpeciesId] = useState(0);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { speciesId: routeSpeciesId, speciesName: routeSpeciesName } = useParams();
  const history = useHistory();

  useEffect(() => {
    setSpeciesId(routeSpeciesId);
    setSpeciesName(routeSpeciesName || '');
  }, [routeSpeciesId, routeSpeciesName]);

  useEffect(() => {
    const fetchAnimals = async () => {
      if (!speciesId) return;
      setLoading(true);
      setError('');

      try {
        const response = await getAnimalsBySpeciesId(speciesId);
        setAnimals(response.data);
      } catch (error) {
        console.error('Error fetching animals:', error);
      } finally {
        setLoading(false);
      }
    };

    if (speciesId) {
      fetchAnimals();
    }
  }, [speciesId]);

  const getBackground = (url) => {
    return `url(${url})`;  // React handles the sanitization automatically
  };

  const handleAddAnimal = () => {
    // Open add animal dialog logic here
    // For example, a modal or a new page route to add an animal
  };

  return (
    <div className="p-4 text-center" style={{ fontSize: '50px' }}>
      {speciesName}s
      <div className="mt-3" style={{ textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleAddAnimal}>
          Add New {speciesName}
        </Button>
      </div>
      
      <div className="row" style={{ marginBottom: '20px' }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          animals.map((animal) => (
            <div key={animal.id} className="col-md-4" style={{ marginBottom: '20px' }}>
              <Card>
                <CardHeader style={{ textAlign: 'center' }} title={animal.name} />
                <CardMedia
                  component="img"
                  alt="No Photo"
                  image={getBackground(animal.imagePath)}
                  title={animal.name}
                />
                <CardContent style={{ height: '160px' }}>
                  <p>{animal.description}</p>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnimalComponent;
