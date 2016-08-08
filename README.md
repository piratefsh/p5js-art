# Spaceship friends

Bunch of points on a circle perimeter. Each point has a friend type. Friends of similar types seek each other out. They coast at similar velocities, forming spaceship things. 

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
