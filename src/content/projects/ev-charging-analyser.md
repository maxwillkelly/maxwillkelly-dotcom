---
organisation: "EV Charging Analyser"
chips:
  - typescript
  - react-native
  - expo
  - nextjs
---

[EV Charging Analyser](https://github.com/maxwillkelly/ev-charging-analyser/wiki) is a manufacturer-agnostic companion app for electric vehicles (EVs). EV Charging Analyser uses [Smartcar Connect](https://smartcar.com/product/connect) which allows drivers to connect their EVs with ease using their manufacturer's login. From there, users can perform basic tasks with their EV, such as locking or unlocking the doors or viewing its location on their phone. We use this application to collect navigation and charging data for academic research.

EV Charging Analyser is divided into two projects: the front-end mobile application which uses [React Native](https://reactnative.dev/) to compile binaries for iOS and Android (Android was the main development platform) and the back-end API which uses [NestJS](https://nestjs.com/). Each project has its own GitHub repository, deployment mechanisms, CI/CD tools and documentation.
