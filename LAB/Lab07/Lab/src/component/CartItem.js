import {
    withStyles,
    Divider,
    Paper,
    Box,
    Grid,
    IconButton,
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    title: {
        minHeight: 50,
    },
    container: {
        margin: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    itemDetail: {
        fontSize: 20,
        fontFamily: 'Roboto',
        margin: 'auto',
    },
    deleteIcon: {
        width: 32,
        height: 32,
        color: '#a52a2a',
    },
    imgBox: {
        marginTop: 'auto',
        marginBottom: 'auto',
    }
});

class CartItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imgSrc: `../img/${this.props.name}.jpg`,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.name !== prevProps.name) {
            this.setState({
                imgSrc: `../img/${this.props.name}.jpg`
            })
        }
    }

    render() {
        const { classes, idx, amount, price, handleDeleteCartItem } = this.props;

        return (
            <Paper className={classes.container} elevation={3}>
                <Grid container direction="row" justifyContent="space-around" wrap="nowrap">
                    <Box
                        className={classes.imgBox}
                        component="img"
                        sx={{
                            height: 44,
                            width: 77,
                        }}
                        src={this.state.imgSrc}
                    />
                    <Divider orientation="vertical" flexItem />
                    <span className={classes.itemDetail}>{`$${price} * ${amount}`}</span>
                    <Divider orientation="vertical" flexItem />
                    {/* TODO-6: specify button event handler */}
                    <IconButton
                        
                    >
                        <DeleteIcon className={classes.deleteIcon}/>
                    </IconButton>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(CartItem);