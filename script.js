const urlDaAPI = 'https://localhost:7046/PaletaCores';
let temaAtual = '';

function mostrarLoading(elemento, mensagem = 'Carregando...') {
    const themeNameEl = document.getElementById("theme-name");
    themeNameEl.innerHTML = `
        <i class="ri-loader-4-line"></i>
        ${mensagem}
    `;
    themeNameEl.className = "loading";
}


function gerarCorAleatoria() {
    const letters = '0123456789ABCDEF';
    let cor = '#';
    for (let i = 0; i < 6; i++) {
        cor += letters[Math.floor(Math.random() * 16)];
    }
    return cor;
}


function hexParaHSL(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l;

    l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h * 360, s * 100, l * 100];
}


function hslParaHex(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (c) => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function ajustarBrilho(cor, fator) {
    const hex = cor.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) * fator));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) * fator));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) * fator));

    return '#' +
        Math.round(r).toString(16).padStart(2, '0') +
        Math.round(g).toString(16).padStart(2, '0') +
        Math.round(b).toString(16).padStart(2, '0');
}


function gerarPaletaComplementar() {
    const corBase = gerarCorAleatoria();
    const [h, s, l] = hexParaHSL(corBase);

    const saturacaoBase = Math.max(65, Math.min(85, s)); 
    const lPrimaria = Math.max(30, Math.min(45, l));
    const lSecundaria = Math.max(28, Math.min(42, l * 0.92));
    const lExtra = Math.max(18, Math.min(28, l * 0.65));

    const hComplementar = (h + 180) % 360;

    const corPrimaria = hslParaHex(h, saturacaoBase, lPrimaria);
    const corSecundaria = hslParaHex(hComplementar, saturacaoBase * 0.9, lSecundaria);
    const corExtra = hslParaHex(h, Math.min(90, saturacaoBase * 1.1), lExtra);

    return {
        theme: 'Paleta Complementar',
        cores: {
            primaria: corPrimaria,
            secundaria: corSecundaria,
            extra: corExtra
        }
    };
}


function gerarPaletaAnaloga() {
    const corBase = gerarCorAleatoria();
    const [h, s, l] = hexParaHSL(corBase);

    const h2 = (h + 25) % 360;
    const h3 = (h - 25 + 360) % 360;

    const saturacaoBase = Math.max(60, Math.min(80, s));
    const lPrimaria = Math.max(32, Math.min(44, l));
    const lSecundaria = Math.max(30, Math.min(42, l * 0.95));
    const lExtra = Math.max(20, Math.min(30, l * 0.7));

    const corPrimaria = hslParaHex(h, saturacaoBase, lPrimaria);
    const corSecundaria = hslParaHex(h2, saturacaoBase * 0.85, lSecundaria);
    const corExtra = hslParaHex(h3, Math.min(85, saturacaoBase * 1.05), lExtra);

    return {
        theme: 'Paleta Análoga',
        cores: {
            primaria: corPrimaria,
            secundaria: corSecundaria,
            extra: corExtra
        }
    };
}

function gerarPaletaMonocromatica() {
    const corBase = gerarCorAleatoria();
    const [h, s, l] = hexParaHSL(corBase);

    const lPrimaria = Math.min(42, l);
    const lSecundaria = Math.min(38, l * 0.9);
    const lExtra = Math.min(20, l * 0.5); 

    const corPrimaria = hslParaHex(h, Math.max(60, s), lPrimaria);
    const corSecundaria = hslParaHex(h, Math.max(45, s * 0.7), lSecundaria);
    const corExtra = hslParaHex(h, Math.max(70, s * 1.2 > 100 ? s * 0.9 : s * 1.2), lExtra);

    return {
        theme: 'Paleta Monocromática',
        cores: {
            primaria: corPrimaria,
            secundaria: corSecundaria,
            extra: corExtra
        }
    };
}

function gerarPaletaPastel() {
   
    const matizes = [15, 45, 75, 180, 210, 300, 330];
    const matizBase = matizes[Math.floor(Math.random() * matizes.length)];

    const saturacaoBase = 40; // Saturação mais suave para pastel
    const lPrimaria = 78;     // Luminosidade alta para pastel
    const lSecundaria = 75;   // Próxima da primária
    const lExtra = 70;        // mantém o tom pastel

    const h2 = (matizBase + 45) % 360;
    const h3 = (matizBase + 90) % 360;

    const cor1 = hslParaHex(matizBase, saturacaoBase, lPrimaria);
    const cor2 = hslParaHex(h2, saturacaoBase * 0.9, lSecundaria);
    const cor3 = hslParaHex(h3, saturacaoBase * 1.1, lExtra);

    return {
        theme: 'Paleta Pastel',
        cores: {
            primaria: cor1,
            secundaria: cor2,
            extra: cor3
        }
    };
}

