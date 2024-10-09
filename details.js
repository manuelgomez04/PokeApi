$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var pokemonId = urlParams.get("pid");

    if (pokemonId == null) {
        alert("No se ha recibido el ID de pokemon");
        return;
    }

    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
        method: "GET",
    }).done(function (pokemon) {
        var template = `
            <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
            <div class="card-body">
                <h5 class="card-title">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
                <p class="card-text">ID: #${String(pokemon.id).padStart(4, '0')}</p>
                <p class="card-text">Height: ${pokemon.height}</p>
                <p class="card-text">Weight: ${pokemon.weight}</p>
                <p class="card-text text-start">${pokemon.description}</p>
            </div>`;

        $("#details").html(template);
    }).fail(function () {
        alert("Error al obtener los detalles del Pokémon");
    });
});