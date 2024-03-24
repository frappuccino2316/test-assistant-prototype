const domain = location.href.split('/')[2];

(async () => {
  const response = await chrome.runtime.sendMessage({ currentDomain: domain });
  // ↓にtrueのときの処理を追加する
  console.log(response);
})();
