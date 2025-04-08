const cepInput = document.getElementById('cep');
const btnPesquisarCEP = document.getElementById('btn');
const limpar = () =>{
    document.getElementById('cep').value=('');
    document.getElementById('rua').value=('');
    document.getElementById('bairro').value=('');
    document.getElementById('cidade').value=('');
    document.getElementById('uf').value=('');
    document.getElementById('complemento').value=('');
}

const atribuirCampos = (conteudo) =>{
    if (!("erro" in conteudo)){
        document.getElementById('rua').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('uf').value=(conteudo.uf);
        document.getElementById('complemento').value=(conteudo.complemento);
    }
    else{
        alert("Erro na busca de cep");
    }
}

cepInput.addEventListener('keypress', function(event){
    const keyCode = event.keyCode;
    console.log(keyCode);

    if (keyCode < 48 || keyCode > 57){
        alert("Tecla pressionada inválida. Apenas números!")
        event.preventDefault();
    } 
})

// Método que o gustavo fez

// const buscacep = () =>{
//     const cep = parseInt(document.getElementById('cep').value);
//     cep_char = String(cep);
//     cep_char_tam = cep_char.length;
//     if (cep_char_tam != 8){
//         alert("Quantidade de digitos invalido, use exatamente 8");
//     }
//     if (cep != ''){
//         var script = document.createElement('script');
//         script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

//         document.body.appendChild(script);
//         script.remove()
//     }
// }

// Metodo Ivo
const obterDadosApi = async (cep) =>{
	// Armazenar o endereço de requisição da API
	const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    console.log(apiUrl)
	// Armazenar a resposta da API e aguardar a construção
    // Fetch armazena os valores do Banco de dados
	const response = await fetch(apiUrl);
    console.log(response)
	// Converter os dados para JSON
	const data = await response.json();
    console.log(data)
    // Testando se a atribuição de valores da certo
    if (data.erro){
        alert("O CEP digitando está inválido.");
        return
    }
    // Função que atribui os campos aos valores do html
    atribuirCampos(data);
}

btnPesquisarCEP.addEventListener('click', (e) =>{
    e.preventDefault();

    if (cepInput.value.length != 8){
        alert('Por favor, digite um CEP válido com 8 dígitos.')
        document.querySelector('#cep').value = '';
        return;
    }
    obterDadosApi(cepInput.value);
})