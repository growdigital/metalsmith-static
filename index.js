var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var move        = require('metalsmith-move');
var writemetadata    = require('metalsmith-writemetadata');

Metalsmith(__dirname)
  .metadata({
    title: "My Static Site & Blog",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  // For debugging, use metadata
  // .use(writemetadata({
  //   pattern: ['*.md', '*.html']
  // }))
  .use(markdown())
  .use(move({
    'posts': '{relative}/{base}'
  }))
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
