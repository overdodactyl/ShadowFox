var critical = require('critical');

critical.generate({
  inline: true,
  base: 'dist/',
  src: 'index.html',
  dest: 'index.html',
  ignore: ['@font-face'],
  minify: true
});
