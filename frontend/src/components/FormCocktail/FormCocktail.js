import React, {Component} from 'react';
import {nanoid} from "nanoid"
import Grid from "@material-ui/core/Grid";
import FormElement from "../UI/Form/FormElement";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class FormCocktail extends Component {
    state = {
        name: '',
        recipes: '',
        ingredients: [
            {name: '', amount: '', id: nanoid(5)}
        ],
        image: null,
    };
    inputChangeHandler = event => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    };
    submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(this.state).forEach(key => {
            if (key === 'ingredients') {
                formData.append(key, JSON.stringify(this.state[key]));
            } else {
                formData.append(key, this.state[key]);
            }
        });

        this.props.submit(formData);

    };
    remove =(i)=>{
        let ingredients = [...this.state.ingredients];
         ingredients.splice(i,1);
        this.setState({ingredients})
    };
    fileChangeHandler = (e) => {
        this.setState({...this.state, [e.target.name]: e.target.files[0]})
    };

    ingredientChange = (e, i) => {
        let ingredients = [...this.state.ingredients];
        ingredients[i][e.target.name] = e.target.value;
        this.setState({ingredients})
    };
    addIngredient = (e) => {
        e.preventDefault();
    this.setState({ingredients:[{name: '', amount: '', id: nanoid(5)},...this.state.ingredients ]})
    };

    render() {
        return (
            <>
                <Grid container justify="center">
                    <Grid item xs={12} md={10} lg={6}>
                        <Box pt={2} pb={2}>
                            <Typography variant="h4">Add cocktail</Typography>
                        </Box>

                        <form onSubmit={this.submitFormHandler}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs>
                                    <FormElement
                                        propertyName="name"
                                        type="text"
                                        title="Name"
                                        value={this.state.name}
                                        onChange={this.inputChangeHandler}
                                        placeholder="Name"

                                    />
                                </Grid>
                                <Grid item xs>
                                    <FormElement
                                        propertyName="recipes"
                                        type="text"
                                        title="Recipe"
                                        value={this.state.recipe}
                                        onChange={this.inputChangeHandler}
                                        placeholder="Recipe"
                                        autoComplete="new-recipe"
                                    />
                                </Grid>
                                <h3>Ingredients:</h3>
                                <div className="ingredient-wrap">

                                {this.state.ingredients.map((ing, i) => (
                                    <div key={ing.id}>
                                        <div>
                                            <label htmlFor="name-i">Name: </label>
                                        <input
                                            style={{height:'25px'}}
                                            id="name-i"
                                            name="name"
                                            value={this.state.ingredients[i].name}
                                            type="text"
                                            onChange={(e) => this.ingredientChange(e, i)}
                                        />
                                            <label htmlFor="amount">Amount: </label>
                                        <input
                                            style={{height:'25px',margin:'10px'}}
                                              name="amount"
                                               id="amount"
                                               value={this.state.ingredients[i].amount}
                                               type="text"
                                               onChange={(e) => this.ingredientChange(e, i)}

                                        />
                                       {i > 0 && <Button onClick={()=>this.remove(i)}><b>X</b></Button>}
                                        </div>
                                    </div>
                                ))}
                                </div>
                                <Grid item xs>
                                    <Button onClick={this.addIngredient} color="secondary" variant="contained">
                                        Add ingredient
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <FormElement
                                        propertyName="image"
                                        title="Image"
                                        type="file"
                                        onChange={this.fileChangeHandler}
                                    />
                                </Grid>

                                <Grid item xs>
                                    <Button type="submit" color="primary" variant="contained">
                                        Send
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default FormCocktail;