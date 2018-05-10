import './dev-kit.scss';
import {sidebareTemplate} from './sidebar';
import {showModal} from './modal';

export function loadModules() {
  if (!isJqueryAvailable()) {
    loadJS('jquery-js', '//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js', loadJqueryPlugins);
  } else {
    loadJqueryPlugins();
  }

  function loadJqueryPlugins() {
    loadJS('slidereveal-js', '//cdnjs.cloudflare.com/ajax/libs/slideReveal/1.1.2/jquery.slidereveal.min.js', initNavbar);
    loadJS('modal-js', '//cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.19.3/sweetalert2.all.min.js');
  }
}

export function loadJS(id, link, onload) {
  let d = document, s = d.createElement('script');
  s.id = id;
  if (onload) {
    s.onload = onload;
  }
  s.src = link;
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
}

export function isJqueryAvailable() {
  return !(typeof jQuery === 'undefined');
}