function gerarPaletaEscura() {
    const matizes = [200, 240, 280, 320, 20, 60];
    const matiz = matizes[Math.floor(Math.random() * matizes.length)];

  
    const lPrimaria = 25;
    const lSecundaria = 22;
    const lExtra = 12; 

    const cor1 = hslParaHex(matiz, 40, lPrimaria);
    const cor2 = hslParaHex((matiz + 30) % 360, 50, lSecundaria);
    const cor3 = hslParaHex((matiz + 60) % 360, 60, lExtra);

    return {
        theme: 'Paleta Noturna',
        cores: {
            primaria: cor1,
            secundaria: cor2,
            extra: cor3
        }
    };
}


function gerarPaletaAleatoria() {
    mostrarLoading(null, 'Gerando cores mágicas...');

    const tiposPaleta = [
        gerarPaletaComplementar,
        gerarPaletaAnaloga,
        gerarPaletaMonocromatica,
        gerarPaletaPastel,
        gerarPaletaEscura
    ];

    const tipoEscolhido = tiposPaleta[Math.floor(Math.random() * tiposPaleta.length)];
    const paletaAleatoria = tipoEscolhido();

  
    setTimeout(() => {
        aplicarTema(paletaAleatoria);

        
        document.getElementById("color-palette").classList.add("color-random");
        setTimeout(() => {
            document.getElementById("color-palette").classList.remove("color-random");
        }, 500);
    }, 800);
}

function gerarCoresTotalmenteAleatorias() {
    mostrarLoading(null, 'Criando caos colorido...');

    const gerarCorCaoticaControlada = () => {
        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 60) + 40; // Entre 40-100%
        const l = Math.floor(Math.random() * 25) + 25; // Entre 25-50%
        return hslParaHex(h, s, l);
    };

    const paletaCaotica = {
        theme: 'Cores Totalmente Aleatórias',
        cores: {
            primaria: gerarCorCaoticaControlada(),
            secundaria: gerarCorCaoticaControlada(),
            extra: (() => {
                const h = Math.floor(Math.random() * 360);
                const s = Math.floor(Math.random() * 40) + 50;
                const l = Math.floor(Math.random() * 15) + 15; 
                return hslParaHex(h, s, l);
            })()
        }
    };

    setTimeout(() => {
        aplicarTema(paletaCaotica);

        const palette = document.getElementById("color-palette");
        palette.style.animation = 'colorPulse 0.3s ease-in-out 3';
        setTimeout(() => {
            palette.style.animation = '';
        }, 1000);
    }, 800);
}


function copiarCor(cor) {
    navigator.clipboard.writeText(cor).then(() => {
        
        const originalText = event.target.textContent;
        event.target.textContent = 'Copiado!';
        event.target.style.background = 'rgba(34, 197, 94, 0.2)';

        setTimeout(() => {
            event.target.textContent = originalText;
            event.target.style.background = 'rgba(0, 0, 0, 0.08)';
        }, 1000);
    }).catch(() => {
        console.log('Erro ao copiar cor');
    });
}


function aplicarTema(dados) {
    console.log('Dados recebidos da API:', dados);

    const root = document.documentElement;
    temaAtual = dados.theme || dados.nome || 'Tema Personalizado';

    
    let cores;
    if (dados.cores) {
        cores = dados.cores;
    } else if (dados.primaria && dados.secundaria && dados.extra) {
        cores = {
            primaria: dados.primaria,
            secundaria: dados.secundaria,
            extra: dados.extra
        };
    } else {
        console.error('Estrutura de dados inesperada:', dados);
        mostrarErro('Estrutura de dados inválida');
        return;
    }

    
    root.style.setProperty("--cor-primaria", cores.primaria);
    root.style.setProperty("--cor-secundaria", cores.secundaria);
    root.style.setProperty("--cor-extra", cores.extra);

  
    document.getElementById("theme-name").innerHTML = `
        <i class="ri-palette-fill"></i>
        ${temaAtual}
    `;
    document.getElementById("theme-name").className = "";

   
    document.getElementById("cor-primaria").textContent = cores.primaria;
    document.getElementById("cor-secundaria").textContent = cores.secundaria;
    document.getElementById("cor-extra").textContent = cores.extra;

    
    document.getElementById("preview-primaria").style.backgroundColor = cores.primaria;
    document.getElementById("preview-secundaria").style.backgroundColor = cores.secundaria;
    document.getElementById("preview-extra").style.backgroundColor = cores.extra;

   
    document.getElementById("color-palette").classList.remove("placeholder-showcase");

    console.log('Tema aplicado com sucesso:', temaAtual);
}


