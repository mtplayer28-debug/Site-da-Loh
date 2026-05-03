// ========== MENU MOBILE ========== 
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('ativo');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('ativo');
    });
});

// ========== GALERIA DE IMAGENS ========== 
const galerias = document.querySelectorAll('.galeria-item img');

galerias.forEach(img => {
    const placeholder = img.closest('.galeria-placeholder');

    if (img.src && img.src !== '') {
        // Se a imagem tem src válido, mostra
        img.style.display = 'block';
        if (placeholder) placeholder.classList.add('com-imagem');
    } else {
        // Se não tem src, mostra o placeholder
        img.style.display = 'none';
    }

    img.addEventListener('load', () => {
        img.style.display = 'block';
        if (placeholder) placeholder.classList.add('com-imagem');
    });

    img.addEventListener('error', () => {
        img.style.display = 'none';
        if (placeholder) placeholder.classList.remove('com-imagem');
    });

    // Verifica periodicamente se foi adicionado um src
    if (placeholder) {
        const observer = new MutationObserver(() => {
            if (img.src && img.src !== '') {
                img.style.display = 'block';
                placeholder.classList.add('com-imagem');
            }
        });
        observer.observe(img, { attributes: true, attributeFilter: ['src'] });
    }
});

// ========== FILTRO DE PRODUTOS ========== 
const filtroButtons = document.querySelectorAll('.filtro-btn');
const produtos = document.querySelectorAll('.produto');

filtroButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove classe ativa de todos os botões
        filtroButtons.forEach(btn => btn.classList.remove('ativo'));
        // Adiciona classe ativa ao botão clicado
        button.classList.add('ativo');

        const filtro = button.getAttribute('data-filtro');

        // Filtra os produtos
        produtos.forEach(produto => {
            if (filtro === 'todos' || produto.getAttribute('data-categoria') === filtro) {
                produto.style.display = 'block';
                // Adiciona animação fade in
                produto.style.animation = 'fadeIn 0.6s ease';
            } else {
                produto.style.display = 'none';
            }
        });
    });
});

// ========== SCROLL SUAVE ========== 
function scrollTo(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========== BOTÕES DETALHAR ========== 
const detalharButtons = document.querySelectorAll('.comprar-btn');

detalharButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const produto = e.target.closest('.produto');
        const nomeProduto = produto.querySelector('h3').textContent;
        const precoProduto = produto.querySelector('.preco').textContent;

        // Exibe alerta customizado
        mostrarAlerta(`
            <strong>${nomeProduto}</strong><br>
            Preço: ${precoProduto}<br><br>
            Descreva seus detalhes e preferências no formulário de contato!
        `);
    });
});

// ========== FUNÇÃO DE ALERTA CUSTOMIZADO ========== 
function mostrarAlerta(mensagem) {
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        max-width: 400px;
        text-align: center;
        animation: slideInDown 0.3s ease;
    `;

    alertBox.innerHTML = `
        <div>${mensagem}</div>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 1.5rem;
            padding: 0.7rem 1.5rem;
            background: linear-gradient(135deg, #FF6B9D, #C44569);
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            Fechar
        </button>
    `;

    document.body.appendChild(alertBox);

    // Fechar ao clicar fora
    setTimeout(() => {
        document.addEventListener('click', (e) => {
            if (e.target !== alertBox && !alertBox.contains(e.target)) {
                alertBox.remove();
            }
        }, 100);
    });
}

// ========== VALIDAÇÃO DE FORMULÁRIO ========== 
const formulario = document.querySelector('.formulario');

if (formulario) {
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = formulario.querySelectorAll('input, textarea');
        let todosPreenchidos = true;

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.style.borderColor = '#FF6B9D';
                todosPreenchidos = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });

        if (todosPreenchidos) {
            mostrarAlerta(`
                <strong>Obrigado! 🎉</strong><br><br>
                Seu pedido foi enviado com sucesso!<br>
                Entraremos em contato em breve.
            `);
            formulario.reset();
        } else {
            mostrarAlerta('<strong>Oops! ⚠️</strong><br>Por favor, preencha todos os campos!');
        }
    });
}

// ========== ANIMAÇÃO AO SCROLL ========== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos os produtos e seções
document.querySelectorAll('.produto, .forma-contato').forEach(el => {
    observer.observe(el);
});

// ========== ADICIONAR CLIQUE AOS PRODUTOS ========== 
produtos.forEach(produto => {
    produto.addEventListener('mouseenter', () => {
        produto.style.transform = 'translateY(-10px)';
    });

    produto.addEventListener('mouseleave', () => {
        produto.style.transform = 'translateY(0)';
    });
});

// ========== CONTADOR DE VISUALIZAÇÕES (OPCIONAL) ========== 
let visualizacoes = localStorage.getItem('visualizacoes') || 0;
visualizacoes = parseInt(visualizacoes) + 1;
localStorage.setItem('visualizacoes', visualizacoes);

console.log(`🎉 Site acessado ${visualizacoes}x vezes!`);

// ========== EFEITO DE LOADING ========== 
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ========== ADICIONAR EFEITO NOS LINKS DE CONTATO ========== 
document.querySelectorAll('.link-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.href === '#') {
            e.preventDefault();
            mostrarAlerta(`
                <strong>Informações de Contato</strong><br><br>
                Atualize o endereço e telefone no código HTML!<br>
                Procure por "XXXX" para editarmateriais
            `);
        }
    });
});

// ========== FUNÇÃO PARA COPIAR TELEFONE ========== 
function copiarTelefone(telefone) {
    navigator.clipboard.writeText(telefone);
    mostrarAlerta('📱 Telefone copiado para a área de transferência!');
}

// ========== MODO ESCURO (FUTURO) ========== 
// Descomente para adicionar modo escuro
/*
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
*/

// ========== CONSOLE LOG DE BOAS-VINDAS ========== 
console.log('%c✨ pulseiras da loh ✨', 'color: #FF6B9D; font-size: 20px; font-weight: bold;');
console.log('%cFeito com amor para sua amiga especial! ❤️', 'color: #C44569; font-size: 14px;');
