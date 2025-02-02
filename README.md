# RAI: Requirements Artificial Intelligence

RAI (Requirements Artificial Intelligence) é uma ferramenta baseada em Inteligência Artificial desenvolvida para otimizar o processo de levantamento de requisitos em reuniões de análise de sistemas. Através do uso de IA, a ferramenta é capaz de transcrever áudios de reuniões e identificar, classificar e gerar um documento com requisitos funcionais (RF) e não funcionais (RNF), além de sugerir requisitos adicionais com base no contexto do cliente.

## Funcionalidades

- **Transcrição de Áudio:** Utiliza o modelo Whisper da OpenAI para transcrever áudios de reuniões com alta precisão.
- **Classificação de Requisitos:** A ferramenta classifica automaticamente os requisitos extraídos em funcionais e não funcionais.
- **Geração de Documento:** Após a análise, a ferramenta gera um documento em formato PDF com os requisitos classificados.

## Tecnologias Utilizadas

- **Whisper (OpenAI):** Utilizado para transcrição automática de áudio para texto.
- **GPT-4 Turbo (OpenAI):** Utilizado para o processamento de linguagem natural, extração e classificação de requisitos.
- **Node.js (v22):** Plataforma utilizada para o desenvolvimento da lógica do backend e integração com a API da OpenAI.

## Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/rai.git
cd rai
```

2. **Instale as dependências:**

```bash
npm install
```
3. **Configuração do Ambiente:**

Antes de rodar o projeto, certifique-se de configurar as chaves de API do OpenAI e outras configuração necessária. 

.env
```bash
OPENAI_API_KEY=
PROTOCOL=
PORT=
HOST=
PATH_TO_PROJECT=
```
4. **Rodando a ferramenta:**

```bash
npm run dev
```
## Criando uma Requisição

![image](https://github.com/user-attachments/assets/d7137bfe-e0ae-4a2b-868f-55395d50efbc)

![image](https://github.com/user-attachments/assets/bb9e793f-1633-4510-871a-5526ff4138f7)

![image](https://github.com/user-attachments/assets/d9655976-5903-4404-a720-33134b43d2e4)