function mostrarErro(mensagem) {
    document.getElementById("theme-name").innerHTML = `
        <i class="ri-error-warning-line"></i>
        ${mensagem}
    `;
    document.getElementById("theme-name").className = "color-black";
    definirPlaceholder();
}


function definirPlaceholder() {
    document.getElementById("cor-primaria").textContent = "---";
    document.getElementById("cor-secundaria").textContent = "---";
    document.getElementById("cor-extra").textContent = "---";

    document.getElementById("color-palette").classList.add("placeholder-showcase");
}


async function buscarPaletaPorNome(nome) {
    mostrarLoading(null, `Buscando "${nome}"...`);

    try {
        console.log(`Fazendo requisição para: ${urlDaAPI}/${nome}`);

        const response = await fetch(`${urlDaAPI}/${nome}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Paleta "${nome}" não encontrada`);
            }
            throw new Error(`Erro: ${response.status}`);
        }

        const dados = await response.json();
        aplicarTema(dados);

    } catch (error) {
        console.error('Erro ao buscar paleta:', error);
        mostrarErro(error.message || 'Erro ao buscar paleta');
    }
}


async function buscarPaletaAleatoria() {
    mostrarLoading(null, 'Buscando tema surpresa...');

    try {
        console.log(`Fazendo requisição para: ${urlDaAPI}`);

        const response = await fetch(urlDaAPI);

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const dados = await response.json();
        aplicarTema(dados);

    } catch (error) {
        console.error('Erro ao buscar paleta aleatória:', error);
        mostrarErro('Erro ao buscar paleta aleatória');
    }
}


document.addEventListener('DOMContentLoaded', function () {
    
    document.getElementById('paletaForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const nomePaleta = document.getElementById('nome-paleta').value.trim();

        if (nomePaleta) {
            buscarPaletaPorNome(nomePaleta);
        }
    });

 
    document.getElementById('btn-aleatorio').addEventListener('click', buscarPaletaAleatoria);


    document.getElementById('btn-cores-aleatorias').addEventListener('click', gerarPaletaAleatoria);

 
    if (document.getElementById('btn-cores-caoticas')) {
        document.getElementById('btn-cores-caoticas').addEventListener('click', gerarCoresTotalmenteAleatorias);
    }

    
    document.getElementById('btn-opcoes').addEventListener('click', function () {
        const optionsList = document.getElementById('options-list');
        optionsList.classList.toggle('show');
    });

    
    document.querySelectorAll('.btn-small[data-theme]').forEach(btn => {
        btn.addEventListener('click', function () {
            const theme = this.getAttribute('data-theme');
            buscarPaletaPorNome(theme);
            document.getElementById('options-list').classList.remove('show');
        });
    });

    document.getElementById('cor-primaria').addEventListener('click', function () {
        copiarCor(this.textContent);
    });

    document.getElementById('cor-secundaria').addEventListener('click', function () {
        copiarCor(this.textContent);
    });

    document.getElementById('cor-extra').addEventListener('click', function () {
        copiarCor(this.textContent);
    });

    document.getElementById('preview-primaria').addEventListener('click', function () {
        const cor = document.getElementById('cor-primaria').textContent;
        copiarCor(cor);
    });

    document.getElementById('preview-secundaria').addEventListener('click', function () {
        const cor = document.getElementById('cor-secundaria').textContent;
        copiarCor(cor);
    });

    document.getElementById('preview-extra').addEventListener('click', function () {
        const cor = document.getElementById('cor-extra').textContent;
        copiarCor(cor);
    });

    document.getElementById('nome-paleta').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            document.getElementById('paletaForm').dispatchEvent(new Event('submit'));
        }
    });

    console.log('Event listeners configurados');
});