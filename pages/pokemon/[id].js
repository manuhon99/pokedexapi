import React from 'react';
import PropTypes from 'prop-types';

export default function Pokemon({ pokemon }) {
  return (
    <div>
      <h1>
        {pokemon.name}
      </h1>
      <img src={pokemon.sprites.front_default} alt="Imagem de um pokémon" />
    </div>
  );
}

Pokemon.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string,
    sprites: PropTypes.shape({
      front_default: PropTypes.string,
    }),
  }).isRequired,
};

export async function getStaticProps({ params }) {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}/?limit=20&offset=20`)
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }
      const pokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)

    })
    .then((respostaEmObjeto) => respostaEmObjeto);

  return {
    props: {
      pokemon,
    },
  };
}

export async function getStaticPaths() {
    const pokemons = await fetch('https://pokeapi.co/api/v2/pokedex/3/')
      .then((respostaDoServer) => {
        if(respostaDoServer.ok) {
          return respostaDoServer.json();
        }
      })
      .then((respostaEmObjeto) => {
        return respostaEmObjeto.pokemon_entries;
      })
    return {
    paths: pokemons.map((pokemon) => ({
      params:{
        id:pokemon.entry_number.toString(),
      }
    })),
    fallback:false,
   }
  }