import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import {apiURL} from "../../constants";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1000,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RecipeReviewCard({recipe}) {
    const classes = useStyles();
    const [expanded] = React.useState(true);

    return recipe && (
        <Card className={classes.root}>
            <CardHeader
                title={recipe.name}

            />

           {recipe.image && <CardMedia
                className={classes.media}
                image={ apiURL + '/' + recipe.image}
                title={recipe.name}
            />}

            <CardContent>
                <Typography variant="h4"  component="h4">
                    Ingredients:
                </Typography>
                {recipe.ingredients && recipe.ingredients.map((ing,i)=>(
                    <Typography key={i} variant="body2" color="textSecondary" component="p">
                        {ing.name} {ing.amount}
                    </Typography>
                ))}

            </CardContent>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="h5"  component="h5">Recipe:</Typography>

                    <Typography>
                        {recipe.recipes}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}