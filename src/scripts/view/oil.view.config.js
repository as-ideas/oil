import { privacyPageSnippet } from './components/oil.privacy.page';

/**
 * Prefix for our Oil CSS classes
 * Keep this prefix 100% in sync with the prefix defined in modal.scss  
 */

// This is the prefix you have to set

const Prefix = 'as';

// Generate the right prefix for empty and non empty strings
// So for an empty prefix our CSS classes are .oil, otherwise our CSS classes will look
// like .prefix-oil  

const oilPrefix = (str) => {
    return (str === '') ? '' : `${str}-`;
}

// And export our prefix
export const CSSPrefix = oilPrefix(Prefix);

/**
 * Definition of various text snippets for our Oil Layer
 *   
 */

export const oilHeading = () => {
    return "Um unsere Services bestmöglich erbringen zu können, brauchen wir euer Einverständnis";
}

export const oilIntroText = () => {
    return `Wir verwenden Cookies, um unser Angebot zu verbessern und euch maßgeschneiderte Inhalte zu präsentieren. Es ist dafür erforderlich, bei eurem Besuch – dem Datenschutz entsprechend – bestimmte Informationen zu erheben und ggf. auch an in unserem Auftrag tätige Dienstleister zu übertragen. 
    ${privacyPageSnippet()}`;
}