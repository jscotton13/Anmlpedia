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

        {/* View All Species or Species by Group */}
        <Route path="/species" element={<SpeciesComponent />} />
        <Route path="/:groupName/species" element={<SpeciesComponent />} />

        {/* View All Animals, Animals by Group, or Animals by Species */}
        <Route path="/animals" element={<AnimalComponent />} />
        <Route path="/:groupName/:speciesName/animals" element={<AnimalComponent />} />
        <Route path="/:groupName/animals" element={<AnimalComponent />} />

        {/* View Specific Animal */}
        <Route path="/:groupName/:speciesName/:animalName" element={<AnimalComponent />}/>

    </Routes>
  );
};

export default RoutesComponent;
