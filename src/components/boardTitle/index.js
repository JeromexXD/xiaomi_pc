import tpl from './index.tpl';
import { tplReplace } from 'utils/tools';
import './index.scss';

class BoardTitle {
  constructor (el, title) {
    this.name  = 'boardTitle';
    this.$el   = el;
    this.title = title;
  }

  init () {
    this.render();
  }

  render () {
    this.$el.append(tplReplace(tpl(), {
      title: this.title
    }))
  }
}

export default BoardTitle