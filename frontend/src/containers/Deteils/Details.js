import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import DetailsRecipe from "../../components/DetailsRecipe/DetailsRecipe";
import {useDispatch, useSelector} from "react-redux";
import {getDetailsRecipes} from "../../store/actions/actionsRecIpes";

const Details = (props) => {
    const dispatch = useDispatch();
    const recipe = useSelector(state => state.recipes.recipe);

    useEffect(()=>{
        dispatch(getDetailsRecipes(props.match.params.id))

    },[dispatch,props.match.params.id]);

    return (
        <div>
            <Grid container justify="center">
                <Grid item xs={12} md={10} lg={4}>
                    <DetailsRecipe
                        recipe={recipe}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Details;