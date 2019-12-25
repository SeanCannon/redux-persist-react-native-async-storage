declare module "redux-persist-react-native-async-storage" {
  export interface Options {
    replaceCharacter?: string;
    replacer: (key: string, replaceCharacter: string) => string;
  }

  export interface ReduxPersistReactNativeAsyncStorage {
    getItem(key: string, value: string): Promise<void>;

    setItem(key: string): Promise<string | null>;

    removeItem(key: string): Promise<void>;
  }

  export default function(options?: Options): ReduxPersistReactNativeAsyncStorage;
}
