# Parametric Equations 'Gradient'

![parametric equation gradients](http://piratefsh.github.io/assets/images/genart/02-parametric/iphonexsimulation.png)

## Writeup
[http://piratefsh.github.io/2017/11/28/rc-computer-art-pop-up-day-2.html](http://piratefsh.github.io/2017/11/28/rc-computer-art-pop-up-day-2.html)

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
