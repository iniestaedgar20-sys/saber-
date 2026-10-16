import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Intelligent Pedagogical Fallback Knowledge Base when API key is missing or offline
function generateFallbackTutorAnswer(userQuestion: string, courseTitle?: string, lessonTitle?: string): string {
  const q = userQuestion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 1. EXCEL QUESTIONS
  if (q.includes('procv') || q.includes('vlookup')) {
    return `### Como funciona a função PROCV no Excel:

A função **PROCV** (Procura Vertical) serve para pesquisar um valor numa coluna e retornar um dado correspondente de outra coluna à direita.

**Sintaxe da Fórmula:**
\`=PROCV(valor_procurado; matriz_tabela; núm_índice_coluna; [procurar_intervalo])\`

**Exemplo Prático Passo a Passo:**
1. **Valor procurado:** A célula que queres procurar (ex: \`A2\`, o código do aluno ou produto).
2. **Matriz tabela:** O intervalo com todos os dados (ex: \`$E$2:$G$50\`). **Dica de ouro:** usa sempre o cifrão (\`$\`) com F4 para fixar o intervalo!
3. **Número da coluna:** O número da coluna onde está a resposta que queres buscar (ex: se a tabela vai de E a G, a coluna E é 1, F é 2, G é 3).
4. **Correspondência exata:** Coloca sempre **0** ou **FALSO** no final para garantir que não haja erros de aproximação.

👉 **Exemplo completo:** \`=PROCV(A2; $E$2:$G$50; 2; 0)\`

Experimenta na tua planilha e diz-me se funcionou!`;
  }

  if (q.includes('se(') || q.includes('funcao se') || q.includes('se ') || q.includes('condicional')) {
    return `### Como usar a função SE no Excel:

A função **SE** avalia uma condição lógica e devolve um resultado se for verdadeiro e outro se for falso.

**Sintaxe:**
\`=SE(teste_lógico; valor_se_verdadeiro; valor_se_falso)\`

**Exemplo prático de Notas de Alunos:**
Imagina que queres saber se um aluno foi "Aprovado" com nota igual ou superior a 10, ou "Reprovado":
\`=SE(B2>=10; "Aprovado"; "Reprovado")\`

**Dica extra:**
Se quiseres várias condições combinadas (ex: Excelente, Aprovado, Reprovado), podes aninhar funções SE ou usar a função **SES**:
\`=SE(B2>=14; "Excelente"; SE(B2>=10; "Aprovado"; "Reprovado"))\``;
  }

  if (q.includes('soma') || q.includes('somase') || q.includes('media')) {
    return `### Fórmulas Rápidas de Cálculo no Excel:

1. **SOMA:**
   \`=SOMA(B2:B20)\` — Soma rapidamente todos os valores do intervalo.
   *Atalho de teclado no Excel:* seleciona a célula e pressiona **ALT + =** para a AutoSoma instantânea!

2. **SOMASE (Soma com Condição):**
   \`=SOMASE(intervalo_criterio; criterio; intervalo_soma)\`
   *Exemplo:* \`=SOMASE(A2:A20; "Vendas"; C2:C20)\` — Soma apenas os valores de C onde a categoria for "Vendas".

3. **MÉDIA:**
   \`=MÉDIA(B2:B20)\` — Calcula a média aritmética simples.`;
  }

  if (q.includes('atalho') || q.includes('teclado')) {
    return `### Os Principais Atalhos do Excel para Produtividade:

- **CTRL + T** (ou CTRL + L em inglês): Converte qualquer tabela em Tabela Dinâmica / Inteligente.
- **F4:** Repete a última ação ou tranca referências com cifrão (\`$A$1\`).
- **CTRL + SHIFT + L:** Ativa ou desativa os Filtros automáticos.
- **CTRL + SETA (↑ ↓ ← →):** Pula instantaneamente para a última célula com dados.
- **CTRL + SHIFT + SETA:** Seleciona todos os dados até o final da linha ou coluna.
- **ALT + = :** Insere a fórmula de SOMA automaticamente.`;
  }

  // 2. CAPCUT QUESTIONS
  if (q.includes('capcut') || q.includes('corte') || q.includes('transicao') || q.includes('audio') || q.includes('legenda')) {
    return `### Dicas Práticas no CapCut (PC & Telemóvel):

1. **Cortes Precisos sem Perder o Ritmo:**
   - No PC, usa o atalho **CTRL + B** (ou a tecla **C** para a ferramenta de corte e **V** para selecionar).
   - No Mobile, divide o clipe no ponto desejado e usa a ferramenta *Dividir*. Elimina os silêncios e "éeeeh" para tornar o vídeo dinâmico.

2. **Legendas Automáticas:**
   - Clica em **Texto** > **Legendas Automáticas** > Escolhe o idioma (Português).
   - O CapCut transcreve a tua voz em segundos. Podes estilizar a fonte, cor e aplicar animações de destaque em cada palavra!

3. **Sincronização com Batidas:**
   - Adiciona a música e clica na faixa de áudio > **Batidas Automáticas**. O CapCut marca pontos amarelos onde a música bate para cortares o vídeo no ritmo exato!

4. **Melhor Configuração de Exportação:**
   - Resolução: **1080p (Full HD)**
   - Taxa de quadros: **30 fps** (ou 60 fps se houver muito movimento)
   - Taxa de bits (Bitrate): **Recomendada / Alta** para manter nitidez no Instagram, TikTok e WhatsApp.`;
  }

  // 3. CUTILAGEM & MANICURE QUESTIONS
  if (q.includes('cuticula') || q.includes('alicate') || q.includes('manicure') || q.includes('esmalte') || q.includes('sangr')) {
    return `### Dicas Profissionais de Cutilagem e Manicure:

1. **Posição e Ângulo do Alicate:**
   - O alicate deve ser inclinado a **45 graus**, com a ponta levemente virada para o centro da unha.
   - **Regra de ouro:** Nunca puxes a pele! Se sentires resistência, abre o alicate, fecha com cuidado e corta. Puxar é o que causa cortes e sangramentos.

2. **Como Evitar Sangramentos:**
   - Amolece bem a cutícula com amolecedor profissional e algodão morno por 3 a 5 minutos.
   - Empurra suavemente com a espátula sem raspar a lâmina ungueal.
   - Se por acidente ocorrer um pequeno corte, usa pó hemostático estéril descartável com algodão seco.

3. **Cutilagem Contínua (Cutícula Inteira):**
   - Inicia num dos cantos inferiores, faz o primeiro pique e segue contornando a dobra proximal sem soltar a linha de corte.

4. **Esmaltação Perfeita e Sem Manchas:**
   - Limpa a oleosidade da unha com álcool 70° antes da base.
   - Aplica camadas finas de esmalte e limpa os cantinhos com palito e algodão antes de cada camada secar.`;
  }

  // 4. MAQUIAGEM QUESTIONS
  if (q.includes('maquiagem') || q.includes('pele') || q.includes('base') || q.includes('corretivo') || q.includes('craquel')) {
    return `### Ordem e Segredos da Maquiagem Profissional:

1. **Ordem Correta da Preparação de Pele (Skincare):**
   1. Limpeza com gel facial ou água micelar.
   2. Tónico facial para equilibrar o pH.
   3. Hidratante específico para o tipo de pele (gel para oleosa, creme para seca).
   4. Protetor solar (para maquilhagem de dia).
   5. Primer (focado na zona T com poros dilatados).

2. **Como Evitar que a Base e Corretivo Craquelem:**
   - A causa nº 1 de craquelamento é a **falta de hidratação na área dos olhos**. Aplica sempre hidratante para contorno de olhos antes da maquilhagem.
   - Não acumules produto em excesso. Usa esponja húmida dando batidinhas leves.
   - Sela com pó translúcido bem fininho sem esfregar!

3. **Dica para Acertar o Tom da Base:**
   - Testa sempre a base na linha do maxilar, comparando com a cor do pescoço e do colo, nunca nas costas da mão!`;
  }

  // 5. DEFAULT HELPFUL PEDAGOGICAL RESPONSE
  return `### Olá! Estou aqui para te ajudar no teu aprendizado.

Como Tutor da Saber+, posso te explicar passo a passo qualquer dúvida sobre:
- **Excel:** fórmulas (\`SOMA\`, \`SE\`, \`PROCV\`), tabelas, formatação, atalhos e gráficos.
- **CapCut:** edição no PC e telemóvel, cortes rápidos, efeitos, áudios e exportação.
- **Cutilagem e Manicure:** manuseio do alicate, esterilização, esmaltação e acabamento.
- **Maquiagem:** preparação de pele, esfumados, aplicação de base e contornos.

${courseTitle ? `Vejo que estás no curso **${courseTitle}**${lessonTitle ? `, a acompanhar a **${lessonTitle}**` : ''}. ` : ''}

Qual é o detalhe que estás com dificuldade? Podes me perguntar em linguagem natural que eu explico bem simples!`;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Gemini AI SDK
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
      console.log('Gemini AI initialized successfully on server.');
    } catch (err) {
      console.warn('Could not initialize Gemini AI, using local pedagogical engine:', err);
    }
  }

  // Healthcheck
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', hasGemini: Boolean(ai) });
  });

  // AI Tutor Chatbot API Route
  app.post('/api/tutor', async (req: Request, res: Response) => {
    const { message, history, courseTitle, lessonTitle, studentName } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Mensagem inválida ou vazia.' });
      return;
    }

    try {
      if (ai) {
        const systemInstruction = `És o "Tutor Saber+", o tutor de inteligência artificial da plataforma de cursos práticos Saber+.
O teu propósito é esclarecer todas as dúvidas dos estudantes moçambicanos de forma paciente, clara, calorosa e com foco na aplicação prática no dia a dia.

Dados do contexto do aluno:
- Aluno: ${studentName || 'Estudante Saber+'}
- Curso atual: ${courseTitle || 'Geral'}
- Aula atual: ${lessonTitle || 'Geral'}

Cursos da Saber+:
1. Excel do Zero ao Avançado (fórmulas como SOMA, MÉDIA, SE, PROCV, tabelas, atalhos, gráficos)
2. Edição de Vídeo com CapCut no Computador (atalhos CTRL+B, transições, textos, keyframes, exportação 1080p)
3. Edição de Vídeo com CapCut no Telemóvel (ferramentas de corte, legendas automáticas, áudios virais, reels)
4. Maquiagem Profissional do Básico ao Avançado (preparação de pele, base, corretivo, contornos, selagem)
5. Cutilagem Perfeita e Rápida (ângulo do alicate 45°, corte contínuo sem repicar, amolecimento, biossegurança)
6. Manicure e Pedicure Profissional (anatomia da unha, cutilagem dos pés, esmaltação sem manchas, spa de pés)

Orientações de resposta:
- Responde em Português simples, acolhedor e direto ao ponto.
- Divide a explicação em passos numerados fáceis de reproduzir.
- Dá exemplos práticos e atalhos quando relevante.
- Mantém um tom motivador e encorajador.`;

        const contents: any[] = [];
        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item && item.text) {
              const role = item.sender === 'user' ? 'user' : 'model';
              contents.push({
                role,
                parts: [{ text: item.text }],
              });
            }
          }
        }

        const promptText = `Dúvida do aluno (${courseTitle ? `Curso: ${courseTitle}, Aula: ${lessonTitle || 'Geral'}` : 'Geral'}): ${message}`;
        contents.push({
          role: 'user',
          parts: [{ text: promptText }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction,
          },
        });

        const reply = response.text || generateFallbackTutorAnswer(message, courseTitle, lessonTitle);
        res.json({ reply });
        return;
      }

      // If Gemini AI is not configured or in fallback mode
      const reply = generateFallbackTutorAnswer(message, courseTitle, lessonTitle);
      res.json({ reply });
    } catch (error: any) {
      console.error('Error generating tutor answer:', error);
      const reply = generateFallbackTutorAnswer(message, courseTitle, lessonTitle);
      res.json({ reply });
    }
  });

  // Mount Vite or static build
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
