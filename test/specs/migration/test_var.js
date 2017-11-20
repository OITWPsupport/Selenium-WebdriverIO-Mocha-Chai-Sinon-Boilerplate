// from https://www.npmjs.com/package/chai-webdriverio
var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));

var expect = require('chai').expect;
var ThisPage = require('./oit.page');

//
// These are the page-specific values to change for each new test
//
var testURL = 'https://webguide.boisestate.edu/accessibility/youtube-accessibility/';
var title = '"YouTube Accessibility - Web Accessibility"';
var header = '';

describe('test suite for ' + testURL, function () {
    it('should load the page in under ' + ThisPage.pageLoadTime + ' ms', function () {
        var path = testURL.substring(testURL.indexOf('.edu/')+4);
        var startTimestamp = new Date().getTime();
        ThisPage.open(path);
        ThisPage.footerDiv.waitForVisible();
        var endTimestamp = new Date().getTime();
        var pageLoadTime = (endTimestamp-startTimestamp);
        console.log('It took ' + pageLoadTime + ' ms to load the page.');
        expect(pageLoadTime).to.be.below(ThisPage.pageLoadTime);
    });

    it('should verify the URL', function () {
        expect(ThisPage.currentURL).to.equal(testURL);
    } );

var URL = process.env.PAGE;

describe(URL, function() {
    it('should submit a search', function () {
        browser.url(URL);
        browser.waitForExist('#q', 5000);
        browser.setValue('#q', 'foo');
      //  browser.click('#searchsubmit');
    });
    it('Should have lots of links, none of them broken', ()=> {
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
	expect(numberOfResults).to.be.above(1, 'No links? Unlikely! Probably an error.');
    });
});
