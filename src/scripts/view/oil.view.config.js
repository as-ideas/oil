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