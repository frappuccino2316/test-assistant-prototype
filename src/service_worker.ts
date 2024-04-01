chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const domain = request.url.split('/')[2];
  const body = request.body;
  const url = request.url;

  console.log(body);

  includeDomain(domain).then((result) => {
    getDom(url).then((dom) => {
      if (JSON.stringify(dom) === JSON.stringify({})) {
        addDom(body, url).then((res) => {
          sendResponse({ domainExists: result, status: res, newBody: body });
        });
      } else {
        // console.log(dom);
        // console.log(body);
        // console.log(dom.isEqualNode(body));
        sendResponse({
          domainExists: result,
          status: 'comparing',
          previousBody: dom,
          newBody: body,
        });
      }
      sendResponse({ domainExists: result });
    });
  });
});

// TODO
// 以下は他ファイルからimportしたらエラーになってしまうので、一旦ベタ書きしている
// 問題を解決したらファイル分離したい
export const includeDomain = async (currentDomain: string): Promise<boolean> => {
  const configuredDomains: string[] = await getConfiguredDmains();
  if (currentDomain === undefined) {
    return false;
  }
  if (configuredDomains.includes(currentDomain)) {
    return true;
  }
  return false;
};

export const getConfiguredDmains = async (): Promise<string[]> => {
  const storage = await chrome.storage.local.get('configuredDomains');
  const configuredDomains: string[] = storage.configuredDomains ? storage.configuredDomains : [];
  return configuredDomains;
};

// dom情報を持っておきたい
export const addDom = async (body: object, url: string) => {
  console.log('↓addDom');
  console.log(body);
  console.log(url);
  if (body) {
    await chrome.storage.local.set({ url: body });
    return 'added';
  } else {
    return 'failure';
  }
};

export const removeDom = async (url: string) => {
  await chrome.storage.local.remove(url, () => {
    console.log('successfully deteled');
  });
};

export const getDom = async (url: string): Promise<object> => {
  const storage = await chrome.storage.local.get(url);
  const dom = storage.url ? storage.url : {};
  return dom;
};
