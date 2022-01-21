# DrStrain utilities (drutil)

Utility functions that is frequently used by me (Drstrain) and has following features:
- Zero dependency
- Typescript supported
- Over 90% test coverage
- Over 20 common functionalities (random, sleep, read from user's input, crypto hash, hmac, log, etc)

## Install

```bash
# using npm
npm install @drstrain/drutil

# using yarn
yarn add @drstrain/drutil
```

## Documentations

[https://stc.drstra.in/drutil/index.html](https://stc.drstra.in/drutil/index.html)

## Example usage

Example usage of `getRandomString`:

```typescript
import { getRandomString } from '@drstrain/drutil';

console.log(getRandomString(20));
```

Please check documentation for list of supported functions
