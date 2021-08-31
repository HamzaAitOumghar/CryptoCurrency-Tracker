import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import CoinDetailPage from "./pages/CoinDetailPage";
import CoinSummuryPage from "./pages/CoinSummuryPage";
import "./App.css";
import { WatchListContextProvider } from "./context/watchListContext";

export default function App() {
  return (
    <div className="container">
      <WatchListContextProvider>
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={CoinSummuryPage} />
          <Route path="/coin/:id" component={CoinDetailPage} />
        </BrowserRouter>
      </WatchListContextProvider>
    </div>
  );
}
