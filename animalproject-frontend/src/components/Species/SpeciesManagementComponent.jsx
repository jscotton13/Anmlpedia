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

    const handleSubmit = async () => {
        const speciesData = { 
            name, 
            desc, 
            imgPath, 
            groupId: Number(groupId) // Ensure groupId is a number
        };

        try {
            if (selectedSpecies) {
                updateSpecies(selectedSpecies.id, speciesData);  // Update species
            } else {
                addSpecies(speciesData);  // Add new species
            }
            refreshSpecies();
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
