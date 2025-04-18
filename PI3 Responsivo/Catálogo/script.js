const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const bookList = document.getElementById('bookList');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    searchBooks(searchTerm);
});

async function searchBooks(searchTerm) {
    const apiKey = 'AIzaSyAkU-7PhH7J5azRes2hqn6yRwi6e53-SCo'; // Substitua pela sua chave
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayBooks(data.items);
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
    }
}

function displayBooks(books) {
    bookList.innerHTML = ''; // Limpa a lista de livros

    if (!books) {
        bookList.innerHTML = '<p>Nenhum livro encontrado.</p>';
        return;
    }

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        const title = book.volumeInfo.title;
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Desconhecido';
        const image = book.volumeInfo.imageLinks?.thumbnail;
        const bookId = book.id; // Obtém o ID do livro

        bookElement.innerHTML = `
            <h3>${title}</h3>
            <p>Autor: ${authors}</p>
            ${image ? `<img src="${image}" alt="${title}">` : '<p>Imagem não disponível</p>'}
        `;

        // Adiciona um evento de clique para exibir o pop-up
        bookElement.addEventListener('click', () => {
            showBookDetails(book.volumeInfo);
        });

        bookList.appendChild(bookElement);
    });
}

function showBookDetails(book) {
    const title = book.title;
    const authors = book.authors ? book.authors.join(', ') : 'Desconhecido';
    const image = book.imageLinks?.thumbnail;
    const description = book.description || 'Descrição não disponível';

    const popup = document.createElement('div');
    popup.classList.add('popup');

    popup.innerHTML = `
        <div class="popup-content">
            <h2>${title}</h2>
            <p>Autor: ${authors}</p>
            ${image ? `<img src="${image}" alt="${title}">` : '<p>Imagem não disponível</p>'}
            <p>${description}</p>
            <button class="close-popup">Fechar</button>
        </div>
    `;

    document.body.appendChild(popup);

    // Adiciona um evento de clique para fechar o pop-up
    popup.querySelector('.close-popup').addEventListener('click', () => {
        popup.remove();
    });
}