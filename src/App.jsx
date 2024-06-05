import React from "react";

import Header from "./component/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NewReleases } from "./component/card/newReleases/NewReleases";
import { Trend } from "./component/card/trend/Trend";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Trend />} />
          <Route path="/search" element={<NewReleases />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
