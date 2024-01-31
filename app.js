document.addEventListener('DOMContentLoaded', () => {
    const characterNameInput = document.getElementById('character-name');
    const characterLevelInput = document.getElementById('character-level');
    const characterHpInput = document.getElementById('character-hp');
    const characterForm = document.getElementById('character-form');
    const inventoryItemInput = document.getElementById('inventory-item');
    const addItemBtn = document.getElementById('add-item-btn');
    const inventoryListElement = document.getElementById('inventory-list');
    const qualitiesDefectsItemInput = document.getElementById('qualities-defects-item');
    const addQualitiesDefectsBtn = document.getElementById('add-qualities-defects-btn');
    const qualitiesDefectsListElement = document.getElementById('qualities-defects-list');
    const attributesItemInput = document.getElementById('attributes-item');
    const addAttributeBtn = document.getElementById('add-attribute-btn');
    const attributesListElement = document.getElementById('attributes-list');
    const userNotesInput = document.getElementById('user-notes');
    const addUserNoteBtn = document.getElementById('add-user-note-btn');
    const userNotesListElement = document.getElementById('user-notes-list');

    const character = loadCharacterFromStorage() || {
        name: '',
        level: '',
        hp: '',
        inventory: [],
        qualitiesDefects: [],
        attributes: [],
        userNotes: []
    };

    // Atualizar informações do personagem na interface
    updateCharacterInfo();

    // Atualizar inventário na interface
    updateInventory();

    // Atualizar qualidades e defeitos na interface
    updateQualitiesDefects();

    // Atualizar atributos na interface
    updateAttributes();

    // Atualizar notas do usuário na interface
    updateUserNotes();

    // Adicionando um evento de submissão para o formulário de atributos do personagem
    characterForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Atualizar os atributos do personagem com base no formulário
        character.name = characterNameInput.value;
        character.level = characterLevelInput.value;
        character.hp = characterHpInput.value;

        // Atualizar informações do personagem na interface
        updateCharacterInfo();

        // Salvar personagem no armazenamento local
        saveCharacterToStorage(character);

        saveDataToFile('data.json', JSON.stringify(character));
    });

    // Adicionando um evento para adicionar itens ao inventário
    addItemBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const newItem = inventoryItemInput.value;

        // Adicionar o novo item ao inventário do personagem
        character.inventory.push(newItem);

        // Atualizar o inventário na interface
        updateInventory();

        // Salvar personagem no armazenamento local
        saveCharacterToStorage(character);

        // Limpar o campo de entrada após adicionar o item
        inventoryItemInput.value = '';
    });

    // Adicionando um evento para adicionar itens às qualidades e defeitos
    addQualitiesDefectsBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const newQualitiesDefects = qualitiesDefectsItemInput.value;

        // Adicionar o novo item às qualidades e defeitos do personagem
        character.qualitiesDefects.push(newQualitiesDefects);

        // Atualizar as qualidades e defeitos na interface
        updateQualitiesDefects();

        // Salvar personagem no armazenamento local
        saveCharacterToStorage(character);

        // Limpar o campo de entrada após adicionar o item
        qualitiesDefectsItemInput.value = '';
    });

    // Adicionando um evento para adicionar itens aos atributos
    addAttributeBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const newAttribute = attributesItemInput.value;

        // Adicionar o novo item aos atributos do personagem
        character.attributes.push(newAttribute);

        // Atualizar os atributos na interface
        updateAttributes();

        // Salvar personagem no armazenamento local
        saveCharacterToStorage(character);

        // Limpar o campo de entrada após adicionar o item
        attributesItemInput.value = '';
    });

    // Adicionando um evento para adicionar notas do usuário
    addUserNoteBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const userNote = userNotesInput.value;

        // Adicionar a nova nota à lista de notas do usuário
        character.userNotes.push(userNote);

        // Atualizar as notas do usuário na interface
        updateUserNotes();

        // Salvar personagem no armazenamento local
        saveCharacterToStorage(character);

        // Limpar o campo de entrada após adicionar a nota
        userNotesInput.value = '';
    });

    // Adicionando um evento para remover itens do inventário
    inventoryListElement.addEventListener('click', function (event) {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const index = target.getAttribute('data-index');
            if (index !== null) {
                // Remover o item do inventário
                character.inventory.splice(index, 1);

                // Atualizar o inventário na interface
                updateInventory();

                // Salvar personagem no armazenamento local
                saveCharacterToStorage(character);
            }
        }
    });

    // Adicionando um evento para remover itens das qualidades e defeitos
    qualitiesDefectsListElement.addEventListener('click', function (event) {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const index = target.getAttribute('data-index');
            if (index !== null) {
                // Remover o item das qualidades e defeitos
                character.qualitiesDefects.splice(index, 1);

                // Atualizar as qualidades e defeitos na interface
                updateQualitiesDefects();

                // Salvar personagem no armazenamento local
                saveCharacterToStorage(character);
            }
        }
    });

    // Adicionando um evento para remover itens dos atributos
    attributesListElement.addEventListener('click', function (event) {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const index = target.getAttribute('data-index');
            if (index !== null) {
                // Remover o item dos atributos
                character.attributes.splice(index, 1);

                // Atualizar os atributos na interface
                updateAttributes();

                // Salvar personagem no armazenamento local
                saveCharacterToStorage(character);
            }
        }
    });

    // Adicionando um evento para remover notas do usuário
    userNotesListElement.addEventListener('click', function (event) {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const index = target.getAttribute('data-index');
            if (index !== null) {
                // Remover a nota do usuário
                character.userNotes.splice(index, 1);

                // Atualizar as notas do usuário na interface
                updateUserNotes();

                // Salvar personagem no armazenamento local
                saveCharacterToStorage(character);
            }
        }
    });

    // Função para atualizar as informações do personagem na interface
    function updateCharacterInfo() {
        characterNameInput.value = character.name;
        characterLevelInput.value = character.level;
        characterHpInput.value = character.hp;
    }

    // Função para atualizar o inventário na interface
    function updateInventory() {
        inventoryListElement.innerHTML = '';
        character.inventory.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.setAttribute('data-index', index);
            
            listItem.appendChild(removeButton);
            
            inventoryListElement.appendChild(listItem);
        });
    }

    // Função para atualizar as qualidades e defeitos na interface
    function updateQualitiesDefects() {
        qualitiesDefectsListElement.innerHTML = '';
        character.qualitiesDefects.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.setAttribute('data-index', index);
            
            listItem.appendChild(removeButton);
            
            qualitiesDefectsListElement.appendChild(listItem);
        });
    }

    // Função para atualizar os atributos na interface
    function updateAttributes() {
        attributesListElement.innerHTML = '';
        character.attributes.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.setAttribute('data-index', index);
            
            listItem.appendChild(removeButton);
            
            attributesListElement.appendChild(listItem);
        });
    }

    // Função para atualizar as notas do usuário na interface
    function updateUserNotes() {
        userNotesListElement.innerHTML = '';
        character.userNotes.forEach((note, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = note;
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.setAttribute('data-index', index);
            
            listItem.appendChild(removeButton);
            
            userNotesListElement.appendChild(listItem);
        });
    }

    // Função para salvar o personagem no armazenamento local
    function saveCharacterToStorage(character) {
        localStorage.setItem('character', JSON.stringify(character));
    }

    // Função para carregar o personagem do armazenamento local
    function loadCharacterFromStorage() {
        const characterJSON = localStorage.getItem('character');
        return characterJSON ? JSON.parse(characterJSON) : null;
    }
});

