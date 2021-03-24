import App from './App';
import Header from '@/components/header';
import Carousel from '@/components/carousel';
import BoardTitle from '@/components/boardTitle';
import BoardContent from '@/components/boardContent';
import Footer from '@/components/footer';

class Index extends App {
  constructor ($) {
    super($, {
      swiper: true,
      phone: true,
      field: true
    })
  }

  render () {
    new Header(this.$app, this.cache.fieldData, this.cache.phoneData).init();

    new Carousel(this.$app, this.cache.swiperData).init();

    new BoardTitle(this.$app, '手机上新').init();

    new BoardContent(this.$app, this.filterPhoneData('new')).init();

    new BoardTitle(this.$app, '超值手机').init();

    new BoardContent(this.$app, this.filterPhoneData('most_value')).init();

    new BoardTitle(this.$app, '官方推荐').init();

    new BoardContent(this.$app, this.filterPhoneData('recom')).init();

    new Footer(this.$app).init();
    
    $('body').prepend(this.$app);
  }

  filterPhoneData (field) {
    switch (field) {
      case 'new':
        return this.cache.phoneData.filter(item => {
          return item.new === '1';
        })
      case 'most_value':
        return this.cache.phoneData.filter(item => {
          return item.most_value === '1';
        })
      case 'recom':
        return this.cache.phoneData.filter(item => {
          return item.recom === '1';
        })
      default:
        break;
    }
  }
}

new Index(jQuery);
