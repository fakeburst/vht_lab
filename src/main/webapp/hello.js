/*
 * http://stackoverflow.com/questions/18260815/use-gapi-client-javascript-to-execute-my-custom-google-api
 * https://developers.google.com/appengine/docs/java/endpoints/consume_js
 * https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientload
 *
 */

/**
 * After the client library has loaded, this init() function is called.
 * The init() function loads the helloworldendpoints API.
 */
var search = false;
var login = false;
var user_login;
function init() {
	
	// You need to pass the root path when you load your API
	// otherwise calls to execute the API run into a problem
	
	// rootpath will evaulate to either of these, depending on where the app is running:
	// //localhost:8080/_ah/api
	// //your-app-id/_ah/api

	var rootpath = "//" + window.location.host + "/_ah/api";
	
	// Load the helloworldendpoints API
	// If loading completes successfully, call loadCallback function
	gapi.client.load('helloworldendpoints', 'v1', loadCallback, rootpath);
}

/*
 * When helloworldendpoints API has loaded, this callback is called.
 * 
 * We need to wait until the helloworldendpoints API has loaded to
 * enable the actions for the buttons in index.html,
 * because the buttons call functions in the helloworldendpoints API
 */
function loadCallback () {	
	// Enable the button actions
    //enableButtons();
	alert("Ready");
}

function recommend()
{
    var request = gapi.client.helloworldendpoints.getAnime({"user":user_login});
	request.execute(getAnimeCallback);
}

function recommendCallback(response)
{
    var elem = document.getElementById("recommend");
    elem.innerHTML = "";
    for(var i = 0; i < response.length; i++)
        {
            elem.innerHTML+= response[i] + "\n"
        }
}

function addFromQuest()
{
    search = true;
    addAnime();
}

function getAnimes(){
    var string = document.getElementById("title").value;
    search = true;
    getAnime(string);
}

function getAnime(string)
{
    var request = gapi.client.helloworldendpoints.getAnime({"anime":string});
	request.execute(getAnimeCallback);
}
    
function getAnimeCallback(response)
{
    if(search)
    {
        anime = JSON.parse(response.result.message);
        var elem = document.getElementById("animes");
        elem.innerHTML = "";
        for(var i = 0; i < anime.length; ++i)
            {
                elem.innerHTML += "<option>" + anime[i].title + "</option>";   
            }
        search = false;
        return;
    }
    //console.log(response);
    anime = JSON.parse(response.result.message)[0];
    console.log(anime);
    //console.log(response.result.message);

    parent.innerHTML = "<h1 id=\"anime_title\">" + anime.title + "</h1>";
    children.innerHTML = "<div class=\"cell answers\"><img src=\"" + anime.cover_image + "\"</div>";
    children.innerHTML += "<div class=\"cell colspan4 answers\">" + anime.synopsis + "</div>";
    children.innerHTML += "<div class=\"cell answers\"><div class=\"input-control text\" style=\"width:100%\"><input type=\"number\" id=\"rating\" min=\"1\" max=\"10\"></div><button class=\"button color-quest\" onclick=\"addFromQuest\">Add to list</button></div>";
}

function register()
{
    var res = [document.getElementById("user_login").value,document.getElementById("user_password").value];
    if(document.getElementById("login_hummingbird").value!=null)
        res[2] = document.getElementById("login_hummingbird").value;
    var request = gapi.client.helloworldendpoints.register({"values":res});
    request.execute(registerCallback);
}

function registerCallback(response)
{
    var elem = document.getElementById("center");
    elem.innerHTML = "<div class=\"input-control text full-text\" style=\"width:100%\" data-role=\"input\"><input type=\"text\" id=\"title\"><button class=\"button\" onclick=\"getAnimes()\"><span class=\"mif-search\"></span></button></div><div class=\"input-control select\" style=\"width:84%\"><select id=\"animes\"></select></div><div class=\"input-control text\" style=\"width:15%\"><input type=\"number\" id=\"rating\" min=\"1\" max=\"10\"></div><button class=\"button success color-register\" onclick=\"addAnime\">Add to list</button><a href=\"index.html\" class=\"button success color-register\">Return</a>";
}

function addAnime()
{
    if(search)
    {
        var animeTitle = document.getElementById("anime_title").innerHTML;
        var rating = document.getElementById("rating").value;
        var request = gapi.client.helloworldendpoints.register({"anime":animeTitle, "rating":rating});
        search = false;
        request.execute(addAnimeCallback);

    } else {
    var animes = document.getElementById("animes")
    var animeTitle = animes.options[animes.selectedIndex].text;
    var rating = document.getElementById("rating").value;
    var request = gapi.client.helloworldendpoints.register({"anime":animeTitle, "rating":rating});
    request.execute(addAnimeCallback);
    }
}

function addAnimeCallback(response)
{
    var request = gapi.client.helloworldendpoints.register({"login":animeTitle, "password":rating});
    request.execute(addAnimeCallback);
}

function login()
{
    var res = [document.getElementById("user_login").value,document.getElementById("user_password").value];
    var request = gapi.client.helloworldendpoints.register({"login":res[0], "password":res[1]});
    request.execute(loginCallback);
}

function loginCallback(response)
{
    user_login = response;
}

function enableButtons () {
	// Set the onclick action for the first button
	btn = document.getElementById("input_greet_generically");
	btn.onclick= function(){greetGenerically();};
	
	// Update the button label now that the button is active
	btn.value="Click me for a generic greeting";
	
	// Set the onclick action for the second button
	btn = document.getElementById("input_greet_by_name");
	btn.onclick=function(){greetByName();};
	
	// Update the button label now that the button is active
	btn.value="Click me for a personal greeting";
	
	btn = document.getElementById("input_greet_by_period");
	btn.onclick=function(){greetByPeriod();};
	
	// Update the button label now that the button is active
	btn.value="Click me for a period greet";
	
	btn = document.getElementById("getCat");
	btn.onclick=function(){getCat();};
	
	// Update the button label now that the button is active
	btn.value="GIMME A CAT!";
}




