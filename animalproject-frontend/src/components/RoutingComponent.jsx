import { Routes, Route } from 'react-router-dom';
import GroupComponent from './Group/groupComponent';
import { SpeciesComponent } from './Species/speciesComponent';

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

        {/* View Animals (All or by Group) */}
        <Route path="/animals" element={<SpeciesComponent />} />
        <Route path="/animals/:groupId" element={<SpeciesComponent />} /> 

        {/* Management Routes */}

    </Routes>
  );
};

export default RoutesComponent;
