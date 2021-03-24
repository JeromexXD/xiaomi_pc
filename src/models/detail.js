import  config from 'utils/config';
import { getDateTime } from 'utils/tools';

class DetailModel {
  getPhoneInfo (id) {
    const url = `getPhoneInfo?id=${id}`;
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

  addToCart (phoneInfo) {
    let cartData = localStorage.getItem('cartData');

    if (cartData) {
      cartData = $.parseJSON(cartData);

      let _res = cartData.filter(item => {
        if (item.id === phoneInfo.id) {
          if (item.version === phoneInfo.version && item.color === phoneInfo.color) {
            return true;
          }
        }
      })

      if (_res.length <= 0) {
        setCartData();
      } else {
        alert('购物车中已存在此商品');
      }
    } else {
      cartData = [];
      setCartData();
    }

    function setCartData() {
      cartData.push(phoneInfo);
      localStorage.setItem('cartData', JSON.stringify(cartData));
      alert('成功添加至购物车');
    }

  }

  purcase (phoneInfo) {
    let purcaseData = localStorage.getItem('purcaseData');
    
    if (purcaseData) {
      purcaseData = JSON.parse(purcaseData);

      let _res = purcaseData.filter(item => {
        if (item.id === phoneInfo.id) {
          if (item.version === phoneInfo.version && item.color === phoneInfo.color) {
            return true;
          }
        }
      })

      if (_res.length <= 0) {
        setPurcaseData();
        removeInfoFromCart();
      } else {
        alert('该产品已购买')
      }
    } else {
      purcaseData = [];

      setPurcaseData();
      removeInfoFromCart();
    }

    function setPurcaseData() {
      phoneInfo.purcaseTime = getDateTime();
      purcaseData.push(phoneInfo);
      localStorage.setItem('purcaseData', JSON.stringify(purcaseData));
      alert('购买成功')
    }

    function removeInfoFromCart() {
      let cartData = localStorage.getItem('cartData');

      if (cartData) {
        cartData = JSON.parse(cartData);
        
        cartData = cartData.filter(item => {
          if (item.id === phoneInfo.id) {
            if (item.version === phoneInfo.version && item.color === phoneInfo.color) {
              return false;
            }
          }
          return true;
        })

        localStorage.setItem('cartData', JSON.stringify(cartData));
      }
    }
  }

}

export default DetailModel;