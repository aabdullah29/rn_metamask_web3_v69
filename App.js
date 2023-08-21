import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Button} from 'react-native';

import './shim';
import MetaMaskSDK from '@metamask/sdk';
import {Linking} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {ethers} from 'ethers';
import { Client, Conversation, DecodedMessage } from '@xmtp/react-native-sdk';


const App = () => {
  const connactWallet = async () => {
    const MMSDK = new MetaMaskSDK({
      openDeeplink: link => {
        Linking.openURL(link); // Use React Native Linking method or another way of opening deeplinks.
      },
      timer: BackgroundTimer, // To keep the dapp alive once it goes to background.
      dappMetadata: {
        name: 'My dapp', // The name of your dapp.
        url: 'https://mydapp.com', // The URL of your website.
      },
    });
    try {
    const ethereum = MMSDK.getProvider();

    const accounts = await ethereum.request({method: 'eth_requestAccounts'});
    console.log('\n\n\naccounts: ', accounts);

    // console.log('\n\nethers: ', ethers);
    // const provider = new ethers.providers.Web3Provider(ethereum);

    // // Get the balance of an account (by address or ENS name, if supported by network).
    // const balance = await provider.getBalance(ethereum.selectedAddress);

    // // Often you need to format the output to something more user-friendly,
    // // such as in ether (instead of wei).
    // const balanceInETH = ethers.utils.formatEther(balance);
    // // '0.182826475815887608'
    } catch (e) {
      console.log('metamask connection Error: ', e);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center',}}>
        <Button onPress={connactWallet} title="Send Transaction" />
      </View>
    </SafeAreaView>
  );
};

export default App;
