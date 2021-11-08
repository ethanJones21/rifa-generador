npm i nodemon express cross-env morgan multer mongoose

para fronted
npm i webpack webpack-cli html-webpack-plugin css-loader style-loader mini-css-extract-plugin webpack-dev-server timeago.js -D

timeago.js es como moment.js

npx nodemon index.js sino esta instalado globalmente

npx webpack

{
"start": "cross-env NODE_ENV=production node backend/index.js",
"dev": "cross-env NODE_ENV=development nodemon backend/index.js",
"build": "cross-env NODE_ENV=production webpack",
"server:dev": "webpack-dev-server",
}
