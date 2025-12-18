(async () => {
  //Check if the current page is a valid post rather than a board or the main page
  const currentPathname = window.location.pathname;
  const re = /\/\d+/;
  if (!re.test(currentPathname) || currentPathname.includes("/category")) {
    console.log("안작동");
    return;
  }

  //Pull author and comment names
  const authorNode = document.querySelector("a[href$='#popup_menu_area']");
  if (!authorNode) return;
  const authorSrl = authorNode.classList[3];
  try {
    const authorStored = await browser.storage.local.get(authorSrl);
    if (!authorStored[authorSrl]) {
      await browser.storage.local.set({
        [authorSrl]: { appearance: 1, memo: null },
      });
      console.log("appearance recorded");
    } else {
      authorStored[authorSrl].appearance += 1;
      await browser.storage.local.set(authorStored);
      console.log("appearance increased");
    }
  } catch (e) {
    console.log("something gone wrong");
  }

  //   const commentNodes = document.querySelectorAll(
  //     ".comment-item a[href$='#popup_menu_area']"
  //   );
  //   if (commentNodes.length == 0) return;
  //   const commentNodesArray = Array.from(commentNodes).map(
  //     (commentNode) => commentNode.classList[2]
  //   ).toSorted;
  //   commentNodes.forEach((commentNode) => console.log(commentNode)); //.classList[2];
})();
