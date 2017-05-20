const x = require('x-ray')();

x('https://yarnpkg.com/en/docs/cli/add', 'h5', [{
  name: '.highlighter-rouge',
  path: '.toc@href'
}])
  .paginate('a.btn-primary@href')
  .write('yarndocs.json')
