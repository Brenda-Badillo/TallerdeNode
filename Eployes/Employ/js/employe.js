window.onload = init
var headers = {};
var url = "http://localhost/3000"
function init(){
    if(localStorage.getItem("token")){
        headers = {
            'Authorization': "bearer" + localStorage.getItem("token")
        }
        loadPokemon();
    } else {
        window.location.href = "index.html";
    }
}

function loadPokemon(){
    axios.get(url + "/employe", headers)
    .then(function(res){
        console.log(res);
        displayEmploye(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function displayEmploye(employe){
    var body = document.querySelector("body");
    for(var i = 0; i < employe.length; i++){
        body.innerHTML += `<h3>${employe[i].name}</h3>`
    }
}