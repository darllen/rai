const fs = require("fs");
const puppeteer = require('puppeteer');
const { callChatGPT } = require("./openai-service");

async function generateHtml(transcribedText, requirements) {

    const prompt = `Dada a transcrição: "${transcribedText}".\n\n Pedi para você levantar TODOS os requisitos possíveis e você me respondeu isso: "${requirements}".\n\n Agora preciso que você:
                        -Gere um código HTML do documento com TODOS os requisitos possíveis (mínimo 12 requisitos funcionais e 10 requisitos não funcionais).
                        -Apresente os requisitos de forma estruturada e detalhada, sem omitir informações.
                        -Não esqueça de acrescentar requisitos sugeridos por você ao final da tabela, destaque a linha com cor #E6FAF9.\n\n aproveite esse style: <style> body { font-family: Arial, sans-serif; margin: 20px; } h1, h2 { color: 2c3e50; } h3 { color: #34495e; } table { width: 100%; border-collapse: collapse; margin: 20px 0; } th, td { padding: 10px; border: 1px solid #bdc3c7; text-align: left; } th { background-color: #ecf0f1; } tr:nth-child(even) { background-color: #f9f9f9; } .highlight { background-color: #E6FAF9; } </style>
                        -O documento deve ser com o formato esperado:
                        "1. Introdução
                        1.1. Objetivo (texto corrido) 
                        Delinear o objetivo da especificação de requisitos e especificar os leitores deste documento.
                        1.2. Escopo (texto corrido) 
                        Identificar pelo nome o produto de software a ser produzido (Deixe claro que é uma sugestão, por exemplo Gerenciador Eletrônico de Documentos – GED).  Explicar o que o produto vai e, se necessário, não vai fazer. Descrever a aplicação de software que está sendo especificada, incluindo seus benefícios, objetivos e metas. Ser consistente com outras especificações de alto nível do sistema, se elas existirem.
                        2. Descrição Geral (use código para os requisitos, "RF01" ou "RNF01". Tabela) 
                        2.1. Requisitos funcionais (Tabela)
                        Descrever as funcionalidades do software – produzir uma lista de todos os requisitos funcionais e classificá-los como obrigatórios, desejáveis ou opcionais.
                        2.2. Requisitos não funcionais (Tabela) (Requisito não funcional)
                        Definir como o software interage com as pessoas, com o hardware do sistema, com outros sistemas e com outros produtos. Detalhar os aspectos das interfaces do produto (normalmente é feito um esboço das interfaces, levantado através de um protótipo ou de estudos em papel; são também detalhadas as interfaces com outros sistemas e componentes de sistemas). É obrigatório o desenho das telas referentes às principais funcionalidades do produto. Descrever os requisitos de desempenho (velocidade a de processamento, tempo de resposta, etc.) e outros aspectos considerados necessários a para que o produto atinja a qualidade desejada (por exemplo portabilidade, manutenibilidade, confiabilidade, etc.). Finalmente, classificar e rever os requisitos, estabelecendo prioridades (obrigatório, desejável ou opcional).
                        3. Características dos usuários(texto corrido ou lista, você escolhe)
                        Descrever as características gerais dos usuários do produto, incluindo o nível educacional, a experiência e os conhecimentos técnicos.
                        4. Restrições(texto corrido ou lista, você escolhe)
                        Enumerar as restrições impostas pela aplicação, tais como padrões, linguagem de implementação, ambientes operacionais e limites de recursos.
                        5. Suposições e dependências(texto corrido ou lista, você escolhe)
                        Listar todos os fatores que afetam os requisitos da especificação. Esses fatores não são restrições ao projeto do sistema, mas sim mudanças que podem afetar os requisitos. Por exemplo, um suposição pode ser que a aplicação será instalada em um sistema operacional específico. Se, este sistema operacional não for disponível, isso poderia afetar os requisitos. "
                        \n\nobs: Preciso de um html completo por favor, se certifique que levantou todos os requisitos e lembre-se do que são requisitos funcionais e não funcionais. Responda somente com o HTML por favor.`;
    
    
    const response = await callChatGPT(prompt);

    fs.writeFileSync("public/requisitos.html", response)
    return response;
}

async function convertHtmlToPdf(htmlContent, outputPdfPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);

    await page.pdf({ path: outputPdfPath, format: 'A4' });

    await browser.close();
}

module.exports = { generateHtml, convertHtmlToPdf };
