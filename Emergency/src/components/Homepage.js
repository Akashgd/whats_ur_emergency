import React from 'react';
import styled from 'styled-components';
import LocationTracker from './LocationTracker';
import backgroundImage from 'C:/Users/Asus/Desktop/Projects/911/Emergency/src/components/intro_bg.jpg' // Replace with your image path

const PageWrap = styled.div`
  min-height: 100vh;
  background-color: #1c1c1c;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  max-width: 1200px;
`;

const TextContent = styled.div`
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #ff7f00;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e56d00;
  }
`;

const ImageContent = styled.div`
  max-width: 400px;

  img {
    width: 100%;
    height: auto;
  }
`;

const HomePage = () => {
  const startEmergencyReport = () => {
    window.location.href = '/report-emergency';
  };

  return (
    <PageWrap>
      <Content>
        <TextContent>
          <Title>911 Emergency Response System</Title>
          <Subtitle>Our system will connect you with the nearest available responder.</Subtitle>
          <Subtitle>Your location will be collected</Subtitle>
          <LocationTracker/>
          <Button onClick={startEmergencyReport}>Call 911</Button>
        </TextContent>
        <ImageContent>
          <img src={backgroundImage} alt="Emergency Responders" />
        </ImageContent>
      </Content>
    </PageWrap>
  );
};

export default HomePage;
