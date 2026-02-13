# Sistema de Controle de Clientes e Veículos

Este projeto foi desenvolvido como um desafio técnico para gerenciar o cadastro de clientes e suas respectivas placas de carro. A ideia aqui foi construir uma interface fluida em Angular que consome uma estrutura de dados preparada para uma API REST.

## Tecnologias e Escolhas

* **Angular 18+**: Optei pelas versões mais recentes para aproveitar o uso de Signals, que deixa o gerenciamento de estado muito mais simples e performático.
* **Tailwind CSS**: Escolhido pela agilidade. Ele permite estilizar a interface direto no HTML, o que acelera demais o desenvolvimento de componentes customizados.
* **Docker & Docker Compose**: O ambiente está todo containerizado. Isso garante que o código vai rodar na sua máquina exatamente como rodou na minha, sem problemas de versão de Node ou dependências locais.
* **Nginx**: Utilizado dentro do container para servir os arquivos estáticos do Angular de forma eficiente, já com a configuração de rotas para Single Page Application (SPA).

## O que o sistema faz

O projeto cobre as operações solicitadas no desafio, simulando a comunicação com um servidor:
1.  **Cadastro e Listagem**: Fluxo completo de inserção e exibição de clientes.
2.  **Edição e Remoção**: Controles básicos de manutenção dos dados.
3.  **Filtro por Placa**: Uma busca específica que filtra os veículos pelo último número da placa, simulando o endpoint de consulta customizada.

## Como rodar o projeto

Você só vai precisar do Docker instalado. Não precisa se preocupar em instalar Angular CLI ou Node na sua máquina física.

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  Suba o ambiente:
    ```bash
    docker-compose up -d --build
    ```

3.  Acesse no navegador:
    O sistema estará disponível em: http://localhost:4200

## Estrutura do Docker

Para manter a imagem leve, usei um processo de "Multi-stage Build". Primeiro, o Docker usa o Node para buildar o projeto e gerar os arquivos de produção. Depois, ele descarta o Node e passa apenas os arquivos prontos para uma imagem enxuta do Nginx.

---
Projeto desenvolvido para avaliação técnica.
