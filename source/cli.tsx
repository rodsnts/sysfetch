#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import App from './app.js';

const { clear } = render(<App />);
clear();
