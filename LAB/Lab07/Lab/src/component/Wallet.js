import {
    withStyles,
    Typography,
    Divider,
    Grid,
    Paper,
    TextField,
    IconButton,
} from '@material-ui/core'

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

const styles = theme => ({
    title: {
        minHeight: 50,
    },
    wallet: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        minHeight: 64,
    },
    moneyIcon: {
        width: 40,
        height: 40,
        marginTop: 'auto',
        marginBottom: 'auto',
        color: "#e6d933",
    },
    moneyText: {
        fontSize: 24,
        fontFamily: 'Roboto',
        margin: 'auto',
    },
    icon: {
        width: 40,
        height: 40,
    },
    chargeButton: {
        margin: 'auto',
    },
    chargeInput: {
        marginTop: 'auto',
        marginBottom: 'auto',
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0
        }
    }
});

class Wallet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chargeMoney: "",
        };
    }

    // TODO-9: charge money
    handleChargeMoney = () => {

    }

    render() {
        const { classes, money } = this.props;

        return (
            <div>
                <Typography className={classes.title} variant="h4">
                    {"Wallet"}
                </Typography>
                <Divider />
                <Paper className={classes.wallet} elevation={3}>
                    <Grid container justifyContent="space-around">
                        <Grid item container xs={5} wrap="nowrap">
                            <MonetizationOnIcon className={classes.moneyIcon} />
                            <span className={classes.moneyText}>{money}</span>
                        </Grid>
                        <Grid item container xs={5}>
                            {/* TODO-8: specify event handler to set chargeMoney */}
                            {/* hint: value, onChange... */}
                            <TextField
                                className={classes.chargeInput}
                                label="Charge"
                                variant="outlined"
                                size="small"
                                type="number"
                                fullWidth
                            />
                        </Grid>
                        <Grid item container xs={2}>
                            {/* TODO-9: specify button event handler */}
                            {/* hint: handleChargeMoney */}
                            <IconButton className={classes.chargeButton}>
                                <AddBoxOutlinedIcon className={classes.icon} color='primary' />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Wallet);