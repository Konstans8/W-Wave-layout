document.addEventListener('DOMContentLoaded', function() {

    const options = [
        { value: 1, text: 'Дмитрий Гутенберг' },
        { value: 2, text: 'Анна Васильева' },
        { value: 3, text: 'Пётр Дмитриевский' },
        { value: 4, text: 'Татьяна Флеганова' },
    ];
    
    class CustomSelect {
        #dropdownContainer = null;
        #currentSelectedOption = null;
        constructor(id, options) {
        this.#dropdownContainer = this.#createDropdownContainer(id, options);
        }
        render(container) {
        container.append(this.#dropdownContainer);
        }
        get selectedValue() {
        const currentSelectedOption = options.find(
            ({ value }) => value === Number(this.#currentSelectedOption?.dataset?.value)
        );
        return currentSelectedOption;
        }
        #createDropdownContainer(id, options) {
        const selectDropdown = document.createElement('div');
        selectDropdown.className = `select-dropdown select-dropdown--${id}`;
        const button = document.createElement('button');
        button.className = `select-dropdown__button select-dropdown__button--${id}`;
        const span = document.createElement('span');
        span.className = `select-dropdown__text select-dropdown__text--${id}`;
        span.innerText = 'Выберите элемент';
        button.prepend(span);
        const ul = document.createElement('ul');
        ul.className = `select-dropdown__list select-dropdown__list--${id}`;
    
        const createLi = (text, value) => {
            const li = document.createElement('li');
            li.innerText = text;
            li.className = 'select-dropdown__list-item';
            li.dataset.value = value;
            ul.append(li);
        };
        options.forEach(({ text, value }) => createLi(text, value));
    
        selectDropdown.append(button, ul);
    
        //добавляем открытие/раскрытие
        button.addEventListener('click', () => ul.classList.toggle('active'));
    
        //добавляем выбор элемента
        const selectDropdownListItem = selectDropdown.querySelectorAll(
            '.select-dropdown__list-item'
        );
        selectDropdownListItem.forEach((item) =>
            item.addEventListener('click', ({ target }) => {
            this.#currentSelectedOption = target;
            ul.classList.remove('active');
            selectDropdown.querySelector('.select-dropdown__text').innerText =
                target.innerText;
            selectDropdownListItem.forEach((item) =>
                item.classList.remove('selected')
            );
            target.classList.add('selected');
            })
        );
    
        return selectDropdown;
        }
        
    }
    
    const customSelect = new CustomSelect('123', options);
    const mainContainer = document.querySelector('#container');
    customSelect.render(mainContainer);
    
});