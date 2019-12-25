import { AsyncStorage } from "react-native";

export default function createAsyncStorage(options = {}) {
  const replaceCharacter = options.replaceCharacter || "_";
  const replacer = options.replacer || defaultReplacer;

  return {
    getItem: key =>
      AsyncStorage.getItem(replacer(key, replaceCharacter), options),
    setItem: (key, value) =>
      AsyncStorage.setItem(replacer(key, replaceCharacter), value, options),
    removeItem: key =>
      AsyncStorage.removeItem(replacer(key, replaceCharacter), options)
  };
}

function defaultReplacer(key, replaceCharacter) {
  return key.replace(/[^a-z0-9.\-_]/gi, replaceCharacter);
}
