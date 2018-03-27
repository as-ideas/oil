import { forEach } from '../src/scripts/userview/userview_modal';

let HtmlDiffer = require('html-differ').HtmlDiffer;
let htmlDiffer = new HtmlDiffer();
let pretty = require('pretty');

export let customMatchers = {
  toEqualWithDiff: function () {
    return {
      compare: function (raw_actual, raw_expected) {
        let actual = pretty(raw_actual, {ocd: true});
        let expected = pretty(raw_expected, {ocd: true});

        let result = {};
        result.pass = htmlDiffer.isEqual(actual, expected);
        if (!result.pass) {
          let diff = htmlDiffer.diffHtml(actual, expected);
          let diffText = getDiffText(diff, {charsAroundDiff: 2});

          result.message = inverseGreen('+ expected') + '\n' + inverseRed('- actual') + '\n' + diffText;
          // console.info(result.message);
        }
        return result;
      }
    }
  }
};

function inverseGreen(text) {
  return '\x1b[42m' + text + '\x1b[0m';
}

function inverseRed(text) {
  return '\x1b[41m' + text + '\x1b[0m';
}

function grey(text) {
  return '\x1b[37m' + text + '\x1b[0m';
}

function getDiffText(diff, options) {
  options = options || {
    charsAroundDiff: 40
  };

  let charsAroundDiff = options.charsAroundDiff,
    output = '';

  if (charsAroundDiff < 0) {
    charsAroundDiff = 40;
  }

  if (diff.length === 1 && !diff[0].added && !diff[0].removed) return output;

  diff.forEach(function (part) {
    let index = diff.indexOf(part),
      partValue = part.value,
      diffColor;

    if (part.added) diffColor = inverseGreen;
    if (part.removed) diffColor = inverseRed;

    if (diffColor) {
      output += (index === 0 ? '\n' : '') + diffColor(partValue);

      return;
    }

    if (partValue.length < charsAroundDiff * 2) {
      output += (index !== 0 ? '' : '\n') + grey(partValue);
    } else {
      index !== 0 && (output += grey(partValue.substr(0, charsAroundDiff)));

      if (index < diff.length - 1) {
        output += '\n...\n' + grey(partValue.substr(partValue.length - charsAroundDiff));
      }
    }
  });

  return output;
}

export function removeOilLayerAndConfig() {
  window.AS_OIL_LOCALE = undefined;
  forEach(document.querySelectorAll('#oil-configuration'), (domNode) => {
    domNode.parentElement.removeChild(domNode);
  });
  forEach(document.querySelectorAll('.as-oil'), (domNode) => {
    domNode.parentElement.removeChild(domNode);
  });
}
