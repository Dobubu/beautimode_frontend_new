window.twitter = function () {
  console.log(`[window Twitter]`)
  const loadScript = function (url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = function () {
        resolve(true);
      };
      script.onerror = function () {
        reject();
      };
      document.head.appendChild(script);
    });
  };
  if (!window.twttr) {
    loadScript('//platform.twitter.com/widgets.js').then(() => {
      setTimeout(() => {
        window.twttr.widgets.load();
      }, 1100);
    });
  } else {
    setTimeout(() => {
      window.twttr.widgets.load();
    }, 1100);
  }
};