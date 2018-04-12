let HtmlDiffer = require('html-differ').HtmlDiffer;
let htmlDiffer = new HtmlDiffer();
let pretty = require('pretty');

export let customMatchers = {
  toEqualWithDiff: function () {
    return {
      compare: function (raw_actual, raw_expected) {
        if (!raw_actual) {
          console.error('Actual must not be NULL or UNDEFINDED, it was:', raw_actual);
          return {pass: false, message: 'Actual must not be NULL or UNDEFINDED'};
        }
        if (!raw_expected) {
          console.error('Expected must not be NULL or UNDEFINDED, it was:', raw_expected);
          return {pass: false, message: 'Expected must not be NULL or UNDEFINDED'};
        }
        if (typeof  raw_actual !== 'string') {
          raw_actual = raw_actual.outerHTML;
        }
        if (typeof  raw_expected !== 'string') {
          raw_expected = raw_expected.outerHTML;
        }

        let actual = pretty(raw_actual, {ocd: true});
        let expected = pretty(raw_expected, {ocd: true});

        let result = {};
        result.pass = htmlDiffer.isEqual(formatHtml(actual), formatHtml(expected));
        if (!result.pass) {
          console.info(inverseGreen('Expected:\n') + expected);
          console.info(inverseRed('Actual:\n') + actual);

          let diff = htmlDiffer.diffHtml(formatHtml(actual), formatHtml(expected));
          let diffText = getDiffText(diff, {charsAroundDiff: 4});

          result.message = inverseGreen('+ expected') + '\n' + inverseRed('- actual') + '\n' + diffText;
        }
        return result;
      }
    }
  }
};

function formatHtml(element) {
  return element
    .trim()
    .split('\n')
    .reduce((prev, next) => {
      if (next) {
        prev += next.trim();
      }
      return prev;
    }, '');
}

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
