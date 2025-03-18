import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { addSpecies, updateSpecies } from '../../services/speciesService';
import { getAllGroups } from '../../services/groupService'; // Assume you have a function to get all groups

const SpeciesManagementComponent = ({ open, onClose, selectedSpecies, refreshSpecies }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [imgPath, setImgPath] = useState('');
    const [groupId, setGroupId] = useState('');
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // Fetch the groups when the component mounts
        const fetchGroups = async () => {
            try {
                const response = await getAllGroups(); // Assuming you have an API for groups
                setGroups(response.data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();

        // Set species data if in edit mode
        if (selectedSpecies) {
            setName(selectedSpecies.name);
            setDesc(selectedSpecies.desc);
            setImgPath(selectedSpecies.imgPath || ''); 
            setGroupId(selectedSpecies.groupId || ''); // Set groupId to selected species' groupId
        } else {
            setName('');
            setDesc('');
            setImgPath('');
            setGroupId('');
        }
    }, [selectedSpecies, open]);

    const handleSubmit = async () => {
        const speciesData = { name, desc, imgPath, groupId };
        console.log("Species Data:", speciesData);  // Debugging line
        try {
            if (selectedSpecies) {
                console.log("Updating species with ID:", selectedSpecies.id);  // Debugging line
                await updateSpecies(selectedSpecies.id, speciesData);
            } else {
                console.log("Adding new species");
                await addSpecies(speciesData);
            }
            await refreshSpecies();  // Refresh the species list after add/update
            onClose();  // Close the dialog
        } catch (error) {
            console.error("Error saving species:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{selectedSpecies ? 'Edit Species' : 'Add Species'}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Species Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="dense"
                />
                <TextField
                    fullWidth
                    label="Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    margin="dense"
                />
                <TextField
                    fullWidth
                    label="Image URL"
                    value={imgPath}
                    onChange={(e) => setImgPath(e.target.value)}
                    margin="dense"
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Group</InputLabel>
                    <Select
                        value={groupId}
                        onChange={(e) => setGroupId(e.target.value)}
                        label="Group"
                    >
                        {groups.map((group) => (
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
