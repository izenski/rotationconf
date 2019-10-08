if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw3.js')
    .then(function () {
      console.log('[app] serviceWorker registered');
    })
    .catch(function(err) {
      console.log(err);
    });
}


let deferredPrompt;

window.addEventListener('beforeinstallprompt', event => {
  console.log('beforeinstallprompt event');
  event.preventDefault();
  deferredPrompt = event;
  document.getElementById("installnotification").style.display="block";
  return false;
});

document.getElementById("installPWA").addEventListener('click', event => {
  event.preventDefault();
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


let notificationEnabled = false;

if ('Notification' in window) {
document.getElementById("notifications")
  .addEventListener('click', event => {
    if (notificationEnabled){
      new Notification('Buy more stuff! ',
      {
        body: 'shop now for the best new widgets!',
        tag: 'sale-offer'
      })
    }
    else {        
      Notification.requestPermission(result => {
        //notification & push rights are granted together
        console.log("Accept Notifications",result);
        if (result === 'granted'){
          notificationEnabled = true;
          new Notification("Notifications are enabled!");
        }
      });
    }
  });
}
