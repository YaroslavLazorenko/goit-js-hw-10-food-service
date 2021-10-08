import { save, load } from './js/storage';
import data from './db/menu.json';
import template from './templates/template.hbs';
import refs from './js/refs';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const DEFAULT_THEME = Theme.LIGHT;
const { menuList, body, themeSwitch } = refs;

const setTheme = theme => {
  const themeObj = {
    classToAdd: theme,
    classToRemove: null,
    themeSwitchState: null,
  };

  switch (theme) {
    case Theme.DARK:
      themeObj.classToRemove = Theme.LIGHT;
      themeObj.themeSwitchState = true;
      break;

    case Theme.LIGHT:
      themeObj.classToRemove = Theme.DARK;
      themeObj.themeSwitchState = false;
      break;

    default:
      console.error('Error: Invalid theme value');
      return;
  }

  body.classList.add(themeObj.classToAdd);
  body.classList.remove(themeObj.classToRemove);
  themeSwitch.checked = themeObj.themeSwitchState;
  save('theme', theme);
};

const markup = template(data);
menuList.insertAdjacentHTML('beforeend', markup);

const themeFromLocalStorage = load('theme');

if (themeFromLocalStorage !== undefined) {
  setTheme(themeFromLocalStorage);
} else {
  setTheme(DEFAULT_THEME);
}

const onThemeSwitchClick = () => {
  if (themeSwitch.checked) {
    setTheme(Theme.DARK);
  } else {
    setTheme(Theme.LIGHT);
  }
};

themeSwitch.addEventListener('change', onThemeSwitchClick);
