console.log('Test');

// Sample pre-configured domains
var preConfiguredDomains = ['example.com', 'subdomain.example.com', 'anotherexample.com'];

// Function to render pre-configured domains
function renderPreConfiguredDomains() {
  var domainList = document.getElementById('domainList');
  if (domainList === null) {
    return;
  }
  domainList.innerHTML = '';
  preConfiguredDomains.forEach(function (domain) {
    var listItem = document.createElement('li');
    var domainItem = document.createElement('span');
    domainItem.classList.add('domain-item');
    domainItem.textContent = domain;
    listItem.appendChild(domainItem);
    if (domainList === null) {
      return;
    }
    domainList.appendChild(listItem);
    var removeButton = document.createElement('span');
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
  var domainInput = <HTMLInputElement>document.getElementById('domainInput');
  var domain = domainInput.value.trim();
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