// Adicionando um evento para carregar os dados de um arquivo JSON local
document.getElementById('load-data-btn').addEventListener('click', function () {
    // Carregar os dados de um arquivo JSON local
    loadDataFromFile('data.json');
});

// Função para salvar os dados em um arquivo JSON local
function saveDataToFile(filename, data) {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    // Verificar se o arquivo já existe localmente
    if (fileExistsLocally(filename)) {
        // Se o arquivo existir, substituir o conteúdo do arquivo existente
        const fileReader = new FileReader();
        fileReader.onload = function() {
            const result = fileReader.result;
            const newBlob = new Blob([result, jsonData], { type: 'application/json' });

            // Cria um novo URL para o novo blob
            const newUrl = URL.createObjectURL(newBlob);

            a.href = newUrl;
            a.click();

            // Revoga o URL do novo blob
            URL.revokeObjectURL(newUrl);
        };

        fileReader.readAsArrayBuffer(blob);
    } else {
        // Se o arquivo não existir, simplesmente baixar o novo arquivo
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Revogar o URL do blob original
    URL.revokeObjectURL(url);
}

// Função para carregar os dados de um arquivo JSON local
function loadDataFromFile(filename) {
    fetch(filename)
        .then(response => response.json())
        .then(data => {
            // Atualizar o personagem com os dados carregados
            character = data;

            // Atualizar as informações na interface
            updateCharacterInfo();
            updateInventory();
            updateQualitiesDefects();
            updateAttributes();
            updateUserNotes();
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
}

// Função para verificar se um arquivo existe localmente
function fileExistsLocally(filename) {
    // Verificar se o arquivo existe na lista de arquivos do sistema de arquivos local
    // Aqui está um exemplo simplificado usando localStorage para verificar a existência do arquivo
    const fileData = localStorage.getItem(filename);
    return fileData !== null;
}
