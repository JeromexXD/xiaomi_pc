import tpl from './tpl/wrapper.tpl';
import itemTpl from './tpl/item.tpl';
import indicatorTpl from './tpl/indicator.tpl';
import controlTpl from './tpl/control.tpl';
import { tplReplace, trimSpace } from 'utils/tools';

import './index.scss';

class Carousel {
  constructor (el, data) {
    this.name = 'carousel';
    this.$el = el;
    this.data = data;
    this.dataLen = this.data.length;
    this.curIdx = 0;
  }

  async init () {
    await this.render();
    this.autoPlay();
    this.bindEvent();
  }

  async render () {
    let carHTML = tplReplace(tpl(), {
      list: this.makeList(),
      control: controlTpl(),
      indicatorW: 18 * this.dataLen,
      indicator: this.makeIndicator()
    })

    await this.$el.append(carHTML);
    this.$carousel = $('.J_carousel');
    this.$carItems = this.$carousel.find('.car-item');
    this.$carIndicators = this.$carousel.find('.indicator-item');
  }

  bindEvent () {
    this.$carousel.on('mouseenter', $.proxy(this.mouseInOut, this));
    this.$carousel.on('mouseleave', $.proxy(this.mouseInOut, this));
    this.$carousel.on('click', $.proxy(this.carouselClick, this));
  }

  carouselClick (e) {
    const { target } = e,
           className = trimSpace(target.className),
           $target   = $(target);

    switch (className) {
      case 'indicator-item':
        this.curIdx = $target.index();
        this.fadeAction(this.curIdx);
        break;
      case 'car-control':
        const dir = $target.attr('data-dir');
        this.run(dir);
        break;
      default:
        break;
    }
  }

  mouseInOut (e) {
    let { type } = e;
    switch (type) {
      case 'mouseenter':
        clearInterval(Carousel.timer);
        break;
      case 'mouseleave':
        this.autoPlay();
        break;
      default:
        break;
    }
  }

  autoPlay () {
    Carousel.timer = setInterval(this.run.bind(this, 'next'), 3000);
  }

  run (dir) {
    switch (dir) {
      case 'prev': 
        if (this.curIdx === 0) {
          this.curIdx = this.dataLen - 1;
        } else {
          this.curIdx --;
        }
        break;
      case 'next':
        if (this.curIdx >= this.dataLen - 1) {
          this.curIdx = 0
        } else {
          this.curIdx ++;
        }
        break;
      default:
        break;
    }

    this.fadeAction(this.curIdx);
  }

  fadeAction (index) {
    this.$carItems.eq(index).fadeIn()
  	              .siblings().fadeOut();
    this.$carIndicators.eq(index).addClass('current')
                  .siblings().removeClass('current');
  }

  makeList () {
    let list = '';

    this.data.forEach((item, index) => {
      list += tplReplace(itemTpl(), {
        id: item.id,
        isActive: index === 0 ? 'active' : '',
        swiper_img: item.pic,
        alt: item.alt
      })
    })

    return list;
  }

  makeIndicator () {
    let list = '';

    this.data.forEach((item, index) => {
      list += tplReplace(indicatorTpl(), {
        isCurrent: index === 0 ? 'current' : ''
      })
    })
    
    return list;
  }

}

export default Carousel;