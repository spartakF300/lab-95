import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteCocktail, getRecipes, publishCocktail} from "../../store/actions/actionsRecIpes";
import Card from "../../components/Card/Card"

const Main = (props) => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes.recipes);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(getRecipes(props.match.params.id))
    }, [dispatch, props.match.params.id]);

    return (
        <div className="main">

            {recipes.map(res => (
                <div key={res._id}>
                    <Card
                        publish={publishCocktail}
                        remove={deleteCocktail}
                        image={res.image}
                        name={res.name}
                        user={user}
                        id={res._id}
                        published={res.publish}
                    />

                </div>
            ))}

        </div>
    );
};

export default Main;