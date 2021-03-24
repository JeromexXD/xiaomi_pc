import tpl from './index.tpl';
import { tplReplace } from 'utils/tools';
import './index.scss'

class ContentItem {
  constructor () {
    this.name = 'contentItem';

  }

  tpl (content, price, pic, index) {
    return tplReplace(tpl(),{
      isCurrent: index === 0 ? 'content-item current' : 'content-item',
      content,
      pic,
      price: price ? '￥' + price : ''
    })
  }
}

export default ContentItem;