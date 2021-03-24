import App from './App';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Tab from '@/components/tab';
import BoardContent from '@/components/boardContent';
import { getUrlQueryValue } from 'utils/tools'

class List extends App {
  constructor ($) {
    super($, {
      swiper: false,
      phone: true,
      field: true
    })
    this.keyword = getUrlQueryValue('keyword');
    
  }

  render () {
    const tab = new Tab(this.$app, this.cache.fieldData, this.cache.phoneData)

    new Header(this.$app, this.cache.fieldData, this.cache.phoneData).init();

    tab.init();

    new BoardContent(this.$app, tab.filterData(this.cache.phoneData, 'all', this.keyword)).init();

    new Footer(this.$app).init();
    
    $('body').prepend(this.$app);
  }
}

new List(jQuery);