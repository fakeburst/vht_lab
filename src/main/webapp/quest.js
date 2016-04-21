var level = 0;
var jsonFull = JSON.parse("{\"name\":1,\"children\":[{\"name\":2,\"children\":[{\"name\":3,\"anime\":4},{\"name\":5,\"anime\":6},{\"name\":7,\"anime\":8},{\"name\":9,\"change\":{\"name\":10,\"children\":[{\"name\":11,\"anime\":12},{\"name\":13,\"anime\":14},{\"name\":15,\"anime\":16},{\"name\":17,\"change\":{\"name\":18,\"children\":[{\"name\":19,\"anime\":20},{\"name\":21,\"anime\":22},{\"name\":23,\"anime\":24},{\"name\":25,\"change\":{\"name\":26,\"children\":[{\"name\":27,\"anime\":28},{\"name\":29,\"anime\":30},{\"name\":31,\"anime\":32},{\"name\":33,\"change\":{\"name\":34,\"children\":[{\"name\":35,\"anime\":36},{\"name\":37,\"anime\":38},{\"name\":39,\"anime\":40},{\"name\":41,\"change\":1}]}}]}}]}}]}}]}]}");
var current = jsonFull;
var prev = [current];
var text = ["Start","Looking for your first anime?","Something epic like Avatar: The Last Airbender","Fullmetal Alchemist: Brotherhood","Space western (Firefly, Guardians of the Galaxy)","Cowboy Bebop","Crime drama mindgames with the Grim Reaper","Death Note","Seen these 3 already (or need something different)","Need a good laugh?","Popular action comedy (with drama, “feels”)","Angel Beats!","Popular romance comedy (evolves into drama)","Toradora!","Popular workplace comedy (no drama!)","The Devil is a Part-Timer!","Let’s stick to the action-adventure","Something dark and serious, then?","Psychological police in a cyberpunk setting","Psycho-Pass","Superpowers, X-Men style (Chinese Electric Batman)","Darker than Black","Time travel experiment thriller","Steins; Gate","Don’t overdo it","Want something typically Japanese?","Samurai are cool (even cooler with hip-hop music)","Samurai Champloo","I’VE HEARD THERE ARE SOME GIANT ROBOTS","TENGEN TOPPA GURREN LAGANN","I like the Ghibli movies, especially the spirit stuff","Mushishi","Something more Western, please","Fantasy action adventure?","Something gritty, edgy and with epic music","Attack on Titan","Arabian Nights road trip adventure, Avatar-style","Magi: The Labyrinth of Magic","Pirates of the Caribbean meets Diablo","Shingeki no Bahamut: Genesis","I want more!"];

function proceed(id)
{
    console.log(id);
    for(var i = 0; current.children.length; ++i)
        {
            if(current.children[i].name == id)
                {
                    prev[++level] = current;
                    current = current.children[i];
                    if(current.anime!=null){
                        var string = text[current.anime-1].replace(new RegExp(' ',''),'+');
                        getAnime(string);
                    }
                    else{
                        if(current.change!=null)
                            current = current.change;
                        console.log(current);
                        lol();
                    }
                    return;
                }
        }
}
        
function previous()
{
    current = prev[level--];
    lol();
}
    
function lol()
{
    parent = document.getElementById("parent");
    children = document.getElementById("children");
    children.innerHTML = "";
    parent.innerHTML = "<h1>" + text[current.name - 1] + "</h1>";
    for(var i = 0; i < current.children.length; ++i)
        {
            var child = current.children[i];
            children.innerHTML+= "<div class=\"cell answers color-quest\" onclick=\"proceed(this.id)\" id=\"" + child.name +"\"><h6 class=\"color-quest-text\">" + text[child.name - 1] + "</h6></div>"
        }
}