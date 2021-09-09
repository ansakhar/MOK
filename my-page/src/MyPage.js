import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Header from './Header';
import MainPageContent from './MainPageContent';
import Footer from './Footer';
import foto from './dacha.jpeg'

const mainPageContent = {
  title: 'Anna Sakharovskaya',
  description:
    "Etsin harjoittelupaikka erityisesti web-kehitystehtävistä (React, Node.js).",
  image: foto,
  imgText: 'main image description',
  social1: 'GitHub',
  icon1:  GitHubIcon,
  social2: 'LinkedIn',
  icon2:  LinkedInIcon,

};

const footerData = {
  description: "",
  phone: '+358 45 225 3784',
  phoneIcon:  PhoneIcon,
  email: "anna.sakharovskaya@gmail.com",
  emailIcon: EmailIcon,
  location: 'Jyväskylä, Finland',
  locationIcon:  LocationOnIcon,
};

export default function MyPage() {

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="" />
        <main>
          <MainPageContent post={mainPageContent} />
        </main>
      </Container>
      <Footer footer={footerData} />
    </React.Fragment>
  );
}