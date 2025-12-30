const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const MEMONODE_TEMPLATE = document.createElement("button");
MEMONODE_TEMPLATE.className = "ed text-default text-muted";
MEMONODE_TEMPLATE.style.background = "transparent";
MEMONODE_TEMPLATE.style.border = "none";
MEMONODE_TEMPLATE.style.marginLeft = "5px";
MEMONODE_TEMPLATE.style.cursor = "pointer";
MEMONODE_TEMPLATE.style.fontStyle = "italic";
(async () => {
  //Check if the current page is a valid post rather than a board or the main page
  const currentPathname = window.location.pathname;
  const re = /\/\d+/;
  if (!re.test(currentPathname) || currentPathname.includes("/category")) {
    console.log("안작동");
    return;
  }

  //Pull author and comment names
  const timestamp = Date.now();
  const authorNode = document.querySelector("a[href$='#popup_menu_area']");
  if (!authorNode) return;
  const authorSrl = authorNode.classList[3];
  await checkUpdateAppearance(authorSrl, timestamp);
  const storedAuthorMemo = await checkUpdateMemo(authorSrl, null);
  const memoNode = MEMONODE_TEMPLATE.cloneNode(true);
  if (storedAuthorMemo) {
    memoNode.innerText = storedAuthorMemo;
  } else {
    memoNode.innerText = "메모하기";
    memoNode.dataset.isNone = true;
  }
  authorNode.parentNode.parentNode.appendChild(memoNode);
  memoNode.addEventListener("click", () => {
    handleMemoClick(authorSrl, memoNode);
  });

  const commentNodes = document.querySelectorAll(
    ".comment-item a[href$='#popup_menu_area']"
  );
  if (commentNodes.length == 0) return;
  for (const commentNode of commentNodes) {
    const commentSrl = commentNode.classList[2];
    if (commentSrl) {
      await checkUpdateAppearance(commentSrl, timestamp);
      const storedCommentMemo = await checkUpdateMemo(commentSrl, null);
      const memoNode = MEMONODE_TEMPLATE.cloneNode(true);
      if (storedCommentMemo) {
        memoNode.innerText = storedCommentMemo;
      } else {
        memoNode.innerText = "메모하기";
        memoNode.dataset.isNone = true;
      }
      commentNode.parentNode.parentNode.appendChild(memoNode);
      memoNode.addEventListener("click", () => {
        handleMemoClick(commentSrl, memoNode);
      });
    }
  }
})();
async function checkUpdateAppearance(srl, timestamp) {
  try {
    const storedUser = await browser.storage.local.get(srl);
    if (!storedUser[srl]) {
      await browser.storage.local.set({
        [srl]: { appearance: [timestamp], memo: null },
      });
      console.log("appearance recorded");
    } else {
      storedUser[srl].appearance.push(timestamp);
      storedUser[srl].appearance = storedUser[srl].appearance.filter(
        (ts) => timestamp - ts < ONE_WEEK_MS
      );
      await browser.storage.local.set(storedUser);
      console.log("appearance increased");
    }
  } catch (e) {
    console.log("something gone wrong");
  }
}
async function checkUpdateMemo(srl, memo) {
  try {
    const storedUser = await browser.storage.local.get(srl);
    if (!storedUser[srl]) {
      return;
    } else if (memo === null) {
      return storedUser[srl].memo;
    } else {
      storedUser[srl].memo = memo;
      await browser.storage.local.set(storedUser);
    }
  } catch (e) {
    console.error(e);
  }
}
async function handleMemoClick(srl, memoNode) {
  let isProcessed = false;
  memoNode.hidden = true;
  const inputNode = document.createElement("input");
  inputNode.type = "text";
  inputNode.value = !memoNode.dataset.isNone ? memoNode.innerText : "";
  memoNode.parentNode.appendChild(inputNode);
  inputNode.focus();
  inputNode.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      isProcessed = true;
      await checkUpdateMemo(srl, inputNode.value);
      memoNode.innerText = inputNode.value;
      inputNode.remove();
      memoNode.dataset.isNone = false;
      memoNode.hidden = false;
      return;
    } else if (e.key === "Escape") {
      isProcessed = true;
      inputNode.remove();
      memoNode.hidden = false;
      return;
    } else return;
  });
  inputNode.addEventListener("blur", async () => {
    if (isProcessed) return;
    if (!inputNode.value) {
      inputNode.remove();
      memoNode.hidden = false;
      return;
    }
    await checkUpdateMemo(srl, inputNode.value);
    memoNode.innerText = inputNode.value;
    inputNode.remove();
    memoNode.hidden = false;
    return;
  });
}
