import React from 'react';
import Header from './Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import reactFoto from './react.png';
import nodeFoto from './node.jpg';
import fullstackFoto from './fullstack.png';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160
  },
});

function LinkExample(props) {
  const { links } = props;
  return (
    <Grid >
              {links.map((link) => (
        <Link display="block" variant="body1" href={link.url} key={link.title}>
          {link.title}
        </Link>
      ))}
      </Grid>
  );
}


function  Post(props) {
  const classes = useStyles();
  const { course, links } = props;

  return (
    <Grid item xs={12} md={6}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {course.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {course.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {course.description}
              </Typography>
              <LinkExample links={links}/>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={course.image} title={course.imageTitle} />
          </Hidden>
        </Card>
    </Grid>
  );
}

const courses = [
  {
    title: 'React Programming (JAMK)',
    date: '2021',
    description:
      'Basics of React. Loading and parsing JSON. Routing. Redux. Firebase.',
    image: reactFoto,
    imageText: 'React',
    links: [
      {
        url: 'https://github.com/ansakhar',
    title: 'Exercise 1'
    }, 
    {
      url: 'https://www.linkedin.com/in/anna-sakharovskaya',
      title: 'Exercise 2'
    },
    {
      url: 'https://www.linkedin.com/in/anna-sakharovskaya',
      title: 'Exercise 3'
    },
    {
      url: 'https://www.linkedin.com/in/anna-sakharovskaya',
      title: 'Exercise 4'
    }
    ],
  },
  {
    title: 'Data modelling and Back-end development (JAMK)',
    date: '2021',
    description:
      'Node.js. Express. MongoDB. REST.',
    image: nodeFoto,
    imageText: 'Node.js',
    links: [
      {
        url: 'https://github.com/ansakhar',
    title: 'Exercise Node 1'
    }, 
    {
      url: 'https://www.linkedin.com/in/anna-sakharovskaya',
      title: 'Exercise Node 2'
    }
    ],
  },
  {
    title: 'Full Stack open (University of Helsinki)',
    date: '2020-2021',
    description:
      'ReactJS, Node.js. Express. MongoDB. REST. Heroku. Cypress.',
    image: fullstackFoto,
    imageText: 'FullStackOpen',
    links: [
      {
        url: 'https://github.com/ansakhar',
    title: 'Exercise Node 1'
    }, 
    {
      url: 'https://www.linkedin.com/in/anna-sakharovskaya',
      title: 'Exercise Node 2'
    }
    ],
  },
];

export default function  Portfolio() {

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="" />
<Grid container spacing={4}>
            {courses.map((course) => (
              <Post key={course.title} course={course} links={course.links} />
            ))}
          </Grid>
          </Container>
    </React.Fragment>
  )
            }

Portfolio.propTypes = {
  course: PropTypes.object,
};