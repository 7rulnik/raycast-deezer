export const getDataJxa = `function findDeezerTab() {
  var app = Application("Google Chrome");
  app.includeStandardAdditions = true;
  var windows = app.windows;

  for (var i = 0; i < windows.length; i++) {
    var tabs = windows[i].tabs;
    for (var j = 0; j < tabs.length; j++) {
      var tab = tabs[j];
      if (tab.url().includes("deezer.com")) {
        return tab;
      }
    }
  }

  return null;
}

var deezerTab = findDeezerTab();

if (deezerTab) {
  var allInOneCommand = \`
    sliderInput = document.querySelector('.slider-track-input')
    trackLinks = Array.from(document.querySelectorAll('.player-track .track-link'))
    data = {
      trackName: trackLinks[0].innerText,
      artistsNames: trackLinks.slice(1).map(item => item.innerText).join(', '),
      liked: document.querySelector('.track-actions [aria-label="Remove from Favorite tracks"]') ? true : false,
      muted: document.querySelector('[data-testid="volume-unmute"]') ? false : true,
      songLength: sliderInput.getAttribute('aria-valuemax'),
      currentLength: sliderInput.getAttribute('aria-valuenow'),
      cover: document.querySelector('.queuelist img').src,
    }
  
    JSON.stringify(data)
  \`;

  var allInOne = deezerTab.execute({
    javascript: allInOneCommand,
  });

  JSON.stringify(allInOne)
}`

