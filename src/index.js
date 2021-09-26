import './js/storage';
import data from './db/menu.json';
import template from './templates/template.hbs';
import refs from './js/refs';

const { list } = refs;
const markup = template(data);
list.insertAdjacentHTML('beforeend', markup);
