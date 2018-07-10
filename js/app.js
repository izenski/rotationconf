if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw3.js')
      .then(function () {
        console.log('[app] serviceWorker registered');
      })
      .catch(function(err) {
        console.log(err);
      });
}