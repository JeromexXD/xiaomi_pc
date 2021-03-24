import IndexModels from '@/models/index';
import '@/scss/common.scss';

class App {
  constructor ($, options) {
    this.$app   = $('<div id="app"></div>');
    this.swiper = options.swiper;
    this.phone  = options.phone;
    this.field  = options.field;
    this.cache  = null;

    this.init();
  }

  async init () {
    await this.getDatas();
    this.render();
  }

  async getDatas () {
    const indexModels = new IndexModels();

    const data = await indexModels.getDatas({
      swiper: this.swiper,
      phone: this.phone,
      field: this.field
    })

    this.cache = {
      swiperData: data.swiper_data,
      phoneData: data.phone_data,
      fieldData: data.field_data
    }
  }
}

export default App;