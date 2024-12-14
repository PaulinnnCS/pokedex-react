import getData from './getData';


// retorna a lista das url de solicitacao de cada pokemon
async function getPokemonUrlList(urlList) {
    const dataPokemonList = (await getData(urlList)).results;
    return dataPokemonList.map(item => item.url)
}

// estrutura os stats em uma lista de objetos contendo {name, value}
function buildStats(dataStats) {
    return dataStats.map((item) => {
        const statName = {
            hp: 'hp',
            attack: 'atk',
            defense: 'def',
            'special-attack': 'sp.atk',
            'special-defense': 'sp.def',
            speed: 'spe'
        }

        return {
            stat: statName[item.stat.name] || item.stat.name,
            value: item.base_stat
        }
    })
}

// retorna uma lista com todos os pokemons e suas informacoes
export async function createPokemonBlockList(urlPokemonLimit, pokemonBlock) {
    const urlPokemonList = await getPokemonUrlList(urlPokemonLimit);
    const pokemonBlockList = {...pokemonBlock};

    for(const url of urlPokemonList) {
        const id = url.match(/\/(\d+)\//)[1];
        if(pokemonBlockList && !pokemonBlockList[id]) {
            const pokemon = await createPokemonBlock(url);
            pokemonBlockList[pokemon.id] = pokemon;
        }   
    }  

    return pokemonBlockList;
}

export async function createPokemonBlock(urlPokemon) {
    const dataPokemon = await getData(urlPokemon);

    const name = ((dataPokemon.name === 'nidoran-f') || (dataPokemon.name === 'nidoran-m')) ? 'nidoran' : dataPokemon.name.replace("-","");

    const pokemon = {
        abilities: dataPokemon.abilities.map((item) => item.ability.name),
        types: dataPokemon.types.map((item) => item.type.name),
        artWork: dataPokemon.sprites.other['official-artwork'].front_default,
        artWorkShiny: dataPokemon.sprites.other['official-artwork'].front_shiny,
        sprite: dataPokemon.sprites.versions['generation-viii'].icons.front_default,
        height: dataPokemon.height,
        weight: dataPokemon.weight,
        id: dataPokemon.id,
        name: name,
        speciesUrl: dataPokemon.species.url,
        stats: buildStats(dataPokemon.stats),
    }

    return pokemon
}

