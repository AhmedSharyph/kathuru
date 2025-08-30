(() => {
  'use strict';

  class KathuruDropdown {
    constructor(selector = '.kathuru-dropdown') {
      this.dropdowns = document.querySelectorAll(selector);
      this.init();
    }

    init() {
      this.dropdowns.forEach(dropdown => {
        const optionsData = dropdown.dataset.options ? JSON.parse(dropdown.dataset.options) : [];
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = dropdown.dataset.placeholder || 'Select';
        input.value = '';

        const list = document.createElement('div');
        list.className = 'dropdown-list';

        const allOptions = [];
        const placeholderOption = document.createElement('div');
        placeholderOption.textContent = input.placeholder;
        list.appendChild(placeholderOption);
        allOptions.push(placeholderOption);

        optionsData.forEach(optText => {
          const div = document.createElement('div');
          div.textContent = optText;
          list.appendChild(div);
          allOptions.push(div);
        });

        dropdown.appendChild(input);
        dropdown.appendChild(list);

        function showAllOptions() {
          allOptions.forEach(opt => {
            if (opt === placeholderOption) opt.style.display = input.value ? 'none' : 'block';
            else opt.style.display = 'block';
          });
        }

        input.addEventListener('click', e => {
          e.stopPropagation();
          input.value = '';
          showAllOptions();
          list.style.display = 'block';
        });

        allOptions.forEach(option => {
          option.addEventListener('click', () => {
            input.value = option === placeholderOption ? '' : option.textContent;
            list.style.display = 'none';
          });
        });

        input.addEventListener('input', () => {
          const text = input.value.toLowerCase();
          allOptions.forEach(opt => {
            if (opt === placeholderOption) opt.style.display = text ? 'none' : 'block';
            else opt.style.display = opt.textContent.toLowerCase().includes(text) ? 'block' : 'none';
          });
        });

        document.addEventListener('click', e => {
          if (!dropdown.contains(e.target)) list.style.display = 'none';
        });
      });
    }
  }

  // Freeze the class to prevent external overwrites
  Object.freeze(KathuruDropdown);

  // Initialize after DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => new KathuruDropdown());
})();
