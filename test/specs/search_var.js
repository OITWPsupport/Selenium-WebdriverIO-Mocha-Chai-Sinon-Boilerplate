// from https://www.npmjs.com/package/chai-webdriverio
var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));

var URL = 'https://' + process.env.TESTSITE + '.boisestate.edu/'; // KEEP the trailing slash
var searchString = 'jessen';

describe(process.env.TESTSITE + '.boisestate.edu: Check that this site successfully uses the new search (Google Custom Search Element API 2.0)', function() {
    it('should submit a search', function () {
        browser.url(URL);
        browser.waitForExist('#q', 2500);
        browser.setValue('#q', searchString);
        browser.click('#searchsubmit');
    });
    it('should have the proper page element for the 2.0 API\'s search results', function () {
        browser.waitForExist('#___gcse_0', 2500);
        chai.expect('#___gcse_0').to.be.there;
    });
    it.skip('should not have the page element from the old 1.0 API\'s search results', function () {
        // gcsc-branding is a page element present in the results page of
        // the old search that should not show up in the revised search
        browser.waitForExist('.gcsc-branding', 5000);
        chai.expect('.gcsc-branding').to.not.be.there;
    });
    it('should have the search box on the search results page', function() {
	browser.waitForExist('#gsc-i-id1', 2500);
        chai.expect('#gsc-i-id1').to.be.there;
    });
    it('should have the search button on the search results page', function() {
        browser.waitForExist('.gsc-search-button', 2500);
        chai.expect('.gsc-search-button').to.be.there;
    });
    it('should end up at a URL that contains the q and site parameters', function() {
        var expectedResultURL = URL + '?q=' + searchString + '&site=boisestate.edu';
        var actualResultURL = browser.getUrl();
        assert.equal(expectedResultURL, actualResultURL);
    });
    it('List of search results should be longer two and point to valid pages', ()=> {
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
