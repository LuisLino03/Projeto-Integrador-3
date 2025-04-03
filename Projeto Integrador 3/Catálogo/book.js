const bookDetails = document.getElementById('bookDetails');

// Obtém o ID do livro da URL
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');

async function getBookDetails(bookId) {
    const apiKey = 'AIzaSyAkU-7PhH7J5azRes2hqn6yRwi6e53-SCo'; // Substitua pela sua chave
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayBookDetails(data.volumeInfo);
    } catch (error) {
        console.error('Erro ao buscar detalhes do livro:', error);
    }
}

function displayBookDetails(book) {
    const title = book.title;
    const authors = book.authors ? book.authors.join(', ') : 'Desconhecido';
    const image = book.imageLinks?.thumbnail;
    const description = book.description || 'Descrição não disponível';

    bookDetails.innerHTML = `
        <h2>${title}</h2>
        <p>Autor: ${authors}</p>
        ${image ? `<img src="${image}" alt="${title}">` : '<p>Imagem não disponível</p>'}
        <p>${description}</p>
    `;
}

getBookDetails(bookId);