# Orbital
by Ryan and Zhehao

Welcome to our Orbital project, we are creating a web application which will connect basketball players with other 
like minded individuals who are looking to play some pickup basketball.

Framework:
The application on top of Node JS and MySQL, running a HTTP Server which is linked to a MySQL Database.

All the code can be found in the frontEnd folder(to be refactored to the main Orbital Folder).

The current http server runs off the Express JS HTTP Server module in server.js, with routes added both using the default method as well as routers(To be converted to all routers).

The MySQL Databse is connected to using the Express JS mysql2 module in database.js, with handlers initiating their seperate connections via a connectionPool.

The session management is done through the Express JS cookie-session module in session.js, which creates and stores cookies to track user sessions.

Features:
Account Creation & Login
Users will be able to create an account with their email, a username and a password. Tied to their account will be their experience at the game and their preferred basketball position (Guard, Forward, Center). For their experience at the game, we will divide it into a few categories (New, Recreational, Competitive, Professional). This allows users to view the level of experience of other users and their preferred positions to make a more informed decisions when joining lobbies. 


To Do:
Lobby Creation & Joining
Our app will provide support for both casual and competitive players. When creating a lobby, the host of the lobby will input the location of the court (name of the building/place and address) and the time. There will also be a chat function for players to communicate any information before meeting each other at the court. Users can view the profile of other users in a lobby to see their preferred position and their level of experience to decide whether to join the lobby. In the example of a casual lobby, newer players or recreational players could join more advanced players who had official training or are varsity players to get tips on how to improve at the game. For competitive lobbies, users can view the experience level of other users to guage if the match would be of their skill level, creating a fair and balanced match that would be more enjoyable. Conversely, users could try to find players of a higher skill level to challenge themselves with better competition for faster improvement.


Installation:

There will be a few things that you require before cloning this git repository.
1. Your IDE of choice (We have done our coding on Virtual Studio Code)
2. You will need to download NodeJS from nodejs.org (it is recommended to download the LTS version)
3. You will also need to have MySQL downloaded

After you pull the git repository, you will need to:
1. Enter the frontEnd Directory via a terminal
2. "npm init" to create a npm workspace
3. "npm install <dependency>" the following dependencies: express, cookie-session, uuid, mysql2
4. Once you are done, you can run node server.js and the application should start, if not please install the required depedencies

Next you need to set up a MySQL Database locally 
1. Follow the link https://dev.mysql.com/doc/mysql-getting-started/en/
2. create a table with the following command:
  CREATE TABLE users (
      id INT NOT NULL AUTO_INCREMENT,
      uname VARCHAR(255) NOT NULL,
      pword VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      pos INT NOT NULL,
      exp INT NOT NULL
  );
3. Finally make sure the MySQL server is started on localhost