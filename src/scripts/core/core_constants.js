export const OIL_CONFIG = {
  ATTR_ACTIVATE_POI: 'poi_activate_poi',
  ATTR_HUB_ORIGIN: 'poi_hub_origin',
  ATTR_HUB_PATH: 'poi_hub_path',
  ATTR_HUB_LOCATION: 'poi_hub_location', // complete hub location, gets generated
  ATTR_SUB_SET_COOKIE: 'poi_subscriber_set_cookie',
  ATTR_PREVIEW_MODE: 'preview_mode',
  ATTR_COOKIE_EXPIRES_IN_DAYS: 'cookie_expires_in_days',
  ATTR_TIMESTAMP: 'timestamp',
  ATTR_PRIVACY_PAGE_URL: 'privacy_page_url',
  ATTR_OIL_IGNORE: 'oil_ignore',
  ATTR_OIL_POI_GROUP_NAME: 'poi_group_name',
  ATTR_ADVANCED_SETTINGS: 'advanced_settings',
  ATTR_PERSIST_MINIMUM_TRACKING: 'persist_min_tracking',
  ATTR_LOCALE: 'locale'
};

// Main Click events
export const EVENT_NAME_OPT_IN = 'oil_optin_done';
export const EVENT_NAME_SOI_OPT_IN = 'oil_soi_optin_done';
export const EVENT_NAME_POI_OPT_IN = 'oil_poi_optin_done';
export const EVENT_NAME_SOI_OPT_IN_WHILE_LATER = 'oil_soi_optin_done_while_later';
export const EVENT_NAME_POI_OPT_IN_WHILE_LATER = 'oil_poi_optin_done_while_later';
export const EVENT_NAME_OPT_LATER = 'oil_optlater_done';
export const EVENT_NAME_OPT_IGNORE = 'oil_optignore_done';

// Tracking Events
export const EVENT_NAME_AS_SELECTED_MINIMUM = 'oil_as_selected_minimum';
export const EVENT_NAME_AS_SELECTED_FUNCTIONAL = 'oil_as_selected_functional';
export const EVENT_NAME_AS_SELECTED_FULL = 'oil_as_selected_full';
export const EVENT_NAME_ADVANCED_SETTINGS = 'oil_click_advanced_settings';
export const EVENT_NAME_BACK_TO_MAIN = 'oil_click_back_to_main';
export const EVENT_NAME_NO_COOKIES_ALLOWED = 'oil_no_cookies_allowed';
export const EVENT_NAME_OIL_SHOWN = 'oil_shown';

// Persisted Status Events (will fire after reload)
export const EVENT_NAME_HAS_OPTED_IN = 'oil_has_optedin';
export const EVENT_NAME_HAS_OPTED_LATER = 'oil_has_optedlater';
export const EVENT_NAME_HAS_OPTED_IGNORE = 'oil_has_optedignore';

// Trigger Events (OIL is listening for them to trigger actions)
export const EVENT_NAME_OPT_OUT_TRIGGER = 'oil_optout_trigger';


export const POI_FALLBACK_NAME = 'fallback';
export const POI_FALLBACK_GROUP_NAME = 'group_name';
export const POI_PAYLOAD = 'payload';

// Identify privacy page link, eg. for tracking
export const DATAQA_PRIVACY_PAGE = 'oil-PrivacyPage';

// context attributes for action items, used for ga tracking
export const DATA_CONTEXT_YES = 'YES';
export const DATA_CONTEXT_YES_POI = 'YESPOI';
export const DATA_CONTEXT_LATER = 'LATER';
export const DATA_CONTEXT_ADVANCED_SETTINGS = 'ADVANCEDSETTINGS';
export const DATA_CONTEXT_YES_WHILE_LATER = 'YESWHILELATER';
export const DATA_CONTEXT_YES_POI_WHILE_LATER = 'YESPOIWHILELATER';
export const DATA_CONTEXT_IGNORE_WHILE_LATER = 'IGNOREWHILELATER';
export const DATA_CONTEXT_BACK = 'BACK';

const PRIVACY_SETTING_ID              = 'oiid';
export const PRIVACY_MINIMUM_TRACKING = 0;
export const PRIVACY_FUNCTIONAL_TRACKING = 1;
export const PRIVACY_FULL_TRACKING = 2;

export const PRIVACY_SETTING_ESSENTIAL       = 'esse';
export const PRIVACY_SETTING_ANALYTICS       = 'analy';
export const PRIVACY_SETTING_SOCIAL_CONNECT  = 'soci';
export const PRIVACY_SETTING_ADS_BASE        = 'adsbase';
export const PRIVACY_SETTING_ADS_BEHAVIOUR   = 'adsbehav';

export const PRIVACY_SETTINGS_FULL_TRACKING = {
  [PRIVACY_SETTING_ID]: PRIVACY_FULL_TRACKING,
  [PRIVACY_SETTING_ESSENTIAL]: 1,
  [PRIVACY_SETTING_ANALYTICS]: 1,
  [PRIVACY_SETTING_SOCIAL_CONNECT]: 1,
  [PRIVACY_SETTING_ADS_BASE]: 1,
  [PRIVACY_SETTING_ADS_BEHAVIOUR]: 1
};

export const PRIVACY_SETTINGS_FUNCTIONAL_TRACKING = {
  [PRIVACY_SETTING_ID]: PRIVACY_FUNCTIONAL_TRACKING,
  [PRIVACY_SETTING_ESSENTIAL]: 1,
  [PRIVACY_SETTING_ANALYTICS]: 1,
  [PRIVACY_SETTING_SOCIAL_CONNECT]: 1,
  [PRIVACY_SETTING_ADS_BASE]: 0,
  [PRIVACY_SETTING_ADS_BEHAVIOUR]: 0
};

export const PRIVACY_SETTINGS_MINIMUM_TRACKING = {
  [PRIVACY_SETTING_ID]: PRIVACY_MINIMUM_TRACKING,
  [PRIVACY_SETTING_ESSENTIAL]: 1,
  [PRIVACY_SETTING_ANALYTICS]: 1,
  [PRIVACY_SETTING_SOCIAL_CONNECT]: 0,
  [PRIVACY_SETTING_ADS_BASE]: 0,
  [PRIVACY_SETTING_ADS_BEHAVIOUR]: 0
};

export const OIL_PAYLOAD_PRIVACY = 'p';
export const OIL_PAYLOAD_VERSION = 'v';
export const OIL_PAYLOAD_LOCALE = 'l';

