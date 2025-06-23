# 🎨 Gerador de Paletas de Cores

> Uma aplicação web moderna para explorar e descobrir paletas de cores harmoniosas, desenvolvida com ASP.NET Core e JavaScript.

##  Visão Geral

Este projeto foi desenvolvido em dupla como parte do curso de extensão **"Trabalhando com APIs em C# e JavaScript"**. A aplicação combina uma API REST robusta com uma interface web intuitiva, permitindo aos usuários descobrir e explorar diferentes combinações de cores de forma dinâmica e interativa.

##  Equipe de Desenvolvimento

| **Larissa Garcia** | **Amanda Errera** |
|:------------------:|:-----------------:|
| ![preview profile.](https://imgur.com/HC7cm66.png) | ![preview profile.](https://imgur.com/KXXBWuN.png) |
| [GitHub](https://github.com/EuLarissaGarcia) | [GitHub](https://github.com/Amanyti) |
| [LinkedIn](https://www.linkedin.com/in/eularissagarcia) | [LinkedIn](https://www.linkedin.com/in/amanda-errera-de-queiroz/) |


#

## 🚀 Como Executar o Projeto

### ⚠️ Importante: Dependência do Backend
Esta aplicação **requer que a API em C# esteja executando** para funcionar corretamente. O frontend consome os dados da API local.

### Pré-requisitos
- .NET 6.0 SDK ou superior
- Visual Studio 2022 ou Visual Studio Code
- Navegador web moderno

### Passos para execução

1. **Faça o download da pasta do projeto**

2. **Execute a API (OBRIGATÓRIO)**
   - Abra o arquivo `PaletaCores.sln` no Visual Studio
   - Execute o projeto pressionando F5 ou clicando em "Executar"
   - A API será iniciada em: `https://localhost:7046`

3. **Acesse a interface web**
   - Abra o arquivo `index.html` em seu navegador
   - **Certifique-se de que a API está rodando antes de usar a aplicação!**

### Portas da Aplicação
- **API**: `https://localhost:7046`
- **Swagger**: `https://localhost:7046/swagger`
- **Frontend**: Arquivo `index.html` (qualquer porta local)

#

## Funcionalidades Principais

###  Busca de Paletas
- **Busca por nome**: Digite o nome de uma paleta específica (ex: "ocean", "pastel", "barbie")
- **Exploração visual**: Visualize instantaneamente as cores da paleta com seus códigos hexadecimais
- **Feedback em tempo real**: Sistema de loading e mensagens de erro amigáveis

###  Geradores Aleatórios
A aplicação oferece **três tipos diferentes** de geração aleatória de cores:

#### 1. **Paleta Aleatória da API** 🌐
- Busca uma paleta aleatória diretamente da API C#
- Utiliza as paletas pré-definidas e curadas
- Garante combinações testadas e harmoniosas


#### 2. **Escolher uma paleta do "Ver Opções Disponíveis"** 🌈
- Busca uma paleta pré-determinada diretamente da API C#


#### 3. **Cores Harmoniosas Aleatórias** 🎨
Implementa **5 algoritmos de harmonia cromática**:
- **Complementar**: Cores opostas no círculo cromático
- **Análoga**: Cores vizinhas no espectro
- **Monocromática**: Variações da mesma cor
- **Pastel**: Tons suaves e delicados
- **Noturna**: Paleta escura e elegante


### Recursos Avançados
```
- Copiar cores: Clique em qualquer cor para copiá-la automaticamente
- Interface responsiva: Funciona perfeitamente em desktop e mobile
- Paletas pré-definidas: Lista com 13 temas cuidadosamente selecionados
- Animações suaves: Feedback visual para todas as interações

```
#

## 🎨 Paletas Disponíveis

| Nome | Descrição | Cores Principais |
|------|-----------|------------------|
| `ocean` | Tons de azul oceânico | Teal, Roxo, Azul escuro |
| `scarlet` | Vermelho intenso | Vermelho escarlate, Bordô |
| `florest` | Verde floresta | Verde musgo, Verde escuro |
| `dark` | Tema escuro elegante | Azul petróleo, Verde escuro |
| `veneno` | Roxos vibrantes | Roxo, Violeta |
| `bege` | Tons neutros | Bege, Marrom claro |
| `summer` | Cores quentes | Vermelho, Laranja |
| `jade` | Verde jade | Verde água, Azul petróleo |
| `classic` | Azul clássico | Azul acinzentado, Verde clássico |
| `coffee` | Tons de café | Marrom café, Terra |
| `barbie` | Rosa vibrante | Rosa pink, Magenta |
| `pastel` | Tons pastéis | Lilás, Rosa claro, Azul claro |
| `twilight` | Crepúsculo | Roxo escuro, Vinho |

#

## Tecnologias Utilizadas

### Backend
- **ASP.NET Core 6+** - Framework web robusto
- **C#** - Linguagem de programação
- **Swagger/OpenAPI** - Documentação automática da API
- **CORS habilitado** - Permite requisições do frontend

### Frontend
**HTML5** 
```
 - Estrutura semântica
 ```

 **CSS3** - Estilização moderna com:
```
  - Variáveis CSS para temas dinâmicos
  - Flexbox e Grid Layout
  - Animações e transições suaves
  - Design responsivo
```

**JavaScript ES6+** - Funcionalidades interativas:
```
  - Fetch API para consumo da API
  - Manipulação do DOM
  - Algoritmos de geração de cores
  - Sistema de clipboard
```

**Design**
```
- Google Fonts (Poppins) - Tipografia moderna
- Remix Icons - Ícones vetoriais
- Glassmorphism - Efeitos de vidro translúcido
- Gradientes dinâmicos - Backgrounds que mudam com o tema
```
#

## 🔌 Endpoints da API

### GET `/PaletaCores`
Retorna uma paleta aleatória do banco de dados.

**Resposta:**
```json
{
  "theme": "ocean",
  "cores": {
    "primaria": "#26A69A",
    "secundaria": "#4527A0", 
    "extra": "#030569"
  }
}
```

### GET `/PaletaCores/{nomePaleta}`
Busca uma paleta específica por nome.

**Parâmetros:**
- `nomePaleta` (string): Nome da paleta desejada

**Resposta de sucesso (200):**
```json
{
  "theme": "barbie",
  "cores": {
    "primaria": "#E91E63",
    "secundaria": "#F06292",
    "extra": "#AD1457"
  }
}
```

**Resposta de erro (404):**
```json
"Paleta 'inexistente' não encontrada"
```

#

## 🎨 Algoritmos de Geração de Cores

### Como Funciona o Gerador Aleatório

A aplicação implementa diferentes estratégias para gerar paletas harmoniosas:

#### 1. **Conversão de Cores**
```javascript
// Converte HEX para HSL para manipulação precisa
function hexParaHSL(hex) {
    // Extrai RGB e converte para HSL
    // Permite ajustes de matiz, saturação e luminosidade
}
```

#### 2. **Paleta Complementar**
- Gera uma cor base aleatória
- Calcula a cor complementar (180° oposta no círculo cromático)
- Ajusta luminosidade para garantir contraste adequado

#### 3. **Paleta Análoga**
- Usa cores próximas no espectro (±20°)
- Mantém harmonia visual
- Varia saturação e luminosidade sutilmente

#### 4. **Controle de Luminosidade**
```javascript
// Garante que as cores sejam adequadas para UI
const lPrimaria = Math.min(45, l);    // Cor primária
const lSecundaria = Math.min(40, l);  // Cor secundária  
const lExtra = Math.min(25, l);       // Cor extra (sempre mais escura)
```

#

## Estrutura do Projeto

```
projeto/
├── PaletaCores.sln           # Solução Visual Studio
├── PaletaCores/              # API ASP.NET Core
│   ├── Controllers/
│   │   └── PaletaCoresController.cs
│   ├── Properties/
│   ├── Program.cs
│   └── PaletaCores.csproj
├── index.html                # Interface web
├── style.css                 # Estilização
├── script.js                 # Receber infomações Api e gerar paletas
└── README.md
```


## Objetivos de Aprendizado Alcançados
```
✅ Criação de API REST com ASP.NET Core
✅ Consumo de API com JavaScript (Fetch API)
✅ Manipulação do DOM de forma dinâmica
✅ Implementação de CORS para comunicação frontend/backend
✅ Design responsivo e acessível
✅ Tratamento de erros e estados de loading
✅ Algoritmos de geração procedural de cores
✅ Integração de múltiplas fontes de dados (API + geração local)
```

##  Diferenciais do Projeto
1. **Arquitetura Híbrida**: Combina API C# para dados estruturados com algoritmos JavaScript para geração dinâmica
2. **Interface Moderna**: Design glassmorphism com animações suaves
3. **Experiência do Usuário**: Feedback visual, copying automático, estados de loading
4. **Algoritmos Avançados**: Implementação de teoria das cores para harmonia cromática
5. **Código Limpo**: Estrutura bem organizada e comentada

##  Conceitos Aprendidos

- **APIs REST**: Criação com ASP.NET Core e consumo com JavaScript
- **CORS**: Configuração para comunicação cross-origin
- **JavaScript Moderno**: Async/await, Fetch API, ES6+
- **Teoria das Cores**: Círculo cromático, harmonia complementar e análoga
- **CSS Avançado**: Variáveis CSS, Grid, Flexbox, animações
- **Integração Frontend/Backend**: Comunicação entre tecnologias diferentes

---

**Desenvolvido com 💜 por Amanda Errera e Larissa Garcia**