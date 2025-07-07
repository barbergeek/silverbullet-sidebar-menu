// deno-lint-ignore no-unused-vars
function addClickEvent() {
  document.querySelectorAll("[data-sbmpos]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const pos = parseInt(el.dataset.sbmpos);
      syscall("editor.moveCursor", pos, true);
      e.stopPropagation();
      e.preventDefault();
    });
  });
}
