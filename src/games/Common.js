import React from 'react';
import styled from 'styled-components';

export const Tile = styled.div`
  background: url(${props => props.img});
  background-color: #3412ae;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  cursor: pointer;
  height: 100px;
  width: 100px;
  margin: 10px;
`;

export const Row = styled.div`
  display: flex;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ToolbarWrapper = styled.div`
  background-color: #3412ae;
  display: flex;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  width: 300px;
`;

const Moves = styled.div`
  color: white;
  flex: 1;
  padding: 10px;
`;

export const Toolbar = ({ tries, reset }) => (
  <ToolbarWrapper>
    <Moves>Moves: {tries}</Moves>
    <button style={{ flex: 1 }} onClick={reset}>
      Reset
    </button>
  </ToolbarWrapper>
);
