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

    const character = {
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
    });

    // Adicionando um evento para adicionar itens ao inventário
    addItemBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const newItem = inventoryItemInput.value;

        // Adicionar o novo item ao inventário do personagem
        character.inventory.push(newItem);

        // Atualizar o inventário na interface
        updateInventory();

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

        // Limpar o campo de entrada após adicionar a nota
        userNotesInput.value = '';
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
            listItem.id = `inventory-item-${index}`;
            inventoryListElement.appendChild(listItem);
        });
    }

    // Função para atualizar as qualidades e defeitos na interface
    function updateQualitiesDefects() {
        qualitiesDefectsListElement.innerHTML = '';
        character.qualitiesDefects.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            listItem.id = `qualities-defects-item-${index}`;
            qualitiesDefectsListElement.appendChild(listItem);
        });
    }

    // Função para atualizar os atributos na interface
    function updateAttributes() {
        attributesListElement.innerHTML = '';
        character.attributes.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            listItem.id = `attributes-item-${index}`;
            attributesListElement.appendChild(listItem);
        });
    }

    // Função para atualizar as notas do usuário na interface
    function updateUserNotes() {
        userNotesListElement.innerHTML = '';
        character.userNotes.forEach((note, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = note;
            listItem.id = `user-note-${index}`;
            userNotesListElement.appendChild(listItem);
        });
    }
});
