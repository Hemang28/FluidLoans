// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
// import Content1 from "./Components/Index page/Content1";
// import Content2 from "./Components/Index page/Content2";
// import Mainpage from "./Components/Mainpage";
// import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Home from "./components/Home";
import MainPage from "./components/MainPage";

function App() {
  const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [
      alchemyProvider({ apiKey: "QrtOQOoTBlkoyxrZSVZUuzCRfajtfNVA" }),
      publicProvider(),
    ]
  );
  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains,
  });
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<MainPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
export default App;
