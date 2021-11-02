// Local Storage - Armazenamento Local
// Limite do localStorage 5mb.
// Tarefa de casa -> Implementar o async await e o uso de promises ao localStorage
// Parar acessar os dados do storage, apertar botão direito inspecionar ou F12, Aplicativo/Aplication

// TODO: Tratar o retorno do buscaDadosDoStorage para retornar um erro amigavel, quando não existir o item no localStorage
const buscaDadosDoStorage = (storageName) =>
    JSON.parse(localStorage.getItem(storageName));

const salvarDadosNoStorage = (storageName, dados) =>
    localStorage.setItem(storageName, JSON.stringify(dados));

// TODO: Criar botão no HTML e criar método para remover todos os dados do LocalStorage
const removerDados = (storageName) => localStorage.removeItem(storageName);

const removerItemEspecifico = (storageName, parametro, id) => {
    salvarDadosNoStorage(
        storageName,
        buscaDadosDoStorage(storageName).filter(
            (item) => item[parametro] !== id
        )
    );
};

const atualizarItemEspecifico = (local, itemAntigoId, itemAtualizado) => {
    if (itemAntigoId !== itemAtualizado.id)
        throw "O ID antigo é diferente do ID novo, o id não pode ser alterado";

    const dadosAtuais = buscaDadosDoStorage(local);
    // TODO: Tratar quando dados atuais for indefinido no localStorage

    const novoItemAtualizado = {
        ...itemAtualizado,
        id: itemAntigoId,
    };

    const dadosFiltrados = dadosAtuais.filter((item) => item.id !== id) || [];

    dadosFiltrados.push(novoItemAtualizado);

    // TODO: Adicionar Item atualizado ao storage
};

const adicionarItemAoStorage = (storageName, novoItem) => {
    const dadosAtuais = buscaDadosDoStorage(storageName) || [];
    // TODO: Caso item já exista na lista, deverá atualizar e não criar um novo

    const novaLista = [...dadosAtuais, ...novoItem];
    salvarDadosNoStorage(storageName, novaLista);
};

const adicionarArrayAoStorage = (storageName, novosItems) => {
    const dadosAtuais = buscaDadosDoStorage(storageName) || [];
    const novaLista = novosItems.concat(dadosAtuais); // TODO: como retornar items unicos de um array de objetos.
    salvarDadosNoStorage(storageName, novaLista);
};
