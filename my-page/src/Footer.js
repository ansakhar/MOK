import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function Copyright() {
    const classes = useStyles();
  return (
    <Typography className={classes.copyRight} variant="body2" color="textSecondary" align="center">
      {'Copyright © Anna Sakharovskaya'}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    //marginTop: theme.spacing(8),
    padding: theme.spacing(5, 0),
  },
  copyRight: {
    marginTop: theme.spacing(12),
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  //const { description, title, phone } = props;
  const { footer } = props;
  

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="subtitle1" align="center" gutterBottom>
        <footer.phoneIcon /> {footer.phone}
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
        <footer.emailIcon /> {footer.email}
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
        <footer.locationIcon /> {footer.location}
        </Typography>
        
        <Typography variant="subtitle2" align="center" color="textSecondary" component="p">
          {footer.description}
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  /*description: PropTypes.string,
  title: PropTypes.string,*/
  footer: PropTypes.object,
};