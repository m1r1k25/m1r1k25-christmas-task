import './style.css';
import './nouislider.css';
import { loadSlider } from './components/loadSlider';
import { goToHome, goToGame, goToTree } from './components/buttonsHomePlay';
import { favorites } from './components/favorites';
import { sortBySelect } from './components/sortBySelect';
import { filter } from './components/filters';
import {
  audioPlay,
  snowOn,
  changeTree,
  changeBG,
} from './components/settings';
import { garlandOn, switchGarlnd } from './components/doGarland';

loadSlider();

goToHome();

goToGame();

favorites();

sortBySelect();

filter();

goToTree();

changeTree();

changeBG();

audioPlay();

snowOn();

garlandOn();

switchGarlnd();
