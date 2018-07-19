import {ValidationRules} from 'aurelia-validation';

ValidationRules.customRule(
  'date',
  (value, obj) => value === null || value === undefined || value instanceof Date,
  `\${$displayName} must be a Date.` 
);

ValidationRules.customRule(
  'integerRange',
  (value, obj, min, max) => value === null || value === undefined 
    || Number.isInteger(1 * value) && value >= min && value <= max,
  `\${$displayName} must be an integer between \${$config.min} and \${$config.max}.`,
  (min, max) => ({ min, max }) 
);

ValidationRules.customRule(
  'integerRangeB',
  (value, obj, min, max) => {
      var num = Number.parseInt(value);
      return value === null
        || value === undefined
        || value.trim() === ''
        || (Number.isInteger(num) && num >= min && num <= max)
  },
  `\${$displayName} must be an integer between \${$config.min} and \${$config.max}.`,
  (min, max) => ({ min, max }) 
);