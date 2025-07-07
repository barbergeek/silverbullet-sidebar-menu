
# SilverBullet Sidebar Menu

This plug will open a sidebar on the right of the window displaying the SIDEBAR page

**update screenshots**
![Screenshot](screenshot.png)
![Screenshot-dark](screenshot-dark.png)

## Installation

If you would like to install this plug straight from Github, make sure you have the `.js` file committed to the repo and simply add

```yaml
- github:barbergeek/silverbullet-sidebar-menu/sidebar-menu.plug.js
```

to your `PLUGS` file, run `Plugs: Update` command and off you go!

### Smooth scrolling

Add the following space-style to enable smooth scrolling and a smaller scrollbar

```css
div.cm-scroller {
  scroll-behavior: smooth;
  scrollbar-width: thin;
}
```

Adding this will now scroll smoothly when clicked.

## Commands

`Sidebar Menu: Tooggle` Toggle the sidebar open or close or with `Ctrl+Alt+o` or `Cmd+alt+o` on Mac

## To-do and known issues

- [x] Initial version.

## Contributions

Raise an issue for any features you're interested in adding or an bugs you find and if you feel capable PRs are welcome.

### Build

To build this plug, make sure you have [SilverBullet installed with Deno](https://silverbullet.md/Install/Deno). Then, build the plug with:

```shell
deno task build
```

Or to watch for changes and rebuild automatically

```shell
deno task watch
```

Then, copy the resulting `.plug.js` file into your space's `_plug` folder. Or build and copy in one command:

```shell
deno task build && cp *.plug.js /my/space/_plug/
```

SilverBullet will automatically sync and load the new version of the plug, just watch the logs (browser and server) to see when this happens.
