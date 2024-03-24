import { includeDomain, addDomain, renderConfiguredDomains } from './popup/domain';

includeDomain();

document.addEventListener('DOMContentLoaded', function () {
  renderConfiguredDomains();
});

const btn = document.getElementById('addButton');
btn!.addEventListener('click', addDomain);
