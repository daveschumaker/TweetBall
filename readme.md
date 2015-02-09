# Searching Twitter for America's National Pastime

![](http://dave.ly/stuff/baseball/screenshots/screenshot_redsox.png)

## What is this?

A realtime list of recent tweets that mention various Major League Baseball teams that automatically refreshes ever 30 seconds. By default, this searches for any any tweet that mentions one of the official Twitter accounts for an MLB team. There are additional options to filter by team and the script will search for mentions of the team, and in some cases certain players (e.g., Hunter Pence on the Giants and Yasiel Puig on the Dodgers).

## Requirements

If you want to run and host this yourself, you’ll need a server capable of running PHP (this is used to authenticate with the Twitter API and parse the search results into usable JSON.

You’ll also need to enter your Twitter API token and key in order to search tweets. You can enter these credentials in the following file: /php/search.php

## Why did you do this?

One of my goals for 2015 was to learn more about coding and do more of it. As of late, I’ve been really focused on working with JavaScript. It follows up on an earlier project that I was working on ([solving Sudoku puzzles using JavaScript](https://github.com/rockbandit/Simple-Javascript-Sudoku-Solver)).

This goal of this project was to rapidly build out a web app that could search and parse publicly available data (e.g., tweets!) for mentions of particular baseball teams while using various jQuery and JavaScript libraries. I could see this app having potentially wider uses beyond baseball such as returning the latest tweets from an event or hashtag.

## Libraries and frameworks used

* [Skeleton](http://getskeleton.com/) - Used as a responsive boilerplate to rapidly build out the site and make sure it worked on both desktop and mobile devices.
* [bbclub-font](http://daigofuji.github.io/bbclub-font/) - An open source project that displays scalable team logos from all 30 MLB teams.
* [jPushMenu](http://takien.github.io/jPushMenu/) - jQuery plugin to easily add the side menu that slides in from the left and allows users to choose a proper team.
* [Livestamp.js](http://mattbradley.github.io/livestampjs/) - jQuery plugin to provide auto-updating time ago text (e.g., _posted 5 minutes ago_)
* [Moment.js](http://momentjs.com/) - Parse, validate, manipulate, and display dates that were returned from the Twitter API.
* [TwitterOAuth](https://github.com/abraham/twitteroauth) - Validate your developer token with Twitter and access its API through PHP.

Other helpful sources:

* [Parsing Twitter usernames, hashtags, and URLs with JavaScript](http://www.simonwhatley.co.uk/examples/twitter/prototype/)
* [Find HEX color approximations for your favorite sports teams](http://teamcolors.arc90.com/)
