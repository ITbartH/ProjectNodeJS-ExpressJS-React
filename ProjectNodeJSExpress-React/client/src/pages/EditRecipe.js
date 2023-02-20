import React from "react";
import Axios from 'axios';
import {Button} from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import swal from 'sweetalert';
class EditRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          id: 0,
          name: "",
          recipe: "",
          ingredients: "",
          price: 0,
          image: null,
          redirect: false
        };
        
    }
    

    componentDidMount() {
        var currentURL = window.location.href;
        console.log(currentURL)
        var currentID = currentURL.split("?id=")[1]
        console.log(currentID)

        Axios.post("http://localhost:3001/getRecipe", { id: currentID }).then((response) => {
            console.log(response.data)
            var dane = response.data;
            this.setState({id: dane[0].id})
            this.setState({name: dane[0].recipe_name})
            this.setState({recipe: dane[0].recipe_recipe})
            this.setState({ingredients: dane[0].recipe_ingredients})
            this.setState({price: dane[0].recipe_price})
            this.setState({image: dane[0].recipe_image})

        })

        
        
    }

    displayInfo = () => {
        console.log("INFORMACJE: " + this.state.name + this.state.recipe + this.state.ingredients + this.state.price)
    }

    editRecipe = () => {
         Axios.post('http://localhost:3001/editRecipe', {
            id: this.state.id,
            recipeName: this.state.name,
            recipeRecipe: this.state.recipe,
            recipeIngredients: this.state.ingredients,
            recipePrice: this.state.price
        }).then(() => {
            swal("Sukces!", "Pomyślnie edytowano przepis!", "success")
            console.log("success");
        });

        // var bodyFormData = new FormData();
        
        // bodyFormData.append('recipeName', this.state.name);
        // bodyFormData.append('recipeRecipe', this.state.recipe); 
        // bodyFormData.append('recipeIngredients', this.state.ingredients); 
        // bodyFormData.append('recipePrice', this.state.price); 
        // bodyFormData.append('id', this.state.id);
     
        // Axios({
        //     method: "post",
        //     url: "http://localhost:3001/editRecipe",
        //     data: bodyFormData,
        //     headers: { "Content-Type": "multipart/form-data" },
        //   })
        //     .then(function (response) {
        //       //handle success
        //       console.log(response);
        //     })
        //     .catch(function (response) {
        //       //handle error
        //       console.log(response);
        //     });
    };
    
    render() {
        const {redirect} = this.state;

        if(redirect){
            return <Navigate to='/getRecipeList'/>;
        }

        return (
            <div className="App">
            <br></br> <br></br>
            <div className="information">
                    <br></br>
                    <img id="imageDetails" alt="img" src={`data:image/jpeg;base64,${this.state.image}`}></img>
                    <br></br>
                <label id="priceText">Nazwa potrawy:</label>
                <input
                    type="text"
                    value={`${this.state.name}`}
                    onChange={(event) => {
                        this.setState({ name: event.target.value });
                    }}
                />
                <br></br>
                <label id="priceText">Pełny przepis:</label>
                <textarea
                    type="text"
                    id="recipeArea"
                    value={`${this.state.recipe}`}
                    onChange={(event) => {
                        this.setState({ recipe: event.target.value });
                    }}
                />
                <br></br>
                <label id="priceText">Składniki:</label>
                <input
                    type="text"
                    value={`${this.state.ingredients}`}
                    onChange={(event) => {
                        this.setState({ ingredients: event.target.value });
                    }}
                />
                <br></br>
                <label id="priceText">Koszt(zł):</label>
                <input id="price"
                    type="number"
                    value={`${this.state.price}`}
                    onChange={(event) => {
                        this.setState({ price: event.target.value });
                    }}
                />
                <br></br>
                <Button variant="secondary" href="/getRecipeList" onClick={this.editRecipe.bind(this)}>Edytuj przepis</Button>
            </div>
            <br></br><br></br>
        </div>
        );
    }

    
}

export default EditRecipe;