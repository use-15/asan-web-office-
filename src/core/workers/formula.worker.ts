import { evaluateFormula } from '../engine/formula';

self.onmessage = (e) => {
  const { formula, context } = e.data;
  const result = evaluateFormula(formula, context);
  self.postMessage({ result });
};
