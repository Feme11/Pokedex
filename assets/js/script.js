$('#pokesearch').click(function() {
    //usar toUperCase!!! para mayúsculas
      const pokemonName       = $('#pokemon-name').val();
      const pokemonNameLower  = pokemonName.toLowerCase();
    
      $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonNameLower}`,
        datatype: 'json',
        success: function(results) {
          console.log(results);
        }
      })
      .done(response).fail(error);
      function response(data) {
        $('#pokemon-container').empty();
        var imagenFront__pokemon  = data.sprites.front_default;
        var nombre__pokemon       = data.name;
        var id__pokemon       = data.id;
        var peso__pokemon         = data.weight;
        var altura__pokemon       = data.height;
    
        $('#pokemon-container').append(`
        <img class="pakimon-imagen" width="30%" src="${imagenFront__pokemon}">
        <h3><strong>${nombre__pokemon}</strong></h3>
        <p><strong>Peso:</strong> ${peso__pokemon}</p>
        <p><strong>Altura:</strong>${altura__pokemon}</p>
        <p><strong>ID:</strong> ${id__pokemon}</p>
        `);
    
        $('#pokemon-container').append('<p><strong>Habilidades:</strong></p>')
    
        var habilidades__pokemon = data.abilities;
    
        for(var i = 0; i < habilidades__pokemon.length; i++) {
          habilidades__pokemon[i].label = habilidades__pokemon[i]['ability'].name;
          $('#pokemon-container').append('<p>' + habilidades__pokemon[i]['ability'].name + '</p>')
        }
    
        $('#pokemon-container').append('<p><strong>Tipo:</strong></p>')
        
        var tipo__pokemon = data.types;
    
        for(var i = 0; i < tipo__pokemon.length; i++) {
          tipo__pokemon[i].label = tipo__pokemon[i]['type'].name;
          $('#pokemon-container').append('<p>' + tipo__pokemon[i]['type'].name + '</p>')
        }
    
        $('#pokemon-container').append('<span class="graficos"></span>')
    
        var estad__pokemon = data.stats;
    
        for(var i = 0; i < estad__pokemon.length; i++) {
          estad__pokemon[i].label = estad__pokemon[i]['stat'].name;
          estad__pokemon[i].y     = estad__pokemon[i]['base_stat'];
         
        }
    
        var datos = {	 	
        theme:'light1',	 	width:700,
        height:400,
         animationEnabled: true,
         title: {
           // Base de estadistica
           text: "Stats Base"
         },
         // Eje Y, Valor
         axisY: {
           title: "Value",
           includeZero: false
         },
         // Eje X, Título de la base
         axisX: {
           title: "Stats"
         },
         // Grafica tipo columna
         data: [{
           type: "column",
           dataPoints: estad__pokemon
         }]	};
         
         
         $(".graficos").CanvasJSChart(datos);
    
        
    
    }
    
      function error() {
        alert('¡Ups, ha ocurrido un error!');
      }
    
    });
    
    
    
    