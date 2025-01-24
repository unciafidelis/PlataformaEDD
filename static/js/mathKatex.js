$(document).ready(function () { // this need jquery
    renderMathInElement(document.body, {
      // ...options...
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\[", right: "\\]", display: true }
      ]
    });
  });