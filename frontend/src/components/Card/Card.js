import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {NavLink} from "react-router-dom";
import imageNotAvailable from "../../assets/images/image_not_available.jpg";
import {apiURL} from "../../constants";
import {useDispatch} from "react-redux";
const useStyles = makeStyles({
    root: {
        maxWidth: 250,
    },
    media: {
        height: 150,
    },
});

export default function MediaCard(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    let image = imageNotAvailable;

    if (props.image) {
        image = apiURL + '/' + props.image;
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    className={classes.media}
                    image={image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography component={NavLink} to={'/details/'+ props.id} gutterBottom variant="h5">
                     {props.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
           {props.role === 'admin' ? <CardActions>
                <Button onClick={()=>dispatch(props.remove(props.id))} size="small" color="primary">
                   Remove
                </Button>
                <Button onClick={()=>dispatch(props.publish(props.id))} size="small" color="primary">
                    {props.published ? 'Unpublished': 'Publish'}
                </Button>
            </CardActions>:null}
        </Card>
    );
}