import { Route, Routes } from "react-router-dom";
import {
  CharactersPage,
  CharacterDetailPage,
  LocationsPage,
  EpisodesPage,
  EpisodeCharactersPage,
  LocationCharactersPage
} from "@pages";

const App = () => (
  <Routes>
    <Route path="/" element={<CharactersPage />} />
    <Route path="/profile/:id" element={<CharacterDetailPage />} />
    <Route path="/locations" element={<LocationsPage />} />
    <Route path="/episodes" element={<EpisodesPage />} />
    <Route path="/location/:id/characters" element={<LocationCharactersPage />} />
    <Route path="/episode/:id/characters" element={<EpisodeCharactersPage />} />
  </Routes>
);

export default App;
