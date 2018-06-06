//Api TVMaze
//Instructor Carlos A. Molano
//@carlosms

var getshows = function(){};
var rendershows = function(){};
var findShows = function(){};
var renderShowsFind = function(){};
var temS= `<div class="col s3">
    <div class="card large hoverable">
      <div class="card-image">
        <img src="!imagen!">
        <span class="card-title">!name!</span>
      </div>
      <div class="card-content">
        !summary!
      </div>
      <div class="card-action">
      <a class="waves-effect waves-light btn-small"><i class="material-icons right">remove_red_eye</i>Ver mas</a>
      </div>
    </div>`;

$(function () {
    M.updateTextFields();
    getshows("http://api.tvmaze.com/shows?page=",1);
    $(".buscar").on('keypress',function(e){
        if(e.which==13){
            findShows($(this).val());
        }
    });
    $(document).ajaxStart(function(){
        $("#loader").css("display", "block");
    });
    $(document).ajaxComplete(function(){
        $("#loader").css("display", "none");
    });
});
//
findShows = function(search){
    $.ajax({
        type: "GET",
        url: "http://api.tvmaze.com/search/shows?q="+search,
        dataType: "json"
    }).done(function(data){
        renderShowsFind(data);
    });
}
//Funcion para hacer la petición de datos de las series
getshows = function(url,page){
    $.ajax({
        type: "GET",
        url: url+page,
        dataType: "json"
    }).done(function(data){
       rendershows(data);
    });
}
//Funcion para renderizar datos de las series
rendershows = function(data){
    var temS= `<div class="col s3">
    <div class="card large hoverable">
      <div class="card-image">
        <img src="!imagen!">
        <span class="card-title">!name!</span>
      </div>
      <div class="card-content">
        !summary!
      </div>
      <div class="card-action">
      <a class="waves-effect waves-light btn-small"><i class="material-icons right">remove_red_eye</i>Ver mas</a>
      </div>
    </div>`;
    var showsC = $("#shows");
   showsC.empty();
   $.each(data,function(index,item){
        //console.log(item.image.original);
        var temAux = temS.replace('!imagen!',item.image.original)
        .replace('!name!',item.name)
        .replace('!summary!',item.summary);
        showsC.append(temAux);
   });
}
renderShowsFind = function(data){
    
    var showsC = $("#shows");
   showsC.empty();
   $.each(data,function(index,item){
       
        //Verificamos la imagen->>
        var urlimg = "http://clustercreatic.com/media/filer_public_thumbnails/filer_public/92/75/92753dea-e135-452e-bd94-ee455aeb473b/innovacion.png__186x182_q85_crop_subsampling-2_upscale.png"
        if(item.show.image){
            urlimg = item.show.image.original;
        }
        var temAux = temS.replace('!imagen!',urlimg)
        .replace('!name!',item.show.name)
        .replace('!summary!',item.show.summary);
        showsC.append(temAux);
   });
}
function remTem(){

}