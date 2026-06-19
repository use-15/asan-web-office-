export type TokenType = 'NUMBER' | 'STRING' | 'CELL' | 'OPERATOR' | 'FUNCTION' | 'LPAREN' | 'RPAREN' | 'COMMA';

export interface Token {
  type: TokenType;
  value: string;
}

export class FormulaParser {
  private tokens: Token[] = [];
  private current = 0;
  private getCellValue: (cellId: string) => any;

  constructor(getCellValue: (cellId: string) => any) {
    this.getCellValue = getCellValue;
  }

  parse(formula: string): any {
    if (!formula.startsWith('=')) return formula;

    this.tokens = this.tokenize(formula.substring(1));
    this.current = 0;

    try {
      return this.evaluateExpression();
    } catch (e) {
      console.error('Formula Parse Error:', e);
      return '#ERROR!';
    }
  }

  private tokenize(input: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;

    while (i < input.length) {
      let char = input[i];

      if (/\s/.test(char)) {
        i++;
        continue;
      }

      if (/[0-9]/.test(char)) {
        let num = '';
        while (i < input.length && /[0-9.]/.test(input[i])) {
          num += input[i++];
        }
        tokens.push({ type: 'NUMBER', value: num });
        continue;
      }

      if (/[A-Z]/.test(char)) {
        let identifier = '';
        while (i < input.length && /[A-Z0-9]/.test(input[i])) {
          identifier += input[i++];
        }

        if (i < input.length && input[i] === '(') {
          tokens.push({ type: 'FUNCTION', value: identifier });
        } else {
          tokens.push({ type: 'CELL', value: identifier });
        }
        continue;
      }

      if ('+-*/'.includes(char)) {
        tokens.push({ type: 'OPERATOR', value: char });
        i++;
        continue;
      }

      if (char === '(') {
        tokens.push({ type: 'LPAREN', value: '(' });
        i++;
        continue;
      }

      if (char === ')') {
        tokens.push({ type: 'RPAREN', value: ')' });
        i++;
        continue;
      }

      if (char === ',') {
        tokens.push({ type: 'COMMA', value: ',' });
        i++;
        continue;
      }

      i++;
    }

    return tokens;
  }

  private evaluateExpression(): any {
    let result = this.evaluateTerm();

    while (this.match('OPERATOR')) {
      const operator = this.previous().value;
      const right = this.evaluateTerm();
      if (operator === '+') result += right;
      if (operator === '-') result -= right;
    }

    return result;
  }

  private evaluateTerm(): any {
    let result = this.evaluatePrimary();

    while (this.match('OPERATOR') && (this.previous().value === '*' || this.previous().value === '/')) {
      const operator = this.previous().value;
      const right = this.evaluatePrimary();
      if (operator === '*') result *= right;
      if (operator === '/') result /= right;
    }

    return result;
  }

  private evaluatePrimary(): any {
    if (this.match('NUMBER')) return parseFloat(this.previous().value);

    if (this.match('CELL')) {
      const val = this.getCellValue(this.previous().value);
      return isNaN(parseFloat(val)) ? 0 : parseFloat(val);
    }

    if (this.match('FUNCTION')) {
      const funcName = this.previous().value;
      this.consume('LPAREN', "Expect '(' after function name");
      const args = [];
      if (!this.check('RPAREN')) {
        do {
          args.push(this.evaluateExpression());
        } while (this.match('COMMA'));
      }
      this.consume('RPAREN', "Expect ')' after arguments");

      if (funcName === 'SUM') return args.reduce((a: number, b: number) => a + b, 0);
      if (funcName === 'AVG') return args.length ? args.reduce((a: number, b: number) => a + b, 0) / args.length : 0;
    }

    if (this.match('LPAREN')) {
      const expr = this.evaluateExpression();
      this.consume('RPAREN', "Expect ')' after expression");
      return expr;
    }

    throw new Error('Unexpected token');
  }

  private match(type: TokenType): boolean {
    if (this.check(type)) {
      this.advance();
      return true;
    }
    return false;
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.tokens[this.current].type === type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.current >= this.tokens.length;
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) return this.advance();
    throw new Error(message);
  }
}
