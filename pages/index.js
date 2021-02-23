  
import React from 'react';
import Head from 'next/head';

import Link from 'next/link';

export async function getStaticProps() {
  const pokemons = await fetch('https://pokeapi.co/api/v2/pokedex/2/')
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }

      throw new Error('Deu problema');
    })
    .then((respostaEmObjeto) => respostaEmObjeto.pokemon_entries);

  return {
    props: {
      pokemons,
    },
  };
}

export default function Home(props) {
  const { pokemons } = props;

  return (
    <div>
      <div>
        <Head>
          <link rel="icon" sizes="16x16" href="../static/favicon.ico" />
        </Head>
      </div>
      Pokédex
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/sobre">
            <a>Sobre o projeto</a>
          </Link>
        </li>
      </ul>

      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.entry_number}>
            <Link href={`/pokemon/${pokemon.entry_number}`}>
              <a>
                {pokemon.pokemon_species.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}