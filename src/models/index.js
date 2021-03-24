import config from '../utils/config';

class IndexModels {
  /* true 返回数据  false 返回null
   * options: {
       swiper: true / false,
       phone: true / false,
       field: true / false
     }
   */ 

  getDatas (options) {
    const url = `getDatas?swiper=${options.swiper}&phone=${options.phone}&field=${options.field}`;

    return $.ajax({
      url: config.API.base_url + url,
      type: 'GET',
      dataType: 'JSONP',
      jsonp: 'cb',
      success (data) {
        return data;
      }
    })
  }
}

export default IndexModels;