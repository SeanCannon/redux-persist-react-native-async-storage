# redux-persist-react-native-async-storage

Storage engine for [redux-persist](https://github.com/rt2zz/redux-persist) for use with [React Native's AsyncStorage ](https://facebook.github.io/react-native/docs/asyncstorage).

## Installation

```bash
yarn add redux-persist-react-native-async-storage
# or
npm install --save redux-persist-react-native-async-storage
```

## Usage

Use as a `redux-persist` global storage engine:

```js
import createAsyncStorage from 'redux-persist-react-native-async-storage';

import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import reducers from './reducers';

const storage = createAsyncStorage();

const config = {
  key: 'root',
  storage
};

const reducer = persistCombineReducers(config, reducers);

const configureStore = () => {
  // ...
  const store = createStore(reducer);
  const persistor = persistStore(store);

  return { persistor, store };
}
```

Use as an engine for only a reducer:

```js
import createAsyncStorage from 'redux-persist-react-native-async-storage';

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import { mainReducer, secureReducer } from './reducers';

const asyncStorage = createAsyncStorage();

const fooPersistConfig = {
  key: 'foo',
  storage: asyncStorage
};

const barPersistConfig = {
  key: 'bar',
  storage: AsyncStorage
};

// Combine them together
const rootReducer = combineReducers({
  main: persistReducer(barPersistConfig, mainReducer),
  secure: persistReducer(fooPersistConfig, secureReducer)
});

const configureStor = () => {
  // ...
  const store = createStore(rootReducer);
  const persistor = persistStore(store);

  return { persistor, store };
}
```

## API

### `createAsyncStorage([options])`

#### `[options]`: `object`

##### `replaceCharacter`: `string`

Default: `_`

See [caveat](#caveat).

##### `replacer`: `function(key: string, replaceCharacter: string): string`

Default: replace all illegal characters by `replaceCharacter`

See [caveat](#caveat).

## Caveat

Characters for keys other than `[A-Za-z0-9.-_]` are replaced by `options.replaceCharacter` (defaults to `_`).

You may change this character by replacing `options.replaceCharacter`.

You may also change the default key transformer by replacing `options.replacer`.

## Note

Inspired by [redux-persist-expo-securestore](https://github.com/Cretezy/redux-persist-expo-securestore).
