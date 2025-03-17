import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { addGroup, updateGroup } from '../../services/groupService';

const GroupManagementComponent = ({ open, onClose, selectedGroup, refreshGroups }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [imgPath, setImgPath] = useState('');

    useEffect(() => {
        if (selectedGroup) {
            setName(selectedGroup.name);
            setDesc(selectedGroup.desc);
            setImgPath(selectedGroup.imgPath || ''); 
        } else {
            setName('');
            setDesc('');
            setImgPath('');
        }
    }, [selectedGroup, open]);

    const handleSubmit = async () => {
        const groupData = { name, desc, imgPath };
        try {
            if (selectedGroup) {
                await updateGroup(selectedGroup.id, groupData);
            } else {
                await addGroup(groupData);
            }
            await refreshGroups(); // refreshes the page after an update to show changes immediately
            onClose();
        } catch (error) {
            console.error("Error saving group:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{selectedGroup ? 'Edit Group' : 'Add Group'}</DialogTitle>
            <DialogContent>
                <TextField fullWidth label="Group Name" value={name} onChange={(e) => setName(e.target.value)} margin="dense" />
                <TextField fullWidth label="Description" value={desc} onChange={(e) => setDesc(e.target.value)} margin="dense" />
                <TextField fullWidth label="Image URL" value={imgPath} onChange={(e) => setImgPath(e.target.value)} margin="dense" /> 
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">{selectedGroup ? 'Update' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default GroupManagementComponent;
