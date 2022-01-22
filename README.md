# Resize Image API
## _Full Stack Nanodegreee - Udacity_
#### _Author: Daniel Salazar_

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)


#### Usage
-------------
Inside [static/images](https://github.com/SAGO-DSG96/Image-Processing-API-FSJSND/tree/master/static/images) folder are five different images available to resize. Every new image to be added should go into [static/images](https://github.com/SAGO-DSG96/Image-Processing-API-FSJSND/tree/master/static/images) folder of this project.

#### Endpoint
-------------
The main endpoint of this api is /api/images 
Make sure to add the following query parameters in order to work the resize API.
- filename
- width
- heigth 
- format (jpg | png | svg) => this optional.

#### Running the API
-------------
1. To run the app first install the project locally. 
2. Convert the typescript to javascript using `npm run build`.
3. Execute the server using `node ./build/`.
4. Server will start in `port 8080`.

#### Scripts
-------------
The next scripts are avaiable inside the application.

- `start`: Execute nodemon package to restart server when working with typescript after you make changes.
- `build`: Execute typescript to be transpile to commonjs.
- `jasmine`: Execute jasmine to do Unit Testing.
- `lint`: Execute eslint and prettier configuration to refactor code legibility.
- `test`: Execute `build` script and then `jasmine`