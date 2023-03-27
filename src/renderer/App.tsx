import type { Component } from "solid-js";

import { Routes, Route } from "@solidjs/router";

import { Home } from "./Home";

const App: Component = () => {
  return (
    <div class="h-[100vh] bg-[#3b3d40]">
      <Routes>
        <Route path="/" component={Home} />
      </Routes>
    </div>
  );
};

export default App;
