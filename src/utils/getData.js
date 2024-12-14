import axios from 'axios';

// solicita informacoes da API e retorna os dados
export default async function getData(url) {
    try {
        const response = await axios.get(url);
        //console.log(`getData: ${response.data}`)
        return response.data;
    } catch (error) {
        console.error(error.message)
        return {error: true, message: error.message};
    }
}