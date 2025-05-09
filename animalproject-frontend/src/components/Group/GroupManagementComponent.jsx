import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { addGroup, updateGroup } from '../../services/groupService';
import { AgGridReact } from 'ag-grid-react'; // Added AG grid functionality 
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
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

    
    const [editMode, setEditMode] = useState('dialog'); // 'dialog' or 'grid'
    const [rowData, setRowData] = useState([]);

    // defines AG Grid columns
    const [columnDefs] = useState([
    { field: 'id', headerName: 'ID', editable: false },
    { field: 'name', headerName: 'Group Name', editable: true },
    { field: 'desc', headerName: 'Description', editable: true },
    { field: 'imgPath', headerName: 'Image URL', editable: true },
    ]);

    // Loads all groups for grid view
    useEffect(() => {
    if (editMode === 'grid') {
        (async () => {
            try {
                const response = await refreshGroups(); // assumed to fetch all groups
                setRowData(response);
            } catch (err) {
                console.error("Failed to load groups for grid:", err);
            }
        })();
    }
    }, [editMode]);


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
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem' }}>
                {/* <Button
                    variant="outlined"
                    onClick={() => setEditMode(editMode === 'dialog' ? 'grid' : 'dialog')}
                >
                    {editMode === 'dialog' ? 'Switch to Grid View' : 'Switch to Dialog View'}
                </Button> */}
            </div>
    
            {editMode === 'dialog' ? (
                <Dialog open={open} onClose={onClose} fullWidth>
                    <DialogTitle>
                        {selectedGroup
                            ? `Edit ${selectedGroup.name}${selectedGroup.name.endsWith('s') ? '' : 's'}`
                            : 'Add Group'}
                    </DialogTitle>
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
            ) : (
                <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={{ flex: 1, minWidth: 100, resizable: true }}
                        onCellValueChanged={async (params) => {
                            try {
                                const updated = {
                                    name: params.data.name,
                                    desc: params.data.desc,
                                    imgPath: params.data.imgPath
                                };
                                await updateGroup(params.data.id, updated);
                                console.log("Updated group:", updated);
                            } catch (err) {
                                console.error("Failed to update group in grid:", err);
                            }
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default GroupManagementComponent;
