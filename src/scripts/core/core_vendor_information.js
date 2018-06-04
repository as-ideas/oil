import {getIabVendorListUrl} from './core_config';
import {logError} from './core_log';
import {fetchJsonData} from './core_utils';

// Note: This is the vendor list (version 27) from https://vendorlist.consensu.org/vendorlist.json.
const defaultVendorList = {
  vendorListVersion: 27,
  lastUpdated: '2018-05-23T16:00:15Z',
  purposes: [
    {
      id: 1,
      name: 'Information storage and access',
      description: 'The storage of information, or access to information that is already stored, on your device such as advertising identifiers, device identifiers, cookies, and similar technologies.'
    },
    {
      id: 2,
      name: 'Personalisation',
      description: 'The collection and processing of information about your use of this service to subsequently personalise advertising and/or content for you in other contexts, such as on other websites or apps, over time. Typically, the content of the site or app is used to make inferences about your interests, which inform future selection of advertising and/or content.'
    },
    {
      id: 3,
      name: 'Ad selection, delivery, reporting',
      description: 'The collection of information, and combination with previously collected information, to select and deliver advertisements for you, and to measure the delivery and effectiveness of such advertisements. This includes using previously collected information about your interests to select ads, processing data about what advertisements were shown, how often they were shown, when and where they were shown, and whether you took any action related to the advertisement, including for example clicking an ad or making a purchase. This does not include personalisation, which is the collection and processing of information about your use of this service to subsequently personalise advertising and/or content for you in other contexts, such as websites or apps, over time.'
    },
    {
      id: 4,
      name: 'Content selection, delivery, reporting',
      description: 'The collection of information, and combination with previously collected information, to select and deliver content for you, and to measure the delivery and effectiveness of such content. This includes using previously collected information about your interests to select content, processing data about what content was shown, how often or how long it was shown, when and where it was shown, and whether the you took any action related to the content, including for example clicking on content. This does not include personalisation, which is the collection and processing of information about your use of this service to subsequently personalise content and/or advertising for you in other contexts, such as websites or apps, over time.'
    },
    {
      id: 5,
      name: 'Measurement',
      description: 'The collection of information about your use of the content, and combination with previously collected information, used to measure, understand, and report on your usage of the service. This does not include personalisation, the collection of information about your use of this service to subsequently personalise content and/or advertising for you in other contexts, i.e. on other service, such as websites or apps, over time.'
    }
  ],
  features: [
    {
      id: 1,
      name: 'Matching Data to Offline Sources',
      description: 'Combining data from offline sources that were initially collected in other contexts.'
    },
    {
      id: 2,
      name: 'Linking Devices',
      description: 'Allow processing of a user\'s data to connect such user across multiple devices.'
    },
    {
      id: 3,
      name: 'Precise Geographic Location Data',
      description: 'Allow processing of a user\'s precise geographic location data in support of a purpose for which that certain third party has consent.'
    }
  ],
  vendors: [
    {
      id: 8,
      name: 'Emerse Sverige AB',
      policyUrl: 'https://www.emerse.com/privacy-policy/',
      purposeIds: [
        1,
        2,
        4
      ],
      legIntPurposeIds: [
        3,
        5
      ],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 12,
      name: 'BeeswaxIO Corporation',
      policyUrl: 'https://www.beeswax.com/privacy.html',
      purposeIds: [
        1,
        3,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        3
      ]
    },
    {
      id: 28,
      name: 'TripleLift, Inc.',
      policyUrl: 'https://triplelift.com/privacy/',
      purposeIds: [
        1,
        3
      ],
      legIntPurposeIds: [],
      featureIds: [
        3
      ]
    },
    {
      id: 9,
      name: 'AdMaxim Inc.',
      policyUrl: 'http://www.admaxim.com/privacy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 27,
      name: 'ADventori SAS',
      policyUrl: 'https://www.adventori.com/with-us/legal-notice/',
      purposeIds: [
        2
      ],
      legIntPurposeIds: [
        1,
        3,
        4,
        5
      ],
      featureIds: []
    },
    {
      id: 25,
      name: 'Oath (EMEA) Limited',
      policyUrl: 'https://policies.oath.com/ie/en/oath/privacy/index.html',
      purposeIds: [
        1,
        2
      ],
      legIntPurposeIds: [
        3,
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 26,
      name: 'Venatus Media Limited',
      policyUrl: 'https://www.venatusmedia.com/privacy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 1,
      name: 'Exponential Interactive, Inc',
      policyUrl: 'http://exponential.com/privacy',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 6,
      name: 'AdSpirit GmbH',
      policyUrl: 'http://www.adspirit.de/privacy',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 30,
      name: 'BidTheatre AB',
      policyUrl: 'https://www.bidtheatre.com/privacy-policy',
      purposeIds: [
        2
      ],
      legIntPurposeIds: [
        1,
        3
      ],
      featureIds: [
        2,
        3
      ]
    },
    {
      id: 24,
      name: 'Conversant Europe Ltd.',
      policyUrl: 'https://www.conversantmedia.eu/legal/privacy-policy',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 29,
      name: 'Etarget SE',
      policyUrl: 'https://www.etarget.sk/privacy.php',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1
      ]
    },
    {
      id: 39,
      name: 'ADITION technologies AG',
      policyUrl: 'adition.com/datenschutz',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 11,
      name: 'Quantcast International Limited',
      policyUrl: 'https://www.quantcast.com/privacy/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 15,
      name: 'Adikteev',
      policyUrl: 'https://www.adikteev.com/eu/privacy/',
      purposeIds: [
        1,
        2
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 4,
      name: 'Roq.ad GmbH',
      policyUrl: 'https://www.roq.ad/privacy-policy',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        2,
        3
      ]
    },
    {
      id: 7,
      name: 'Vibrant Media Limited',
      policyUrl: 'https://www.vibrantmedia.com/en/privacy-policy/',
      purposeIds: [
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [
        1
      ],
      featureIds: []
    },
    {
      id: 2,
      name: 'Captify Technologies Limited',
      policyUrl: 'http://www.captify.co.uk/privacy-policy/',
      purposeIds: [
        2,
        3,
        5
      ],
      legIntPurposeIds: [
        1
      ],
      featureIds: [
        2
      ]
    },
    {
      id: 37,
      name: 'NEURAL.ONE',
      policyUrl: 'https://web.neural.one/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 13,
      name: 'Sovrn Holdings Inc',
      policyUrl: 'https://www.sovrn.com/sovrn-privacy/',
      purposeIds: [
        1,
        2,
        3
      ],
      legIntPurposeIds: [],
      featureIds: [
        2,
        3
      ]
    },
    {
      id: 34,
      name: 'NEORY GmbH',
      policyUrl: 'https://www.neory.com/privacy.html',
      purposeIds: [
        1,
        2,
        4,
        5
      ],
      legIntPurposeIds: [
        3
      ],
      featureIds: []
    },
    {
      id: 32,
      name: 'AppNexus Inc.',
      policyUrl: 'https://www.appnexus.com/en/company/platform-privacy-policy',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        3
      ],
      featureIds: [
        2,
        3
      ]
    },
    {
      id: 10,
      name: 'Index Exchange, Inc. ',
      policyUrl: 'www.indexexchange.com/privacy',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [],
      featureIds: [
        2,
        3
      ]
    },
    {
      id: 57,
      name: 'ADARA MEDIA UNLIMITED',
      policyUrl: 'https://adara.com/2018/04/10/adara-gdpr-faq/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 63,
      name: 'Avocet Systems Limited',
      policyUrl: 'http://www.avocet.io/privacy-policy',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        3
      ],
      featureIds: []
    },
    {
      id: 51,
      name: 'xAd, Inc. dba GroundTruth',
      policyUrl: 'https://www.groundtruth.com/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 49,
      name: 'Tradelab, SAS',
      policyUrl: 'http://tradelab.com/en/privacy/',
      purposeIds: [
        1,
        2,
        3
      ],
      legIntPurposeIds: [
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 45,
      name: 'Smart Adserver',
      policyUrl: 'http://smartadserver.com/company/privacy-policy/',
      purposeIds: [
        1,
        2
      ],
      legIntPurposeIds: [
        3,
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 52,
      name: 'The Rubicon Project, Limited',
      policyUrl: 'http://rubiconproject.com/rubicon-project-yield-optimization-privacy-policy/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3,
        4,
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 35,
      name: 'Purch Group, Inc.',
      policyUrl: 'http://www.purch.com/privacy-policy/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        3,
        5
      ],
      featureIds: []
    },
    {
      id: 71,
      name: 'Dataxu, Inc. ',
      policyUrl: 'https://www.dataxu.com/about-us/privacy/data-collection-platform/',
      purposeIds: [
        1,
        2,
        3
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 79,
      name: 'MediaMath, Inc.',
      policyUrl: 'http://www.mediamath.com/privacy-policy/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 91,
      name: 'Criteo SA',
      policyUrl: 'https://www.criteo.com/privacy/',
      purposeIds: [
        1,
        2,
        3
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 85,
      name: 'Crimtan Holdings Limited',
      policyUrl: 'https://crimtan.com/privacy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 16,
      name: 'RTB House S.A.',
      policyUrl: 'https://www.rtbhouse.com/privacy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 86,
      name: 'Scene Stealer Limited',
      policyUrl: 'http://scenestealer.tv/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        3
      ]
    },
    {
      id: 94,
      name: 'Blis Media Limited',
      policyUrl: 'http://www.blis.com/privacy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 73,
      name: 'Simplifi Holdings Inc.',
      policyUrl: 'https://www.simpli.fi/site-privacy-policy2/',
      purposeIds: [
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [
        1
      ],
      featureIds: [
        2,
        3
      ]
    },
    {
      id: 67,
      name: 'LifeStreet Corporation',
      policyUrl: 'http://www.lifestreet.com/privacy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 33,
      name: 'ShareThis, Inc.',
      policyUrl: 'http://www.sharethis.com/privacy/',
      purposeIds: [
        2,
        3,
        4
      ],
      legIntPurposeIds: [
        1,
        5
      ],
      featureIds: []
    },
    {
      id: 20,
      name: 'N Technologies Inc.',
      policyUrl: 'https://n.rich/privacy-notice',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: [
        2
      ]
    },
    {
      id: 55,
      name: 'Madison Logic, Inc.',
      policyUrl: 'https://www.madisonlogic.com/privacy/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 53,
      name: 'Sirdata',
      policyUrl: 'https://www.sirdata.com/privacy/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 69,
      name: 'OpenX Software Ltd. and its affiliates',
      policyUrl: 'https://www.openx.com/legal/privacy-policy/',
      purposeIds: [
        1,
        2,
        3
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 98,
      name: 'mPlatform',
      policyUrl: 'https://www.groupm.com/mplatform-privacy-policy',
      purposeIds: [
        1,
        2,
        3,
        4
      ],
      legIntPurposeIds: [
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 62,
      name: 'Justpremium BV',
      policyUrl: 'http://justpremium.com/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 19,
      name: 'Intent Media, Inc.',
      policyUrl: 'https://intentmedia.com/privacy-policy/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3,
        4,
        5
      ],
      featureIds: [
        2
      ]
    },
    {
      id: 43,
      name: 'Vdopia DBA Chocolate Platform',
      policyUrl: 'https://chocolateplatform.com/privacy-policy/',
      purposeIds: [
        1,
        3
      ],
      legIntPurposeIds: [],
      featureIds: [
        3
      ]
    },
    {
      id: 36,
      name: 'RhythmOne, LLC',
      policyUrl: 'https://www.rhythmone.com/privacy-policy',
      purposeIds: [
        5
      ],
      legIntPurposeIds: [
        1,
        2,
        3,
        4
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 80,
      name: 'Sharethrough, Inc',
      policyUrl: 'https://platform-cdn.sharethrough.com/privacy-policy',
      purposeIds: [
        3,
        5
      ],
      legIntPurposeIds: [
        1
      ],
      featureIds: []
    },
    {
      id: 81,
      name: 'PulsePoint, Inc.',
      policyUrl: 'https://www.pulsepoint.com/privacy-policy',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 23,
      name: 'Amobee, Inc. ',
      policyUrl: 'https://www.amobee.com/trust/privacy-guidelines',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 75,
      name: 'M32 Media Inc',
      policyUrl: 'https://m32.media/privacy-cookie-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        3
      ]
    },
    {
      id: 17,
      name: 'Greenhouse Group BV (with its trademark LemonPI)',
      policyUrl: 'https://www.lemonpi.io/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        2
      ]
    },
    {
      id: 61,
      name: 'GumGum, Inc.',
      policyUrl: 'https://gumgum.com/privacy-policy',
      purposeIds: [
        1,
        2,
        3,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        3
      ]
    },
    {
      id: 40,
      name: 'Active Agent AG',
      policyUrl: 'http://www.active-agent.com/de/unternehmen/datenschutzerklaerung/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 76,
      name: 'PubMatic, Inc.',
      policyUrl: 'https://pubmatic.com/privacy-policy/',
      purposeIds: [
        1,
        2
      ],
      legIntPurposeIds: [
        3,
        4,
        5
      ],
      featureIds: []
    },
    {
      id: 89,
      name: 'Tapad, Inc. ',
      policyUrl: 'https://www.tapad.com/privacy',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3,
        5
      ],
      featureIds: [
        2
      ]
    },
    {
      id: 46,
      name: 'Skimbit Ltd',
      policyUrl: 'https://skimlinks.com/pages/privacy-policy',
      purposeIds: [
        1,
        2,
        3
      ],
      legIntPurposeIds: [
        5
      ],
      featureIds: [
        2
      ]
    },
    {
      id: 66,
      name: 'adsquare GmbH',
      policyUrl: 'www.adsquare.com/privacy',
      purposeIds: [
        1,
        2,
        3,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 105,
      name: 'Impression Desk Technologies Limited',
      policyUrl: 'impressiondesk.com',
      purposeIds: [
        1,
        3,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        2,
        3
      ]
    },
    {
      id: 41,
      name: 'Adverline',
      policyUrl: 'https://www.adverline.com/privacy/',
      purposeIds: [
        2
      ],
      legIntPurposeIds: [
        1,
        3
      ],
      featureIds: []
    },
    {
      id: 3,
      name: 'affilinet',
      policyUrl: 'https://www.affili.net/de/footeritem/datenschutz',
      purposeIds: [
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 82,
      name: 'Smaato, Inc.',
      policyUrl: 'https://www.smaato.com/privacy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        3
      ]
    },
    {
      id: 60,
      name: 'Rakuten Marketing LLC',
      policyUrl: 'https://rakutenmarketing.com/legal-notices/services-privacy-policy',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 70,
      name: 'Yieldlab AG',
      policyUrl: 'http://www.yieldlab.de/meta-navigation/datenschutz/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        3
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 50,
      name: 'Adform A/S',
      policyUrl: 'https://site.adform.com/privacy-policy-opt-out/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 48,
      name: 'NetSuccess, s.r.o.',
      policyUrl: 'https://www.inres.sk/pp/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 100,
      name: 'Fifty Technology Limited',
      policyUrl: 'https://fiftymedia.com/privacy-policy/',
      purposeIds: [
        2,
        3,
        5
      ],
      legIntPurposeIds: [
        1
      ],
      featureIds: []
    },
    {
      id: 21,
      name: 'The Trade Desk, Inc and affiliated companies',
      policyUrl: 'https://www.thetradedesk.com/general/privacy-policy',
      purposeIds: [
        1,
        2
      ],
      legIntPurposeIds: [
        3
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 110,
      name: 'Hottraffic BV (DMA Institute)',
      policyUrl: 'https://www.dma-institute.com/additional-information-for-data-subjects/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: []
    },
    {
      id: 42,
      name: 'Taboola Europe Limited',
      policyUrl: 'https://www.taboola.com/privacy-policy',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 112,
      name: 'Maytrics GmbH',
      policyUrl: 'https://maytrics.com/node/2',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 77,
      name: 'comScore, Inc.',
      policyUrl: 'https://www.comscore.com/About-comScore/Privacy-Policy',
      purposeIds: [
        1,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        2
      ]
    },
    {
      id: 109,
      name: 'LoopMe Ltd',
      policyUrl: 'https://loopme.com/privacy/',
      purposeIds: [
        1,
        2,
        3,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 120,
      name: 'Eyeota Ptd Ltd',
      policyUrl: 'https://www.eyeota.com/privacy-policy/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2
      ],
      featureIds: [
        1
      ]
    },
    {
      id: 93,
      name: 'Adloox SA',
      policyUrl: 'http://adloox.com/disclaimer',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        5
      ],
      featureIds: []
    },
    {
      id: 132,
      name: 'Teads ',
      policyUrl: 'https://teads.tv/privacy-policy/',
      purposeIds: [
        1,
        2
      ],
      legIntPurposeIds: [
        3
      ],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 22,
      name: 'admetrics GmbH',
      policyUrl: 'https://admetrics.io/en/privacy_policy/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        3,
        4,
        5
      ],
      featureIds: []
    },
    {
      id: 102,
      name: 'SlimCut Media SAS',
      policyUrl: 'http://www.slimcutmedia.com/privacy-policy/',
      purposeIds: [
        1,
        2
      ],
      legIntPurposeIds: [
        3
      ],
      featureIds: []
    },
    {
      id: 108,
      name: 'Rich Audience',
      policyUrl: 'https://richaudience.com/privacy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        3
      ]
    },
    {
      id: 18,
      name: 'Widespace AB',
      policyUrl: 'https://www.widespace.com/legal/privacy-policy-notice/',
      purposeIds: [
        1,
        2,
        3
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 68,
      name: 'Sizmek Technologies, Inc. ',
      policyUrl: 'https://www.sizmek.com/privacy-policy/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3,
        4,
        5
      ],
      featureIds: [
        2
      ]
    },
    {
      id: 122,
      name: 'Avid Media Ltd',
      policyUrl: 'http://www.avidglobalmedia.eu/privacy-policy.html',
      purposeIds: [
        1,
        2,
        3
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 118,
      name: 'Drawbridge, Inc.',
      policyUrl: 'http://www.drawbridge.com/privacy/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [],
      featureIds: [
        2
      ]
    },
    {
      id: 97,
      name: 'LiveRamp, Inc.',
      policyUrl: 'www.liveramp.com/service-privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 74,
      name: 'Admotion SRL',
      policyUrl: 'http://www.admotion.com/policy/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        3
      ],
      featureIds: []
    },
    {
      id: 138,
      name: 'ConnectAd Realtime GmbH',
      policyUrl: 'http://connectadrealtime.com/privacy/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        3
      ],
      featureIds: []
    },
    {
      id: 95,
      name: 'Lotame Solutions, Inc.',
      policyUrl: 'https://www.lotame.com/about-lotame/privacy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 72,
      name: 'Nano Interactive GmbH',
      policyUrl: 'http://www.nanointeractive.com/privacy',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        5
      ],
      featureIds: []
    },
    {
      id: 127,
      name: 'PIXIMEDIA SAS',
      policyUrl: 'https://piximedia.com/privacy/',
      purposeIds: [
        1,
        2,
        4
      ],
      legIntPurposeIds: [
        3,
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 136,
      name: 'Str\\u00f6er SSP GmbH',
      policyUrl: 'https://www.stroeer.de/fileadmin/user_upload/Datenschutz.pdf',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        5
      ],
      featureIds: [
        2,
        3
      ]
    },
    {
      id: 111,
      name: 'ShowHeroes GmbH',
      policyUrl: 'http://showheroes.com/privacy',
      purposeIds: [],
      legIntPurposeIds: [
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 56,
      name: 'Confiant Inc.',
      policyUrl: 'https://www.confiant.com/privacy',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [],
      featureIds: [
        1
      ]
    },
    {
      id: 124,
      name: 'Teemo SA',
      policyUrl: 'https://teemo.co/fr/confidentialite/',
      purposeIds: [
        1,
        2,
        3,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        3
      ]
    },
    {
      id: 154,
      name: 'YOC AG',
      policyUrl: 'https://yoc.com/privacy/',
      purposeIds: [
        1,
        2
      ],
      legIntPurposeIds: [
        3,
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 38,
      name: 'Beemray Oy',
      policyUrl: 'https://www.beemray.com/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        3
      ]
    },
    {
      id: 101,
      name: 'MiQ',
      policyUrl: 'http://wearemiq.com/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 149,
      name: 'ADman Interactive SL',
      policyUrl: 'http://admanmedia.com/politica',
      purposeIds: [
        1,
        2,
        3
      ],
      legIntPurposeIds: [
        5
      ],
      featureIds: []
    },
    {
      id: 151,
      name: 'Admedo Ltd',
      policyUrl: 'https://www.admedo.com/privacy-policy',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 153,
      name: 'MADVERTISE MEDIA',
      policyUrl: 'http://madvertise.com/en/gdpr/',
      purposeIds: [
        1,
        2
      ],
      legIntPurposeIds: [
        3,
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 159,
      name: 'Underdog Media LLC ',
      policyUrl: 'https://underdogmedia.com/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 157,
      name: 'Seedtag Advertising S.L',
      policyUrl: 'https://www.seedtag.com/en/privacy-policy/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        3
      ],
      featureIds: []
    },
    {
      id: 145,
      name: 'Snapsort Inc., operating as Sortable',
      policyUrl: 'https://sortable.com/privacy',
      purposeIds: [
        1,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 131,
      name: 'ID5 Technology SAS',
      policyUrl: 'https://www.id5.io/privacy',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 158,
      name: 'Reveal Mobile, Inc',
      policyUrl: 'revealmobile.com/privacy',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 147,
      name: 'One Person Health, Inc. (DBA Adacado)',
      policyUrl: 'https://www.adacado.com/privacy-policy-april-25-2018/',
      purposeIds: [
        1,
        2,
        3
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 130,
      name: 'AdRoll Inc',
      policyUrl: 'adrollgroup.com/privacy',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3
      ],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 129,
      name: 'IPONWEB GmbH',
      policyUrl: 'https://www.iponweb.com/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 128,
      name: 'BIDSWITCH GmbH',
      policyUrl: 'http://www.bidswitch.com/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 168,
      name: 'EASYmedia GmbH',
      policyUrl: 'https://login.rtbmarket.com/gdpr',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 164,
      name: 'Outbrain UK Ltd',
      policyUrl: 'https://www.outbrain.com/legal/',
      purposeIds: [
        1,
        2,
        3,
        5
      ],
      legIntPurposeIds: [
        4
      ],
      featureIds: [
        1
      ]
    },
    {
      id: 144,
      name: 'district m inc.',
      policyUrl: 'https://districtm.net/en/page/data-and-privacy-policy/',
      purposeIds: [
        1,
        2
      ],
      legIntPurposeIds: [
        3,
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 163,
      name: 'Bombora Inc.',
      policyUrl: 'https://bombora.com/privacy',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 173,
      name: 'Yieldmo, Inc.',
      policyUrl: 'https://www.yieldmo.com/privacy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 88,
      name: 'TreSensa, Inc.',
      policyUrl: 'www.tresensa.com/eu-privacy',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3
      ],
      featureIds: []
    },
    {
      id: 78,
      name: 'Flashtalking, Inc.',
      policyUrl: 'http://www.flashtalking.com/privacypolicy/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 59,
      name: 'Sift Media, Inc',
      policyUrl: 'https://www.sift.co/privacy',
      purposeIds: [
        1,
        2,
        3
      ],
      legIntPurposeIds: [],
      featureIds: [
        3
      ]
    },
    {
      id: 114,
      name: 'Sublime Skinz',
      policyUrl: 'http://ayads.co/privacy.php',
      purposeIds: [
        2,
        3
      ],
      legIntPurposeIds: [
        1,
        5
      ],
      featureIds: []
    },
    {
      id: 175,
      name: 'FORTVISION',
      policyUrl: 'http://fortvision.com/POC/index.html',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 133,
      name: 'digitalAudience',
      policyUrl: 'http://digitalaudience.io/legal/privacy-cookies/',
      purposeIds: [
        1,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 14,
      name: 'Adkernel LLC',
      policyUrl: 'http://adkernel.com/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        2,
        3
      ]
    },
    {
      id: 180,
      name: 'Thirdpresence Oy',
      policyUrl: 'http://www.thirdpresence.com/privacy',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        3
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 183,
      name: 'EMX Digital LLC',
      policyUrl: 'https://emxdigital.com/privacy/',
      purposeIds: [
        1,
        2
      ],
      legIntPurposeIds: [
        3,
        4,
        5
      ],
      featureIds: [
        2,
        3
      ]
    },
    {
      id: 58,
      name: '33Across',
      policyUrl: 'http://www.33across.com/privacy-policy',
      purposeIds: [
        1,
        2,
        3,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        2
      ]
    },
    {
      id: 140,
      name: 'Platform161',
      policyUrl: 'https://platform161.com/cookie-and-privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 90,
      name: 'Teroa S.A.',
      policyUrl: 'https://www.e-planning.net/en/privacy.html',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3,
        4,
        5
      ],
      featureIds: []
    },
    {
      id: 141,
      name: '1020, Inc. dba Placecast and Ericsson Emodo',
      policyUrl: 'https://www.ericsson-emodo.com/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4
      ],
      legIntPurposeIds: [
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 142,
      name: 'Media.net Advertising FZ-LLC',
      policyUrl: 'https://www.media.net/en/privacy-policy',
      purposeIds: [
        1,
        2
      ],
      legIntPurposeIds: [
        3,
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 209,
      name: 'Delta Projects AB',
      policyUrl: 'http://www.deltaprojects.com/data-collection-policy/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3,
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 195,
      name: 'advanced store GmbH',
      policyUrl: 'http://www.advanced-store.com/de/datenschutz/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 197,
      name: 'Switch Concepts Limited',
      policyUrl: 'https://www.switchconcepts.com/privacy-policy',
      purposeIds: [
        1,
        3,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 190,
      name: 'video intelligence AG',
      policyUrl: 'https://www.vi.ai/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 84,
      name: 'Semasio GmbH',
      policyUrl: 'http://www.semasio.com/privacy-policy/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        5
      ],
      featureIds: []
    },
    {
      id: 65,
      name: 'Location Sciences AI Ltd',
      policyUrl: 'https://www.locationsciences.ai/privacy-policy/',
      purposeIds: [],
      legIntPurposeIds: [
        3,
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 210,
      name: 'Zemanta, Inc.',
      policyUrl: 'http://www.zemanta.com/legal/privacy',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1
      ]
    },
    {
      id: 200,
      name: 'Tapjoy, Inc.',
      policyUrl: 'https://www.tapjoy.com/legal/#privacy-policy',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: []
    },
    {
      id: 188,
      name: 'Sellpoints Inc.',
      policyUrl: 'https://retargeter.com/service-privacy-policy/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 217,
      name: '2KDirect, Inc. (dba iPromote)',
      policyUrl: 'https://www.ipromote.com/privacy-policy/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        3
      ],
      featureIds: []
    },
    {
      id: 156,
      name: 'Centro, Inc.',
      policyUrl: 'https://www.centro.net/privacy-policy/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1
      ]
    },
    {
      id: 194,
      name: 'Rezonence Limited',
      policyUrl: 'https://rezonence.com/privacy-policy/',
      purposeIds: [
        3,
        5
      ],
      legIntPurposeIds: [
        1
      ],
      featureIds: []
    },
    {
      id: 226,
      name: 'Publicis Media GmbH',
      policyUrl: 'https://www.publicismedia.de/datenschutz/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1
      ]
    },
    {
      id: 198,
      name: 'SYNC',
      policyUrl: 'https://redirect.sync.tv/privacy/',
      purposeIds: [
        1,
        3
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 227,
      name: 'ORTEC B.V.',
      policyUrl: 'https://www.ortecadscience.com/privacy-policy/',
      purposeIds: [
        2
      ],
      legIntPurposeIds: [
        1,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 225,
      name: 'Ligatus GmbH',
      policyUrl: 'https://www.ligatus.com/en/privacy-policy',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 205,
      name: 'Adssets AB',
      policyUrl: 'http://adssets.com/policy/',
      purposeIds: [],
      legIntPurposeIds: [
        3,
        5
      ],
      featureIds: []
    },
    {
      id: 179,
      name: 'Collective Europe Ltd.',
      policyUrl: 'https://www.timeincuk.com/privacy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 31,
      name: 'Ogury Ltd.',
      policyUrl: 'https://www.ogury.com/privacy/',
      purposeIds: [
        1,
        2,
        3
      ],
      legIntPurposeIds: [
        5
      ],
      featureIds: []
    },
    {
      id: 92,
      name: '1plusX AG',
      policyUrl: 'https://www.1plusx.com/privacy-policy/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 155,
      name: 'AntVoice',
      policyUrl: 'https://www.antvoice.com/en/privacypolicy/',
      purposeIds: [
        1,
        2,
        3
      ],
      legIntPurposeIds: [],
      featureIds: [
        2
      ]
    },
    {
      id: 115,
      name: 'smartclip Holding AG',
      policyUrl: 'http://privacy-portal.smartclip.net/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3,
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 126,
      name: 'DoubleVerify Inc.\\u200b',
      policyUrl: 'https://www.doubleverify.com/privacy/',
      purposeIds: [
        1,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 193,
      name: 'Mediasmart Mobile S.L.',
      policyUrl: 'http://mediasmart.io/privacy/',
      purposeIds: [
        1,
        3
      ],
      legIntPurposeIds: [],
      featureIds: [
        3
      ]
    },
    {
      id: 245,
      name: 'IgnitionOne',
      policyUrl: 'https://www.ignitionone.com/privacy-policy/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 213,
      name: 'emetriq GmbH',
      policyUrl: 'https://www.emetriq.com/datenschutz/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        5
      ],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 244,
      name: 'Leadplace - Temelio',
      policyUrl: 'https://temelio.com/vie-privee',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 224,
      name: 'adrule GmbH',
      policyUrl: 'https://www.adrule.net/de/datenschutz/',
      purposeIds: [
        2,
        4
      ],
      legIntPurposeIds: [
        1,
        3,
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 174,
      name: 'A Million Ads Limited',
      policyUrl: 'https://www.amillionads.com/privacy-policy',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        3
      ],
      featureIds: []
    },
    {
      id: 192,
      name: 'remerge GmbH',
      policyUrl: 'https://remerge.io/privacy-policy.html',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 232,
      name: 'Rockerbox, Inc',
      policyUrl: 'http://rockerbox.com/privacy',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        3,
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 256,
      name: 'Bounce Exchange, Inc',
      policyUrl: 'https://www.bouncex.com/privacy/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        4,
        5
      ],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 234,
      name: 'Zebestof',
      policyUrl: 'http://www.zebestof.com/en/about-us-2/privacy-en/',
      purposeIds: [
        1,
        2,
        3
      ],
      legIntPurposeIds: [
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 246,
      name: 'Smartology Limited',
      policyUrl: 'https://www.smartology.net/privacy-policy/',
      purposeIds: [],
      legIntPurposeIds: [
        5
      ],
      featureIds: []
    },
    {
      id: 241,
      name: 'OneTag Ltd',
      policyUrl: 'https://www.onetag.net/privacy/',
      purposeIds: [
        1,
        2,
        3,
        4
      ],
      legIntPurposeIds: [
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 254,
      name: 'LiquidM Technology GmbH',
      policyUrl: 'https://liquidm.com/privacy-policy/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 215,
      name: 'ARMIS SAS',
      policyUrl: 'http://armis.tech/infos-cookies/',
      purposeIds: [
        1,
        2
      ],
      legIntPurposeIds: [
        3
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 167,
      name: 'Audiens S.r.l.',
      policyUrl: 'http://www.audiens.com/privacy',
      purposeIds: [
        1,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 240,
      name: '7Hops.com Inc. (ZergNet)',
      policyUrl: 'zergnet.com/privacy',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        4,
        5
      ],
      featureIds: []
    },
    {
      id: 235,
      name: 'Bucksense Inc',
      policyUrl: 'http://www.bucksense.com/platform-privacy-policy/',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [
        2,
        3,
        4,
        5
      ],
      featureIds: [
        2,
        3
      ]
    },
    {
      id: 185,
      name: 'Bidtellect, Inc',
      policyUrl: 'https://www.bidtellect.com/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 258,
      name: 'Adello Group AG',
      policyUrl: 'https://www.adello.com/privacy-policy/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 169,
      name: 'RTK.IO, Inc',
      policyUrl: 'http://www.rtk.io/privacy.html',
      purposeIds: [
        1,
        4
      ],
      legIntPurposeIds: [
        2,
        3,
        5
      ],
      featureIds: [
        1,
        3
      ]
    },
    {
      id: 208,
      name: 'Spotad',
      policyUrl: 'http://www.spotad.co/privacy-policy/',
      purposeIds: [
        2,
        3
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 211,
      name: 'AdTheorent, LLC',
      policyUrl: 'http://adtheorent.com/privacy-policy',
      purposeIds: [],
      legIntPurposeIds: [
        1
      ],
      featureIds: []
    },
    {
      id: 229,
      name: 'Digitize New Media Ltd',
      policyUrl: 'http://www.digitize.ie/online-privacy',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: []
    },
    {
      id: 273,
      name: 'Bannerflow AB',
      policyUrl: 'bannerflow.com/privacy',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        3
      ],
      featureIds: []
    },
    {
      id: 104,
      name: 'Sonobi, Inc',
      policyUrl: 'http://sonobi.com/privacy-policy/',
      purposeIds: [
        1,
        2
      ],
      legIntPurposeIds: [
        3
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 162,
      name: 'Unruly Group Ltd',
      policyUrl: 'https://unruly.co/privacy/',
      purposeIds: [
        2
      ],
      legIntPurposeIds: [
        1,
        3,
        5
      ],
      featureIds: []
    },
    {
      id: 249,
      name: 'Spolecznosci Sp. z o.o. Sp. k.',
      policyUrl: 'https://www.spolecznosci.pl/polityka-prywatnosci',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        2,
        3
      ]
    },
    {
      id: 113,
      name: 'iotec global Ltd.',
      policyUrl: 'https://www.iotecglobal.com/privacy-policy/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        5
      ],
      featureIds: []
    },
    {
      id: 125,
      name: 'Research Now Group, Inc',
      policyUrl: 'https://www.valuedopinions.co.uk/privacy',
      purposeIds: [
        1,
        3,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 170,
      name: 'Goodway Group, Inc.',
      policyUrl: 'https://goodwaygroup.com/privacy-policy/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 160,
      name: 'Netsprint SA',
      policyUrl: 'http://spoldzielnia.nsaudience.pl/opt-out/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 189,
      name: 'Intowow Innovation Ltd.',
      policyUrl: 'http://www.intowow.com/privacy/',
      purposeIds: [
        1,
        3
      ],
      legIntPurposeIds: [],
      featureIds: [
        3
      ]
    },
    {
      id: 279,
      name: 'Mirando GmbH &amp; Co KG',
      policyUrl: 'https://wwwmirando.de/datenschutz/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        3
      ]
    },
    {
      id: 269,
      name: 'Sanoma Media Finland',
      policyUrl: 'https://sanoma.fi/tietoa-meista/tietosuoja/',
      purposeIds: [
        1,
        2,
        3
      ],
      legIntPurposeIds: [
        4,
        5
      ],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 276,
      name: 'Viralize SRL',
      policyUrl: 'https://viralize.com/privacy-policy',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        3
      ]
    },
    {
      id: 87,
      name: 'Genius Sports Media Limited',
      policyUrl: 'http://www.geniussports.com/privacy-policy/',
      purposeIds: [
        2,
        4
      ],
      legIntPurposeIds: [
        1,
        3,
        5
      ],
      featureIds: [
        2,
        3
      ]
    },
    {
      id: 182,
      name: 'Collective, Inc. dba Visto',
      policyUrl: 'https://www.vistohub.com/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 255,
      name: 'Onnetwork Sp. z o.o.',
      policyUrl: 'https://www.onnetwork.tv/pp_services.php',
      purposeIds: [
        2,
        3,
        5
      ],
      legIntPurposeIds: [
        1
      ],
      featureIds: []
    },
    {
      id: 203,
      name: 'Revcontent, LLC',
      policyUrl: 'https://faq.revcontent.com/customer/en/portal/articles/2703838-revcontent-s-privacy-and-cookie-policy',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: []
    },
    {
      id: 260,
      name: 'RockYou, Inc.',
      policyUrl: 'https://rockyou.com/privacy-policy/',
      purposeIds: [
        3
      ],
      legIntPurposeIds: [
        1,
        2,
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 237,
      name: 'LKQD, a division of Nexstar Digital, LLC.',
      policyUrl: 'http://www.lkqd.com/privacy-policy/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: [
        2,
        3
      ]
    },
    {
      id: 274,
      name: 'Golden Bees',
      policyUrl: 'http://goldenbees.fr/notre-politique-de-confidentialite/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 280,
      name: 'Spot.IM Ltd.',
      policyUrl: 'http://spot.im/privacy',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: []
    },
    {
      id: 239,
      name: 'Triton Digital Canada Inc.',
      policyUrl: 'https://www.tritondigital.com/privacy-policies',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        3,
        4,
        5
      ],
      featureIds: []
    },
    {
      id: 177,
      name: 'plista GmbH',
      policyUrl: 'https://www.plista.com/about/privacy/',
      purposeIds: [
        1,
        2,
        3,
        4
      ],
      legIntPurposeIds: [
        5
      ],
      featureIds: []
    },
    {
      id: 201,
      name: 'TimeOne',
      policyUrl: 'https://www.timeonegroup.com/en/privacy-policies/',
      purposeIds: [],
      legIntPurposeIds: [
        2,
        3,
        4,
        5
      ],
      featureIds: [
        2
      ]
    },
    {
      id: 150,
      name: 'Inskin Media LTD',
      policyUrl: 'http://www.inskinmedia.com/privacy-policy.html',
      purposeIds: [
        3
      ],
      legIntPurposeIds: [
        1
      ],
      featureIds: []
    },
    {
      id: 252,
      name: 'Jaduda GmbH',
      policyUrl: 'https://www.jadudamobile.com/datenschutzerklaerung/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: [
        3
      ]
    },
    {
      id: 248,
      name: 'Converge-Digital',
      policyUrl: 'https://converge-digital.com/privacy-policy/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        3,
        4,
        5
      ],
      featureIds: []
    },
    {
      id: 161,
      name: 'Smadex SL',
      policyUrl: 'http://smadex.com/end-user-privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 285,
      name: 'Comcast International France SAS',
      policyUrl: 'freewheel.tv/privacy-policy',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 228,
      name: 'McCann Discipline LTD',
      policyUrl: 'https://www.primis.tech/wp-content/uploads/2018/02/primisPrivacyPolicy2018.pdf',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        3,
        4,
        5
      ],
      featureIds: []
    },
    {
      id: 299,
      name: 'AdClear GmbH',
      policyUrl: 'https://www.adclear.de/datenschutzerklaerung/',
      purposeIds: [],
      legIntPurposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 277,
      name: 'Codewise Sp. z o.o. Sp. k',
      policyUrl: 'https://voluumdsp.com/end-user-privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4
      ],
      legIntPurposeIds: [
        5
      ],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 259,
      name: 'ADYOULIKE SA',
      policyUrl: 'https://www.adyoulike.com/privacy_policy.php',
      purposeIds: [
        1,
        2,
        3,
        4
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 289,
      name: 'mobalo GmbH',
      policyUrl: 'https://www.mobalo.com/datenschutz/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        3
      ]
    },
    {
      id: 272,
      name: 'A.Mob',
      policyUrl: 'https://adotmob.com/privacy.html',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 230,
      name: 'Steel House, Inc.',
      policyUrl: 'https://steelhouse.com/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 253,
      name: 'Improve Digital International BV',
      policyUrl: 'https://www.improvedigital.com/platform-privacy-policy',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        2,
        3
      ]
    },
    {
      id: 304,
      name: 'On Device Research Limited',
      policyUrl: 'https://s.on-device.com/privacyPolicy',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2,
        3
      ]
    },
    {
      id: 314,
      name: 'Keymantics',
      policyUrl: 'https://www.keymantics.com/assets/privacy-policy.pdf',
      purposeIds: [
        1,
        2,
        3
      ],
      legIntPurposeIds: [],
      featureIds: []
    },
    {
      id: 257,
      name: 'TOUCHVIBES',
      policyUrl: 'http://www.r-target.com/privacy',
      purposeIds: [
        1
      ],
      legIntPurposeIds: [],
      featureIds: [
        1,
        2
      ]
    },
    {
      id: 317,
      name: 'mainADV Srl',
      policyUrl: 'http://www.mainad.com/privacy-policy/',
      purposeIds: [
        1,
        2,
        3,
        4,
        5
      ],
      legIntPurposeIds: [],
      featureIds: [
        2,
        3
      ]
    }
  ]
};

