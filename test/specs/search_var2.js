var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));

var URL = process.env.URL;

describe('Test ' + URL, function() {
    it('List links on this page.', ()=> {
        let links = browser.elements('a')

	var numberOfResults=0;

        for (let i=0; i < links.value.length; i++) {
          let link = links.value[i].ELEMENT,
              href = browser.elementIdAttribute(link,'href'),
              status = true

          console.log(href.value)

          fetch(href.value)
            .then( function(res){
            })
            .catch( function(err){
              status = false
            })

	  numberOfResults++;

          expect(status).to.be.true;
        }
	expect(numberOfResults).to.be.above(1, 'No search results? Unlikely! Probably an error.');
    });
});
