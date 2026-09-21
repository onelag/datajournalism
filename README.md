# 📊 Apresentação Keynote de Jornalismo de Dados (Reveal.js)

Um deck de apresentação construído com [Reveal.js](https://revealjs.com/), [Chart.js](https://www.chartjs.org/) e design com estética moderna de glassmorphism. Pronto para visualização local ou publicação global via **GitHub Pages**.

---

## 🚀 Demonstração ao Vivo no GitHub Pages

Acesse sua apresentação publicada na web em:
👉 **`https://onelag.github.io/datajournalism/`**

---

## ⌨️ Controles e Atalhos da Apresentação

| Tecla | Ação |
|---|---|
| **`Espaço` / `→` / `↓`** | Avançar para o próximo slide ou próximo ponto (fragmento) |
| **`←` / `↑`** | Voltar ao slide ou ponto anterior |
| **`S`** | **Modo Apresentador (Speaker View)** (Abre uma janela dedicada com cronômetro, slide atual, prévia do próximo slide e suas notas de fala) |
| **`F`** | Alternar modo **Tela Cheia** |
| **`O` / `ESC`** | **Visão Geral** (grade com todos os slides para navegação rápida) |
| **`Alt + Clique`** | Zoom em qualquer elemento ou gráfico da tela |
| **`?`** | Exibir overlay com todos os atalhos disponíveis |

---

## 🖥️ Como Testar Localmente no seu Mac

Você pode testar a apresentação localmente antes de enviar para o GitHub:

### Opção 1: Usando Python (Nativo no macOS)
Abra o Terminal no diretório do projeto e execute:
```bash
python3 -m http.server 8000
```
Em seguida, abra `http://localhost:8000` no seu navegador.

### Opção 2: Usando Node.js / npx
```bash
npx serve .
```

---

## 🌐 Publicação no GitHub Pages (Passo a Passo)

O repositório já inclui a automação do **GitHub Actions** (`.github/workflows/deploy.yml`).

### Para atualizar o site:
1. Salve suas alterações no `index.html`.
2. No Terminal, execute:
   ```bash
   git add .
   git commit -m "Atualizar apresentação keynote"
   git push
   ```
3. O GitHub Pages será atualizado automaticamente em menos de 1 minuto!

---

## 🎨 Como Personalizar os Slides

- **Editar ou adicionar slides**: Abra `index.html` e edite ou duplique qualquer bloco `<section>`.
- **Adicionar Anotações de Apresentador**: Dentro de qualquer `<section>`, inclua `<aside class="notes">Suas anotações aqui</aside>`.
- **Alterar estilo visual**: Edite `css/custom-theme.css` para alterar cores, fontes ou espaçamentos.
- **Alterar dados do gráfico**: Modifique `js/presentation.js` para atualizar os valores e legendas do Chart.js.
