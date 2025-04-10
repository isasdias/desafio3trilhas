// ======= SELEÇÃO DOS ELEMENTOS DO FORMULÁRIO =======
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.espacamento');
    const emailInput = document.getElementById('e_mail');
    const allInputs = document.querySelectorAll('input, select');
    const submitButton = document.querySelector('.botao-inscricao');

    // ======= FUNÇÕES DE VALIDAÇÃO BÁSICA =======
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isOnlyNumbers = (value) => /^\d+$/.test(value);
    const isOnlyLetters = (value) => /^[A-Za-zÀ-ÿ\s]+$/.test(value);
    const isValidDate = (value) => /^\d{2}\/\d{2}\/\d{4}$/.test(value);

     // ======= EXIBIÇÃO DE ERROS NO FORMULÁRIO =======
    const showError = (input, message) => {
        let error = input.parentNode.querySelector('.erro');
        if (!error) {
            error = document.createElement('small');
            error.classList.add('erro');
            error.style.color = 'red';
            input.parentNode.appendChild(error);
        }
        error.innerText = message;
    };

    // ======= LIMPA OS ERROS ANTES DE VALIDAR NOVAMENTE =======
    const clearErrors = () => {
        const errors = document.querySelectorAll('.erro');
        errors.forEach(e => e.remove());
    };

     // ======= FUNÇÃO PRINCIPAL QUE VALIDA O FORMULÁRIO =======
    const validateForm = () => {
        clearErrors();
        let valid = true;

        // Para cada campo do formulário, faz as verificações
        allInputs.forEach(input => {
            const value = input.value.trim();
            const id = input.id;
            const label = input.previousElementSibling ? input.previousElementSibling.innerText : input.name;

            // Ignora botões e campos do tipo rádio (serão verificados depois)
            if (input.type !== 'radio' && input.type !== 'submit' && input.type !== 'button') {
                if (!value && id !== 'numero') {
                    showError(input, `${label} é obrigatório.`);
                    valid = false;
                }

                // Validações específicas para alguns campos
                switch (id) {
                    case 'e_mail':
                        if (value && !isValidEmail(value)) {
                            showError(input, 'Insira um e-mail válido (ex: exemplo@email.com)');
                            valid = false;
                        }
                        break;

                    case 'numero_telefone':
                        if (!isOnlyNumbers(value) || value.length !== 11) {
                            showError(input, 'Telefone deve conter apenas números e ter 11 dígitos (ex: DDD + número)');
                            valid = false;
                        }
                        break;

                    case 'numero_cpf':
                        if (!isOnlyNumbers(value) || value.length !== 11) {
                            showError(input, 'CPF deve conter apenas números e ter 11 dígitos');
                            valid = false;
                        }
                        break;

                    case 'nome_completo':
                        if (!isOnlyLetters(value)) {
                            showError(input, 'Nome deve conter apenas letras');
                            valid = false;
                        }
                        break;

                    case 'cep':
                        if (!isOnlyNumbers(value) || value.length !== 8) {
                            showError(input, 'CEP deve conter apenas números e ter 8 dígitos');
                            valid = false;
                        }
                        break;

                    case 'numero':
                        if (value && !isOnlyNumbers(value)) {
                            showError(input, 'Número do endereço deve conter apenas números ou ficar em branco');
                            valid = false;
                        }
                        break;

                    case 'data_de_nascimento':
                        if (value && !isValidDate(value)) {
                            showError(input, 'Data de nascimento inválida. Use o formato DD/MM/AAAA.');
                            valid = false;
                        }
                        break;
                }
            }
        });

          // Verifica se uma trilha de aprendizagem foi selecionada 
        const trilhas = document.getElementsByName('trilhas');
        const radioChecked = Array.from(trilhas).some(t => t.checked);
        if (!radioChecked) {
            const trilhaBox = document.querySelector('.todas-as-trihas');
            showError(trilhaBox, 'Selecione uma trilha de aprendizagem.');
            valid = false;
        }

        return valid;
    };
// ======= AÇÃO AO CLICAR NO BOTÃO DE INSCRIÇÃO =======
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert('Formulário enviado com sucesso!');
            window.location.href = 'login.html'; // 👈 redireciona após o alert
        } else {
            alert('Por favor, corrija os erros antes de enviar.');
        }
    });
});