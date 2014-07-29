gstvMarvel
==========

AngularJS and Marvel API site for GSTV

**Quick Explanation**
An angular application that is served via node.js. Node.js is the middle layer in between the client-side application and the Marvel API.

Due to some contraints with the api, I decided to use node.js to serve that data in the manner I wanted it. This leaves potential for switching out API's on the server, mashing up the data with any custom application based data, and etc.

In order to run it, the marvel-api npm needs to be updated with my branch (I added a function to facilitate some of the searching)

I am using ngResource to provide the requests to the custom node API.

The project uses AngularJS, Bootstrap, Fontawesome, Marvel API package, Node JS, and Gulp.js

