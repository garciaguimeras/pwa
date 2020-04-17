if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('./sw.js').then(
      function(registration) {
        console.log('SW register: OK');
      }, 
      function(err) {
        console.log('SW register: FAILED. Cause: ', err);
      }
    );
    
  }