if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw3.js')
      .then(function () {
        console.log('[app] serviceWorker registered');
      })
      .catch(function(err) {
        console.log(err);
      });
}

window.addEventListener('beforeinstallprompt', event => {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
    document.getElementById("installnotification").style.display="block";
    return false;
  });

document.getElementById("installPWA").addEventListener('click', event => {
    event.preventDefault()
    deferredPrompt.prompt();
    deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
      document.getElementById("installnotification").style.display="none";
    });        
});

document.getElementById("cancelPWAInstall").addEventListener('click', event => {
    event.preventDefault();
    deferredPrompt = null;
    document.getElementById("installnotification").style.display="none";
})


