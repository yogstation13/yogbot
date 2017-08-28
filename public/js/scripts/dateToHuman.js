define([], function () {
  return (date) => {

    var suffix = " ago";
    var now = new Date();
    var seconds;

    if (now < date) {
      suffix = "";
      seconds = Math.floor((date - now) / 1000);
    }
    else {
      seconds = Math.floor((now - date) / 1000);
    }

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years" + suffix;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months" + suffix;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days" + suffix;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours" + suffix;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes" + suffix;
    }
    return Math.floor(seconds) + " seconds" + suffix;
  };
});
