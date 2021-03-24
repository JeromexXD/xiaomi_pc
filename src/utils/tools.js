function tplReplace (tpl, replaceData) {
  return tpl.replace(/\{\{(.*?)\}\}/g, (node, key) => {
    key = trimSpace(key);
    return replaceData[key];
  })
}

function trimSpace (str) {
  return str.replace(/\s+/g, '');
}

function getUrlQueryValue (key) {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i'),
        res = window.location.search.substr(1).match(reg);

  return res === null ? null : decodeURIComponent(res[2]);
}

function throttle (fn, delay) {
  let begin = new Date().getTime(),
      t     = null;

  return function () {
    let args = arguments,
        cur  = new Date().getTime();

    if (t) {
      clearTimeout(t);
    }

    if (cur - begin >= delay) {
      fn.apply(this, args);
      begin = cur;
    } else {
      t = setTimeout(() => {
        fn.apply(this, args);
      }, delay)
    }
  }
}

function getDateTime () {
  const date = new Date();

  let year    = date.getFullYear(),
      month   = addZero(date.getMonth() + 1),
      day     = addZero(date.getDate()),
      hours   = addZero(date.getHours()),
      minutes = addZero(date.getMinutes()),
      seconds = addZero(date.getSeconds());

  function addZero(val) {
    return val > 10 ? val : ('0' + val);
  }

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export {
  tplReplace,
  trimSpace,
  getUrlQueryValue,
  throttle,
  getDateTime
}