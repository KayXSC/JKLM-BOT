import fs from 'fs/promises';
import readline from 'readline';
import clipboardy from 'clipboardy';

function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function buscarPalabras() {
    rl.question('Ingresa las letras: ', async (letras) => {
        if (letras.toLowerCase() === 'salir') {
            rl.close();
        } else {
            try {
                const data = await fs.readFile('diccionario.txt', 'utf8');
                const palabras = data.split('\n');
                let resultados = palabras.filter(palabra => palabra.includes(letras));
                resultados = [...new Set(resultados)]; // Eliminar duplicados
                mezclarArray(resultados);
                console.log("Palabras encontradas:", resultados.slice(0, 10));
                if (resultados.length > 0) {
                    await clipboardy.write(resultados[0]);
                    console.log(`La palabra '${resultados[0]}' ha sido copiada al portapapeles.`);
                }
            } catch (err) {
                console.error(err);
            }
            buscarPalabras();
        }
    });
}

buscarPalabras();