import type { Component } from 'solid-js';

import { Routes, Route, A } from "@solidjs/router"

import logo from './logo.svg';
import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>

      <p class='text-base text-red-600'>测试tailwind css</p>

      <nav>
        <A href="/about">About</A>
        <A href="/">Home</A>
        <A href="/users">User</A>
      </nav>

      <Routes>
        <Route path="/users" element={<div>users</div>} />
        <Route path="/" element={<div>home</div>} />
        <Route path="/about" element={<div>This site was made with Solid</div>} />
      </Routes>
    </div>
  );
};

export default App;
