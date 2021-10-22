import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    typhographyStyles: {
        padding: "1rem",
    }
}));

const Header = () => {
    const classes = useStyles();
    return <AppBar position="static">
        <Toolbar>
            <BlurOnIcon/>
            <Typography className={classes.typhographyStyles}>MediaPipe FaceMesh Demo</Typography>
        </Toolbar>
    </AppBar>;
};

export default Header;