# SSSWidgets - Simple Svelte Stream Widgets

A small project containing some widgets for streaming, built with SvelteKit and [YeSvelte](https://www.yesvelte.com).
The main idea behind the project is to be able to easily add some simple widget to OBS and control it via a browser in real time.

## Developing and using the app

Once you've created a project and installed dependencies with `npm install`.

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Files used to power the widgets are to be placed in the `data` directory. See the internal README for more information and examples.

## Production

There is no production, this project is meant to be run locally on your stream PC with dev mode.
