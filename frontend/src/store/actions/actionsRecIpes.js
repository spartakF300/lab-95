import {NotificationManager} from 'react-notifications';
import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';
export const FETCH_RECIPE_REQUEST = 'FETCH_RECIPE_REQUEST';
export const FETCH_RECIPE_SUCCESS = 'FETCH_RECIPE_SUCCESS';
export const FETCH_RECIPE_FAILURE = 'FETCH_RECIPE_FAILURE';
export const CREATE_RECIPE_SUCCESS = 'CREATE_RECIPE_SUCCESS';

export const FETCH_DETAILS_SUCCESS = 'FETCH_DETAILS_SUCCESS';
export const fetchDetailsSuccess = (data)=>({type:FETCH_DETAILS_SUCCESS,data});

export const fetchRecipeRequest = ()=>({type:FETCH_RECIPE_REQUEST});
export const fetchRecipeSuccess = data=>({type:FETCH_RECIPE_SUCCESS,data});
export const fetchRecipeFailure = error=>({type:FETCH_RECIPE_FAILURE,error});

export const createRecipeSuccess = ()=>({type:CREATE_RECIPE_SUCCESS});


export const fetchRecipe = (data)=>{
    return async dispatch =>{
        try{
            dispatch(fetchRecipeRequest());
            await  axiosApi.post('/recipes',data);
            dispatch(createRecipeSuccess());
            NotificationManager.success('Ваш коктейль находится на рассмотрении модератора');
            dispatch(push('/'))
        }catch (e) {
            dispatch(fetchRecipeFailure(e));
        }

    }
};
export const getRecipes = (id)=>{
    let url = '/recipes';
    if (id){
        url +='?id='+ id
    }
 return async dispatch =>{
     try{
         dispatch(fetchRecipeRequest());
         const response = await axiosApi.get(url);
         dispatch(fetchRecipeSuccess(response.data));
     }catch (e) {
         dispatch(fetchRecipeFailure(e))
     }
 }
};
export const getDetailsRecipes = (id)=>{

    return async dispatch =>{
        try{
            dispatch(fetchRecipeRequest());
            const response = await axiosApi.get('/recipes/'+id);
            dispatch(fetchDetailsSuccess(response.data));
        }catch (e) {
            dispatch(fetchRecipeFailure(e))
        }
    }
};
export const publishCocktail = (id)=>{
    return async dispatch =>{
        try{
            await  axiosApi.post('/recipes/publish?id='+id);
            dispatch(getRecipes())
        }catch (e) {
            dispatch(fetchRecipeFailure(e))
        }

    }

};
export const deleteCocktail = (id)=>{
    return async dispatch =>{
        try{
            await  axiosApi.delete('/recipes?id='+id);
            dispatch(getRecipes())
        }catch (e) {
            dispatch(fetchRecipeFailure(e))
        }

    }

};


