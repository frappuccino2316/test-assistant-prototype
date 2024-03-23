console.log('test');

// Sample pre-configured domains
let preConfiguredDomains = ['example.com', 'subdomain.example.com', 'anotherexample.com'];

// Function to render pre-configured domains
function renderPreConfiguredDomains() {
  const domainList = document.getElementById('domainList');
  if (domainList === null) {
    return;
  }
  domainList.innerHTML = '';
  preConfiguredDomains.forEach(function (domain) {
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

// Function to add a new domain
function addDomain() {
  const domainInput = <HTMLInputElement>document.getElementById('domainInput');
  const domain = domainInput.value.trim();
  if (domain) {
    preConfiguredDomains.push(domain);
    renderPreConfiguredDomains();
    domainInput.value = '';
  }
}

// Function to remove a domain
function removeDomain(domainToRemove: string) {
  preConfiguredDomains = preConfiguredDomains.filter(function (domain) {
    return domain !== domainToRemove;
  });
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

const promise = getCurrentTab();
promise.then((value) => {
  console.log(value);
});
