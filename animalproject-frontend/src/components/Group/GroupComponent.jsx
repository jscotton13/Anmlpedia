import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllGroups, deleteGroup } from "../../services/groupService";
import GroupManagementComponent from "./groupManagementComponent";

const GroupComponent = () => {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const navigate = useNavigate();

  const fetchGroupDataApi = async () => {
    try {
      const response = await getAllGroups();
      return response.data; // Axios wraps the response in a data object
    } catch (error) {
      console.error("Error fetching groups: ", error);
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGroupDataApi();
      if (Array.isArray(data)) {
        setGroups(data);
      } else {
        setGroups([]); // Fallback to an empty array
      }
    };
    fetchData();
  }, []);

  const onViewSpecies = useCallback((groupId, groupName) => {
    navigate(`/species/${groupId}`);
  }, [navigate]);

  const handleOpenModal = (group = null) => {
    setSelectedGroup(group || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGroup(null); // Reset state when closing the modal
  };

  const onDeleteGroup = async (groupId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this group?");
    if (!confirmDelete) return;
    try {
      await deleteGroup(groupId);
      setGroups((prevGroups) => prevGroups.filter((group) => group.id !== groupId)); // Update state
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  const refreshGroups = async () => {
    const data = await fetchGroupDataApi();
    setGroups(data); // Update groups state with the latest data
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Typography variant="h3" align="center" color="black" gutterBottom sx={{ marginBottom: "-8px" }} className="p-4">
        Animal Groups
      </Typography>
      <Box textAlign="center" className="p-4" sx={{ marginTop: "0px" }}>
        <Tooltip title="Add Group" arrow>
          <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>Add Group</Button>
        </Tooltip>
        <GroupManagementComponent open={isModalOpen} onClose={handleCloseModal} selectedGroup={selectedGroup} refreshGroups={refreshGroups} />
      </Box>
      <div style={{ flex: 1 }}>
        <Grid container spacing={2} justifyContent="left">
          {groups.map((group) => (
            <Grid item key={group.id} xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardMedia component="img" height="194" image={group.imgPath} alt="Animal Group" sx={{ objectFit: "contain", width: "100%", height: "75%" }} />
                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Typography variant="h5">{group.name}</Typography>
                  <Typography>{group.desc}</Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "center", gap: "8px" }}>
                  <Tooltip title="View Group" arrow>
                    <Button variant="contained" size="small" color="primary" onClick={() => onViewSpecies(group.id, group.name)}>View {group.name}</Button>
                  </Tooltip>
                  <Tooltip title="Edit Group" arrow>
                    <Button variant="contained" size="small" color="secondary" onClick={() => handleOpenModal(group)}>Edit {group.name}</Button>
                  </Tooltip>
                  <Tooltip title="Delete Group" arrow>
                    <Button variant="contained" size="small" color="error" onClick={() => onDeleteGroup(group.id)}>Delete {group.name}</Button>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default GroupComponent;
