import { getCurrentTab } from './tab';

export const renderConfiguredDomains = async () => {
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
export const getConfiguredDmains = async (): Promise<string[]> => {
  const storage = await chrome.storage.local.get('configuredDomains');
  const configuredDomains: string[] = storage.configuredDomains ? storage.configuredDomains : [];
  return configuredDomains;
};

export const addDomain = async () => {
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

export const removeDomain = async (domainToRemove: string) => {
  let domains = await getConfiguredDmains();
  const newDomains = domains.filter(function (domain) {
    return domain !== domainToRemove;
  });
  await chrome.storage.local.set({ configuredDomains: newDomains });

  renderConfiguredDomains();
};

export const includeDomain = async () => {
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
