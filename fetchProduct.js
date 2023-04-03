import fs from 'fs/promises';
import fetch from 'node-fetch';

const url = 'https://dummyjson.com/products?limit=70&skip=30';

async function fetchDataAndSaveToFile() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        await fs.writeFile('products.json', JSON.stringify(data, null, 2));

        console.log('Data successfully saved into products.json');
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchDataAndSaveToFile();
