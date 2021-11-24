import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getPokemonList,
  getPokemonDescription,
  getPokemonSpriteUrl,
} from "../api/utils";

const AppContainer = styled.div`
  margin: 50px auto;
  padding: 1rem;
  text-align: center;
  width: 500px;
  height: 800px;
  border: 1px solid grey;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Select = styled.select`
  padding: 1rem;
  height: 6%;
  border-radius: 8px;
  width: 100%;
  justify-content: flex-start;
`;

const Card = styled.div`
  height: 60%;
  padding: 1rem;
`;

const Image = styled.img`
  border-radius: 50%;
`;

const Buttons = styled.div`
  height: 7%;
  width: 100%;
  position: absolute;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const Button = styled.button`
  width: 100%;
  color: white;
  background-color: #9279a6;
  border: none;
`;

export const App = () => {
  const [currentPokemon, setCurrentPokemon] = useState(0);
  const [pokenmonList, setPokenmonList] = useState([]);
  const [currentPokemonDescription, setCurrentPokemonDescription] = useState(
    ""
  );

  useEffect(() => {
    const getData = async () => {
      const apiData = await getPokemonList();
      const pokemonDescription = await getPokemonDescription(
        currentPokemon + 1
      );

      setPokenmonList(apiData);
      setCurrentPokemonDescription(pokemonDescription);
      console.log(pokemonDescription);
    };
    getData();
  }, []);

  const pokemonOptions = pokenmonList.map((data, i) => {
    return (
      <option key={i} value={i}>
        {data.name}
      </option>
    );
  });

  const handlePrevClick = () => {
    if (currentPokemon > 0) {
      setCurrentPokemon(state => state - 1);
    } else {
      alert("It is already the first card");
    }
  };

  const handleNextClick = () => {
    console.log("current", currentPokemon);
    console.log("current", pokenmonList.length);

    if (currentPokemon < pokenmonList.length - 1) {
      setCurrentPokemon(state => {
        console.log(typeof state);
        return state + 1;
      });
    } else {
      alert("It is already the last card");
    }
  };

  return (
    pokenmonList.length > 0 && (
      <AppContainer>
        <Select
          value={currentPokemon}
          onChange={e => setCurrentPokemon(parseInt(e.target.value, 10))}
        >
          {pokemonOptions}
        </Select>
        <Card>
          <Image src={getPokemonSpriteUrl(currentPokemon + 1)}></Image>
          <h1>{pokenmonList[currentPokemon].name}</h1>
          <div>{currentPokemonDescription}</div>
        </Card>
        <Buttons>
          <>
            <Button onClick={handlePrevClick}>Prev</Button>
          </>
          <>
            <Button onClick={handleNextClick}>Next</Button>
          </>
        </Buttons>
      </AppContainer>
    )
  );
};
