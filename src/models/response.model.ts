export interface ICard {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: string;
}

export interface IArr {
  [key: string]: ICard;
}

export type ForArrayOfDiffQualities = (string | undefined)[];

export enum ClassName {
  ACTIVE = 'active',
  AREA = 'area',
  AUDIO = '.audio',
  AUDIO_CONTROL = '.audio-control',
  BELL = 'колокольчик',
  BG_CONTAINER = '.bg-container',
  BUTTON = 'button',
  CARD = '.card',
  CARD_CONTAINER = '.card-container',
  DRAG_ENTER = 'drag-enter',
  FAS = 'fas',
  FA_SNOWFLAKE = 'fa-snowflake',
  FAVORITE_INPUT = '.favorite-input',
  FAVORITES_CONTAINER = '.favorites-container',
  FAVORITES_PAGE = '.favorites-page',
  FILTERS = '.filters',
  GARLAND_BTNS = '.garland-btns',
  GARLAND_TREE_CONTAINER = '.garland-tree-container',
  HIDE = 'hide',
  MAIN_TREE = '.main-tree',
  MAIN_TREE_CONTAINER = '.main-tree-container',
  MULTICOLOR = 'multicolor',
  ONOFFSWITCH_CHECKBOX = '.onoffswitch-checkbox',
  RESET = '.reset',
  RESETLS = '.resetls',
  SELECT = 'select',
  SNOW_CONTROL = '.snow-control',
  SORT_COUNT_MAX = 'sort-count-max',
  SORT_COUNT_MIN = 'sort-count-min',
  SORT_NAME_MAX = 'sort-name-max',
  SORT_NAME_MIN = 'sort-name-min',
  START_PAGE = '.start-page',
  SWITCH_START_PAGE = '.switch-start-page',
  SWITCH_TOY_PAGE = 'switchToyPage',
  TOY_PAGE = 'toyPage',
  TREE_CONTAINER = '.tree-container',
}

export enum IdName {
  COUNTER = 'counter',
  OUTPUT_0 = 'output-0',
  OUTPUT_1 = 'output-1',
  OUTPUT_2 = 'output-2',
  OUTPUT_3 = 'output-3',
  RANGE_SLIDER = 'range-slider',
  START_TOY_GAME = 'startToyGame',
  SWITCH_TOY_PAGE = 'switchToyPage',
  START_TREE_GAME = 'startTreeGame',
  TREE_PAGE = 'treePage',
  TOY_PAGE = 'toyPage',
  YEAR_SLIDER = 'year-slider',
}

export enum LocalState {
  audio = 'audio',
  currentValue = 'currentValue',
  currentValueTree = 'currentValueTree',
  no = 'no',
  nosnow = 'nosnow',
  snow = 'snow',
  text = 'text',
  yes = 'yes',
  yessnow = 'yessnow',
  DRAG = 'drag',
  DRAGENTER = 'dragenter',
  DRAGSTART = 'dragstart',
  DROP = 'drop',
  DRAGOVER = 'dragover',
  DRAGLEAVE = 'dragleave',
}
