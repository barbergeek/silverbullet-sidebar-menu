import {
  asset,
  clientStore,
  editor,
  markdown,
  space,
  system,
} from "@silverbulletmd/silverbullet/syscalls";
import { stripMarkdown } from "@silverbulletmd/silverbullet/lib/markdown";
import { traverseTree } from "@silverbulletmd/silverbullet/lib/tree";

type Header = {
  name: string;
  pos: number;
  level: number;
};

type OutlineSBConfig = {
  header?: boolean;
};

const PLUG_NAME = "sidebar-menu";

const SBM_STATE_KEY = "enableSidebarMenu";

async function isSBMEnabled() {
  return !!(await clientStore.get(SBM_STATE_KEY));
}

async function setSBMEnabled(value: boolean) {
  return await clientStore.set(SBM_STATE_KEY, value);
}

export async function hideSidebarMenu() {
  await editor.hidePanel("rhs");
  await setSBMEnabled(false);
}

export async function toggleSidebarMenu() {
  const currentState = await isSBMEnabled();
  if (!currentState) {
    await showSidebarMenu();
  } else {
    await hideSidebarMenu();
  }
}

export async function showSBMIfEnabled() {
  try {
    const [_major, minor, patch] = (await system.getVersion()).split(".");

    if (Number.parseInt(minor) === 10 && Number.parseInt(patch) < 4) {
      const env = await system.getEnv();
      if (env === "server") {
        return;
      }
    }

    if (await isSBMEnabled()) {
      return await showSidebarMenu();
    }
  } catch (e) {
    console.error(`${PLUG_NAME}: showSBMIfEnabled failed`, e);
  }
}

export async function showSidebarMenu(): Promise<any | null> {
  //let config: OutlineSBConfig = {};
  await editor.hidePanel("rhs");

  const [plusCss, plugJs] = await Promise.all([
    asset.readAsset(PLUG_NAME, "assets/sidebar-menu.css"),
    asset.readAsset(PLUG_NAME, "assets/sidebar-menu.js"),
  ]);

  let sidebar = await space.readPage("SIDEBAR");
  const finalHTML = await markdown.markdownToHtml(sidebar);

  await editor.showPanel(
    "rhs",
    0.5,
    `
        <link rel="stylesheet" href="/.client/main.css" />
        <style>
        ${plusCss}
        </style>
        <div id="sidebar-menu-root">
            ${finalHtml}
        </div>
        `,
    `
        ${plugJs}
        addClickEvent()
        `,
  );

  await setSBMEnabled(true);
}
