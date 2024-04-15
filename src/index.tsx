import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./components/app";
import { I18nextProvider } from "react-i18next";
import i18n from '../src/components/common/language/i18n';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
const theme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    background: "#f8f9fa",
  },
  fonts: {
    primary: "Arial, sans-serif",
  },
};

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter><QueryClientProvider client={queryClient}><I18nextProvider i18n={i18n}><App /></I18nextProvider></QueryClientProvider></BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
