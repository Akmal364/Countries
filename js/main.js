const body = document.querySelector('body');
const light = document.querySelector('#light');
const dark = document.querySelector('#dark');
const btnCountries = document.querySelector('.btnCountries');
const btnPopulation = document.querySelector('.btnPopulation');
const btnArea = document.querySelector('.btnArea');
const input = document.querySelector('.input');
const select = document.querySelector('.select');
const holder = document.querySelector('.holder');

let counteries = [];

function getData() {
    try {
        const responcse = fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population,area,languages,currencies,timezones")
            .then(res => res.json())
            .then(data => {
                counteries = data
                renderCountries(counteries);
            });
    } catch (error) {
        console.error(holder.innerHTML = `<h1 class="error">API error</h1>`);

    }
}
getData();

function renderCountries(data) {

    holder.innerHTML = '';

    data.forEach(country => {
        console.log(country);

        const fragment = document.createDocumentFragment();

        const countryCard = document.createElement('div');
        countryCard.classList.add('countryCard');

        const countryFlag = document.createElement('img');
        countryFlag.src = country.flags.png;
        countryFlag.alt = country.flags.alt;

        const countryName = document.createElement('h2');
        countryName.textContent = `${country.name.common}`;

        const countryCapital = document.createElement('p');
        countryCapital.textContent = `Capital: ${country.capital || 'No capital'}`;

        const countryRegion = document.createElement('p');
        countryRegion.textContent = `Region: ${country.region}`;

        const countryPopulation = document.createElement('p');
        countryPopulation.textContent = `Population: ${country.population}`;

        const countryArea = document.createElement('p');
        countryArea.textContent = `Area: ${country.area} km²`;

        let langs = '';
        for (let key in country.languages) {
            langs += `${country.languages[key]} `;
        }

        const countryLanguages = document.createElement('p');
        countryLanguages.textContent = `Languages: ${langs || 'No data'}`;

        let curr = '';
        for (let key in country.currencies) {
            curr += `${country.currencies[key].name} `;
        }

        const countryCurrencies = document.createElement('p');
        countryCurrencies.textContent = `Currencies: ${curr || 'No data'}`;

        const countryTimezones = document.createElement('p');
        countryTimezones.textContent = `Timezones: ${country.timezones || 'No data'}`;

        fragment.append(countryFlag,
            countryName,
            countryCapital,
            countryRegion,
            countryPopulation,
            countryArea,
            countryLanguages,
            countryCurrencies,
            countryTimezones);

        countryCard.appendChild(fragment);

        holder.appendChild(countryCard);
    });
}

btnCountries.addEventListener('click', () => {
    renderCountries(
        counteries.sort((a, b) => {
            if (a.name.common > b.name.common) {
                return 1
            } else if (a.name.common < b.name.common) {
                return -1
            } else {
                return 0
            }
        }), );
});

btnPopulation.addEventListener('click', () => {
    renderCountries(
        counteries.sort((a, b) => {
            if (a.population > b.population) {
                return 1
            } else if (a.population < b.population) {
                return -1
            } else {
                return 0
            }
        }), );
});

btnArea.addEventListener('click', () => {
    renderCountries(
        counteries.sort((a, b) => {
            if (a.area > b.area) {
                return 1
            } else if (a.area < b.area) {
                return -1
            } else {
                return 0
            }
        }), );
});

select.addEventListener('change', (event) => {
    event.preventDefault();
    const value = event.target.value;

    let filter;
    if (value === 'All') {
        filter = counteries;
    } else {
        filter = counteries.filter((countryFilter) => countryFilter.region === value);
    }

    renderCountries(filter);
});

input.addEventListener('input', (event) => {
    const inputValue = event.target.value.toLowerCase();

    const searchCountry = counteries.filter((country) =>
        country.name.common.toLowerCase().includes(inputValue)
    );

    renderCountries(searchCountry);
});

const setTheme = (theme) => {
    if (theme === 'dark') {
        dark.style.display = 'none';
        light.style.display = 'block';
        body.classList.add('show')

        localStorage.setItem('theme', 'dark');
    } else {
        light.style.display = 'none';
        dark.style.display = 'block';
        body.classList.remove("show")
        localStorage.setItem('theme', 'light');

    }
};

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
}

dark.addEventListener('click', () => setTheme('dark'));
light.addEventListener('click', () => setTheme('light'));