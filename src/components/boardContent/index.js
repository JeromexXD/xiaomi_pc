import tpl from './tpl/board.tpl';
import cardTpl from './tpl/item.tpl';
import NoDataTip from '../noDataTip';
import { tplReplace } from 'utils/tools';

import './index.scss';

class BoardContent {
  constructor (el, phoneData) {
    this.name      = 'boardContent';
    this.$el       = el;
    this.phoneData = phoneData;
    this.noDataTip = new NoDataTip();
  }

  init () {
    this.render();
  }

  render () {
    this.$el.append(tplReplace(tpl(), {
      list: this.makeList(this.phoneData) || this.noDataTip.tpl()
    }))
  }

  makeList (data) {
    let list = '';

    data.forEach((item, index) => {
      list += tplReplace(cardTpl(), {
        isFirst: index % 5 === 0 ? 'first' : '',
        id: item.id,
        pic: $.parseJSON(item.pics)[0][0][0],
        phone_name: item.phone_name,
        slogan: item.slogan.substr(0, 10),
        default_price: item.default_price
      })
    })

    return list;
  }
}

export default BoardContent;