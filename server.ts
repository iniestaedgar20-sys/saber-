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

  // 5. MARKETING DIGITAL QUESTIONS
  if (q.includes('marketing') || q.includes('trafego') || q.includes('funil') || q.includes('persona') || q.includes('roi') || q.includes('conversao') || q.includes('midia')) {
    return `### Estratégias e Dúvidas de Marketing Digital:

1. **O que é o Funil de Vendas no Digital:**
   - **Topo (Atração / Reconhecimento):** Conteúdo educativo e informativo nas redes sociais para quem ainda não conhece a tua marca.
   - **Meio (Consideração):** Provas sociais, depoimentos, tutoriais e demonstração de valor para quem já te conhece.
   - **Fundo (Decisão / Conversão):** Oferta direta, chamada para ação (CTA) no WhatsApp ou site com prazo ou benefício claro.

2. **Diferença entre Tráfego Orgânico e Pago:**
   - **Orgânico:** Crescimento por meio de conteúdo relevante, SEO e engajamento natural (não paga por clique, mas exige consistência de tempo).
   - **Pago (Anúncios):** Alcance acelerado via Meta Ads (Instagram/Facebook) ou Google Ads, onde pagas para exibir a tua oferta para o público segmentado.

3. **Métricas Essenciais que deves Acompanhar:**
   - **CTR (Click-Through Rate):** Porcentagem de pessoas que clicaram no teu anúncio após vê-lo (quanto maior, melhor).
   - **CPA / CAC:** Custo por Aquisição de Cliente.
   - **ROI / ROAS:** Retorno financeiro obtido para cada Metical ou dólar investido em divulgação.

4. **Regra de Ouro do Marketing de Conteúdo:**
   - Entrega 80% de conteúdo de valor prático para resolver pequenas dores da tua audiência, e 20% de ofertas de venda.`;
  }

  // 6. ENGLISH QUESTIONS
  if (q.includes('ingles') || q.includes('english') || q.includes('to be') || q.includes('verb') || q.includes('saudac') || q.includes('pronunc') || q.includes('who') || q.includes('what') || q.includes('where')) {
    return `### Dicas Práticas de Inglês para Iniciantes:

1. **O Verbo To Be (Ser / Estar):**
   - **I am** (Eu sou / estou) -> *I am a student*
   - **You are** (Tu és / você é / vocês são) -> *You are welcome*
   - **He is / She is / It is** (Ele / Ela / Coisa neutra é) -> *She is ready*
   - **We are / They are** (Nós somos / Eles são) -> *They are learning*

2. **Saudações Essenciais no Dia a Dia:**
   - **Good morning** (Bom dia) | **Good afternoon** (Boa tarde) | **Good evening** (Boa noite ao chegar) | **Good night** (Boa noite ao despedir-se).
   - **How are you?** (Como estás?) -> Resposta natural: *"I'm good, thank you! And you?"*

3. **Question Words (Palavras de Pergunta):**
   - **Who:** Quem? (*Who is that?*)
   - **What:** O quê / Qual? (*What is your name?*)
   - **Where:** Onde? (*Where do you live?*)
   - **When:** Quando? (*When is the meeting?*)
   - **Why:** Porquê? (*Why are you studying English?*)
   - **How:** Como? (*How much is this?*)

4. **Dica de Ouro:** Não tenhas medo de errar a pronúncia. Repetir em voz alta as frases da aula todos os dias é o segredo para destravar a fala!`;
  }

  // 7. SPANISH QUESTIONS
  if (q.includes('espanhol') || q.includes('spanish') || q.includes('ser e estar') || q.includes('portunhol') || q.includes('saludos') || q.includes('falsos amigos') || q.includes('pronuncia')) {
    return `### Dicas Práticas de Espanhol para Iniciantes:

1. **Diferença entre Ser e Estar:**
   - **SER:** Identidade, origem, profissão, características permanentes.
     *Exemplo:* *Soy de Mozambique, soy estudiante.*
   - **ESTAR:** Estados temporários, emoções, localização geográfica.
     *Exemplo:* *Estoy muy contento hoy. La oficina está en el centro.*

2. **Cuidado com os Falsos Amigos (Heterossemânticos):**
   - **Embarazada:** Significa **grávida** (e não envergonhada)! Envergonhada é *avergonzada*.
   - **Exquisito:** Significa **delicioso, saboroso** (e não esquisito/estranho)! Estranho é *raro*.
   - **Propina:** Significa **gorjeta** legal para garçons/atendentes (não suborno)!
   - **Latir:** Significa **bater (o coração)** (e não ladrar de cão)! Ladrar é *ladrar*.

3. **Pronúncia Autêntica dos Sons do Espanhol:**
   - **J e G (antes de E/I):** Tem som de R forte do português (*jamón*, *gente*).
   - **Ñ:** Tem som idêntico ao nosso *NH* (*mañana*, *niño*).
   - **LL e Y:** Podem soar como *DJ* ou *I* dependendo do país (*calle*, *yo*).
   - **Z e C (antes de E/I):** Na Espanha soa com a língua entre os dentes; na América Latina soa como *S*.`;
  }

  // 8. DEFAULT HELPFUL PEDAGOGICAL RESPONSE
  return `### Olá! Estou aqui para te ajudar no teu aprendizado.

Como Tutor da Saber+, posso te explicar passo a passo qualquer dúvida sobre:
- **Inglês Prático:** pronúncia, verbo To Be, apresentações, saudações e rotinas.
- **Espanhol Prático:** pronúncia autêntica, verbos Ser/Estar, falsos amigos e expressões.
- **Marketing Digital:** processos essenciais, tráfego, redes sociais, funis e conversão.
- **Excel:** fórmulas (\`SOMA\`, \`SE\`, \`PROCV\`), tabelas, formatação, atalhos e gráficos.
- **CapCut:** edição no PC e telemóvel, cortes rápidos, efeitos, áudios e exportação.
- **Cutilagem e Manicure:** manuseio do alicate, esterilização, esmaltação e acabamento.
- **Maquiagem:** preparação de pele, esfumados, aplicação de base e contornos.

${courseTitle ? `Vejo que estás no curso **${courseTitle}**${lessonTitle ? `, a acompanhar a **${lessonTitle}**` : ''}. ` : ''}

Qual é o detalhe que estás com dificuldade? Podes me perguntar em linguagem natural que eu explico bem simples!`;
}

