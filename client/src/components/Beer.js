import React from 'react';
import styled from 'styled-components';

const Beer = ({ beer, index }) => (
  <BeerWrapper>
    <ImageContainer>
      <img src="beer.png" width="100%" />
    </ImageContainer>
    <DataWrapper>
      <TitleWrapper>Kalja {index + 1}</TitleWrapper>
      <Row
        name="lämpötila"
        value={beer.currentTemp}
        unit="°C"
      />
      <Row
        name="aikaa kulunut"
        value={beer.timeElapsed}
        unit=" min"
      />
      <Row
        name="aikaa jäljellä"
        value={beer.timeLeft}
        unit=" min"
      />
      <Row
        name="valmistumisaika"
        value={parseTime(beer.estimatedFinishTime)}
      />
    </DataWrapper>
  </BeerWrapper>
);

const Row = ({ name, value, unit }) => (
  <RowWrapper>
    <RowNameWrapper>{name}</RowNameWrapper>
    {value}
    {unit}
  </RowWrapper>
);

const parseTime = date => date.substring(11, 16);

const BeerWrapper = styled.div`
  padding: 10px;
  margin: 16px;
  background-color: #f5f5f6;
  max-height: 223px;
  width: 400px;
  @media(max-width: 768px) {
    width: 100vw;
  }
  display: inline-flex;
`;

const ImageContainer = styled.div`
  display: inline-block;
  width: 30%;
`;

const DataWrapper = styled.div`
  width: 70%;
`;

const TitleWrapper = styled.div`
  font-size: 2em;
  font-weight: 600;
  text-align: center;
  padding-bottom: 6px;
`;

const RowWrapper = styled.div`
  display: inline-flex;
  padding: 3px 0;
`;

const RowNameWrapper = styled.div`
  width: 140px;
  text-align: right;
  font-weight: 700;
  padding: 0 6px;
`;


export default Beer;
