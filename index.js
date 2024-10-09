$(document).ready(function () {
    getPokemonListV2();

    $(document).on("click", "#btn-get-data", function () {
        getPokemonListV2();
    });

    function getPokemonListV2() {
        $(".pokemon-grid").html("<img src='https://i0.wp.com/www.lanaldi.es/eu/wp-content/uploads/sites/6/2017/04/cargando-1.gif?fit=441%2C291'/>");
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon",
            method: "GET",
        }).done(function (resp) {
            setTimeout(function () {
                $(".pokemon-grid").html("");
                var listadoPomemon = resp.results;
                listadoPomemon.forEach(function (pokemon) {
                    var pokemonId1 = pokemon.url.split("/")[6];
                    var pokemonId = pokemon.url.split("/")[6].padStart(4, '0');
                    var pokemonName = capitalizeFirstLetter(pokemon.name);

                    var template = `
                        <section class="pokemon-grid">
                            <div class="pokemon-card">
                                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId1}.png" alt="${pokemonName}" />
                                <div class="card-body text-center">
                                    <h5>${pokemonId} - ${pokemonName}</h5>
                                </div>
                             </div>
                        </section>`;
                    $(".pokemon-grid").append(template);
                });
            }, 100);
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});