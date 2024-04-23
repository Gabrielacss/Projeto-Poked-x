
    document.addEventListener("DOMContentLoaded", function (event) {
        TodosOsPokemons();
    });
    
    function activateTab(tab_Selecionada){
        //Inicio da TAB
        let classesTAB = document.getElementsByClassName("nav-link");
        for (let index = 0; index < classesTAB.length; index++) {
            classesTAB[index].classList.remove("active");
            classesTAB[index].ariaSelected = "false";
        }

        let id_tab_selecionada = document.getElementById(tab_Selecionada.children[0].id);
        id_tab_selecionada.ariaSelected = "true";
        id_tab_selecionada.classList.add("active");
        //Termino da TAB

        //Inicio do Conteudo da TAB
        let classesConteudoTAB = document.getElementsByClassName("tab-pane");
        for (let index = 0; index < classesConteudoTAB.length; index++) {
            classesConteudoTAB[index].classList.remove("show");
            classesConteudoTAB[index].classList.remove("active");
        }

        let conteudosDaTab = document.querySelector("#ex1-content");

        for (let index = 0; index < conteudosDaTab.children.length; index++) {
            var ID_Conteudo_TAB = conteudosDaTab.children[index].getAttribute("aria-labelledby");
            if(ID_Conteudo_TAB == tab_Selecionada.children[0].id){
                conteudosDaTab.children[index].classList.add("show");
                conteudosDaTab.children[index].classList.add("active");
                
            };
        }

        //Termino do Conteudo da TAB
    }

    function filtro(filtro){
        if (filtro === "Nome") {
            $('#campoPesquisa').attr('placeholder', 'Nome do Pokémon');
            // $("#campoPesquisa").on('keyup.somenteLetra', function () {
            //     this.value = this.value.replace(/[0-9]*/g, '');
            // });
            $("#parametroConsulta").attr("maxlength", 45);
        }else if (filtro === "ID") {
            $('#campoPesquisa').attr('placeholder', 'ID do Pokémon');
            // $("#campoPesquisa").on('keyup.somenteLetra', function () {
            //     this.value = this.value.replace(/[a-zA-Z]*/g, '');
            // });
        } else if (filtro === "Tipo") {
            $('#campoPesquisa').attr('placeholder', 'Tipo do Pokémon');
        } else if (filtro === "Especie") {
            $('#campoPesquisa').attr('placeholder', 'Especie do Pokémon');
        } 
        // else if(filtro === "Todos"){
        //     $('#text_search').text(filtro);
        //     pesquisar();
        // }

        $('#text_search').text(filtro);
    }

    function TodosOsPokemons(){
        const div = document.getElementById("resultado");
        let imagensElementosPokemon = "";
        div.innerHTML = "";
        $(".card-type").hide();

        $.ajax({
          "url": "https://pokeapi.co/api/v2/pokemon/?limit=250",
          "method": "GET",
          success: function(data) {
            for (let index = 0; index < data.results.length; index++) {
                $.ajax({
                    "url": data.results[index].url,
                    "method": "GET",
                    success:function(data) {
                        let imagensElementosPokemon = "";
                        for (let index = 0; index < data.types.length; index++) {
                            let nomeElementoPokemon = data.types[index].type.name;
                            imagensElementosPokemon += "<div><img class='typeImage' src='image/typesPokemon/"+ nomeElementoPokemon +".png'></div>";
                        }
                        
                        div.innerHTML += "<div class='col-lg-3 fundo-card' id='modal_"+data.id+"' onclick='openModal("+data.id+")'> <div class='text-center'><h1>"+data.name.toUpperCase()+"<h1></div> <div class='text-center'> "+ 
                                "<img src='"+ data.sprites.front_default +"' width='130' height='130'> "+
                            "</div><div><hr/></div> <div><div><span class='subtitles'>Id: </span>"+data.id+"<span></span></div><div class='tiposPokemon'><span class='subtitles' style='margin-right: 10px;'>Tipo: </span>"+imagensElementosPokemon+"</div><div><span class='subtitles'>Altura: </span><span>"+data.height / 10+" m</span></div><div><span class='subtitles'>Peso: </span><span>"+data.weight / 10+" Kg</span></div></div> </div>";
                    
                    }
                })
            }
            }
        });
    }

    function pesquisar(){

        const div = document.getElementById("resultado");
        var pesquisa = $("#campoPesquisa").val();
        var tipoPesquisa = $("#text_search").text();
        var divsMontadas = "";
        let imagensElementosPokemon = "";

        div.innerHTML = "";
        if(tipoPesquisa === "ID" || tipoPesquisa === "Nome"){

            $(".card-type").hide();
            
            $.ajax({
                "url": "https://pokeapi.co/api/v2/pokemon/"+ pesquisa.toLowerCase() +"/",
                "method": "GET"
                })
                .done(function (data) {
                    let imagensElementosPokemon = "";
                    for (let index = 0; index < data.types.length; index++) {
                        let nomeElementoPokemon = data.types[index].type.name;
                        imagensElementosPokemon += "<div><img class='typeImage' src='image/typesPokemon/"+ nomeElementoPokemon +".png'></div>";
                    }
                    div.innerHTML += "<div class='col-lg-3 fundo-card' id='modal_"+data.id+"' onclick='openModal("+data.id+")'> <div class='text-center'><h1>"+data.name.toUpperCase()+"<h1></div> <div class='text-center'> "+ 
                                "<img src='"+ data.sprites.front_default +"' width='130' height='130'> "+
                            "</div><div><hr/></div> <div><div><span class='subtitles'>Id: </span>"+data.id+"<span></span></div><div class='tiposPokemon'><span class='subtitles' style='margin-right: 10px;'>Tipo: </span>"+imagensElementosPokemon+"</div><div><span class='subtitles'>Altura: </span><span>"+data.height / 10+" m</span></div><div><span class='subtitles'>Peso: </span><span>"+data.weight / 10+" Kg</span></div></div> </div>";
                
            });

        }else if(tipoPesquisa === "Tipo" ){

            var nomeTipo = "";
            $.ajax({
                "url": "https://pokeapi.co/api/v2/type/"+ pesquisa.toLowerCase() +"/",
                "method": "GET",
                success: function(data) {
                    nomeTipo = data.name;

                    for (let index = 0; index < data.pokemon.length; index++) {
                        $.ajax({
                            "url": data.pokemon[index].pokemon.url,
                            "method": "GET",
                            success:function(data) {
                                let imagensElementosPokemon = "";
                                for (let index = 0; index < data.types.length; index++) {
                                    let nomeElementoPokemon = data.types[index].type.name;
                                    imagensElementosPokemon += "<div><img class='typeImage' src='image/typesPokemon/"+ nomeElementoPokemon +".png'></div>";
                                }
                                div.innerHTML += "<div class='col-lg-3 fundo-card' id='modal_"+data.id+"' onclick='openModal("+data.id+")'> <div class='text-center'><h1>"+data.name.toUpperCase()+"<h1></div> <div class='text-center'> "+ 
                                    "<img src='"+ data.sprites.front_default +"' width='130' height='130'> "+
                                    "</div><div><hr/></div> <div><div><span class='subtitles'>Id: </span>"+data.id+"<span></span></div><div class='tiposPokemon'><span class='subtitles' style='margin-right: 10px;'>Tipo: </span>"+imagensElementosPokemon+"</div><div><span class='subtitles'>Altura: </span><span>"+data.height / 10+" m</span></div><div><span class='subtitles'>Peso: </span><span>"+data.weight / 10+" Kg</span></div></div> </div>";
                            
                            }
                        })
                    }

                    $(".type_specie").text("Type: ");
                    $("#typeSpecie").text(nomeTipo.toUpperCase());
                    $(".card-type").show();

                }
            })
        }
        else{

            var nomeTipo = "";
            $.ajax({
                "url": "https://pokeapi.co/api/v2/pokemon-species/"+ pesquisa.toLowerCase() +"/",
                "method": "GET",
                success: function(data) {
                    nomeTipo = data.name;

                    for (let index = 0; index < data.varieties.length; index++) {
                        $.ajax({
                            "url": data.varieties[index].pokemon.url,
                            "method": "GET",
                            success:function(data) {
                                let imagensElementosPokemon = "";
                                for (let index = 0; index < data.types.length; index++) {
                                    let nomeElementoPokemon = data.types[index].type.name;
                                    imagensElementosPokemon += "<div><img class='typeImage' src='image/typesPokemon/"+ nomeElementoPokemon +".png'></div>";
                                }
                                div.innerHTML += "<div class='col-lg-3 fundo-card' id='modal_"+data.id+"' onclick='openModal("+data.id+")'> <div class='text-center'><h1>"+data.name.toUpperCase()+"<h1></div> <div class='text-center'> "+ 
                                                "<img src='"+ data.sprites.front_default +"' width='130' height='130'> "+
                                            "</div><div><hr/></div> <div><div><span class='subtitles'>Id: </span>"+data.id+"<span></span></div><div class='tiposPokemon'><span class='subtitles' style='margin-right: 10px;'>Tipo: </span>"+imagensElementosPokemon+"</div><div><span class='subtitles'>Altura: </span><span>"+data.height / 10+" m</span></div><div><span class='subtitles'>Peso: </span><span>"+data.weight / 10+" Kg</span></div></div> </div>";
                            }
                        })
                    }

                    $(".type_specie").text("Specie: ");
                    $("#typeSpecie").text(nomeTipo.toUpperCase());
                    $(".card-type").show();

                }
            })
        }
    }
    
    function openModal(id){

        // document.getElementById("ex1-tabs    -2").innerHTML
        document.getElementById("ex1-tabs-1").innerHTML = "";
        document.getElementById("tab-4").innerHTML = "";

        $.ajax({
        "url": "https://pokeapi.co/api/v2/pokemon/"+ id +"/",
        "method": "GET"
        })
        .done(function (data) {
            $("#modalLabel").text(data.name.toUpperCase());
            
            //Começo TAB 1
            for (let index = 0; index < data.abilities.length; index++) {
                $.ajax({
                    "url": data.abilities[index].ability.url,
                    "method": "GET",
                    success: function(data) {

                        for (let index = 0; index < data.effect_entries.length; index++) {
                            if(data.effect_entries[index].language.name === "en"){
                                effectAbility = data.effect_entries[index].effect
                            }
                        }

                        document.getElementById("ex1-tabs-1").innerHTML += "<div class='col-lg-12'> "+
                                                                                "<div class='text-left'><h3>"+data.name.toUpperCase()+" (Ability)<h3></div> "+
                                                                                "<div class='text-left'><h4>Effect</h4></div> "+
                                                                                "<div class='text-left'><p>"+effectAbility+"</p></div> "+
                                                                                "<div><hr/></div> <div></div> "+
                                                                            "</div>";
                            
                    }
                });
                
            }
            //Termino TAB 1

            //Começo TAB 2
            document.getElementById("ex1-tabs-2").innerHTML = "<div class='col-lg-6'><div><div class=''> <h3>Padrão</h3>  </div> <div><img src='"+ data.sprites.front_default +"' width='130' height='130'><img src='"+ data.sprites.back_default +"' width='130' height='130'></div> <div class=''><h3>Shiny</h3></div> <div> <img src='"+ data.sprites.front_shiny +"' width='130' height='130'><img src='"+ data.sprites.back_shiny +"' width='130' height='130'></div></div></div>";
            //Termino TAB 2

            //Começo TAB 3
            var id_pokemon = data.id;
            listaPokemonsEvolucao = [];
            listaImagens = [];
            listaLevels = [];
            document.getElementById("evolucoes").innerHTML = "";
            $.ajax({
                "url": "https://pokeapi.co/api/v2/pokemon-species/"+data.id+"/",
                "method": "GET",
                success: function(data) {
                    // console.log(data)
                    $.ajax({
                        "url": data.evolution_chain.url,
                        "method": "GET",
                        success: function(data) {

                            if(data.chain.evolves_to.length != 0){
                                
                                document.getElementById("tab-3").innerHTML = "";

                                let primeiroPokemon = data.chain.species.name;

                                $.ajax({
                                    "url": data.chain.species.url,
                                    "method": "GET",
                                    success: function(data) {
                                        $.ajax({
                                            "url": data.evolution_chain.url,
                                            "method": "GET",
                                            success: function(data) {
                                                listaPokemonsEvolucao.push(primeiroPokemon);
                                                
                                                for (let index = 0; index < data.chain.evolves_to.length; index++) {
                                                    if(data.chain.evolves_to.length != 0){
                                                        
                                                        let nomePokemon = data.chain.evolves_to[index].species.name;
                                                        listaPokemonsEvolucao.push(nomePokemon);
                                                        
                                                        for (let index1 = 0; index1 < data.chain.evolves_to[index].evolution_details.length; index1++) {
                                                            if(data.chain.evolves_to[index].evolution_details[index1].min_level != null){
                                                                let lvlPokemon = data.chain.evolves_to[index].evolution_details[index1].min_level;
                                                                listaLevels.push(lvlPokemon)
                                                            }
                                                        }

                                                        
                                                    }

                                                    if(data.chain.evolves_to[index].evolves_to.length != 0){
                                                        let nomePokemon = data.chain.evolves_to[index].evolves_to[index].species.name;
                                                        listaPokemonsEvolucao.push(nomePokemon);

                                                        for (let index1 = 0; index1 < data.chain.evolves_to[index].evolution_details.length; index1++) {
                                                            if(data.chain.evolves_to[index].evolution_details[index1].min_level != null){
                                                                let lvlPokemon = data.chain.evolves_to[index].evolves_to[index].evolution_details[index1].min_level;
                                                                listaLevels.push(lvlPokemon)
                                                            }
                                                        }

                                                    }
                                                }

                                                console.log(listaPokemonsEvolucao)
                                                console.log(listaLevels)

                                                for (let index = 0; index < listaPokemonsEvolucao.length; index++) {
                                                    $.ajax({
                                                        "url": "https://pokeapi.co/api/v2/pokemon/"+ listaPokemonsEvolucao[index] +"/",
                                                        "method": "GET",
                                                        success: function(data) {
                                                            document.getElementById("evolucoes").innerHTML += "<div class='primeira_evolucao'> "+
                                                                                                    "<img id='' src="+data.sprites.front_default+" alt=''> "+
                                                                                                "</div>";
                                                        }
                                                    });
                                                }

                                                console.log(listaImagens)

                                                

                                                
                                            }
                                            
                                        });            
                                        for (let index = 0; index < listaImagens.length; index++) {
                                            
                                        }                                      
                                    }
                                });

                            }else{
                                document.getElementById("tab-3").innerHTML = "Não possuí evolução";
                            }
                        }
                    });
                }
            });

            //Termino TAB 3

            //Começo TAB 4
            for (let index = 0; index < data.game_indices.length; index++) {
                document.getElementById("tab-4").innerHTML += "<div class='col-lg-6'><div>"+data.game_indices[index].version.name+"</div><div><hr></div></div>";
            }
            //Termino TAB 4

            $("#ModalPokemon").modal('show');   
        });
    }