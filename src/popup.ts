// Function to render pre-configured domains
async function renderPreConfiguredDomains() {
  const domainList = document.getElementById('domainList');
  if (domainList === null) {
    return;
  }
  domainList.innerHTML = '';
  const configuredDomains: string[] = await getConfiguredDmains();
  configuredDomains.forEach(function (domain) {
    const listItem = document.createElement('li');
    const domainItem = document.createElement('span');
    domainItem.classList.add('domain-item');
    domainItem.textContent = domain;
    listItem.appendChild(domainItem);
    if (domainList === null) {
      return;
    }
    domainList.appendChild(listItem);
    const removeButton = document.createElement('span');
    removeButton.classList.add('remove-domain');
    removeButton.textContent = '❌';
    removeButton.addEventListener('click', function () {
      removeDomain(domain);
    });
    listItem.appendChild(removeButton);
  });
}

const getConfiguredDmains = async (): Promise<string[]> => {
  const storage = await chrome.storage.local.get('configuredDomains');
  const configuredDomains: string[] = storage.configuredDomains ? storage.configuredDomains : [];
  return configuredDomains;
};

// Function to add a new domain
async function addDomain() {
  const domainInput = <HTMLInputElement>document.getElementById('domainInput');
  const domain = domainInput.value.trim();
  if (domain) {
    const domains = await getConfiguredDmains();
    domains.push(domain);
    await chrome.storage.local.set({ configuredDomains: domains });
    renderPreConfiguredDomains();
    domainInput.value = '';
  }
}

// Function to remove a domain
async function removeDomain(domainToRemove: string) {
  let domains = await getConfiguredDmains();
  const newDomains = domains.filter(function (domain) {
    return domain !== domainToRemove;
  });
  await chrome.storage.local.set({ configuredDomains: newDomains });

  renderPreConfiguredDomains();
}

// Render pre-configured domains when the page loads
document.addEventListener('DOMContentLoaded', function () {
  renderPreConfiguredDomains();
});

const btn = document.getElementById('addButton');
btn!.addEventListener('click', addDomain);

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
