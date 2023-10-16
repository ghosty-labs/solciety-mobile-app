This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Solciety Guide: Web3 Social Media on Solana 🎩🚀

![](https://nftstorage.link/ipfs/bafybeigkfimjlbit4ppapexqrdz5siufvatbrki5grkr6i4xrfewhgs7ly)

Check the details about Solciety on our official website: [solciety.xyz](https://solciety.xyz/)

We've added <hackathon@solana.org> to our internal testing because the production release is still in the Play Store's review stage.

If you want to try our app right away, you can install it from the following link: [play.google.com/apps/com.solcietymobileapp](https://play.google.com/apps/test/com.solcietymobileapp/10) and follow the steps below to enable the Play Store on your Android device so you can install the trial version.

Or if you want to try it through this repository, go to [Run the Solciety Mobile App on an emulator or Android device](#run-the-solciety-mobile-app-on-an-emulator-or-android-device) for installation instructions.

# Run the Solciety Mobile App through Internal Testing

> **Note**: Make sure you've already got your Solana wallet installed, fam!
> And also make sure your wallet is in development mode or Devnet and has a balance.
> If you don't have SOL, you can obtain it through [Sol Faucet](https://solfaucet.com/).

## Step 1: Turn on Internal app sharing 

1. Open link [play.google.com/apps/com.solcietymobileapp](https://play.google.com/apps/test/com.solcietymobileapp/10) and follow the instructions.

2. Open the Google Play Store app.

3. Tap Menu Menu > Settings.

4. In the “About” section, tap the Play Store version 7 times.

5. After the Internal app sharing setting appears, tap the switch to turn on internal app sharing. Tap Turn on.
   
   Or you can go to Settings (within the Play Store) > General > Developer options.

## Step 2: Install App

1. Open the Play Store and ensure that you are logged in with the email <hackathon@solana.org>.

2. And then reopen the internal app testing link from us at [play.google.com/apps/com.solcietymobileapp](https://play.google.com/apps/test/com.solcietymobileapp/10).

3. Make sure android device has Developer Mode is enabled.

   <img width="638" alt="image" src="https://nftstorage.link/ipfs/bafkreidp46c6w5w3bzr6vx7zeehl3wnwacq5rnv2jouv2d6heyjstoly6y">

   <img width="338" alt="image" src="https://nftstorage.link/ipfs/bafkreifkuwxmcxfwlry3nzx7l4vj6hzdpwzq7324zi3obxrsnzaokzwga4">

   [Congratulations! 🎉](#congratulations)

   -> [Explore Solciety🎩](#explore-solciety)
   
   -> [Questions and Support](#questions-and-support)

# Run the Solciety Mobile App on an emulator or Android device

## Step 1: Installation

1. Make sure you've already got `Node.js`, the `Android SDK`, the `Android SDK Platform`, and an `Android Virtual Device` all set up.

   For more detailed information on setting up the development environment, please visit: [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)
   
3. Clone this repository to your computer by running the following command:
   ```shell
   # using HTTPS
   https://github.com/ghosty-labs/solciety-mobile-app.git

   # using SSH
   git@github.com:ghosty-labs/solciety-mobile-app.git

   # using GitHub CLI
   gh repo clone ghosty-labs/solciety-mobile-app
   ```

4. Navigate to the `solciety-mobile-app` directory:
   ```bash
   cd solciety-mobile-app
   ```
5. Install all dependencies by running:
   ```bash
   yarn install
   ```

## Step 2: Connect Your Solana Wallet

1. Ensure you have installed a Solana wallet extension in your emulator or your devices. This will allow you to access your Solana wallet.

2. Make sure your wallet is in Development mode, which is `Devnet`.

3. And ensure that your `Devnet` wallet has a balance to perform posting, commenting, following, and minting NFTs since these features require SOL tokens as they are `on-chain`.

   You can obtain SOL from the [Solana Faucet](https://solfaucet.com/).

## Step 3: Run the App on the emulator or an Android device

> **Note**: Please open the folder `./node_modules/zlib/lib/zlib.js`
> and add a comment to the line that says:
> ```js
>  // module.exports = require('./zlib_bindings');
> ```
> This is to prevent the error: `ERROR in ./node_modules/zlib/lib/zlib.js` during the development mode process.

### Run on the emulator

1. Open your terminal and fire up this command:
   
   ```bash
   yarn start
   ```
   or
   ```bash
   yarn android
   ```

### Run on Android device

> **Note**: Make sure your Android device is connected to your computer.

#### Step 1: Open Settings

Open the "Settings" app on your Android device. You can find the settings icon, typically a gearwheel or a similar symbol, on your home screen or in the app drawer.

#### Step 2: Navigate to "About Phone" or "About Device"

Scroll down in the Settings menu until you find an option related to device information. This may be labeled "About Phone," "About Device," or a similar variation.

#### Step 3: Find the Build Number

Within the "About Phone" or "About Device" menu, look for an option related to the build number or the version of your device. You will need to tap on this option multiple times to activate Developer Mode. This option is usually found under "Device Information" or something similar.

#### Step 4: Enable Developer Mode

After finding the "Build Number," tap on it multiple times (typically around 7 times) in succession. Each Android device may require a different number of taps. You may be prompted to enter your device's password or PIN to confirm.

#### Step 5: Confirm Developer Mode Activation

Once you've finished, you will see a message confirming that Developer Mode has been activated. You now have access to developer options in your device's settings.

#### Step 6: Access Developer Options

Return to the "Settings" menu, and you will now see a new option called "Developer Options" or "Developer Mode" under "System" or a similar category. Within this option, you can enable features like USB Debugging, animation settings, and more.

#### Step 7: List of Devices Attached

Run the command:
```bash
adb devices
```

If the device status is `Unauthorized` please try the steps above again.


#### Run App

Next, run the command `yarn start` or `yarn android` to execute the program on your Android device.

```bash
yarn android
```

## Congratulations! :tada:

<img width="338" alt="image" src="https://nftstorage.link/ipfs/bafybeiczir7cbwt3ynasndfv73boicgithvr7fblgpkxxxpp5glbnmzyie">

You've successfully run Solciety Mobile App. :partying_face:

## Explore Solciety🎩

Now you're ready to explore Solciety! Here you can:

- Create posts with the Solana community.
  
- Follow and interact with other users.
  
- Like and comment posts from other users.

- Mint an NFT from the Ghosty Collection and get a verified badge.
  
- Explore various features offered by Solciety.


For other features, you can check our website at [solciety.xyz](https://solciety.xyz/).

# Questions and Support

If you encounter issues or have questions, feel free to contact us at <solciety23@gmail.com>.

Or our personal emails at <muhlisiqbalutomo@gmail.com> and <wahdanaedo@gmail.com>.

Thanks for giving us the chance to join the Solana Hyperdrive Hackathon. Keep on rockin', Solana Blockchain 🚀🎉
