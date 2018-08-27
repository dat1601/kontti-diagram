import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: 1000,
    background: '#00ACC1',
    '&:hover': {
      backgroundColor: 'rgb(27, 166, 210)',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: 'rgba(27, 166, 210, 1.2)',
      borderColor: '#005cbf',
    },
  },
});

function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="fab" className={classes.button} classes={classes.fab} onClick={props.onClick}>
        <div>
          {props.children}
        </div>
      </Button>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);
