export async function getPokemonList() {
  const data = await fetch(
    "https://pokeapi.co/api/v2/ability/?limit=150&offset=0"
  ).then(res => res.json());
  return data.results;
}

export async function getPokemonDescription(id) {
  const pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  ).then(res => res.json());
  return pokemon.flavor_text_entries[0].flavor_text;
}

export function getPokemonSpriteUrl(id) {
  const realId = 200 + parseInt(id, 10);
  return `https://picsum.photos/${realId}`;
}
