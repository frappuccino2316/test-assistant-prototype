import { addDomain, renderConfiguredDomains } from './popup/domain';

document.addEventListener('DOMContentLoaded', function () {
  renderConfiguredDomains();
});

const btn = document.getElementById('addButton');
btn!.addEventListener('click', addDomain);
