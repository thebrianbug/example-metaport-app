import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect } from "react";

export default function Home() {
  const [metaport, setMetaport] = React.useState();

  async function loadMetaport() {
    const Metaport = (await import("@skalenetwork/metaport")).Metaport;

    const _metaport = new Metaport({
      mainnetEndpoint: "https://eth-goerli.public.blastapi.io",
      openOnLoad: false, // Open Metaport on load (optional, default = false)
      openButton: true, // Show open/close action button (optional, default = true)
      autoLookup: false, // Automatic token lookup for M2S tokens (default = true)
      skaleNetwork: "staging3", // CALYPSO_DETAILS.skaleNetworkName, //ENVIRONMENT, //"staging3", // SKALE network that will be used - mainnet or staging (optional, defualt = mainnet)
      chains: [
        "mainnet",
        "staging-legal-crazy-castor",
        "staging-utter-unripe-menkar",
      ],
      chainsMetadata: {
        // Chain name aliases that will be displayed in the UI (optional, defualt = {})
        "staging-legal-crazy-castor": {
          alias: "Europa", // optional
          minSfuelWei: "0.0001", // optional
        },
        "staging-utter-unripe-menkar": {
          alias: "Calypso",
          minSfuelWei: "0.0001", // optional
        },
      },
      tokens: {
        mainnet: {
          eth: {
            chains: ["staging-legal-crazy-castor"],
          },
        },
        "staging-legal-crazy-castor": {
          erc20: {
            ETHC: {
              // wrapper token
              address: "0xa270484784f043e159f74C03B691F80B6F6e3c24", // wrapper token address
              name: "ETH", // wrapper token display name
              symbol: "ETHC", /// TODO -> THis must match tokenKeyName
              wraps: {
                // token that needs to be wrapped
                address: "0xD2Aaa00700000000000000000000000000000000", // unwrapped token address
                symbol: "ETH", // unwrapped token symbol
                iconUrl: "", // optional, icon URL for the origin token
              },
            },
          },
        },
      },
      theme: {
        // custom widget theme (default = dark SKALE theme)
        primary: "#E37B26", // primary accent color for action buttons
        background: "#fffbf7", // background color
        mode: "light", // theme type - dark or light
      },
    });

    setMetaport(_metaport);
  }

  useEffect(() => {
    if (!metaport) {
      loadMetaport();
    }
  }, [metaport]);

  const handleTranserToCalypso = () => {
    metaport.transfer({
      amount: "0.001",
      chains: ["staging-legal-crazy-castor", "staging-utter-unripe-menkar"],
      tokenType: "erc20",
      lockValue: false,
      tokenKeyname: "_ETHC_0xa270484784f043e159f74C03B691F80B6F6e3c24",
    });
  };

  const handleTranserToEuropa = () => {
    metaport.transfer({
      amount: "0.001",
      chains: ["mainnet", "staging-legal-crazy-castor"],
      tokenType: "eth",
      lockValue: false,
      tokenKeyname: "eth",
    });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ConnectButton />
        {metaport && (
          <>
            <button onClick={handleTranserToEuropa}>Transfer to Europa</button>
            <button onClick={handleTranserToCalypso}>
              Transfer to Calypso
            </button>
          </>
        )}
        <div id="metaport"></div>
      </main>
    </>
  );
}
