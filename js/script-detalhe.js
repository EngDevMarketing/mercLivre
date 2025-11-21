document.addEventListener('DOMContentLoaded', () => {
    // Array com os dados de todos os produtos
    const produtos = [
        {
            id: 1,//ID DO PRODUTO
            nome: "Aparador Belissima",//NOME DO PRODUTO
            preco: "R$ xxxxxx",//PREÇO
            descricao: "Fablicante: VALDE MÓVEIS", //FABLICANTE
            imagem: "imgCatalogo/img2001.png",//IMAGEM DO PRODUTO
            especificacoes: [//ESPECIFICAÇÕES DO PRODUTO
                "Material: Alta resistência, ótimo espaço interno",//MATERIAL
                "Dimensões, Altura: 85cm Largura: 120cm, Prof: 36cm",//DIMENSÕES
                "Cor: Cinamomo / off white",//COR
                "Peso: Não informado kg"//PESO
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
        // Adicione mais produtos aqui
    ];

    // Função para obter o ID do produto da URL
    const getProductIdFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id')); // Converte a string do ID para número
    };

    // Função para carregar os dados do produto na página
    const loadProductDetails = (productId) => {
        const produto = produtos.find(p => p.id === productId);

        if (produto) {
            document.title = `${produto.nome} - Loja de Móveis`;
            document.getElementById('imagem-produto').src = produto.imagem;
            document.getElementById('nome-produto').textContent = produto.nome;
            document.getElementById('preco-produto').textContent = produto.preco;
            document.getElementById('descricao-produto').textContent = produto.descricao;

            const listaEspecificacoes = document.getElementById('lista-especificacoes');
            listaEspecificacoes.innerHTML = ''; // Limpa a lista existente
            produto.especificacoes.forEach(spec => {
                const li = document.createElement('li');
                li.textContent = spec;
                listaEspecificacoes.appendChild(li);
            });
        } else {
            // Caso o ID não seja encontrado, exibe uma mensagem de erro
            const container = document.getElementById('detalhes-produto-container');
            container.innerHTML = '<p style="text-align:center; padding: 50px;">Produto não encontrado. Por favor, volte para a <a href="index.html">página inicial</a>.</p>';
        }
    };

    const productId = getProductIdFromUrl();
    loadProductDetails(productId);
});