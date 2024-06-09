function openAddModal() {
    document.getElementById('addModal').style.display = 'block';
}

function openEditModal(id, pais, valorPassagem, passagem, validade, duracao, saidas, refeicao) {
    document.getElementById('editId').value = id;
    document.getElementById('editPais').value = pais;
    document.getElementById('editValorPassagem').value = valorPassagem;
    document.getElementById('editPassagem').value = passagem;
    document.getElementById('editValidade').value = validade;
    document.getElementById('editDuracao').value = duracao;
    document.getElementById('editSaidas').value = saidas;
    document.getElementById('editRefeicao').value = refeicao;
    document.getElementById('editModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

async function saveEdit() {
    var id = document.getElementById('editId').value;
    var pais = document.getElementById('editPais').value;
    var valorPassagem = parseFloat(document.getElementById('editValorPassagem').value);
    var passagem = document.getElementById('editPassagem').value;
    var validade = document.getElementById('editValidade').value;
    var duracao = document.getElementById('editDuracao').value;
    var saidas = document.getElementById('editSaidas').value;
    var refeicao = document.getElementById('editRefeicao').value;

    try {
        const response = await fetch(`/pacotes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pais: pais,
                valorPassagem: valorPassagem,
                duracao: duracao,
                passagem: passagem,
                validade: validade,
                saidas: saidas,
                refeicao: refeicao
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao editar pacote');
        }

        closeModal('editModal');
        window.location.reload();
    } catch (error) {
        console.error('Erro ao editar pacote:', error);
        alert('Erro ao editar pacote');
    }
}

async function addPacote() {
    var pais = document.getElementById('novoPais').value;
    var valorPassagem = parseFloat(document.getElementById('novoValorPassagem').value);
    var duracao = document.getElementById('novaDuracao').value;
    var passagem = document.getElementById('novaPassagem').value;
    var validade = document.getElementById('novaValidade').value;
    var saidas = document.getElementById('novasSaidas').value;
    var refeicao = document.getElementById('novaRefeicao').value;

    try {
        const response = await fetch('/pacotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pais: pais,
                valorPassagem: valorPassagem,
                duracao: duracao,
                passagem: passagem,
                validade: validade,
                saidas: saidas,
                refeicao: refeicao
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar pacote');
        }

        closeModal('addModal');
        window.location.reload();
    } catch (error) {
        console.error('Erro ao adicionar pacote:', error);
        alert('Erro ao adicionar pacote');
    }
}

async function deletePacote(id) {
    try {
        const response = await fetch(`/pacotes/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao excluir pacote');
        }

        window.location.reload();
    } catch (error) {
        console.error('Erro ao excluir pacote:', error);
        alert('Erro ao excluir pacote');
    }
}

function toggleCustomSelect(id) {
    var dropdown = document.getElementById(id + 'Options');
    dropdown.classList.toggle('active');
}

function selectCustomOption(id, option) {
    var dropdown = document.getElementById(id + 'Options');
    var placeholder = document.getElementById(id + 'Placeholder');
    placeholder.innerText = option;
    dropdown.classList.remove('active');
}

function handleSelectChange(select) {
    var id = select.id;
    var placeholder = document.getElementById(id + 'Placeholder');
    if (select.value) {
        placeholder.innerText = select.value;
    } else {
        placeholder.innerText = 'País';
    }
}