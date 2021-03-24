import searchTpl from './index.tpl';
import { trimSpace } from 'utils/tools';
import './index.scss';

class Search {
  constructor () {
    this.name = 'search';
    this.tpl  = searchTpl();
  }

  searchPhone () {
    const $searchInput = $('#J_keyword'),
          $searchForm  = $('#J_searchForm'),
          keyword      = trimSpace($searchInput.val()),
          len          = keyword.length,
          action       = $searchForm.prop('action');
    
    if (len > 0) {
      window.open(action + '?keyword=' + keyword);
    }

  }
}

export default Search;