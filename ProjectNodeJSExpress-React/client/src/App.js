import './App.css';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React from "react";
import IndexMain from "./pages/IndexMain";
import AddRecipe from "./pages/AddRecipe";
import RecipeList from "./pages/RecipeList";
import Login from "./pages/Login";
import EditRecipe from "./pages/EditRecipe";
import DetailsRecipe from "./pages/DetailsRecipe"
import DeleteRecipe from "./pages/DeleteRecipe"
import AboutUs from './pages/AboutUs';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';


function App() {
  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Projekt TPSI</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Strona główna</Nav.Link>
              <Nav.Link href="/getRecipeList">Lista przepisów</Nav.Link>
              <NavDropdown title="O nas" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/aboutUs">O nas</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Kontakt</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href="/register">
                Logowanie/Rejestracja
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<IndexMain />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/getRecipeList" element={<RecipeList />} />
        <Route path="/register" element={<Login/>}/>
        <Route path="/editRecipe" element={<EditRecipe />} />
        <Route path="/detailsRecipe" element={<DetailsRecipe/>}/>
        <Route path="/deleteRecipe" element={<DeleteRecipe/>}/>
        <Route path="/aboutUs" element={<AboutUs/>}/>
      </Routes>
    </Router>

  );

  ReactDOM.render(
    <App />,
    document.getElementById("root")
  );
}

export default App;
