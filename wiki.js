function wiki (searchTerm){

 var url = "https://en.wikipedia.org/w/api.php"; 

var params = {
    action: "query",
    list: "search",
    srsearch: searchTerm,
    format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

info = fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
   
     $('#data').append(`<h1>${response.query.search[0].title}</h1>`)
     $('#data').append(response.query.search[0].snippet)
    return([`<h3 style="color:#0D1546;margin:0;padding:0;text-transform:capitalize">${searchTerm}</h3>`, response.query.search[0].snippet, response.query.search[1].snippet, response.query.search[2].snippet, response.query.search[3].snippet, response.query.search[4].snippet,response.query.search[0].timestamp, response.query.search[1].timestamp, response.query.search[2].timestamp, response.query.search[3].timestamp, response.query.search[4].timestamp
])
    })
    .catch(function(error){console.log(error);});

   return(info) 

}