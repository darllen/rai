const fs = require('fs');


module.exports = {

    async indexQuestion(transcription){
        return `Conversa com o cliente: ${transcription}. Estou construindo um documento de levantamento de requisitos baseado na conversa que tive com o cliente, para isto, construa um índice com os seguintes tópicos: Introdução, Glossário, Definição dos requisitos de usuário(este dividido em: Requisitos Funcionais, Requisitos Não Funcionais), Evolução do sistema, Técnica de levantamento utilizada.`;
    },

    async introductionQuestion(transcription){
        return `Conversa com o cliente: ${transcription}. Estou construindo um documento de levantamento de requisitos baseado na conversa que tive com o cliente, para isto, crie uma introdução de um parágrafo longo com objetivo do software para situar o leitor sobre o tipo de software que será desenvolvido, e listar as necessidades/dores do cliente que o software solucionará.`;
    },

    async glossaryQuestion(transcription){
        return `Conversa com o cliente: ${transcription}. Estou construindo um documento de levantamento de requisitos baseado na conversa que tive com o cliente, para isto, retire do texto 10 a 15 palavras consideradas técnicas ou siglas e faça uma lista com elas explicando o significado de cada uma de maneira resumida. `;
    },

    async functionalRequirementsQuestion(transcription){
        return `Conversa com o cliente: ${transcription}. Estou construindo um documento de levantamento de requisitos baseado na conversa que tive com o cliente, para isto, elenque os requisitos funcionais do sistema. Faça uma lista com eles e cada um deve ser segundo o modelo convencionado de requisitos, ou seja, com um título e logo após um código "RF01", bem como informações e regras.`;
    },

    async nonFunctionalRequirementsQuestion(transcription){
        return `Conversa com o cliente: ${transcription}. Estou construindo um documento de levantamento de requisitos baseado na conversa que tive com o cliente, para isto, elenque os requisitos não funcionais do sistema. Faça uma lista com eles e cada um deve ser escrito segundo o modelo convencionado de requisitos, ou seja, com um título e logo após um código "RNF01", bem como informações e regras`;
    },

    async systemEvolutionQuestion(transcription){
        return `Conversa com o cliente: ${transcription}. Estou construindo um documento de levantamento de requisitos baseado na conversa que tive com o cliente, para isto, escreva alguns parágrafos listando possíveis evoluções do sistema no futuro para atender completamente as necessidades do cliente.`;
    },

    async techniqueUsedQuestion(transcription){
        return `Conversa com o cliente: ${transcription}. Estou construindo um documento de levantamento de requisitos baseado na conversa que tive com o cliente, para isto, elabore alguns parágrafos sobre a técnica utilizada para elencar o conjunto de requisitos funcionais e não funcionais.`;
    },

    async saveFileFromRequest(fileData, filePath) {
        return new Promise((resolve, reject) => {
          fs.writeFile(filePath, fileData, err => {
            if (err) {
              console.error('Erro ao salvar o arquivo:', err);
              reject(err);
            } else {
              console.log('Arquivo salvo com sucesso.');
              resolve();
            }
          });
        });
    },
    
    async deleteFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, err => {
            if (err) {
                console.error('Erro ao excluir o arquivo:', err);
                reject(err);
            } else {
                console.log('Arquivo excluído com sucesso.');
                resolve();
            }
            });
        });
    }

}