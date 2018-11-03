import React from 'react';
import styled from 'styled-components';

const Beer = ({ beer, index, onResetClick }) => (
  <BeerWrapper>
    <ImageContainer>
      <img src="beer.png" width="100%" />
    </ImageContainer>
    <DataWrapper>
      <TitleWrapper>Kalja {beer.id}</TitleWrapper>
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
      <ResetButton onClick={onResetClick}>
        <i className="fas fa-sync"/>
      </ResetButton>
    </DataWrapper>
  </BeerWrapper>
);

const Row = ({ name, value, unit }) => (
  <RowWrapper>
    <RowNameWrapper>
      {name}
    </RowNameWrapper>
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
  font-size: 1.5em;
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

const ResetButton = styled.div`
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;  
  background-color: #ee4f37;
  cursor: pointer;
  text-align: center;
  margin-left: auto;
  margin-right: 6px;
  margin-top: 10px;
`;

export default Beer;
