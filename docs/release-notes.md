# Notas de Lançamento

Para a versão em ![Inglês](https://github.com/StormJose/Omnifood-Project/blob/main/docs/release-notes-en.md).

## Versão 2.0.0 – 21/04/2025

![page-image](https://github.com/StormJose/Omnifood-Project/blob/main/docs/img/main-weatherly-screenshot.PNG?raw=true)


### ✨ Novas Funcionalidades
- **Funcionalidade de Busca Global**  
  Agora os usuários podem buscar dados meteorológicos de qualquer lugar do mundo, não apenas com base na geolocalização atual. Isso melhora a usabilidade para viajantes, planejadores ou simplesmente curiosos.

![page-image](https://github.com/StormJose/Omnifood-Project/blob/main/docs/img/search-weatherly-screenshot.PNG?raw=true)

### 🎨 Melhorias na UI & UX
- Aprimoramento das proporções dos elementos e da responsividade em diferentes dispositivos.
- Acessibilidade aprimorada:
  - Adição de tooltips (dicas visuais) nos botões principais de navegação para melhor suporte a leitores de tela e navegação mais clara:
    - "Voltar para o Clima Atual"
    - "Modo Escuro"
- Inclusão de uma **seção de Créditos** no rodapé do app para reconhecimento de APIs abertas e contribuições externas.


![page-image](https://github.com/StormJose/Omnifood-Project/blob/main/docs/img/tooltip-weatherly-screenshot.PNG?raw=true)



### 🧠 Mudanças na Arquitetura
- Início da migração da estrutura básica em HTML/CSS/JS para uma arquitetura **MVC**.
  - O código foi reorganizado para promover a separação de responsabilidades e facilitar a reutilização.
  - A lógica está sendo refatorada em funções independentes para melhor manutenção.
  - ⚠️ **Nota:** A migração é parcial e está em andamento. O suporte completo a MVC será implementado na próxima versão.

### 🚀 Ferramentas e Otimização
- **Integração do Parcel como empacotador (bundler)**  
  O Parcel é uma ferramenta de build sem necessidade de configuração, que facilita o empacotamento de arquivos JavaScript, HTML e CSS. Ele otimiza o desempenho, melhora o fluxo de trabalho com recarregamento automático (hot reload) e prepara o app para implantação em escala.

---

Obrigado por acompanhar este lançamento!  
Fique de olho na Versão 2.1.0, onde a migração para MVC será finalizada e novas funcionalidades serão adicionadas.
