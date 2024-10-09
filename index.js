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
                    var pokemonId = pokemon.url.split("/")[6];
                    var template = `
                    <div class="row">

                        <div class="col-sm-4">
                            <div class="pokemon-card green-background">
                            <img src="${pokemon.id}" alt="Bulbasaur"
                            class="pokemon-image">
                            <h5>#0001 - ${pokemon.name}</h5>
                            </div>
                        </div>
                    </div>`;
                    $(".pokemon-grid").append(template);
                });
            }, 1000);
        });
    }
});
