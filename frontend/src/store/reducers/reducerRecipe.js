import {
    CREATE_RECIPE_SUCCESS, FETCH_DETAILS_SUCCESS,
    FETCH_RECIPE_FAILURE,
    FETCH_RECIPE_REQUEST,
    FETCH_RECIPE_SUCCESS,

} from "../actions/actionsRecIpes";

const initialState = {
    recipes: [],
    loading: false,
    error: null,
    recipe:{}

};
const reducerRecipe = (state = initialState, action)=>{
    switch (action.type) {
        case FETCH_RECIPE_REQUEST:
            return{...state,loading:true};
        case FETCH_RECIPE_SUCCESS:
            return{...state, recipes:action.data,loading:false};
        case FETCH_RECIPE_FAILURE:
            return{...state,error:action.error,loading: false};
        case CREATE_RECIPE_SUCCESS:
            return{...state, loading:false};
        case FETCH_DETAILS_SUCCESS:
            return{...state, loading: false,recipe: action.data};

        default:return  state
    }
};
export default reducerRecipe;