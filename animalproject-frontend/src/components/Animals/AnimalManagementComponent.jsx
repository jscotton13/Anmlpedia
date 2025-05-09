import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { addAnimal, updateAnimal } from '../../services/animalService'; // Assuming the corresponding animal service methods exist
import { getAllSpecies } from '../../services/speciesService'; // Fetch species

const AnimalManagementComponent = ({ open, onClose, selectedAnimal, refreshAnimals, isEditMode }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [imgPath, setImgPath] = useState('');
    const [speciesId, setSpeciesId] = useState('');  // Handle speciesId input
    const [species, setSpecies] = useState([]); // Store available species
    const [speciesName, setSpeciesName] = useState(''); // Store species name for UI

    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const response = await getAllSpecies();
                setSpecies(response.data);  // Store species fetched from API
            } catch (error) {
                console.error("Error fetching species:", error);
            }
        };

        fetchSpecies();
    }, []);

    useEffect(() => {
        if (selectedAnimal) {
            setName(selectedAnimal.name);
            setDesc(selectedAnimal.desc);
            setImgPath(selectedAnimal.imgPath || '');
            setSpeciesId(selectedAnimal.speciesId || '');  // Set speciesId from selected animal
            const matchedSpecies = species.find(s => s.id === selectedAnimal.speciesId);
            setSpeciesName(matchedSpecies ? matchedSpecies.name : ''); // Set the species name from the speciesId
        } else {
            setName('');
            setDesc('');
            setImgPath('');
            setSpeciesId(''); // Reset speciesId for new animal
            setSpeciesName('');
        }
    }, [selectedAnimal, open, species]);

    const handleSubmit = async () => {
        const animalData = { 
            name, 
            desc, 
            imgPath, 
            species: { id: speciesId }
        };

        try {
            if (selectedAnimal) {
                await updateAnimal(selectedAnimal.id, animalData); // Update existing animal
            } else {
                await addAnimal(animalData);  // Add new animal
            }
            await refreshAnimals();  // Refresh the animal list
            onClose();
        } catch (error) {
            console.error("Error saving animal:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{selectedAnimal ? 'Edit Animal' : 'Add Animal'}</DialogTitle>
            <DialogContent>
                <TextField fullWidth label="Animal Name" value={name} onChange={(e) => setName(e.target.value)} margin="dense" />
                <TextField fullWidth label="Description" value={desc} onChange={(e) => setDesc(e.target.value)} margin="dense" />
                <TextField fullWidth label="Image URL" value={imgPath} onChange={(e) => setImgPath(e.target.value)} margin="dense" />
                
                {/* Dropdown for selecting a species */}
                <FormControl fullWidth margin="dense">
                    <InputLabel>Species</InputLabel>
                    <Select
                        value={speciesId || ''}
                        onChange={(e) => setSpeciesId(e.target.value)}  // Update speciesId when a selection is made
                        label="Species"
                    >
                        {species.map((species) => (
                            <MenuItem key={species.id} value={species.id}>
                                {species.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">{selectedAnimal ? 'Update' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AnimalManagementComponent;
