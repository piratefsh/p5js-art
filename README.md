# L-Systems Renderer

Simple L-Systems Renderer.


## Development 
### Install
```
npm install
npm install webpack-dev-server webpack -g
```

### Install p5
For some reason, I can't include the p5 as a module, so I just download p5.js from [here](http://p5js.org/download/) and put it in node_modules/lib/p5.js. It's hacky, but shhh. Let me know if you have a better solution!

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
