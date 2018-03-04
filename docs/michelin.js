var request = require('request');
var cheerio = require('cheerio');

var pages = [];
var pages_restaurants = [];
var restaurants =[];
var promesses = [];
pages.push('https://restaurant.michelin.fr/restaurants-etoiles-france/');

request('https://restaurant.michelin.fr/restaurants-etoiles-france/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);

    $('div[class="panel-pane-inside"]').find('p > a').each(function (index, element) {
        pages.push($(element).attr('href'));
    })
    


    pages.forEach(function(element){
        request('element', function (error, response, html){
            $('div[class="field__items"]').find('div > a').each(function (index, element) {
                 pages_restaurants.push($(element).attr('href'));
            });
        })

    })        



    pages_restaurants.forEach(function(element){
    request(element, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);

        var x = $('div[class=poi_card-display-title]').text();
        x = x.replace(/ +(?= )/g,'');
        x = x.replace(/(\r\n|\n|\r)/gm,"");
                restaurants.push(x);
        console.log(restaurants);

    }
    })
    });    
  
}
});