
var peoples = [];
var page = 1;
var traerdatos = function(){};
var rendertabla = function(){};

var imagenes = [{codigo:0, url:"https://vignette.wikia.nocookie.net/es.starwars/images/2/20/LukeTLJ.jpg/revision/latest?cb=20171031044632"},
    {codigo:1, url:"https://pm1.narvii.com/6318/816eaf055607e8a92ec5cf9c89fca9247153e724_hq.jpg"},
    {codigo:2, url:"https://pm1.narvii.com/6318/816eaf055607e8a92ec5cf9c89fca9247153e724_hq.jpg"},
    {codigo:3, url:"https://vignette.wikia.nocookie.net/es.starwars/images/e/eb/ArtooTFA2-Fathead.png/revision/latest?cb=20150926172435"},
    {codigo:4, url:"http://www.figures.cz/detail/01/2388b-big.jpg"},
    {codigo:5, url:"https://lasdaoalplay.com/wp-content/uploads/2015/07/leia-princess-leia-organa-solo-skywalker-9301324-449-661.jpg"},
    {codigo:6, url:"https://blog.stylingandroid.com/wp-content/themes/lontano-pro/images/no-image-slide.png"},
    {codigo:7, url:"https://blog.stylingandroid.com/wp-content/themes/lontano-pro/images/no-image-slide.png"},
    {codigo:8, url:"https://blog.stylingandroid.com/wp-content/themes/lontano-pro/images/no-image-slide.png"},
    {codigo:9, url:"https://blog.stylingandroid.com/wp-content/themes/lontano-pro/images/no-image-slide.png"},
];

$(function(){//Ready

    traerdatos("https://swapi.co/api/people/?page=",page);

    $("#btnatras").on('click',function(){
        page--;
        traerdatos("https://swapi.co/api/people/?page=",page);
    });
    $("#btnsiguiente").on('click',function(){
        page++;
        traerdatos("https://swapi.co/api/people/?page=",page);
    });
});  
traerdatos = function(url, page){
    $.ajax({
        type: "GET",
        url: url+page,
        dataType: "json"
    }).done(function(data){
        console.log(data);
        rendertabla(data.results);
    }).fail(function(){

    }).always(function(){

    });
}
 rendertabla = function(datos){
    peoples = datos;
    var tablapeople = $("#tablepeople");
    tablapeople.empty();
    $.each(peoples,function(index,people){
        var trp="<tr><td>"+index+"</td><td>"+people.name+"</td><td><button data-name='"+people.name+"' data-codigo='"+index+"' class='botonver'>Ver ficha</button></td></tr>";;
        tablapeople.append(trp);
    });
    $(".botonver").on('click',function(){
        var cod=$(this).data('codigo');
        console.log($(this).data('name'));
        var imgreturn = $.grep(imagenes, function(img,index){
            return img.codigo==cod;
        });
        $("#imgpeople").attr('src',imgreturn[0].url);
        console.log(imgreturn);

    });
}