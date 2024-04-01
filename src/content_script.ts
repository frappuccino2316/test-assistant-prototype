const url = location.href.split('?')[0];
const body = document.body;

(async () => {
  console.log(body);
  const response = await chrome.runtime.sendMessage({ url: url, body: body });
  console.log(response);
  if (response.domainExists) {
    console.log('domainが設定済み');
    // ↓にtrueのときの処理を追加する
    console.log(response.status);
    switch (response.status) {
      case 'added':
        console.log(response.newBody);
        break;
      case 'failure':
        console.log(response.newBody);
        break;
      case 'comparing':
        console.log(response.previousBody);
        console.log(response.newBody);
        break;
      default:
        console.log('not root');
        break;
    }
  }
})();
