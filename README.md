# Orbital
by Ryan and Zhehao

Welcome to our Orbital project, we are creating a web application which will connect basketball players with other 
like minded individuals who are looking to play some pickup basketball.

Framework:
The application runs off of a HTTP Server which is linked to a MySQL Database.

Database Connector:
This database connector assumes that you are running a local mysql server on localhost:3306. The database, account and password can be set
!! IMPORTANT: Please set your classpath to the JBDC Driver correctly**** 

database:
    This package is used to create and manage connectors with the MySQL Database using the JBDC Driver.
    Each Connector extends Database Connector which provides basic connection capabilities.

handlers:
    This package creates handlers which handle the various HTTP requests to be received by our server. 
    Each handler extends Handler which in turn implements HTTPHandler. 
    Each concrete class will handle all HTTP request types for its own URI. 