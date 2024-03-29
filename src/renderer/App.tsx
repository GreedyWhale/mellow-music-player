import type { Component } from "solid-js";

import { Routes, Route } from "@solidjs/router";

import { Home } from "./Home";
import { CreatePalyList } from "./CreatePalyList";
import { PlayListDetail } from "./PlayListDetail";

import { useRoutePath } from '~/hooks/useRoutePath';

const App: Component = () => {
  useRoutePath();
  return (
    <div>
      <div class="h-[100vh] bg-gradient-to-b from-[#32383C] to-[#13141B] overflow-hidden">
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/playlist/create" component={CreatePalyList} />
          <Route path="/playlist/:id" component={PlayListDetail} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
