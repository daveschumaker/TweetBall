/*
* Twitter Baseball
* v1.0 by Dave Schumaker (@davely)
*
* WHAT?
* Connect to Twitter API and return live search results for all your
* favorite baseball teams. Seemlessly updates every 30 seconds. I made
* this to play around with Javascript, jQuery, and AJAX calls.
*
* REQUIREMENTS
* You'll need to be able to run PHP, since I use it to connect to Twitter's search API.
* You'll also need to enter your Twitter API token in order to properly search.
*/

// Store teams and team names:

var searchQuery; // Global search query that we can use and update

var teams = {
  "MLB" : {
    "searchQuery" : "@Dbacks OR @Braves OR @Orioles OR @RedSox OR @Cubs OR @WhiteSox OR @Reds OR @Indians OR @Rockies OR @Tigers OR @Marlins OR @Astros OR @Royals OR @Angels OR @Dodgers OR @Brewers OR @Twins OR @Mets OR @Yankees OR @Athletics OR @Phillies OR @Pirates OR @Cardinals OR @Padres OR @SFGiants OR @Mariners OR @RaysBaseball OR @Rangers OR @BlueJays OR @Nationals",
    "icon" : "mlb",
    "color" : "#002F5F"
  },
  "Angels" : {
    "searchQuery" : "#angels OR @Angels OR \"Mike Trout\"",
    "icon" : "ana",
    "color" : "#B71234"
  },
  "Astros" : {
    "searchQuery" : "#astros OR @astros",
    "icon" : "hou",
    "color" : "#072854"
  },
  "Athletics" : {
    "searchQuery" : "#athletics OR @athletics -#football -#soccer -#swimming -#running -#trackandfield",
    "icon" : "oak",
    "color" : "#003831"
  },
  "Blue Jays" : {
    "searchQuery" : "#bluejays OR \"Blue Jays\" OR @bluejays",
    "icon" : "tor",
    "color" : "#003DA5"
  },
  "Braves" : {
    "searchQuery" : "#braves OR @braves",
    "icon" : "atl",
    "color" : "#B71234"
  },
  "Brewers" : {
    "searchQuery" : "#brewers OR @brewers",
    "icon" : "mil",
    "color" : "#182B49"
  },
  "Cardinals" : {
    "searchQuery" : "#cardinals OR @cardinals",
    "icon" : "sln",
    "color" : "#C41E3A"
  },
  "Cubs" : {
    "searchQuery" : "#cubs OR @cubs",
    "icon" : "chn",
    "colors" : "#003279"
  },
  "Diamondbacks" : {
    "searchQuery" : "#dbacks OR @dbacks OR Diamondbacks",
    "icon" : "ari",
    "color" : "#A71930"
  },
  "Dodgers" : {
    "searchQuery" : "#dodgers OR dodgers OR @dodgers OR \"Clayton Kershaw\" OR \"Yasiel Puig\" -HSBC -tax",
    "icon" : "lad",
    "color" : "#083C6B"
  },
  "Giants" : {
    "searchQuery" : "#sfgiants OR SFGiants OR \"SF Giants\" OR @sfgiants OR \"SF Giants\" OR \"Hunter Pence\" OR \"Buster Posey\" OR \"Bruce Bochy\" -Eli -NY -Manning",
    "icon" : "sfn",
    "color" : "#F2552C"
  },
  "Indians" : {
    "searchQuery" : "#indians OR @indians",
    "icon" : "cle",
    "color" : "#D30335"
  },
  "Mariners" : {
    "searchQuery" : "#mariners OR @mariners OR mariners",
    "icon" : "sea",
    "color" : "#005C5C"
  },
  "Marlins" : {
    "searchQuery" : "#marlins OR @marlins",
    "icon" : "mia",
    "color" : "#F9423A"
  },
  "Mets" : {
    "searchQuery" : "#mets OR @mets",
    "icon" : "nym",
    "color" : "#002C77"
  },
  "Nationals" : {
    "searchQuery" : "#nationals OR @nationals",
    "icon" : "was",
    "color" : "#BA122B"
  },
  "Orioles" : {
    "searchQuery" : "#orioles OR @orioles",
    "icon" : "bal",
    "color" : "#ED4C09"
  },
  "Padres" : {
    "searchQuery" : "#padres OR @padres",
    "icon" : "sdn",
    "color" : "#002147"
  },
  "Phillies" : {
    "searchQuery" : "#phillies OR @phillies",
    "icon" : "phi",
    "color" : "#BA0C2F"
  },
  "Pirates" : {
    "searchQuery" : "#pirates OR @pirates",
    "icon" : "pit",
    "color" : "#000000"
  },
  "Rangers" : {
    "searchQuery" : "#rangers OR @rangers OR Texas Rangers",
    "icon" : "tex",
    "color" : "#BD1021"
  },
  "Rays" : {
    "searchQuery" : "#rays OR @raysbaseball OR Tampa Rays",
    "icon" : "tba",
    "color" : "#00285D"
  },
  "Red Sox" : {
    "searchQuery" : "#redsox OR @redsox",
    "icon" : "bos-alt",
    "color" : "#C60C30"
  },
  "Reds" : {
    "searchQuery" : "#reds OR @reds",
    "icon" : "cin",
    "color" : "#C6011F"
  },
  "Rockies" : {
    "searchQuery" : "#rockies OR @rockies",
    "icon" : "col",
    "color" : "#333366"
  },
  "Royals" : {
    "searchQuery" : "#royals OR @royals",
    "icon" : "kca",
    "color" : "#15317E"
  },
  "Tigers" : {
    "searchQuery" : "#tigers OR @tigers",
    "icon" : "det",
    "color" : "#001742"
  },
  "Twins" : {
    "searchQuery" : "#MNTwins OR @twins OR from:twins",
    "icon" : "min",
    "color" : "#C6011F"
  },
  "White Sox" : {
    "searchQuery" : "#whitesox OR White Sox OR @whitesox",
    "icon" : "cha",
    "color" : "#000000"
  },
  "Yankees" : {
    "searchQuery" : "#yankees OR @yankees",
    "icon" : "nya",
    "color" : "#1C2841"
  }
};

