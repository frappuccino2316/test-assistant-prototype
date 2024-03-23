// 最初に実行したい処理をまとめた
const main = () => {
  includeDomain();

  document.addEventListener('DOMContentLoaded', function () {
    renderConfiguredDomains();
  });

  const btn = document.getElementById('addButton');
  btn!.addEventListener('click', addDomain);
};

const renderConfiguredDomains = async () => {
  const domainList = document.getElementById('domainList');
  if (domainList === null) {
    return;
  }
  domainList.innerHTML = '';
  const configuredDomains: string[] = await getConfiguredDmains();
  configuredDomains.forEach(function (domain) {
    // 設定済みドメインの表示
    const listItem = document.createElement('li');
    const domainItem = document.createElement('span');
    domainItem.classList.add('domain-item');
    domainItem.textContent = domain;
    listItem.appendChild(domainItem);
    domainList.appendChild(listItem);

    // 削除用ボタンの表示
    const removeButton = document.createElement('span');
    removeButton.classList.add('remove-domain');
    removeButton.textContent = '❌';
    removeButton.addEventListener('click', function () {
      removeDomain(domain);
    });
    listItem.appendChild(removeButton);
  });
};

// 設定済みドメインの取得
const getConfiguredDmains = async (): Promise<string[]> => {
  const storage = await chrome.storage.local.get('configuredDomains');
  const configuredDomains: string[] = storage.configuredDomains ? storage.configuredDomains : [];
  return configuredDomains;
};

const addDomain = async () => {
  const domainInput = <HTMLInputElement>document.getElementById('domainInput');
  const domain = domainInput.value.trim();
  if (domain) {
    const domains = await getConfiguredDmains();
    domains.push(domain);
    await chrome.storage.local.set({ configuredDomains: domains });
    renderConfiguredDomains();
    domainInput.value = '';
  }
};

const removeDomain = async (domainToRemove: string) => {
  let domains = await getConfiguredDmains();
  const newDomains = domains.filter(function (domain) {
    return domain !== domainToRemove;
  });
  await chrome.storage.local.set({ configuredDomains: newDomains });

  renderConfiguredDomains();
};

const includeDomain = async () => {
  const currentTab = await getCurrentTab();
  const currentDomain = currentTab.url?.split('/')[2];
  const configuredDomains: string[] = await getConfiguredDmains();
  if (currentDomain === undefined) {
    return false;
  }
  if (configuredDomains.includes(currentDomain)) {
    return true;
  }
  return false;
};

const getCurrentTab = async () => {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

main();
