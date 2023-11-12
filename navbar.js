const dropdownsCanvas = document.querySelectorAll('.dropdown.dd-canvas');
document.getElementById('for-generative').classList.remove('tools-hidden');

dropdownsCanvas.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const listing = dropdown.querySelector('.listing');
    const choices = dropdown.querySelectorAll('.listing li');

    // console.log(choices);
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        listing.classList.toggle('listing-open');
    });

    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            selected.innerText = choice.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            listing.classList.remove('listing-open');

            choices.forEach(choice => {
                choice.classList.remove('active');
                document.getElementById('for-generative').classList.add('tools-hidden');
                document.getElementById('for-sandbox').classList.add('tools-hidden');
                document.getElementById('for-world-map').classList.add('tools-hidden');
            });

            choice.classList.add('active');
            if (choice.innerHTML == "Generative") {
                document.getElementById('for-generative').classList.remove('tools-hidden');
                // console.log(document.getElementById('for-generative'));
            } else if (choice.innerHTML == "Sandbox") {
                document.getElementById('for-sandbox').classList.remove('tools-hidden');
            } else if (choice.innerHTML == 'World Map') {
                document.getElementById('for-world-map').classList.remove('tools-hidden');
            }
        });
    });

    document.addEventListener('click', (event) => {
        const isClickInsideDropdown = dropdown.contains(event.target);
        if (!isClickInsideDropdown) {
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            listing.classList.remove('listing-open');
        }
    });
});

const dropdownsVisualize = document.querySelectorAll('.dropdown.dd-visualize');

dropdownsVisualize.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const listing = dropdown.querySelector('.listing');
    const choices = dropdown.querySelectorAll('.listing li');

    // console.log(choices);
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        listing.classList.toggle('listing-open');
    });

    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            selected.innerText = choice.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            listing.classList.remove('listing-open');

            choices.forEach(choice => {
                choice.classList.remove('active');
            });

            choice.classList.add('active');
        });
    });

    document.addEventListener('click', (event) => {
        const isClickInsideDropdown = dropdown.contains(event.target);
        if (!isClickInsideDropdown) {
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            listing.classList.remove('listing-open');
        }
    });
});
