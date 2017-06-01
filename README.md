# Recursive Hexagons

Hexagons made out of hexagons
![hexagons tesselations](http://i.imgur.com/paWQIxO.png)

![hexagons tesselations](http://i.imgur.com/gq3CzJi.png)

## Development 
### Install
```
npm install
npm install webpack-dev-server webpack -g
```

### Serve

To serve at http://localhost:8080/:

```
npm start
```

or

```
webpack-dev-server --inline  --content-base public/ 
```

### Build

To compile HTML/CSS and JavaScript files for production (at `public/lsystems`):

```
npm run build
```

or

```
webpack --config webpack.config.js
```
