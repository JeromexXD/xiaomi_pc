import tpl from './tpl/wrapper.tpl';
import itemTpl from './tpl/item.tpl';
import BoardContent from '../boardContent';
import NoDataTip from '../noDataTip';
import { tplReplace, throttle, trimSpace } from 'utils/tools';
import './index.scss'

class Tab {
  constructor (el, fieldData, phoneData) {
    this.name      = 'tab';
    this.$el       = el;
    this.fieldData = fieldData;
    this.phoneData = phoneData;
    this.cachelist = {};
    this.noDataTip = new NoDataTip();
  }

  async init () {
    await this.render();
    this.bindEvent();
  }

  async render () {
    await this.$el.append(
      tplReplace(tpl(), {
        list: this.makeList()
      })
    )
  }

  bindEvent () {
    const $tab = $('.J_tab'),
          $board = $('.J_board'),
          $input = $('#J_search'),
          boardContent = new BoardContent();

    $tab.on('click', '.tab-item', {
      $board, 
      boardContent
    }, $.proxy(this.tabClick, this));

    $input.on('keyup', {$tab, $board, boardContent}, throttle($.proxy(this.searchPhone, this), 600))
  }

  tabClick (e) {
    const { target, data } = e,
          $tar = $(target),
          tagName = target.tagName.toLowerCase(),
          { $board, boardContent} = data


    if (tagName === 'a') {
      const field = $tar.attr('data-field');
      this.tabChange($tar);
      this.appendList(field, $board, boardContent);
    }
  }

  tabChange (tar) {
    tar.parent().addClass('current')
       .siblings().removeClass('current');
  }

  searchPhone (e) {
    const { $tab, $board, boardContent } = e.data,
          tar = e.target,
          $tar = $(tar),
          value = trimSpace($tar.val()),
          len = value.length;
    this.tabChange($tab.find('.all'));
    
    if (len <= 0) {
      this.appendList('all', $board, boardContent);
    } else {
      this.appendList('all', $board, boardContent, value);
    }
  }

  appendList (field, $board, boardContent, keyword) {
    if (keyword) {
      let data = this.filterData(this.phoneData, 'all', keyword),
          len = data.length;
      
      if (len === 0) {
        $board.html(this.noDataTip.tpl());
      } else {
        $board.html(boardContent.makeList(data));
      }
    } else {
      if (!this.cachelist[field]) {
        this.cachelist[field] = boardContent.makeList(this.filterData(this.phoneData, field));
      }

      $board.html(this.cachelist[field]);
    }
  }

  filterData (data, field, keyword) {
    return data.filter(item => {
      if (keyword) {
        const phoneName = item.phone_name.toLowerCase(),
              slogan = item.slogan.toLowerCase();

        keyword = keyword.toLowerCase();
        return phoneName.includes(keyword) || slogan.includes(keyword);
      } else {
        switch (field) {
          case 'all':
            return true;
          default: 
            return item.field === field;
            break;
        }
      }
    })
  }

  makeList () {
    let list = '';

    this.fieldData.forEach((item, index) => {
      list += tplReplace(itemTpl(), {
        field: item.field,
        series_name: item.series_name
      })
    })

    return list;
  }
}

export default Tab;