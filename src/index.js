import React from "react";
import ReactDom from "react-dom";
import { Provider } from 'react-redux';
import App from "./App";
import "./styles.scss";
import store from './redux/store';

// ========================================

ReactDom.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
