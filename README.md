# Unsteady hand
Simple filter to make an image look like it was taken with an unsteady hand. Why would you want to do that? Because.

![https://pbs.twimg.com/media/ChH29LtUcAMhQdK.jpg](demo)

## Development 
### Install
```
npm install
npm install webpack-dev-server webpack -g
```

### Serve

To serve at http://localhost:8080/:

```
webpack-dev-server --inline  --content-base public/ 
```

### Build

To compile HTML/CSS and JavaScript files for production:

```
webpack --config webpack.config.js
```
