import tpl from './index.tpl';
import { tplReplace } from 'utils/tools';
import './index.scss';


class DetailTitle {
  constructor () {
    this.name = 'detailTitle';
  }

  tpl (title) {
    return tplReplace(tpl(), { title });
  }
}

export default DetailTitle;