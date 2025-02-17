// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a03856975a17eba524739676affbf70ac4078176/types/node/punycode.d.ts
/*!
 * MIT License
 *
 * Copyright (c) Microsoft Corporation.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE
 */

/**
 * The `punycode.decode()` method converts a [Punycode](https://tools.ietf.org/html/rfc3492) string of ASCII-only
 * characters to the equivalent string of Unicode codepoints.
 *
 * ```js
 * punycode.decode('maana-pta'); // 'mañana'
 * punycode.decode('--dqo34k'); // '☃-⌘'
 * ```
 * @since v0.5.1
 */
export function decode(string: string): string;
/**
 * The `punycode.encode()` method converts a string of Unicode codepoints to a [Punycode](https://tools.ietf.org/html/rfc3492) string of ASCII-only characters.
 *
 * ```js
 * punycode.encode('mañana'); // 'maana-pta'
 * punycode.encode('☃-⌘'); // '--dqo34k'
 * ```
 * @since v0.5.1
 */
export function encode(string: string): string;
/**
 * The `punycode.toUnicode()` method converts a string representing a domain name
 * containing [Punycode](https://tools.ietf.org/html/rfc3492) encoded characters into Unicode. Only the [Punycode](https://tools.ietf.org/html/rfc3492) encoded parts of the domain name are be
 * converted.
 *
 * ```js
 * // decode domain names
 * punycode.toUnicode('xn--maana-pta.com'); // 'mañana.com'
 * punycode.toUnicode('xn----dqo34k.com');  // '☃-⌘.com'
 * punycode.toUnicode('example.com');       // 'example.com'
 * ```
 * @since v0.6.1
 */
export function toUnicode(domain: string): string;
/**
 * The `punycode.toASCII()` method converts a Unicode string representing an
 * Internationalized Domain Name to [Punycode](https://tools.ietf.org/html/rfc3492). Only the non-ASCII parts of the
 * domain name will be converted. Calling `punycode.toASCII()` on a string that
 * already only contains ASCII characters will have no effect.
 *
 * ```js
 * // encode domain names
 * punycode.toASCII('mañana.com');  // 'xn--maana-pta.com'
 * punycode.toASCII('☃-⌘.com');   // 'xn----dqo34k.com'
 * punycode.toASCII('example.com'); // 'example.com'
 * ```
 * @since v0.6.1
 */
export function toASCII(domain: string): string;
/**
 * @deprecated since v7.0.0
 * The version of the punycode module bundled in Node.js is being deprecated.
 * In a future major version of Node.js this module will be removed.
 * Users currently depending on the punycode module should switch to using
 * the userland-provided Punycode.js module instead.
 */
export const ucs2: ucs2;
export interface ucs2 {
  /**
   * @deprecated since v7.0.0
   * The version of the punycode module bundled in Node.js is being deprecated.
   * In a future major version of Node.js this module will be removed.
   * Users currently depending on the punycode module should switch to using
   * the userland-provided Punycode.js module instead.
   */
  decode(string: string): number[];
  /**
   * @deprecated since v7.0.0
   * The version of the punycode module bundled in Node.js is being deprecated.
   * In a future major version of Node.js this module will be removed.
   * Users currently depending on the punycode module should switch to using
   * the userland-provided Punycode.js module instead.
   */
  encode(codePoints: ReadonlyArray<number>): string;
}
/**
 * @deprecated since v7.0.0
 * The version of the punycode module bundled in Node.js is being deprecated.
 * In a future major version of Node.js this module will be removed.
 * Users currently depending on the punycode module should switch to using
 * the userland-provided Punycode.js module instead.
 */
export const version: string;