export let cachedVendorList;

export function loadVendorList() {
  return new Promise(function (resolve) {
    if (cachedVendorList) {
      resolve(cachedVendorList);
    } else {
      let iabVendorListUrl = getIabVendorListUrl();
      if (!iabVendorListUrl) {
        cachedVendorList = defaultVendorList;
        sortVendors(cachedVendorList);
        resolve(cachedVendorList);
      } else {
        fetchJsonData(iabVendorListUrl)
          .then(response => {
            cachedVendorList = response;
            sortVendors(cachedVendorList);
            resolve(cachedVendorList);
          })
          .catch(error => {
            cachedVendorList = defaultVendorList;
            sortVendors(cachedVendorList);
            logError(`OIL getVendorList failed and returned error: ${error}. Falling back to default vendor list!`);
            resolve(cachedVendorList);
          });
      }
    }
  });
}

function sortVendors(vendorList) {
  vendorList.vendors = vendorList.vendors.sort((leftVendor, rightVendor) => leftVendor.id - rightVendor.id);
}

/**
 * !!! May produce 'Undefined' exceptions if vendorlist was not loaded before!
 *
 * @returns {*[]|Purpose[]}
 */
export function getPurposes() {
  return cachedVendorList.purposes;
}

/**
 * !!! May produce 'Undefined' exceptions if vendorlist was not loaded before!
 *
 * @returns {*[]|Vendor[]|optimization.splitChunks.cacheGroups.vendors|{test, priority}}
 */
export function getVendors() {
  return cachedVendorList.vendors;
}

/**
 * !!! May produce 'Undefined' exceptions if vendorlist was not loaded before!
 *
 * @returns {integer|number|*}
 */
export function getVendorListVersion() {
  return cachedVendorList.vendorListVersion;
}

/**
 * !!! May produce 'Undefined' exceptions if vendorlist was not loaded before!
 *
 * @returns {*}
 */
export function getVendorList() {
  return cachedVendorList;
}

export function clearVendorListCache() {
  cachedVendorList = undefined;
}
