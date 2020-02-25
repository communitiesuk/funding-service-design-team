const nunjucks = require('nunjucks')
const fs = require('fs')
const glob = require('glob')

nunjucks.configure([
  'node_modules/govuk-frontend/',
  'templates/'
], {
  autoescape: true
})

const actions = {
  generate() {
    const templates = glob.sync('./templates/*.html')
    fs.mkdirSync('./docs', { recursive:true } )
    for (var i = 0; i < templates.length; i++) {
      const resource = nunjucks.render(__dirname + '/' + templates[i])
      fs.writeFileSync('./docs/'+templates[i].replace('./templates/', ''), resource)
    }
  }
}
actions.generate()
