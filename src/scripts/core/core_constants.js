export const OIL_SPEC = {
  CMP_ID: 80,
  CMP_VERSION: 1,
  LATEST_CONSENT_STRING_VERSION: 1
};

export const OIL_CONFIG = {
  ATTR_CONFIG_VERSION: 'config_version',
  ATTR_ACTIVATE_POI: 'poi_activate_poi',
  ATTR_HUB_ORIGIN: 'poi_hub_origin',
  ATTR_HUB_PATH: 'poi_hub_path',
  ATTR_PUBLIC_PATH: 'publicPath',
  ATTR_HUB_LOCATION: 'poi_hub_location', // complete hub location, gets generated
  ATTR_PREVIEW_MODE: 'preview_mode',
  ATTR_COOKIE_EXPIRES_IN_DAYS: 'cookie_expires_in_days',
  ATTR_COOKIE_DOMAIN: 'cookie_domain',
  ATTR_TIMESTAMP: 'timestamp',
  ATTR_PRIVACY_PAGE_URL: 'privacy_page_url',
  ATTR_POI_GROUP_NAME: 'poi_group_name',
  ATTR_ADVANCED_SETTINGS: 'advanced_settings',
  ATTR_PERSIST_MINIMUM_TRACKING: 'persist_min_tracking',
  ATTR_LOCALE: 'locale',
  ATTR_CPC_TYPE: 'cpc_type',
  ATTR_THEME: 'theme',
  ATTR_TIMEOUT: 'timeout',
  ATTR_LOCALE_URL: 'locale_url',
  ATTR_IAB_VENDOR_LIST_URL: 'iabVendorListUrl',
  ATTR_CUSTOM_PURPOSES: 'customPurposes',
  ATTR_CUSTOM_VENDOR_LIST_URL: 'customVendorListUrl',
  ATTR_IAB_VENDOR_BLACKLIST: 'iabVendorBlacklist',
  ATTR_IAB_VENDOR_WHITELIST: 'iabVendorWhitelist',
  ATTR_SHOW_LIMITED_VENDORS_ONLY: 'show_limited_vendors_only',
  ATTR_ADVANCED_SETTINGS_PURPOSES_DEFAULT: 'advanced_settings_purposes_default',
  ATTR_DEFAULT_TO_OPTIN: 'default_to_optin',
  ATTR_GDPR_APPLIES_GLOBALLY: 'gdpr_applies_globally',
  ATTR_GDPR_APPLIES: 'gdpr_applies',
  ATTR_REQUIRE_OPTOUT_CONFIRM: 'require_optout_confirm'
};

export const OIL_CONFIG_CPC_TYPES = {
  CPC_TYPE_STANDARD: 'standard',
  CPC_TYPE_TABS: 'tabs'
};

export const OIL_CONFIG_DEFAULT_VERSION = 0;

// Main Click events
export const EVENT_NAME_OPT_IN = 'oil_optin_done';
export const EVENT_NAME_SOI_OPT_IN = 'oil_soi_optin_done';
export const EVENT_NAME_POI_OPT_IN = 'oil_poi_optin_done';
export const EVENT_NAME_OPT_OUT = 'oil_optout_done';

// Tracking Events
export const EVENT_NAME_AS_PRIVACY_SELECTED = 'oil_as_cpc_privacy_selected';
export const EVENT_NAME_ADVANCED_SETTINGS = 'oil_click_advanced_settings';
export const EVENT_NAME_TIMEOUT = 'oil_hide_layer';
export const EVENT_NAME_COMPANY_LIST = 'oil_click_company_list';
export const EVENT_NAME_THIRD_PARTY_LIST = 'oil_click_thirdparty_list';
export const EVENT_NAME_BACK_TO_MAIN = 'oil_click_back_to_main';
export const EVENT_NAME_NO_COOKIES_ALLOWED = 'oil_no_cookies_allowed';
export const EVENT_NAME_OIL_SHOWN = 'oil_shown';

// Persisted Status Events (will fire after reload)
export const EVENT_NAME_HAS_OPTED_IN = 'oil_has_optedin';

// CPC
export const PRIVACY_MINIMUM_TRACKING = 0;
export const PRIVACY_FULL_TRACKING = 1;

// Power Opt-In
export const POI_FALLBACK_NAME = 'fallback';
export const POI_FALLBACK_GROUP_NAME = 'group_name';
export const POI_PAYLOAD = 'payload';

// Power Opt-In message payload
export const OIL_PAYLOAD_PRIVACY = 'p';
export const OIL_PAYLOAD_VERSION = 'v';
export const OIL_PAYLOAD_LOCALE_VARIANT_NAME = 'lvn';
export const OIL_PAYLOAD_LOCALE_VARIANT_VERSION = 'lvv';
export const OIL_PAYLOAD_CUSTOM_PURPOSES = 'cp';
export const OIL_PAYLOAD_CUSTOM_VENDORLIST_VERSION = 'cvl';
export const OIL_PAYLOAD_CONFIG_VERSION = 'cv';

// Identify privacy page link, eg. for tracking
export const DATAQA_PRIVACY_PAGE = 'oil-PrivacyPage';

// Button labels
export const JS_CLASS_BUTTON_OPTIN = 'as-js-optin';
export const JS_CLASS_BUTTON_OILBACK = 'as-js-oilback';
export const JS_CLASS_BUTTON_PROCEED = 'as-js-proceed';
export const JS_CLASS_BUTTON_CANCEL = 'as-js-cancel';
export const JS_CLASS_BUTTON_ADVANCED_SETTINGS = 'as-js-advanced-settings';

export const CSS_CLASS_OPTOUT_DIALOG = 'as-oil-optout-confirm';

// context attributes for action items, used for ga tracking
export const DATA_CONTEXT_YES = 'YES';
export const DATA_CONTEXT_CANCEL = 'CANCEL';
export const DATA_CONTEXT_PROCEED = 'PROCEED';
export const DATA_CONTEXT_ADVANCED_SETTINGS = 'ADVANCEDSETTINGS';
export const DATA_CONTEXT_BACK = 'BACK';

export const OIL_GLOBAL_OBJECT_NAME = 'AS_OIL';

// Tag management
export const MANAGED_TAG_IDENTIFIER = 'as-oil';
export const MANAGED_TAG_IDENTIFIER_ATTRIBUTE = 'data-managed';
export const MANAGED_TAG_PURPOSES_ATTRIBUTE = 'data-purposes';
