import React from "react";
import Axios from 'axios'
import {Button } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import swal from 'sweetalert';

class AddRecipe extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            recipe: "",
            ingredients: "",
            price: 0,
            selectedFile: null,
            currUser: "",
            currUserRole: "",
            loginStatus: false,
            redirect: false
        };
    }

    displayInfo = () => {
        console.log(this.state.name + this.state.recipe + this.state.ingredients + this.state.price)
    }

    addRecipe = () => {
        // Axios.post('http://localhost:3001/addRecipe', {
        //     recipeName: this.state.name,
        //     recipeRecipe: this.state.recipe,
        //     recipeIngredients: this.state.ingredients,
        //     recipePrice: this.state.price,
        //     recipeFile: this.state.selectedFile
        // }).then(() => {
        //     console.log("success");
        // });

        var bodyFormData = new FormData();
        bodyFormData.append('recipeName', this.state.name);
        bodyFormData.append('recipeRecipe', this.state.recipe); 
        bodyFormData.append('recipeIngredients', this.state.ingredients); 
        bodyFormData.append('recipePrice', this.state.price); 
        bodyFormData.append('recipeFile', this.state.selectedFile); 
     
        Axios({
            method: "post",
            url: "http://localhost:3001/addRecipe",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then((response) => {
                this.setState({redirect: true});
                swal("Sukces!", "Pomyślnie dodano przepis!", "success");
              console.log(response);
            })
            .catch((response) => {
                
                swal("Ups!", "Coś poszło nie tak!", "error");
              console.log(response);
            });
            
    };

    componentDidMount() {
        Axios.defaults.withCredentials = true;
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn === true) {
                this.setState({ loginStatus: true })
                this.setState({ currUser: response.data.user[0].username })
                this.setState({ currUserRole: response.data.user[0].role })
            }
        })

        Axios.get("http://localhost:3001/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response);
        })
    }
    render() {
        const {redirect} = this.state;

        if(redirect){
            return <Navigate to='/getRecipeList'/>;
        }

        return (
            <div className="App">
                 {this.state.loginStatus && (
                    <div className="information2">
                        <p>Zalogowany jako, {this.state.currUser}</p>
                    </div>
                )}
                <br></br> <br></br>
                <div className="information">
                    <label id="priceText">Nazwa potrawy:</label>
                    <input
                        type="text"
                        onChange={(event) => {
                            this.setState({ name: event.target.value });
                        }}
                    />
                    <label id="priceText">Pełny przepis:</label>
                    <textarea
                        type="text"
                        id="recipeArea"
                        onChange={(event) => {
                            this.setState({ recipe: event.target.value });
                        }}
                    />
                    <label id="priceText">Składniki:</label>
                    <input
                        type="text"
                        onChange={(event) => {
                            this.setState({ ingredients: event.target.value });
                        }}
                    />
                    <label id="priceText">Koszt(zł):</label>
                    <input id="price"
                        type="number"
                        onChange={(event) => {
                            this.setState({ price: event.target.value });
                        }}
                    />
                    <br></br>
                    <label id="priceText" htmlFor="formFile" className="form-label">Zdjęcie:</label>
                    <input className="form-control" 
                           type="file" 
                           id="formFile" 
                           onChange={(event) => {
                            this.setState({ selectedFile: event.target.files[0] });
                            }}>
                                
                    </input>
                    <br></br>
                    <Button variant="secondary" onClick={this.addRecipe.bind(this)}>Dodaj przepis</Button>
                </div>
            </div>
        );
    }


}

export default AddRecipe;