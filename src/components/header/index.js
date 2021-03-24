import tpl from './index.tpl';
import Logo from './logo';
import Nav from './nav';
import Search from './search';
import { tplReplace } from 'utils/tools';

import './index.scss';

class Header {
  constructor (el, fieldData, phoneData) {
    this.name      = "header";
    this.$el       = el;
    this.tpl       = tpl();
    this.fieldData = fieldData;
    this.phoneData = phoneData;

    this.logo      = new Logo();
    this.nav       = new Nav();
    this.search    = new Search();

  }

  async init () {
    await this.render();
    this.bindEvent();
  }

  async render () {
    await this.$el.append(
      tplReplace(this.tpl, {
        logo: this.logo.tpl,
        nav: this.nav.tpl(this.fieldData),
        search: this.search.tpl
      })
    )
  }

  bindEvent () {
    const $nav = $('.J_nav'),
          $searchBtn = $('.J_searchBtn');

    $nav.on('mouseenter', '.nav-item', {
      phoneData: this.phoneData,
      oNav: this.nav
    }, this.nav.navMouseIn)

    $searchBtn.on('click', this.search.searchPhone);
  }

}

export default Header;