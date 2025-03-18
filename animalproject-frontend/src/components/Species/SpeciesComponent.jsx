import React, { useEffect, useState, createContext, useContext } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Tooltip } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllSpecies, getSpeciesByGroupId, deleteSpecies } from '../../services/speciesService'
import { getGroupById } from '../../services/groupService'
import SpeciesManagementComponent from './SpeciesManagementComponent';
// Context for species data
const SpeciesContext = createContext();

export const SpeciesProvider = ({ children }) => {
    const [species, setSpecies] = useState([]);
    
    return (
        <SpeciesContext.Provider value={{ species, setSpecies }}>
            {children}
        </SpeciesContext.Provider>
    );
};

export const SpeciesComponent = () => {
    const context = useContext(SpeciesContext);
    const navigate = useNavigate();
    const [species, setSpecies] = useState([]);
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    
    const {groupId} = useParams();
    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        console.log("Current Params:", { groupId });
        setSpecies([]);  // Reset species before fetching new data
        if (groupId) {
            fetchGroupName(groupId);
            fetchSpeciesDataByGroup(groupId);
        } else {
            fetchSpeciesData();
        }
    }, [groupId]);


    const fetchGroupName = async (groupId) => {
        try {
            const response = await getGroupById(groupId);  // API call to get group details
            setGroupName(response.data.name); // Update state with group name
        } catch (error) {
            console.error("Error fetching group name:", error);
            setGroupName("Unknown");
        }
    };

    const fetchSpeciesDataByGroup = async (groupId) => {
        try {
            const response = await getSpeciesByGroupId(groupId); // Fetch species by groupId
            setSpecies(response.data);
        } catch (error) {
            console.error("Error fetching species data by group:", error);
        }
    };

    const fetchSpeciesData = async () => {
        try {
            const response = await getAllSpecies();
            setSpecies(response.data); // Access data from response
        } catch (error) {
            console.error("Error fetching species data:", error);
        }
    };
    const handleOpenModal = (species = null) => {
        if (species && species.id) {
            console.log("Opening modal for editing species:", species);
            setSelectedSpecies(species);
            setIsEditMode(true);
        } else {
            console.log("Opening modal for adding a new species.");
            setSelectedSpecies({ name: "", desc: "", imgPath: "", groupId: groupId || null }); 
            setIsEditMode(false);
        }
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSpecies(null); // Reset state when closing the modal
    };
  const onDeleteSpecies = async (speciesId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this species?");
    if (!confirmDelete) return;
    try {
      await deleteSpecies(speciesId);
      setSpecies((prevSpecies) => prevSpecies.filter((species) => species.id !== speciesId)); // Update state
    } catch (error) {
      console.error("Error deleting species:", error);
    }
  };

  const refreshSpecies = async () => {
    console.log("Refreshing species list... ")
    if (groupId) {
       await fetchSpeciesDataByGroup(groupId); // Refresh group-specific species
    } else {
       await fetchSpeciesData(); // Refreshes all species
    }
};

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h3" align="center" color="black" gutterBottom sx={{ marginBottom: '-8px' }} className="p-4">
                {groupId ? `Discover Different ${groupName} Species!` : "Discover A Diverse Range Of Species!"}
            </Typography>
            <Box textAlign="center" className="p-4" sx={{ marginTop: '0px' }}>
                <Tooltip title="Add Species" arrow>
                    <Button variant="contained" onClick={handleOpenModal}>
                        Add Species
                    </Button>
                </Tooltip>
                <SpeciesManagementComponent 
                open={isModalOpen} 
                onClose={handleCloseModal} 
                selectedSpecies={selectedSpecies} 
                refreshSpecies={refreshSpecies}
                isEditMode={isEditMode}
                />
            </Box>
            <Grid container spacing={2} justifyContent="left">
                {species.map((species) => (
                    <Grid item key={species.id|| species.name} xs={12} sm={6} md={4}>
                        <Card sx={{ display: 'flex', flexDirection: 'column'}}>
                            <CardMedia
                                component="img"
                                height="194"
                                image={species.imgPath}
                                alt="Animal Species"
                                sx={{
                                    objectFit: "contain",
                                    width: "100%",
                                    height: '75%',
                                }}/>
                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Typography variant="h5">
                                    {species.name}
                                </Typography>
                                <Typography>
                                    {species.desc}
                                </Typography>
                            
                            </CardContent>
                            <CardActions style={{ justifyContent: 'center', gap: '8px' }}>
                                <Tooltip title="View Animals" arrow>
                                    <Button variant="contained" size="small" color="primary" onClick={() => onViewAnimals(species.id, species.name)}>
                                        View {species.name}s
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Edit Species" arrow>
                                    <Button variant="contained" size="small" color="secondary" onClick={() => handleOpenModal(species)}>
                                        Edit {species.name}s
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Delete Species" arrow>
                                    <Button variant="contained" size="small" color="error" onClick={() => onDeleteSpecies(species.id)}>
                                        Delete {species.name}
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

