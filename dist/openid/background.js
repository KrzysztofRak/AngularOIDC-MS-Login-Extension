let checking = setInterval(this.checkIfUserHasBeenAuthenticated, 100);

function checkIfUserHasBeenAuthenticated() {
  chrome.tabs.getSelected(null,function(tab) {
      if(tab.url.includes("#"))
      {
        clearInterval(checking);
        let url = new URL(tab.url.replace("#", "?"));
        chrome.tabs.remove(tab.id, function() { });

        let accessToken = url.searchParams.get("access_token");
        let expiresIn = url.searchParams.get("expires_in");
        let grantedScopes = url.searchParams.get("scope");
        chrome.storage.local.set({accessToken: accessToken});
        chrome.storage.local.set({expiresIn: expiresIn});
        chrome.storage.local.set({grantedScopes: grantedScopes});
      }
  });
}