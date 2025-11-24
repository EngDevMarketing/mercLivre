document.addEventListener('DOMContentLoaded', () => {
    // Importa os dados dos produtos
    const produtos = [
        {
            id: 1,
            nome: "Aparador Belissima",
            preco: "R$ xxxxxx",
            descricao: "Fablicante: VALDE MÓVEIS",
            imagem: "imgCatalogo/img2001.png",
            especificacoes: [
                "Material: Alta resistência, ótimo espaço interno",
                "Dimensões, Altura: 85cm Largura: 120cm, Prof: 36cm",
                "Cor: Cinamomo / off white",
                "Peso: Não informado kg"
            ]
        },
        {
            id: 2,
            nome: "Mesa de Jantar",
            preco: "R$ 850,00",
            descricao: "Feita de madeira maciça de alta resistência, esta mesa é ideal para refeições em família. Seu design robusto garante durabilidade e elegância.",
            imagem: "imagens/mesa1.jpg",
            especificacoes: [
                "Alta resistência, ótimo espaço interno",
                "Dimensões: 160cm x 80cm x 75cm (L x P x A)",
                "Cor: Marrom escuro",
                "Peso: 35 kg"
            ]
        }
    ];

    const getProductIdFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id'));
    };

    const loadProductDetails = (productId) => {
        const produto = produtos.find(p => p.id === productId);

        if (produto) {
            document.title = `${produto.nome} - Loja de Móveis`;
            document.getElementById('imagem-produto').src = produto.imagem;
            document.getElementById('nome-produto').textContent = produto.nome;
            document.getElementById('preco-produto').textContent = produto.preco;
            document.getElementById('descricao-produto').textContent = produto.descricao;

            const listaEspecificacoes = document.getElementById('lista-especificacoes');
            listaEspecificacoes.innerHTML = '';
            produto.especificacoes.forEach(spec => {
                const li = document.createElement('li');
                li.textContent = spec;
                listaEspecificacoes.appendChild(li);
            });
        } else {
            const container = document.getElementById('detalhes-produto-container');
            container.innerHTML = '<p style="text-align:center; padding: 50px;">Produto não encontrado. Por favor, volte para a <a href="index.html">página inicial</a>.</p>';
        }
    };

    const productId = getProductIdFromUrl();
    loadProductDetails(productId);
});