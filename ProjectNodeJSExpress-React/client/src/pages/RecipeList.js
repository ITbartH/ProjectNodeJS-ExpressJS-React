import React from "react";
import Axios from 'axios';

import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
class RecipeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipeList: [],
            currUser: "",
            currUserRole: "",
            loginStatus: false
        };

    }

    componentDidMount() {
        Axios.defaults.withCredentials = true;
        Axios.get('http://localhost:3001/getRecipeList', {
        }).then((response) => {
            this.setState({ recipeList: response.data });
        })

        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn === true) {
                console.log("COS")
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
    };

    logout = () => {
        Axios.get("http://localhost:3001/logout")
    }

    render() {

       
        return (
            <div className="App">
                {this.state.loginStatus && (
                    <div className="information2">
                        <Button href="/register" onClick={this.logout.bind(this)} variant="dark"><p>Zalogowany jako, {this.state.currUser}</p></Button>
                    </div>
                )}
                <br></br><br></br>
                <Button variant="secondary" href={`/addRecipe`}> Dodaj przepis </Button>
                <br></br><br></br>
                <div className="CardsList">
                    {this.state.recipeList.map((object, i) => {
                        return (
                            <Card key={i} className="child" style={{ width: '22rem', margin: 'auto'}}>
                                <Card.Img className="xd2" variant="top" alt="img" src={`data:image/jpeg;base64,${object.recipe_image}`} />
                                <Card.Body>
                                    <Card.Title>{object.recipe_name}</Card.Title>
                                    <br></br>
                                    <Card.Text className="recipe">
                                        {object.recipe_recipe}
                                        
                                    </Card.Text>
                                    <p id="text2">...</p>
                                    <Button variant="secondary" href={`/detailsRecipe?id=${object.id}`}>Czytaj dalej</Button>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    {object.recipe_ingredients.split(",").map((ing, j) => {
                                        return (
                                            <ListGroupItem key={j}>{ing}</ListGroupItem>
                                        )
                                    })}
                                    <p id="priceText"><span>💰</span> {object.recipe_price} zł <span>💰</span></p>
                                </ListGroup>
                                <Card.Body>
                                {this.state.currUserRole === "admin" && (
                                    <div>
                                         <Button variant="secondary" href={`/editRecipe?id=${object.id}`}  style={{margin: '0 2rem 0 0'}}> Edytuj </Button>
                                         <Button variant="secondary" href={`/deleteRecipe?id=${object.id}`}> Usun </Button>
                                    </div>
                                )}
                                   

                                </Card.Body>
                            </Card>
                            );

                    })}
                </div>
                <br></br><br></br><br></br>
            </div>
            
        );

    }


}

export default RecipeList;