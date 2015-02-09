<?php

# Load Twitter class
//require_once('TwitterOAuth.php');

require "twitteroauth/autoloader.php";

use Abraham\TwitterOAuth\TwitterOAuth;

# Define constants
define('TWEET_LIMIT', 10);
define('TWITTER_USERNAME', '');
define('CONSUMER_KEY', '');
define('CONSUMER_SECRET', '');
define('ACCESS_TOKEN', '');
define('ACCESS_TOKEN_SECRET', '');

# Create the connection
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);

$searchQuery = $_GET['q'];

$statuses = $connection->get('search/tweets', array('q' => urldecode($searchQuery) . " -dlvr -ebay -RT -gekoo", 'lang' => 'en', 'count' => 50));

// #dodgers OR dodgers OR #lad
//  -dlvr -ebay

$jsonStatuses = json_encode($statuses);


//echo "<pre>";
print_r($jsonStatuses);
//print_r($statuses);
//echo "</pre>";
?>
