document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('nav a, .destaque a.btn-whatsapp');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.split('#')[1];
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const searchInput = document.querySelector('header form input[name="q"]');
    const produtos = document.querySelectorAll('.produto');
    const autocompleteResults = document.querySelector('.autocomplete-results');

    // Mapeia todos os produtos e categorias para a busca
    const allProductData = Array.from(produtos).map(produto => ({
        name: produto.querySelector('h3').textContent,
        description: produto.querySelector('p').textContent,
        id: produto.dataset.id,
        category: produto.closest('.produto-categoria').id,
        element: produto
    }));

    const categories = ['aparador','sofas', 'mesas']; // Lista de categorias para autocompletar

    const filterAndDisplayProducts = (searchTerm) => {// Filtra e exibe produtos com base no termo de busca
        produtos.forEach(produto => {
            const nomeProduto = produto.querySelector('h3').textContent.toLowerCase();
            const descricaoProduto = produto.querySelector('p').textContent.toLowerCase();
            const produtoId = produto.dataset.id;
            const produtoCategoria = produto.closest('.produto-categoria').id;
            
            // Prioriza a busca por ID numérico ou categoria
            if (searchTerm.length > 0) {
                if (produtoId === searchTerm || produtoCategoria.includes(searchTerm) || nomeProduto.includes(searchTerm) || descricaoProduto.includes(searchTerm)) {
                    produto.style.display = 'block';
                } else {
                    produto.style.display = 'none';
                }
            } else {
                produto.style.display = 'block'; // Exibe todos se a busca estiver vazia
            }
        });
    };

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        autocompleteResults.innerHTML = '';
        
        if (searchTerm.length === 0) {
            autocompleteResults.classList.add('hidden');
            filterAndDisplayProducts('');
            return;
        }

        const matches = allProductData.filter(item => 
            item.name.toLowerCase().includes(searchTerm) || 
            item.id.includes(searchTerm) ||
            item.category.includes(searchTerm)
        );

        if (matches.length > 0) {
            matches.forEach(match => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.textContent = match.name;
                suggestionDiv.addEventListener('click', () => {
                    searchInput.value = match.name;
                    autocompleteResults.classList.add('hidden');
                    filterAndDisplayProducts(match.id);
                });
                autocompleteResults.appendChild(suggestionDiv);
            });
            autocompleteResults.classList.remove('hidden');
        } else {
            autocompleteResults.classList.add('hidden');
        }
        
        filterAndDisplayProducts(searchTerm);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            autocompleteResults.classList.add('hidden');
        }
    });

});