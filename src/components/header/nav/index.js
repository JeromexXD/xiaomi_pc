import navTpl from './tpl/nav.tpl';
import navItemTpl from './tpl/nav_item.tpl';
import navMenu from './navMenu';
import { tplReplace } from 'utils/tools';
import './index.scss';

class Nav {
  constructor () {
    this.name      = 'headNav';
    this.navMenu   = new navMenu();
    this.cacheHTML = {};
  }

  tpl (data) {
    let list = '';

    data.forEach(item => {
      list += tplReplace(navItemTpl(), {
        field: item.field,
        seriesName: item.series_name
      })
    })

    return tplReplace(navTpl(), {
      navItems: list,
      navMenu: this.navMenu.tpl()
    })
  }

  navMouseIn (e) {
    const { phoneData, oNav } = e.data;

    const $navMenu = $('.J_navMenu'),
          field = $(this).attr('data-field');

    if (!oNav.cacheHTML[field]) {
      oNav.cacheHTML[field] = oNav.navMenu.appendMenuCards(phoneData.filter(item => {
        return item.field === field;
      }))
    }

    $navMenu.html(oNav.cacheHTML[field]);
  }

}

export default Nav;