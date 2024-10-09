$(document).ready(function () {
    fetchPokemonData();

    $('#btn-get-data').click(function () {
        fetchPokemonData();
    });

    function fetchPokemonData() {
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon?limit=151',
            method: 'GET',
            success: function (response) {
                console.log('Fetched Pokémon list:', response.results);

                // Ordenar los Pokémon por su ID
                response.results.sort(function (a, b) {
                    var idA = parseInt(a.url.split('/').slice(-2, -1)[0]);
                    var idB = parseInt(b.url.split('/').slice(-2, -1)[0]);
                    return idA - idB;
                });

                displayPokemon(response.results);
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    function displayPokemon(pokemonList) {
        var dataContent = $('.pokemon-grid');
        dataContent.empty();

        var requests = pokemonList.map(function (pokemon) {
            return $.ajax({
                url: pokemon.url,
                method: 'GET'
            });
        });

        $.when.apply($, requests).done(function () {
            var responses = Array.prototype.slice.call(arguments);
            responses.forEach(function (response) {
                var pokemonData = response[0];
                var pokemonCard = `
                    <div class="pokemon-card" data-id="${pokemonData.id}">
                        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" class="pokemon-image">
                        <div class="pokemon-info">
                            <div class="pokemon-name">${capitalizeFirstLetter(pokemonData.name)}</div>
                            <div class="pokemon-number">#${pokemonData.id.toString().padStart(3, '0')}</div>
                        </div>
                        <div class="pokemon-types">
                            ${pokemonData.types.map(function (typeInfo) {
                                return '<span class="type-badge ' + typeInfo.type.name + '">' + capitalizeFirstLetter(typeInfo.type.name) + '</span>';
                            }).join('')}
                        </div>
                    </div>
                `;
                dataContent.append(pokemonCard);
            });
        }).fail(function (error) {
            console.error('Error fetching Pokémon data:', error);
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});