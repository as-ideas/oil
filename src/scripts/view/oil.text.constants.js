import { privacyPageSnippet } from './components/oil.privacy.page';

export const oilHeading = () => {
    return "Um unsere Services bestmöglich erbringen zu können, brauchen wir euer Einverständnis";
}

export const oilIntroText = () => {
    return `Wir verwenden Cookies, um unser Angebot zu verbessern und euch maßgeschneiderte Inhalte zu präsentieren. Es ist dafür erforderlich, bei eurem Besuch – dem Datenschutz entsprechend – bestimmte Informationen zu erheben und ggf. auch an in unserem Auftrag tätige Dienstleister zu übertragen. 
    ${privacyPageSnippet()}`;
}