import tpl from './index.tpl';
import DetailTitle from './detailTitle';
import ContentItem from './contentItem';
import ButtonGroup from './buttonGroup';
import { tplReplace } from 'utils/tools';
import DetailModel from '@/models/detail';

import './index.scss';

class DetailBoard {
  constructor(el, phoneData) {
    this.name         = 'detailBoard';
    this.$el          = el;
    this.phoneData    = phoneData;
    this.userpickInfo = {};
    this.buttonGroup  = new ButtonGroup();
    this.detailModel  = new DetailModel();
  }

  init () {
    this.initPhoneData();
    this.render();
    this.initUserPickInfo();
    this.bindEvent();
  }

  initPhoneData () {
    const phoneData             = this.phoneData;
    this.phoneData.pics         = $.parseJSON(phoneData.pics);
    this.phoneData.version_info = $.parseJSON(phoneData.version_info);
    this.phoneData.color        = $.parseJSON(phoneData.color);
  }

  initUserPickInfo () {
    const { id, version_info, color, pics } = this.phoneData;

    this.userpickInfo = {
      id,
      version: version_info[0]['version'],
      color: color[0],
      price: version_info[0]['price'],
      img: pics[0][0][0]
    }

  }

  render () {
    const phoneData                     = this.phoneData,
          { pics, version_info, color } = phoneData,
          detailTitle                   = new DetailTitle(),
          contentItem                   = new ContentItem();

    let versions = '',
        colors = '';

    version_info.forEach((item, index) => {
      versions += contentItem.tpl(item.version, item.price, null, index);
    })

    color.forEach((item, index) => {
      colors += contentItem.tpl(item, null, pics[index][index][0], index);
    })

    this.$el.append(
      tplReplace(tpl(), {
        pic: phoneData.pics[0][0][0],
        phoneName: phoneData.phone_name,
        slogan: phoneData.slogan,
        defaultPrice: phoneData.default_price,
        title_1: detailTitle.tpl('手机版本'),
        title_2: detailTitle.tpl('手机颜色'),
        versions,
        colors,
        buttons: this.buttonGroup.tpl()
      })
    )
  }

  bindEvent () {
    const $versions = this.$el.find('.J_version'),
          $colors   = this.$el.find('.J_color'),
          $buttons  = this.$el.find('.J_button');

    this.versionItem = $versions.children('.content-item');
    this.colorItem   = $colors.children('.content-item');
    this.detailPic   = this.$el.find('.J_detailPic');

    $versions.on('click', '.content-item', {_this: this}, this.pickVersion);
    $colors.on('click', '.content-item', {_this: this}, this.pickColor);
    $buttons.on('click', '.detail-btn', {_this: this}, this.handleBtn);
  }

  pickVersion (e) {
    const { _this } = e.data;
    _this.versionChange(this);
  }

  pickColor (e) {
    const { _this } = e.data;
    _this.colorChange(this);
  }

  versionChange (tar) {
    const $tar     = $(tar),
          curIndex = $tar.index(),
          version  = $tar.attr('data-content'),
          price    = $tar.attr('data-price');

    this.userpickInfo.version = version;
    this.userpickInfo.price   = price.slice(1);

    this.versionItem.eq(curIndex).addClass('current')
                    .siblings().removeClass('current');

  }

  colorChange (tar) {
    const $tar     = $(tar),
          curIndex = $tar.index(),
          color    = $tar.attr('data-content'),
          pic      = $tar.attr('data-pic');

    this.userpickInfo.color = color;
    this.userpickInfo.img   = pic;

    this.colorItem.eq(curIndex).addClass('current')
                    .siblings().removeClass('current');
    this.detailPic.prop('src', pic);

  }

  handleBtn (e) {
    const { _this } = e.data,
          field     = $(this).attr('data-field');

    switch (field) {
      case 'addToCart':
        _this.addToCart();
        break;
      case 'purcase':
        _this.purcase();
        break;
      default:
        break;
    }
  }

  addToCart () {
    this.detailModel.addToCart(this.userpickInfo);
  }

  purcase () {
    this.detailModel.purcase(this.userpickInfo);
  }
}

export default DetailBoard;