// Methods to parse Twitter usernames, hashtags, and URLs and add relevant links.
String.prototype.parseURL = function() {
  return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {

    var displayURL = url;
    urlCount = url.length;
    // Truncate extra long URLs
    if (url.length > 40) {
      displayURL = url.substring(0,35);
      displayURL = displayURL + "…";
    }

    var newURL = "<a href=\"" + url + "\" target=\"_blank\">" + displayURL + "<a/>";
    return newURL;
    //return url.link(url);
  });
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.parseUsername = function() {
  return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
    var username = u.replace("@","")
    //console.log(u.link("http://twitter.com/"+username));
    var newURL = "<a href=\"http://twitter.com/" + username + "\" target=\"_blank\">@" + username + "<a/>";
    return newURL;
    //return u.link("http://twitter.com/"+username);
  });
};

String.prototype.parseHashtag = function() {
  return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
    var tag = t.replace("#","%23");
    var tempTag = t.replace("#","");
    var newURL = "<a href=\"http://twitter.com/search?q=" + tag + "\" target=\"_blank\">#" + tempTag + "<a/>";
    return newURL;
    //return t.link("http://twitter.com/search?q="+tag);
  });
};

// Replace Twitter's short URLs with the original longer URLs.
function expandURLs(array, tweet) {
  var tempArray = array;
  var tempTweet = tweet; // Pass through unedited text of tweet that we'll replace and pass back.
  var shortLink;
  var longLink;

  //console.log(tempArray.length);

  for (var i = 0; i < tempArray.length; i++) {
    //console.log(array[i].url + " | " + array[i].expanded_url);
    shortLink = array[i].url;
    longLink = array[i].expanded_url;
    tempTweet = tempTweet.replace(shortLink, longLink);
    //console.log(tempTweet);
  }

  return tempTweet;
}



// Replace Twitter's short URL media embeds
function expandMedia(array, tweet) {
  var tempArray = array;
  var tempTweet = tweet; // Pass through unedited text of tweet that we'll replace and pass back.
  var shortLink;
  var longLink;

  for (var i = 0; i < tempArray.length; i++) {
    //console.log(array[i].url + " | " + array[i].expanded_url);
    shortLink = array[i].url;
    longLink = array[i].expanded_url;
    tempTweet = tempTweet.replace(shortLink, longLink);
  }

  return tempTweet;
}



