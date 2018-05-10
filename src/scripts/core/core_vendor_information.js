// TODO This is the current vendor list (version 16) from https://vendorlist.consensu.org/vendorlist.json.
// TODO In future, this list will be retrieved from vendorlist.consensu.org - this will provide all purposes (and features) and their titles and descriptions (in different languages)
const vendorList = {
  vendorListVersion: 16,
  lastUpdated: '2018-05-08T15:59:02Z',
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
    },
    {
      id: 6
    },
    {
      id: 7
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
        1
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
        3
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
      featureIds: []
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
      policyUrl: 'liveramp.com/privacy/',
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
    }
  ]
};

export function getPurposes() {
  return vendorList.purposes;
}

export function getVendors() {
  return vendorList.vendors;
}

export function getVendorListVersion() {
  return vendorList.vendorListVersion;
}

export function getVendorList() {
  return vendorList;
}
