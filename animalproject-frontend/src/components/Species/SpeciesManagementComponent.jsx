import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { addSpecies, updateSpecies } from '../../services/speciesService';
import { getAllGroups } from '../../services/groupService'; // Fetch groups

const SpeciesManagementComponent = ({ open, onClose, selectedSpecies, refreshSpecies }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [imgPath, setImgPath] = useState('');
    const [groupId, setGroupId] = useState('');
    const [groups, setGroups] = useState([]); // Store available groups

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await getAllGroups();
                setGroups(response.data);
            } catch (error) {
                console.error("Error fetching groups:", error);
            }
        };

        fetchGroups();
    }, []);

    useEffect(() => {
        if (selectedSpecies) {
            setName(selectedSpecies.name);
            setDesc(selectedSpecies.desc);
            setImgPath(selectedSpecies.imgPath || '');
            setGroupId(selectedSpecies.groupId || '');
        } else {
            setName('');
            setDesc('');
            setImgPath('');
            setGroupId('');
        }
    }, [selectedSpecies, open]);

    const handleAddSpecies = (speciesData) => {
        fetch(`/api/species/${groupId}`, { // Use groupId in URL
            method: 'POST',
            body: JSON.stringify(speciesData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('New species added:', data);
            refreshSpecies();
            onClose();
        })
        .catch(error => console.error('Error adding species:', error));
    };

    const handleUpdateSpecies = (speciesId, speciesData) => {
        console.log('Updating species with ID:', speciesId, 'Under group:', groupId); // Log both IDs
        fetch(`/api/species/${groupId}/${speciesId}`, {
            method: 'PUT',
            body: JSON.stringify(speciesData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Species updated:', data);
            refreshSpecies();
            onClose();
        })
        .catch(error => {
            console.error('Error updating species:', error);
        });
    };

    const handleSubmit = async () => {
        const speciesData = { 
            id: selectedSpecies ? selectedSpecies.id : null, 
            name, 
            desc, 
            imgPath, 
            groupId: Number(groupId) // Ensure groupId is a number
        };

        try {
            if (selectedSpecies) {
                handleUpdateSpecies(selectedSpecies.id, speciesData);  // Update species
            } else {
                handleAddSpecies(speciesData);  // Add new species
            }
        } catch (error) {
            console.error("Error saving species:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{selectedSpecies ? 'Edit Species' : 'Add Species'}</DialogTitle>
            <DialogContent>
                <TextField fullWidth label="Species Name" value={name} onChange={(e) => setName(e.target.value)} margin="dense" />
                <TextField fullWidth label="Description" value={desc} onChange={(e) => setDesc(e.target.value)} margin="dense" />
                <TextField fullWidth label="Image URL" value={imgPath} onChange={(e) => setImgPath(e.target.value)} margin="dense" />

                {/* Dropdown for selecting a group */}
                <FormControl fullWidth margin="dense">
                    <InputLabel>Group</InputLabel>
                    <Select value={groupId} onChange={(e) => setGroupId(e.target.value)}>
                        {groups.map(group => (
                            <MenuItem key={group.id} value={group.id}>
                                {group.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">{selectedSpecies ? 'Update' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SpeciesManagementComponent;
