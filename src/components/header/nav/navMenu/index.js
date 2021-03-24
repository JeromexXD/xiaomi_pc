import navMenuTpl from './tpl/nv_menu.tpl';
import navMenuItemTpl from './tpl/nv_menu_item.tpl';
import { tplReplace } from 'utils/tools'; 
import './index.scss';

class NavMenu {
  constructor () {
    this.name = 'navMenu';
    this.tpl = navMenuTpl;
  }

  appendMenuCards (data) {
    let list = '';

    data.forEach((item, index) => {
      if (index < 6) {
        list += tplReplace(navMenuItemTpl(), {
          id: item.id,
          pic: $.parseJSON(item.pics)[0][0][0],
          phone_name: item.phone_name,
          default_price: item.default_price,
          isFirst: index === 0 ? 'first' : ''
        })
      }
    });

    return list;
  }
}

export default NavMenu;