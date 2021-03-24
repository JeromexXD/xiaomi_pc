import App from './App';
import Header from '@/components/header';
import DetailBoard from '@/components/detailBoard';
import Footer from '@/components/footer';

import DetailModel from '@/models/detail';
import { getUrlQueryValue } from 'utils/tools';

class Detail extends App {
  constructor ($) {
    super($, {
      swiper: false,
      phone: true,
      field: true
    })

    this.phoneId = getUrlQueryValue('id');

  }

  async render () {
    const phoneInfo = await new DetailModel().getPhoneInfo(this.phoneId);
    
    new Header(this.$app, this.cache.fieldData, this.cache.phoneData).init();

    new DetailBoard(this.$app, phoneInfo).init();

    new Footer(this.$app).init();
    
    $('body').prepend(this.$app);
  }

}

new Detail(jQuery);