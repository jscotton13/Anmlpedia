import { Routes, Route } from 'react-router-dom';
import GroupComponent from './Group/GroupComponent';
import { SpeciesComponent } from './Species/SpeciesComponent';
import AnimalComponent from "./Animals/AnimalComponent";


const RoutesComponent = () => {
  return (
    <Routes>
        {/* Home Route */}
        <Route path="/" element={<GroupComponent />} />

        {/* View All Groups */}
        <Route path="/groups" element={<GroupComponent />} />

        {/* View Species (All or by Group) */}
        <Route path="/species" element={<SpeciesComponent />} />
        <Route path="/species/:groupId" element={<SpeciesComponent />} /> 
        <Route path="/species/:groupName" element={<SpeciesComponent />} /> 

        {/* View Animals (All or by Species) */}
        <Route path="/animals" element={<AnimalComponent />} />
        <Route path="/animals/:speciesId" element={<AnimalComponent />} /> 
        <Route path="/animals/:speciesName" element={<AnimalComponent />} /> 


    </Routes>
  );
};

export default RoutesComponent;