function generateFallbackLessonQuiz(courseTitle: string, lessonTitle: string, lessonDescription?: string) {
  const c = (courseTitle || '').toLowerCase();
  const l = (lessonTitle || '').toLowerCase();

  // ENGLISH
  if (c.includes('ingl') || c.includes('english')) {
    if (l.includes('saud') || l.includes('alfabeto') || l.includes('comece')) {
      return [
        {
          id: 'q1',
          question: 'Qual é a saudação mais apropriada em inglês para dizer "Bom dia"?',
          options: ['Good afternoon', 'Good morning', 'Good night', 'Goodbye'],
          correctIndex: 1,
          explanation: '"Good morning" é a expressão correta para desejar bom dia até ao meio-dia.'
        },
        {
          id: 'q2',
          question: 'Como se responde educadamente à pergunta "How are you?" em inglês?',
          options: ['Yes, I do', 'I am 20 years old', 'I am good, thank you! And you?', 'My name is Peter'],
          correctIndex: 2,
          explanation: '"I am good, thank you! And you?" é uma resposta natural e cortês no quotidiano.'
        },
        {
          id: 'q3',
          question: 'Qual a letra do alfabeto inglês que tem a pronúncia "ei"?',
          options: ['A', 'E', 'I', 'O'],
          correctIndex: 0,
          explanation: 'No alfabeto em inglês, a letra "A" é pronunciada como /eɪ/ (ei).'
        }
      ];
    }
    if (l.includes('to be') || l.includes('apresenta')) {
      return [
        {
          id: 'q1',
          question: 'Qual é a forma correta do verbo To Be para o pronome "I" (Eu)?',
          options: ['I are', 'I is', 'I am', 'I be'],
          correctIndex: 2,
          explanation: 'A conjugação do verbo To Be para a primeira pessoa singular é "I am".'
        },
        {
          id: 'q2',
          question: 'Como se diz "Ela é médica" em inglês?',
          options: ['She are a doctor', 'She is a doctor', 'She am a doctor', 'Her is a doctor'],
          correctIndex: 1,
          explanation: 'Para "She" (Ela), usamos o verbo "is": "She is a doctor".'
        },
        {
          id: 'q3',
          question: 'Como expressar "Eu sou de Moçambique" em inglês?',
          options: ['I am from Mozambique', 'I have Mozambique', 'I live Mozambique', 'I come in Mozambique'],
          correctIndex: 0,
          explanation: 'Usamos a preposição "from" para indicar origem: "I am from Mozambique".'
        }
      ];
    }
    return [
      {
        id: 'q1',
        question: 'Qual Question Word usamos em inglês para perguntar sobre "Lugar / Onde"?',
        options: ['When', 'Where', 'Who', 'Why'],
        correctIndex: 1,
        explanation: '"Where" significa "Onde" e refere-se a localizações.'
      },
      {
        id: 'q2',
        question: 'Qual é o plural correto do pronome "You" quando falamos com mais de uma pessoa?',
        options: ['Yous', 'You', 'You are', 'Yours'],
        correctIndex: 1,
        explanation: 'Em inglês, "You" serve tanto para o singular (tu / você) como para o plural (vocês).'
      },
      {
        id: 'q3',
        question: 'Para expressar uma rotina diária no presente simples, qual frase está gramaticalmente correta?',
        options: ['I works everyday', 'I work every day', 'I working every day', 'I am work every day'],
        correctIndex: 1,
        explanation: 'Com o pronome "I", o verbo no presente simples fica na forma base: "I work every day".'
      }
    ];
  }

  // SPANISH
  if (c.includes('espanh') || c.includes('spanish')) {
    if (l.includes('salud') || l.includes('despedida') || l.includes('sauda')) {
      return [
        {
          id: 'q1',
          question: 'Como se diz "Boa tarde" em espanhol?',
          options: ['Buenas noches', 'Buenos días', 'Buenas tardes', 'Mucho gusto'],
          correctIndex: 2,
          explanation: '"Buenas tardes" é o cumprimento usado da parte da tarde em espanhol.'
        },
        {
          id: 'q2',
          question: 'Quando alguém diz "Mucho gusto", qual é a resposta mais comum e educada?',
          options: ['Igualmente', 'De nada', 'Hasta luego', 'Por favor'],
          correctIndex: 0,
          explanation: '"Igualmente" (ou "El gusto es mío") expressa reciprocidade simpática ao conhecer alguém.'
        },
        {
          id: 'q3',
          question: 'Qual expressão em espanhol significa "Até logo"?',
          options: ['Hasta luego', 'Buenos días', 'Bienvenido', 'Por supuesto'],
          correctIndex: 0,
          explanation: '"Hasta luego" é uma das despedidas mais universais da língua espanhola.'
        }
      ];
    }
    if (l.includes('ser') || l.includes('estar')) {
      return [
        {
          id: 'q1',
          question: 'Quando devemos utilizar o verbo "SER" em espanhol?',
          options: [
            'Para características permanentes, identidade, nacionalidade e profissão',
            'Apenas para localização no espaço',
            'Para emoções momentâneas de hoje',
            'Nunca se usa "ser" em espanhol'
          ],
          correctIndex: 0,
          explanation: '"SER" expressa essência e características inerentes: "Soy de Maputo, soy enfermero".'
        },
        {
          id: 'q2',
          question: 'Qual frase demonstra o uso correto do verbo "ESTAR"?',
          options: [
            'Estoy profesor de español',
            'Estoy en el trabajo en este momento',
            'Yo estoy inteligente',
            'Ella está de Mozambique'
          ],
          correctIndex: 1,
          explanation: 'Localização e estados temporários pedem "estar": "Estoy en el trabajo".'
        },
        {
          id: 'q3',
          question: 'O que significa a palavra "exquisito" em espanhol quando aplicada à comida?',
          options: ['Estranho ou esquisito', 'Delicioso e de alto sabor', 'Muito picante', 'Sem sal'],
          correctIndex: 1,
          explanation: '"Exquisito" é um falso amigo clássico: significa delicioso, requintado ou muito bom!'
        }
      ];
    }
    return [
      {
        id: 'q1',
        question: 'Como é pronunciada a letra "J" na maioria dos países de língua espanhola?',
        options: ['Como o "J" do português', 'Com o som aspirado e forte parecido com o "R" do português', 'Como "Z"', 'É sempre muda'],
        correctIndex: 1,
        explanation: 'A letra "J" (jota) soa como um "R" forte vindo da garganta (ex: jamón, jardín).'
      },
      {
        id: 'q2',
        question: 'O que significa o termo "embarazada" em espanhol?',
        options: ['Envergonhada', 'Grávida', 'Atrasada', 'Cansada'],
        correctIndex: 1,
        explanation: '"Embarazada" significa grávida. Envergonhada em espanhol diz-se "avergonzada".'
      },
      {
        id: 'q3',
        question: 'Qual é o artigo definido masculino singular em espanhol?',
        options: ['Lo', 'Le', 'El', 'Un'],
        correctIndex: 2,
        explanation: '"El" é o artigo definido singular para palavras masculinas (ex: el libro, el estudiante).'
      }
    ];
  }

  // EXCEL
  if (c.includes('excel')) {
    return [
      {
        id: 'q1',
        question: `Na aula "${lessonTitle}", qual é o símbolo obrigatório no início de qualquer fórmula no Excel?`,
        options: ['# (Cardeal)', '= (Igual)', '$ (Cifrão)', '@ (Arroba)'],
        correctIndex: 1,
        explanation: 'Toda e qualquer fórmula ou função no Excel deve começar obrigatoriamente com o sinal de igual (=).'
      },
      {
        id: 'q2',
        question: 'Para que serve a tecla de atalho F4 ao selecionar uma referência de célula no Excel?',
        options: [
          'Fixar a célula com cifrão ($A$1) para referência absoluta',
          'Eliminar a folha atual',
          'Fechar o programa sem guardar',
          'Aumentar o zoom da tela'
        ],
        correctIndex: 0,
        explanation: 'A tecla F4 alterna referências relativas para absolutas ($A$1), trancando a célula ao arrastar.'
      },
      {
        id: 'q3',
        question: 'Qual é o resultado principal alcançado ao aplicar os conceitos desta aula?',
        options: [
          'Maior precisão nos cálculos e organização profissional dos dados',
          'Perda de histórico de informações',
          'Desformatação da folha de cálculo',
          'Necessidade de calcular tudo manualmente no papel'
        ],
        correctIndex: 0,
        explanation: 'A correta utilização das ferramentas do Excel garante automação, exatidão e poupança de tempo.'
      }
    ];
  }

  // CAPCUT
  if (c.includes('capcut')) {
    return [
      {
        id: 'q1',
        question: `Qual é a principal recomendação prática abordada na aula "${lessonTitle}"?`,
        options: [
          'Fazer cortes precisos eliminando silêncios e mantendo o ritmo dinâmico do vídeo',
          'Deixar clipes longos sem transições nem legendas',
          'Exportar com resolução muito baixa para economizar luz',
          'Não sincronizar o áudio com as imagens'
        ],
        correctIndex: 0,
        explanation: 'O dinamismo na edição moderna requer cortes limpos nos momentos certos para reter a atenção do público.'
      },
      {
        id: 'q2',
        question: 'Qual é a resolução de exportação padrão recomendada para garantir alta qualidade nas redes sociais?',
        options: ['480p SD', '720p HD', '1080p Full HD', '240p'],
        correctIndex: 2,
        explanation: '1080p a 30fps ou 60fps é o formato padrão ideal para Instagram, TikTok e WhatsApp Status.'
      },
      {
        id: 'q3',
        question: 'Qual ferramenta automática do CapCut poupa mais tempo na criação de vídeos curtos?',
        options: ['Legendas Automáticas', 'Inversão total de vídeo', 'Efeito espelho', 'Zoom contínuo'],
        correctIndex: 0,
        explanation: 'As Legendas Automáticas transcrevem o áudio com estilo e ritmo em apenas poucos segundos.'
      }
    ];
  }

  // MARKETING DIGITAL
  if (c.includes('marketing')) {
    return [
      {
        id: 'q1',
        question: `Na aula "${lessonTitle}", qual é o foco principal da estratégia digital discutida?`,
        options: [
          'Atrair o público certo com clareza na proposta de valor e foco em conversão',
          'Gastar todo o orçamento sem segmentar público',
          'Publicar apenas uma vez por mês sem monitorar métricas',
          'Ignorar as mensagens e pedidos dos potenciais clientes'
        ],
        correctIndex: 0,
        explanation: 'O marketing eficaz parte de conhecer as dores do público e conduzi-lo de forma consistente pelo funil de vendas.'
      },
      {
        id: 'q2',
        question: 'O que representa o topo do funil de vendas no marketing digital?',
        options: [
          'A fase de atração e reconhecimento onde as pessoas tomam consciência da sua solução',
          'O momento imediato do pagamento bancário',
          'O pós-venda após 1 ano',
          'O cancelamento da inscrição'
        ],
        correctIndex: 0,
        explanation: 'No topo do funil, o objetivo é captar a atenção e educar pessoas que ainda não conhecem a marca.'
      },
      {
        id: 'q3',
        question: 'Por que o acompanhamento de métricas é crucial nas campanhas digitais?',
        options: [
          'Permite identificar o que gera retorno financeiro e otimizar investimentos',
          'Serve apenas para enfeitar relatórios',
          'Não tem impacto prático nos lucros do negócio',
          'Obriga a contratar consultores estrangeiros'
        ],
        correctIndex: 0,
        explanation: 'Dados claros revelam o custo por cliente e orientam decisões inteligentes para escalar os resultados.'
      }
    ];
  }

  // DEFAULT / BEAUTY / ESTHETICS
  return [
    {
      id: 'q1',
      question: `Em relação ao procedimento prático ensinado na aula "${lessonTitle}", qual é a atitude mais segura?`,
      options: [
        'Seguir rigorosamente as normas de higiene, ergonomia e preparo adequado dos materiais',
        'Fazer o procedimento com pressa sem desinfetar os instrumentos',
        'Ignorar o tipo de pele ou unha da cliente',
        'Usar produtos fora do prazo de validade'
      ],
      correctIndex: 0,
      explanation: 'A biossegurança e o cuidado minucioso em cada etapa garantem resultados profissionais e a fidelização da cliente.'
    },
    {
      id: 'q2',
      question: 'Qual é a melhor prática para manter a durabilidade do acabamento?',
      options: [
        'Fazer a correta preparação e respeitar o tempo de cura/secagem de cada camada',
        'Aplicar produtos em excesso sem selar',
        'Molhar a área imediatamente após a aplicação',
        'Não retirar resíduos e oleosidade antes de começar'
      ],
      correctIndex: 0,
      explanation: 'A correta higienização e aplicação em camadas finas e seladas são o segredo da longa durabilidade.'
    },
    {
      id: 'q3',
      question: 'Como a profissional deve agir perante a dúvida de uma cliente durante o atendimento?',
      options: [
        'Explicar com simpatia o procedimento e orientar sobre os cuidados em casa',
        'Ficar em silêncio e demonstrar insegurança',
        'Recomendar que a cliente não cuide do resultado em casa',
        'Recusar-se a esclarecer o funcionamento dos produtos'
      ],
      correctIndex: 0,
      explanation: 'A comunicação clara e orientações de pós-atendimento constroem autoridade e confiança mútua.'
    }
  ];
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
1. Curso de Marketing Digital (processos essenciais, tráfego orgânico e pago, marketing de conteúdo, redes sociais, métricas e relatórios)
2. Inglês Prático do Zero (alfabeto, saudações, verbo To Be, apresentações, question words, rotina diária)
3. Espanhol Prático para Iniciantes (saludos, pronúncia autêntica de LL/Ñ/RR/J, verbos Ser e Estar, falsos amigos)
4. Excel do Zero ao Avançado (fórmulas como SOMA, MÉDIA, SE, PROCV, tabelas, atalhos, gráficos)
5. Edição de Vídeo com CapCut no Computador (atalhos CTRL+B, transições, textos, keyframes, exportação 1080p)
6. Edição de Vídeo com CapCut no Telemóvel (ferramentas de corte, legendas automáticas, áudios virais, reels)
7. Maquiagem Profissional do Básico ao Avançado (preparação de pele, base, corretivo, contornos, selagem)
8. Cutilagem Perfeita e Rápida (ângulo do alicate 45°, corte contínuo sem repicar, amolecimento, biossegurança)
9. Manicure e Pedicure Profissional (anatomia da unha, cutilagem dos pés, esmaltação sem manchas, spa de pés)`;

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

  // AI Lesson Mini-Quiz Route
  app.post('/api/lesson-quiz', async (req: Request, res: Response) => {
    const { courseTitle, lessonTitle, lessonDescription } = req.body;

    if (!courseTitle || !lessonTitle) {
      res.status(400).json({ error: 'courseTitle e lessonTitle são obrigatórios.' });
      return;
    }

    try {
      if (ai) {
        const promptText = `És o tutor e pedagogo da plataforma Saber+.
Gera um Mini-Quiz rápido de exatamente 3 perguntas de escolha múltipla para avaliar se o aluno realmente assistiu e compreendeu a aula.
Curso: "${courseTitle}"
Aula: "${lessonTitle}"
Descrição: "${lessonDescription || ''}"

Requisitos:
- 3 perguntas práticas e focadas nos conceitos ensinados nesta aula específica.
- Cada pergunta tem 4 opções objetivas e distintas.
- "correctIndex" deve ser o índice (0, 1, 2 ou 3) da opção correta.
- Uma breve "explanation" explicando o porquê de forma amigável e clara em português.
- Retorna SOMENTE um objeto JSON válido com o campo "questions".
Exemplo de formato:
{
  "questions": [
    {
      "id": "q1",
      "question": "Texto da pergunta?",
      "options": ["Opção 0", "Opção 1", "Opção 2", "Opção 3"],
      "correctIndex": 0,
      "explanation": "Explicação..."
    }
  ]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: promptText }] }],
          config: {
            responseMimeType: 'application/json',
          },
        });

        const raw = response.text?.trim() || '';
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed?.questions) && parsed.questions.length > 0) {
            res.json({ questions: parsed.questions });
            return;
          }
        } catch (jsonErr) {
          console.warn('Could not parse Gemini JSON output for mini-quiz, using fallback:', jsonErr);
        }
      }

      // Fallback
      const questions = generateFallbackLessonQuiz(courseTitle, lessonTitle, lessonDescription);
      res.json({ questions });
    } catch (err: any) {
      console.error('Error generating lesson quiz:', err);
      const questions = generateFallbackLessonQuiz(courseTitle, lessonTitle, lessonDescription);
      res.json({ questions });
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
