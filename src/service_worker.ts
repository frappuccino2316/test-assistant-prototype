chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  includeDomain(request.currentDomain).then((result) => {
    console.log(result);
    sendResponse({ domainExists: result });
  });
  return true;
});

// TODO
// 以下は他ファイルからimportしたらエラーになってしまうので、一旦ベタ書きしている
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
