# Punycode Node.js ponyfill

💔 Deprecated `node:punycode` module as an npm package

<div align="center">

![](https://i.imgur.com/5feCEHR.png)

</div>

🏃‍♀️ Uses the native `node:punycode` module when using Node.js \
📋 Uses [punycode.js v2.0.1] everywhere else \
⏳ Still prints the deprecation warning everywhere

🛑 **The `node:punycode` module is deprecated in Node.js core.** Instead, it's
recommended to use a user-land implementation like [punycode.js] (which this
package is based on). This package is provided solely for parity with `node:`
APIs.

## Installation

![npm](https://img.shields.io/static/v1?style=for-the-badge&message=npm&color=CB3837&logo=npm&logoColor=FFFFFF&label=)
![Yarn](https://img.shields.io/static/v1?style=for-the-badge&message=Yarn&color=2C8EBB&logo=Yarn&logoColor=FFFFFF&label=)
![pnpm](https://img.shields.io/static/v1?style=for-the-badge&message=pnpm&color=222222&logo=pnpm&logoColor=F69220&label=)
![jsDelivr](https://img.shields.io/static/v1?style=for-the-badge&message=jsDelivr&color=E84D3D&logo=jsDelivr&logoColor=FFFFFF&label=)

Install this package using npm, [Yarn], [pnpm], or your other favorite npm
package manager. Here's a quick copy-paste for npm users:

```sh
npm install @nodefill/punycode
```

This package is also compatible with Deno via their compatibility layer. You can
import the package directly using [the new `npm:` specifier], or a
Deno-compatible ESM CDN like [esm.sh] or [jsDelivr].

```js
import {} from "npm:@nodefill/punycode";
import {} from "https://esm.sh/@nodefill/punycode";
```

If you're using not using a build tool and you just want to use the package in
your browser, you can use an ESM npm CDN like [esm.sh] or [jsDelivr].

```js
import {} from "https://esm.sh/@nodefill/punycode";
import {} from "https://esm.run/@nodefill/punycode";
```

## Usage

![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![Deno](https://img.shields.io/static/v1?style=for-the-badge&message=Deno&color=000000&logo=Deno&logoColor=FFFFFF&label=)
![Browser](https://img.shields.io/static/v1?style=for-the-badge&message=Browser&color=4285F4&logo=Google+Chrome&logoColor=FFFFFF&label=)
![Bun](https://img.shields.io/static/v1?style=for-the-badge&message=Bun&color=000000&logo=Bun&logoColor=FFFFFF&label=)

No matter what environment you import this package in, you'll always be greeted
with a warning (unless you pass `node --no-warnings`). This package is
**deprecated** in Node.js core. Instead, it's recommended to use a user-land
implementation like [punycode.js]. This package is provided solely for parity
with `node:` APIs.

Here's a quick overview of the API:

```js
import { toASCII, toUnicode } from "@nodefill/punycode";

console.log(toASCII("😀"));
//=> 'xn--e28h'

console.log(toUnicode("xn--wp8h"));
//=> 👋
```

📚 You can find more docs on the [punycode.js v2.0.1 README] or the [Node.js
`node:punycode` docs]!

## Development

![JavaScript](https://img.shields.io/static/v1?style=for-the-badge&message=JavaScript&color=222222&logo=JavaScript&logoColor=F7DF1E&label=)

Special thanks to [Mathias Bynens] for the [punycode.js v2.0.1] implementation!
The code for the non-`node` targets is ripped straight from there (plus a
warning message and explicit exports). As for types, you can thank TypeStrong
and the [DefinitelyTyped community] for the [`@types/node` definitions] which,
again, are copy-pasted into the `index-types.d.ts` file.

There's no tests and no TypeScript since this package is simple enough to not
warrant those extra things.

**This package itself should be deprecated on npm if/when the `node:punycode`
module is removed from Node.js core.** Until then, don't deprecate it. Why? So
that it doesn't show a warning when you install it, 😅 and so that it appears in
npm search results. 😎

<!-- prettier-ignore-start -->
[mathias bynens]: https://mathiasbynens.be/
[punycode.js v2.0.1]: https://github.com/mathiasbynens/punycode.js/blob/v2.0.1/punycode.js
[punycode.js v2.0.1 readme]: https://github.com/mathiasbynens/punycode.js/tree/v2.0.1#api
[node.js `node:punycode` docs]: https://nodejs.org/api/punycode.html
[punycode.js]: https://github.com/mathiasbynens/punycode.js
[yarn]: https://yarnpkg.com/
[pnpm]: https://pnpm.io/
[the new `npm:` specifier]: https://deno.land/manual/node/npm_specifiers
[esm.sh]: https://esm.sh/
[jsdelivr]: https://www.jsdelivr.com/esm
[definitelytyped community]: https://github.com/DefinitelyTyped/DefinitelyTyped
[`@types/node` definitions]: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node
<!-- prettier-ignore-end -->
