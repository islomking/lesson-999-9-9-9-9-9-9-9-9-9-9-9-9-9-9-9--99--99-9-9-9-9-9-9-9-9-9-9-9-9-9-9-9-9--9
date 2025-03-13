const countriesContainer = document.querySelector('.countries-container');
        const searchInput = document.getElementById('search');
        const regionFilter = document.getElementById('region-filter');
        const countryDetails = document.getElementById('country-details');

        const fetchCountries = async () => {
            const res = await fetch('https://restcountries.com/v3.1/all');
            const data = await res.json();
            displayCountries(data);
        };

        const displayCountries = (countries) => {
            countriesContainer.innerHTML = '';
            countries.forEach(country => {
                const countryCard = document.createElement('div');
                countryCard.classList.add('country-card');
                countryCard.innerHTML = `
                    <img src="${country.flags.svg}" alt="${country.name.common}">
                    <h2>${country.name.common}</h2>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                `;
                countryCard.addEventListener('click', () => showDetails(country));
                countriesContainer.appendChild(countryCard);
            });
        };

        const showDetails = (country) => {
            countryDetails.style.display = 'block';
            countryDetails.innerHTML = `
                <h2>${country.name.common}</h2>
                <img src="${country.flags.svg}" alt="${country.name.common}" style="width: 200px;">
                <p><strong>Native Name:</strong> ${Object.values(country.name.nativeName || {})[0]?.common || country.name.common}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                <button onclick="hideDetails()">Back</button>
            `;
        };

        const hideDetails = () => {
            countryDetails.style.display = 'none';
        };

        const filterCountries = async () => {
            const res = await fetch('https://restcountries.com/v3.1/all');
            let data = await res.json();
            const searchText = searchInput.value.toLowerCase();
            const selectedRegion = regionFilter.value;
            
            data = data.filter(country => 
                country.name.common.toLowerCase().includes(searchText) && 
                (selectedRegion === 'All' || country.region === selectedRegion)
            );
            displayCountries(data);
        };

        searchInput.addEventListener('input', filterCountries);
        regionFilter.addEventListener('change', filterCountries);
        document.addEventListener('DOMContentLoaded', fetchCountries);