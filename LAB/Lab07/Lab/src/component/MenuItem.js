import {
    withStyles,
    Grid,
    Box,
    Paper,
    IconButton,
} from '@material-ui/core'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const styles = theme => ({
    paper: {
        margin: theme.spacing(1),
    },
    icon: {
        width: 40,
        height: 40,
    },
    amount: {
        fontSize: 28,
        fontFamily: 'Roboto',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    priceText: {
        fontSize: 28,
        fontFamily: 'Roboto',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: theme.spacing(2),
    }
});

class MenuItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imgSrc: `../img/${this.props.item}.jpg`,
        };
    }

    render() {
        const { classes, item, price, amount } = this.props;
        
        return (
            <div>
                <Grid container justifyContent="flex-start">
                    <span className={classes.priceText}>{"$" + price}</span>
                </Grid>
                <Paper className={classes.paper} elevation={3}>
                    <Box
                        component="img"
                        sx={{
                            maxHeight: { xs: 55, sm: 110, md: 165, lg: 220 },
                            maxWidth: { xs: 96, sm: 193, md: 290, lg: 386 },
                        }}
                        src={(this.state.imgSrc)}
                    />
                </Paper>
                <Grid container direction="row" justifyContent="space-evenly">
                    {/* TODO-1: specify button event handler.*/}
                    {/* hint: handleSetAmount */}
                    <IconButton color="primary">
                        <RemoveCircleIcon className={classes.icon} />
                    </IconButton>
                    <span className={classes.amount}>{amount}</span>
                    <IconButton color="primary">
                        <AddCircleIcon className={classes.icon} />
                    </IconButton>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(MenuItem);