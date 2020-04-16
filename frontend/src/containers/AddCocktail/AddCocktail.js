import React from 'react';
import FormCocktail from "../../components/FormCocktail/FormCocktail";
import {useDispatch} from "react-redux";
import {fetchRecipe} from "../../store/actions/actionsRecIpes";

const AddCocktail = () => {
    const dispatch = useDispatch();
    return (
        <div>
            <FormCocktail submit={(data)=>dispatch(fetchRecipe(data))}/>
        </div>
    );
};

export default AddCocktail;