// Formatting tweets so we can display them.
function displayTweets(array) {
  var tempHTML; // Generate HTML we'll use to populate search results
  var tempTweet;
  var parsedTweet; // Looks at tweet and linkifies URLs, hastags, and usernames
  var username; // Twitter's username
  var tweetID; // get the ID of the tweet

  /* use a function for the exact format desired... */
  function formatTime(s) {
    s = moment(s).format();
    //s = s.replace(/T/," ").replace(/Z/," UTC");
    //s = s.replace(/Z/," UTC");
    return s;
  }

  function generateTweet () {

    var tmpImg
    if (typeof makeImg() != "undefined") {
      tmpImg = makeImg()
    } else {
        tmpImg = "";
    };

    var tempDiv = "<div>\n"
      + "<p class=\"tweet\">" + parsedTweet + "</p>\n"
      + tmpImg
      + "<div class=\"tweetInfo\">\n"
      + "<div class=\"tweetTime\">"
      + "<span data-livestamp=\"" + formatTime(tweetTime) + "\" >"
      //+ "<time class=\"timeago\" timedate=\"" + formatTime(tweetTime) + "\" >"
      //+ moment(tweetTime).format('MMMM Do YYYY, h:mm:ss a') + "</span></div>\n"
      + "</span></div>\n"
      + "<div class=\"userName\">Posted by <a href=\"http://twitter.com/" + username + "/status/" + tweetID + "\" target=\"_blank\">" + username + "</a></div>\n"
      + "</div>\n";

    return tempDiv;
  };

  function makeImg() {
    var tempImgDiv;
    if (imgURL != null) {
      tempImgDiv = "<div class=\"images\">"
        + "<img src=\"" + imgURL + "\">"
        + "</div>";
    }
    return tempImgDiv;
  }

  //for (var i = 0; i < array.length; i++) {
  for (var i = array.length-1; i > 0; i--) {
    //tempTweet = array[i].entities.urls;
    tempTweet = expandURLs(array[i].entities.urls, array[i].text); // Automatically expand short link URLs.
    // Check if the media entity exists. If so, expand URLs.
    if (typeof array[i].entities.media != "undefined") {
      tempTweet = expandURLs(array[i].entities.media, tempTweet); // Automatically expand media link URLs
      imgURL = array[i].entities.media[0].media_url;
    } else {
      imgURL = null;
    }

    //console.log(expandURLs(tempTweet, array[i].text));

    parsedTweet = tempTweet.parseURL().parseUsername().parseHashtag();
    username = array[i].user.screen_name;
    tweetTime = array[i].created_at;
    tweetID = array[i].id_str;

    if (typeof tempHTML != "undefined") {
      //console.log(array[i].text);
      //console.log(array[i].entities.urls); // Find URLs
      //tempHTML = "\n<div>\n<p class=\"tweet\">" + parsedTweet + "\n</p><p class=\"userName\"> Posted by " + username + "</p>\n</div>\n\n" + tempHTML;
      tempHTML = generateTweet() + tempHTML;
    } else {
      //tempHTML = "\n<div>\n<p>" + parsedTweet + "\n</p>\n</div>\n\n";
      tempHTML = generateTweet();
    }
  }

  $("#searchResults").html(tempHTML);
}

function ajaxCall () {

  // If nothing is chosen, show a default search query.
  if (typeof searchQuery == "undefined") {
    searchQuery = "from:MLB OR @MLB";
  }

  searchQuery = searchQuery.replace(/#/gi, "%23"); // replace hashtags which will break our ajax get call.
  searchQuery = searchQuery.replace(/@/gi, "%40"); // replace @ symbols which will break our ajax get call.s\


  $.getJSON('php/search.php?q=' + searchQuery, function(data) {
    var tweets = data.statuses;
    displayTweets(tweets);
  });
}

// When the page first loads, this is what we'll set it up with.
function loadDefault() {
  var selectTeam = "MLB";
  searchQuery = teams["MLB"].searchQuery;
  teamIcon = teams["MLB"].icon;
  var teamHeader = "<h4>Searching for <i class=\"bbclub-" + teamIcon + "\"></i> MLB</h4>";
  $("#teamHeader").html(teamHeader);
  $("#teamColors").css("background-color", teams["MLB"].color);
  ajaxCall();

}

function getHash() {
  if (window.location.hash) {
    var team = window.location.hash.substring(1); //Puts hash in variable, and removes the # character

    // Detect hashtags of teams that have multiple word names (e.g., Blue Jays)
    if (team == "bluejays") {
      team = "Blue Jays";
    } else if (team == "redsox") {
      team = "Red Sox";
    } else if (team == "whitesox") {
      team = "White Sox";
    } else {
      // Team name is good, leave it alone and capitalize first letter.
      var team = team.capitalize();
    }

    if (typeof teams[team] != "undefined") {
      var selectTeam = team;
      searchQuery = teams[team].searchQuery;
      teamIcon = teams[team].icon;
      var teamHeader = "<h4>Searching for <i class=\"bbclub-" + teamIcon + "\"></i> " + team + "</h4>";
      $("#teamHeader").html(teamHeader);
      $("#teamColors").css("background-color", teams[team].color);
    } else {
      loadDefault();
    }
  } else {
    loadDefault();
  }
  ajaxCall();
}

$(document).ready(function($) {

  getHash();
  $('.toggle-menu').jPushMenu();
  setInterval(function() {
    ajaxCall();
  }, 30000);
});

// Use this to get the id of the link we're clicking so we don't need
// to write a ton of code based on which team is selected
$("nav").on('click', 'a', function () {
    var selectTeam = this.id;
    searchQuery = teams[this.id].searchQuery;
    teamIcon = teams[this.id].icon;
    var teamHeader = "<h4>Searching for <i class=\"bbclub-" + teamIcon + "\"></i> " + this.id + "</h4>";
    $("#teamHeader").html(teamHeader);
    $("#teamColors").css("background-color", teams[this.id].color);
    ajaxCall();

    //alert(teams[this.id].icon);
});
