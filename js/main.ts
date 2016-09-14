declare var SC:any;

var refreshbtn = $("#refreshbtn");
var pageheader = $("#page-header");
var pagecontainer = $("#page-container");
var circle = $("#circle");
var PrevSongName;

function myFunction() : void{
    pageheader.html("Nice to see you...");
    setTimeout(changeUI, 2000);
    if (PrevSongName != null) {
        hidePrevious(PrevSongName);
    }
    // Trying to sync load time of music and lyrics
    setTimeout(loadSong, 1000);
}

function changeUI() : void {
    // Shows hidden second header
    pageheader.innerHTML = "Your match is: ...";

    //Remove offset at the top
    pagecontainer.style.marginTop="20px";

    // Moves button downwards
    circle.style.marginTop = "10px";


}

class Song{
    title: string;
    url: string;
    constructor(songtitle : string, songurl : string) {
        this.title = songtitle;
        this.url = songurl;
    }
}

class Playlist {
    playlist: Song[];
    constructor() {
        playlist = [];
    }

    addSong(song : Song) : void{
        Playlist.push(song);
    }

    getRandSong() Song{
        return Playlist[Math.floor(Math.random() * Playlist.length)];
    }
}

var myPlaylist;
function init() : void {
    // init playlist
    myPlaylist = new Playlist();
    myPlaylist.addSong(new Song("Animals", "https://soundcloud.com/martingarrix/martin-garrix-animals-original")); // Song name and the url of the song on SoundCloud
    myPlaylist.addSong(new Song("Goodfeeling", "https://soundcloud.com/anderia/flo-rida-good-feeling"));
    myPlaylist.addSong(new Song("King", "https://soundcloud.com/vintagevisionary/lauren-aquilina-king"));
    myPlaylist.addSong(new Song("Ontopoftheworld", "https://soundcloud.com/interscope/imagine-dragons-on-top-of-the"));
    myPlaylist.addSong(new Song("Howtosavealife", "https://soundcloud.com/jelenab-1/the-fray-how-to-save-a-life-7"));
    myPlaylist.addSong(new Song("StayHigh", "https://soundcloud.com/musaradian/our-last-night-habitsstay-hightove-lo"));
    myPlaylist.addSong(new Song("Whentheycomeforme", "https://soundcloud.com/heoborus/when-they-come-for-me-linkin-park"));
    myPlaylist.addSong(new Song("OneStepCloser", "https://soundcloud.com/user1512165/linkin-park-one-step-closer"));
    myPlaylist.addSong(new Song("SomewhereIbelong", "https://soundcloud.com/mandylinkinparkmusic2xd/somewhere-i-belong"));
    // init soundcloud
    WaitForSoundcloud();
}

function loadSong() : void{
    var songSelected = myPlaylist.getRandSong(); 
    var track_url = songSelected.url;
    var songName = songSelected.title;
    $("#track-name")[0].innerHTML = "Lyrics";
    $("#track-name")[0].style.display = "block"; // changing this style to block makes it appear (before was set to none so it wasnt seen)
    $("#musicplayer")[0].style.display = "block";
    document.getElementById(songName).style.display = "block"; 
    loadPlayer(track_url); // load soundcloud player to play this song
    PrevSongName = songName // Initializes songName so lyrics can be hidden
}

function hidePrevious(PrevSongName) : void{
    // Removes previous song lyrics
    document.getElementById(PrevSongName).style.display = "None";
}


var myClientId = "df8ce54c655ec150c522a2540dc3fb0b";

function WaitForSoundcloud() : void{
    // Gives interval for SC to load, trouble defining SC
    if(typeof SC == "undefined") {
        setTimeout(WaitForSoundcloud, 500);
    } else {

        SC.initialize({
          client_id: myClientId
        });
    }
}

function loadPlayer(trackurl) : void{
    SC.oEmbed(trackurl, {auto_play: true}).then(function (oEmbed) {
        var div = $("#musicplayer")[0];
        div.innerHTML = oEmbed.html; // puts the soundcloud player inside the musicplayer div
    });
}
// Initialise playlist and soundcloud
init();
