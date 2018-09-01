# Ionic 3 roles client
This application is the client part of a demo that implements and shows the authentication and roles management in a Ionic 3 application.
The application manags a todo list, that is stored in a remote database an can be seen by the users, and modified by the creators and the editors.
Only the editors can delete the todos.

![Dependencies status](https://david-dm.org/dnchia/Ionic3-roles-client.svg)

## How to use it
The demo can be executed like any other Ionic application, using the Ionic CLI command: `ionic serve` to execute it in development mode.

### Configuration
The server URL in the providers must be defined in order to make the application work (uses a fake direction).

## References
This demo example was done following the tutorial made by Joshua Morony ([@joshuamorony](https://github.com/joshuamorony)) in 
[Creating Role Based Authentication with Passport in Ionic 2 - Part 2](https://www.joshmorony.com/creating-role-based-authentication-with-passport-in-ionic-2-part-2/), 
all credits to him.

## In the future
Several parts of the application will be refactored in order to fit more good design principles. For example, the configuration will be in a config file, not hardcoded,
