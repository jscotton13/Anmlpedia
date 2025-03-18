import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { addSpecies, updateSpecies } from '../../services/speciesService';
import { getAllGroups } from '../../services/groupService'; // Fetch groups

const SpeciesManagementComponent = ({ open, onClose, selectedSpecies, refreshSpecies }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [imgPath, setImgPath] = useState('');
    const [groupName, setGroupName] = useState('');  // Handle group name input
    const [groups, setGroups] = useState([]); // Store available groups to check if entered group exists
    const [groupId, setGroupId] = useState(null);  // Store the resolved groupId

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await getAllGroups();
                setGroups(response.data);  // Store groups fetched from API
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
            setGroupName(selectedSpecies.groupName || '');  // Set group name from selected species
            setGroupId(selectedSpecies.groupId || null); // Ensure groupId is set properly (if editing)
            const group = groups.find(g => g.id === selectedSpecies.groupId);
            setGroupName(group ? group.name : ''); // Set the group name from the groupId
        } else {
            setName('');
            setDesc('');
            setImgPath('');
            setGroupName('');
            setGroupId(null); // Reset groupId for new species
        }
    }, [selectedSpecies, open, groups]);

    const handleSubmit = async () => {
    
        // If a valid group is found, use its groupId, otherwise, leave groupId as null
        const speciesData = { 
            name, 
            desc, 
            imgPath, 
            group: { id: groupId }
        };

        try {
            if (selectedSpecies) {
              
                    console.log(speciesData)
                    await updateSpecies(selectedSpecies.id, speciesData);
                
            } else {
                // Adding new species
                await addSpecies(speciesData);  // Add new species
            }
            await refreshSpecies();  // Refresh the species list
            onClose();
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
                    <Select
                        value={groupId || ''}
                        onChange={(e) => setGroupId(e.target.value)}  // Update groupId when a selection is made
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
