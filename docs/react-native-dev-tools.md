## Tooling

### Housekeeping of RN Apps

Scripts I like to add to `package.json` at start of a project:

```
"start:cache": "yarn start --reset-cache",
"start:clean": "yarn packager:clean && yarn start --reset-cache",
"android:clean": "cd android && ./gradlew clean",
"packager:clean": "rm -rf $TMPDIR/react-*; rm -rf $TMPDIR/haste-*; rm -rf $TMPDIR/metro-*; watchman watch-del-all",
```

### `react-native-debugger`

Install [react-native-debugger](https://github.com/jhen0409/react-native-debugger) (e.g. via `brew install react-native-debugger` if not done yet)

1. Open the `React Native Debugger` Desktop App (e.g. on **OSX** by finding it via `Spotlight`)

	- Here you see three different tools all in one: Console, React DevTools, Redux DevTools.

5. By default the app connects to port `8081` (This is the port RN runs on in debug mode)
6. Open the developer menu:
   - Physical Device: Shake your phone
   - iOS Simulator: Press `Cmd + D` (or `ctrl` + `Cmd` + `z` as an alternative)
   - Android Simulator: Press `Cmd + M`
7. Tap the `Debug with Chrome` button.
8. The `React Native Debugger` App should now show some debug output and your components should be visible in the React Devtools extension.

### Live Debugging in VSCode

1. In VSCode get the [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native) extension.
2. Open the debug tab and click on the link "create a launch.json file" or if you can't see that right away click on "Run and debug" (or similar) to create a `launch.json` file if there is none yet. Then add a new launch configuration to it.

  Choose `Attach to packager` and click your way through taking the default avlues until an entry in `launch.json` appears.

  Adapt the resulting `launch.json` so that it matches this configuration:

  ```json
  {
    "name": "Attach to packager",
    "request": "attach",
    "type": "reactnative",
    "cwd": "${workspaceFolder}",
    "port": 8081
  },
  ```

3. Start the app with `yarn start`
4. Open the app and start debug mode by shaking the device and tapping on `Debug Remote JS` in the Dev Menu which opened up from the bottom.
5. Set a break-point, shake the device again and tap on `Reload`.

### General procedure in case of bugs

In case of weird issues while building for **iOS**, do the following to reset/reinstall everything:

1. Delete the `node_modules` folder and run `yarn` to reinstall all dependencies
2. Open **XCode** and go to **Product -> Clean build folder**
3.
4. Run `cd ios && pod deintegrate` and delete the `ios/Podfile.lock` file. (Can also be done via `rm ios/Podfile.lock && rm -rf ios/Pods`)
5. In the ios folder: Run `pod repo update && pod update && pod install` to reinstall all dependencies.
6. Run `yarn packager:clean` to delete all packager caches
7. Run `yarn start:cache` to restart the packager

If necessary, also delete derived data [as described here](https://stackoverflow.com/a/39495772/3210677).

### Flipper

1. Installation: Use `brew install flipper` on OSX
2. Opt-in to use **Hermes** open-source JavaScript engine optimized for React Native [using this guide](https://reactnative.dev/docs/hermes).
3. Use **Setup Doctor** to make sure all dependencies are installed
4. Debugging with Flipper:

  <img width="896" alt="image" src="https://user-images.githubusercontent.com/1945462/146085486-ccd1e66d-7685-469b-88da-79d193257ff0.png">

Read more about Flipper in [this nice blog article about it](https://blog.logrocket.com/debugging-react-native-apps-flipper/).
