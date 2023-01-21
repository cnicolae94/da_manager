import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect } from "react";
import Home from "./pages/home/home.component";
import { Route, Routes } from "react-router-dom";
import CreateItemForm from "./components/crud-forms/createitem-form.component";
import UpdateItemForm from "./components/crud-forms/updateitem-form.component";
import DeleteItemForm from "./components/crud-forms/deleteitem-form.component";
import SearchItemForm from "./components/crud-forms/searchitem-form.component";
import { AlbumContainer } from "./components/artist-container/artist-container.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/album" element={<AlbumContainer />} />
        <Route path="/create" element={<CreateItemForm />} />
        <Route path="/update" element={<UpdateItemForm />} />
        <Route path="/delete" element={<DeleteItemForm />} />
        <Route path="/search_by_id" element={<SearchItemForm />} />
      </Route>
    </Routes>
  );
}

export default App;
