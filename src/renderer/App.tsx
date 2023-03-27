import type { Component } from "solid-js";

import { Routes, Route } from "@solidjs/router";

import { Home } from "./Home";

const App: Component = () => {
  return (
    <div class="h-[100vh] bg-gradient-to-b from-[#32383C] to-[#13141B]">
      <Routes>
        <Route path="/" component={Home} />
      </Routes>
    </div>
  );
};

export default App;
