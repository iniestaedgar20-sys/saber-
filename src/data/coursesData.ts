import { Course } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-excel-zero',
    slug: 'excel-do-zero',
    title: 'Excel do Zero',
    category: 'Tecnologia e produtividade',
    level: 'Iniciante',
    price: 0, // Gratuito para capacitação
    thumbnail: '/src/assets/images/course_excel_zero_1792013689568.jpg',
    durationEstimate: '4 horas de conteúdo prático',
    shortDescription: 'Aprende a dominar folhas de cálculo, fórmulas essenciais, tabelas e gráficos sem qualquer experiência prévia.',
    fullDescription: 'O curso Excel do Zero foi estruturado especificamente para quem nunca utilizou o Microsoft Excel ou sente insegurança ao lidar com folhas de cálculo. Vais aprender desde a navegação inicial e formatação de dados até fórmulas matemáticas práticas (SOMA, MÉDIA, MÁXIMO), formatação condicional e elaboração de relatórios visuais que podes aplicar no trabalho, nos estudos ou na gestão de um pequeno negócio.',
    objectives: [
      'Compreender a estrutura de folhas de cálculo, células, linhas e colunas',
      'Inserir, editar e formatar dados com aspecto profissional e alinhado',
      'Aplicar fórmulas e funções fundamentais para cálculos automáticos',
      'Construir tabelas organizadas e aplicar filtros dinâmicos',
      'Gerar gráficos de barras, linhas e circulares para tomada de decisão',
      'Criar uma folha de controlo financeiro e orçamental prática'
    ],
    requirements: [
      'Computador com Microsoft Excel instalado ou acesso ao Excel Online gratuito',
      'Vontade de praticar os exercícios propostos em cada aula',
      'Nenhum conhecimento prévio de matemática avançada é necessário'
    ],
    targetAudience: 'Estudantes, empreendedores, assistentes administrativos e qualquer pessoa que queira adquirir uma das competências mais exigidas no mercado de trabalho em Moçambique.',
    isPublished: true,
    featured: true,
    passingScorePercent: 80,
    modules: [
      {
        id: 'mod-exc-1',
        courseId: 'course-excel-zero',
        title: 'Módulo 1: Introdução ao Excel e Interface',
        order: 1,
        lessons: [
          {
            id: 'les-exc-1',
            moduleId: 'mod-exc-1',
            title: '01. Apresentação da Interface e Primeiro Contacto',
            description: 'Aula 1',
            videoId: 'I2taMQ3j6qo',
            durationMinutes: 18,
            order: 1,
            isRequired: true,
            resources: [
              { title: 'Guia de Atalhos Essenciais (PDF)', url: '#', type: 'guide' }
            ]
          },
          {
            id: 'les-exc-2',
            moduleId: 'mod-exc-1',
            title: '02. Navegação em Células, Linhas e Colunas',
            description: 'Aula 2',
            videoId: 'OHM4CJbea54',
            durationMinutes: 15,
            order: 2,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-exc-2',
        courseId: 'course-excel-zero',
        title: 'Módulo 2: Células, Linhas, Colunas e Formatação',
        order: 2,
        lessons: [
          {
            id: 'les-exc-3',
            moduleId: 'mod-exc-2',
            title: '03. Tipos de Dados e Inserção Precisa',
            description: 'Aula 3',
            videoId: 'qQLT_uoMN0U',
            durationMinutes: 20,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-exc-4',
            moduleId: 'mod-exc-2',
            title: '04. Formatação Visual de Tabelas e Bordas',
            description: 'Aula 4',
            videoId: '7h5ZesJZ9o8',
            durationMinutes: 22,
            order: 2,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-exc-3',
        courseId: 'course-excel-zero',
        title: 'Módulo 3: Fórmulas e Funções Básicas',
        order: 3,
        lessons: [
          {
            id: 'les-exc-5',
            moduleId: 'mod-exc-3',
            title: '05. Operadores Matemáticos (+, -, *, /)',
            description: 'Aula 5',
            videoId: 'Qj5ar291SHM',
            durationMinutes: 24,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-exc-6',
            moduleId: 'mod-exc-3',
            title: '06. Funções Principais: SOMA, MÉDIA, MÍNIMO e MÁXIMO',
            description: 'Aula 6',
            videoId: 'ksT1bSwzreo',
            durationMinutes: 26,
            order: 2,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-exc-4',
        courseId: 'course-excel-zero',
        title: 'Módulo 4: Tabelas, Organização e Exercícios',
        order: 4,
        lessons: [
          {
            id: 'les-exc-7',
            moduleId: 'mod-exc-4',
            title: '07. Formatação Condicional e Destaque Visual',
            description: 'Aula 7',
            videoId: 'tetFYM7Eu_o',
            durationMinutes: 21,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-exc-8',
            moduleId: 'mod-exc-4',
            title: '08. Construção e Formatação de Gráficos',
            description: 'Aula 8',
            videoId: 'twxZ-dr2Xvw',
            durationMinutes: 25,
            order: 2,
            isRequired: true
          },
          {
            id: 'les-exc-9',
            moduleId: 'mod-exc-4',
            title: '09. Filtros Dinâmicos e Ordenação de Listas',
            description: 'Aula 9',
            videoId: 'MgC-Kn4RUtI',
            durationMinutes: 19,
            order: 3,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-exc-5',
        courseId: 'course-excel-zero',
        title: 'Módulo 5: Revisão e Avaliação Final',
        order: 5,
        lessons: [
          {
            id: 'les-exc-10',
            moduleId: 'mod-exc-5',
            title: '10. Projecto Prático: Folha de Gestão e Conclusão',
            description: 'Aula 10',
            videoId: 'aFk0a0czSEU',
            durationMinutes: 30,
            order: 1,
            isRequired: true,
            resources: [
              { title: 'Modelo de Folha de Exercício (XLSX)', url: '#', type: 'spreadsheet' }
            ]
          }
        ]
      }
    ],
    finalQuiz: [
      {
        id: 'q-exc-1',
        question: 'Qual é o carácter obrigatório que deve iniciar qualquer fórmula ou função no Excel?',
        options: ['O símbolo de soma (+)', 'O sinal de igual (=)', 'O travessão (-)', 'Duas barras invertidas (//)'],
        correctAnswerIndex: 1,
        explanation: 'Todas as fórmulas e funções no Excel devem começar obrigatoriamente pelo sinal de igual (=) para que o programa reconheça que se trata de uma instrução de cálculo.'
      },
      {
        id: 'q-exc-2',
        question: 'Qual das seguintes funções calcula a média aritmética de um intervalo de células?',
        options: ['=MED(A1:A10)', '=MEDIA(A1:A10)', '=SOMAMEDIA(A1:A10)', '=DIVIDIR(A1:A10)'],
        correctAnswerIndex: 1,
        explanation: 'A função =MEDIA(intervalo) calcula automaticamente a soma de todos os números e divide pela quantidade de elementos.'
      },
      {
        id: 'q-exc-3',
        question: 'Para fixar uma célula numa fórmula ao arrastar para outras linhas, que símbolo devemos utilizar?',
        options: ['Cifrão ($)', 'Percentagem (%)', 'Asterisco (*)', 'Cardeal (#)'],
        correctAnswerIndex: 0,
        explanation: 'O símbolo cifrão ($), como em $A$1 ou $B$2, cria uma referência absoluta que não se desloca ao arrastar a fórmula.'
      },
      {
        id: 'q-exc-4',
        question: 'Para que serve a ferramenta "Formatação Condicional"?',
        options: [
          'Para bloquear o ficheiro com uma palavra-passe',
          'Para alterar a cor de fundo ou do texto de uma célula com base numa regra ou valor',
          'Para traduzir o Excel para outras línguas',
          'Para apagar linhas vazias automaticamente'
        ],
        correctAnswerIndex: 1,
        explanation: 'A formatação condicional aplica estilos visuais (como verde para saldo positivo ou vermelho para despesas elevadas) de acordo com regras configuradas.'
      },
      {
        id: 'q-exc-5',
        question: 'Como se chama o tipo de gráfico mais indicado para comparar valores entre diferentes categorias distintas?',
        options: ['Gráfico de dispersão', 'Gráfico de colunas ou barras', 'Gráfico de teia', 'Gráfico de bolhas'],
        correctAnswerIndex: 1,
        explanation: 'Os gráficos de colunas e barras são os mais recomendados e claros para comparar grandezas entre categorias separadas.'
      }
    ]
  },
  {
    id: 'course-capcut-pc',
    slug: 'capcut-computador',
    title: 'CapCut para Computador',
    category: 'Tecnologia e produtividade',
    level: 'Iniciante',
    price: 0,
    thumbnail: '/src/assets/images/course_capcut_desktop_1792013689523.jpg',
    durationEstimate: '3.5 horas de conteúdo prático',
    shortDescription: 'Domina a edição de vídeo profissional no teu computador utilizando o CapCut Desktop sem pagar mensalidades.',
    fullDescription: 'O CapCut Desktop tornou-se uma das ferramentas de edição mais potentes e acessíveis do mundo. Neste curso prático, aprenderás a importar os teus vídeos, organizar ficheiros, fazer cortes precisos na linha do tempo, aplicar transições suaves, sincronizar áudio, gerar legendas automáticas em português e exportar em alta definição (1080p e 4K) para YouTube, Facebook, TikTok e Instagram.',
    objectives: [
      'Configurar o CapCut Desktop e optimizar o desempenho do computador',
      'Importar, classificar e organizar os vídeos da tua câmara ou telemóvel',
      'Executar cortes limpos, eliminar silêncios e dominar atalhos da timeline',
      'Adicionar transições modernas, efeitos visuais e keyframes de animação',
      'Editar áudio, remover ruídos de fundo e sincronizar músicas',
      'Gerar legendas automáticas e exportar vídeos em alta definição'
    ],
    requirements: [
      'Computador com Windows ou macOS e o CapCut Desktop instalado gratuitamente',
      'Auscultadores ou colunas para monitorização de som',
      'Nenhuma experiência prévia em edição de vídeo é necessária'
    ],
    targetAudience: 'Criadores de conteúdo, gestores de redes sociais, profissionais de marketing e jovens que queiram produzir vídeos institucionais ou para a internet.',
    isPublished: true,
    featured: true,
    passingScorePercent: 80,
    modules: [
      {
        id: 'mod-cpc-1',
        courseId: 'course-capcut-pc',
        title: 'Módulo 1: Interface e Ferramentas',
        order: 1,
        lessons: [
          {
            id: 'les-cpc-1',
            moduleId: 'mod-cpc-1',
            title: '01. Interface do CapCut Desktop e Preferências',
            description: 'Aula 1',
            videoId: '4n4I0EqvBk0',
            durationMinutes: 19,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-cpc-2',
            moduleId: 'mod-cpc-1',
            title: '02. Importação e Organização de Ficheiros',
            description: 'Aula 2',
            videoId: 'DKN8Wva5FE4',
            durationMinutes: 16,
            order: 2,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-cpc-2',
        courseId: 'course-capcut-pc',
        title: 'Módulo 2: Edição de Clips, Texto e Efeitos',
        order: 2,
        lessons: [
          {
            id: 'les-cpc-3',
            moduleId: 'mod-cpc-2',
            title: '03. Ferramentas de Corte e Timeline Magnética',
            description: 'Aula 3',
            videoId: 'ZldRpj2-qug',
            durationMinutes: 22,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-cpc-4',
            moduleId: 'mod-cpc-2',
            title: '04. Transições, Filtros e Efeitos Visuais',
            description: 'Aula 4',
            videoId: 'q6PSohK457U',
            durationMinutes: 20,
            order: 2,
            isRequired: true
          },
          {
            id: 'les-cpc-5',
            moduleId: 'mod-cpc-2',
            title: '05. Animação com Keyframes e Speed Curve',
            description: 'Aula 5',
            videoId: 'v5tRcaGVTEo',
            durationMinutes: 24,
            order: 3,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-cpc-3',
        courseId: 'course-capcut-pc',
        title: 'Módulo 3: Áudio, Legendas e Exportação',
        order: 3,
        lessons: [
          {
            id: 'les-cpc-6',
            moduleId: 'mod-cpc-3',
            title: '06. Tratamento de Áudio e Redução de Ruído',
            description: 'Aula 6',
            videoId: 'jxpCADcmYZ0',
            durationMinutes: 23,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-cpc-7',
            moduleId: 'mod-cpc-3',
            title: '07. Legendas Automáticas e Tipografia Estilizada',
            description: 'Aula 7',
            videoId: 'VL3UwrjnTlw',
            durationMinutes: 25,
            order: 2,
            isRequired: true
          },
          {
            id: 'les-cpc-8',
            moduleId: 'mod-cpc-3',
            title: '08. Correcção Básica de Cores e LUTs',
            description: 'Aula 8',
            videoId: 'RIy3z3Gi7b4',
            durationMinutes: 21,
            order: 3,
            isRequired: true
          },
          {
            id: 'les-cpc-9',
            moduleId: 'mod-cpc-3',
            title: '09. Exportação do Projecto em Alta Definição',
            description: 'Aula 9',
            videoId: '7QJyNLk-jXc',
            durationMinutes: 18,
            order: 4,
            isRequired: true
          }
        ]
      }
    ],
    finalQuiz: [
      {
        id: 'q-cpc-1',
        question: 'Qual é a proporção de ecrã (Aspect Ratio) padrão recomendada para vídeos horizontais do YouTube?',
        options: ['9:16 (Vertical)', '16:9 (Horizontal)', '1:1 (Quadrado)', '4:5 (Feed)'],
        correctAnswerIndex: 1,
        explanation: 'A proporção 16:9 é o formato panorâmico padrão para monitores de computador e leitores de vídeo como o YouTube.'
      },
      {
        id: 'q-cpc-2',
        question: 'Para que serve a ferramenta de "Legendas Automáticas" no CapCut?',
        options: [
          'Para traduzir o vídeo para 50 idiomas em tempo real',
          'Para reconhecer a fala do vídeo e criar automaticamente o texto legendado na timeline',
          'Para censurar palavras com bipes sonoros',
          'Para aumentar o volume dos diálogos'
        ],
        correctAnswerIndex: 1,
        explanation: 'As legendas automáticas transcrevem o áudio falado directamente para caixas de texto sincronizadas na linha do tempo.'
      },
      {
        id: 'q-cpc-3',
        question: 'O que representa um "Keyframe" (quadro-chave) na edição de vídeo?',
        options: [
          'Uma tecla de atalho do teclado',
          'Um ponto de marcação no tempo que define o início ou fim de uma animação (ex: escala ou posição)',
          'O primeiro quadro de um ficheiro de áudio MP3',
          'Um filtro de cor predefinido'
        ],
        correctAnswerIndex: 1,
        explanation: 'Keyframes permitem animar parâmetros ao longo do tempo (como aproximar a câmara ou mover um título pela tela).'
      },
      {
        id: 'q-cpc-4',
        question: 'Qual é a taxa de frames por segundo (FPS) mais comum para vídeos nítidos e naturais?',
        options: ['12 FPS', '24 ou 30 FPS', '120 FPS', '5 FPS'],
        correctAnswerIndex: 1,
        explanation: '24 FPS (estilo cinematográfico) e 30 FPS (vídeo digital padrão) são as taxas mais comuns e compatíveis.'
      },
      {
        id: 'q-cpc-5',
        question: 'Para manter a clareza da voz do narrador com música ao fundo, o que devemos fazer?',
        options: [
          'Aumentar o volume da música para o dobro',
          'Reduzir o volume da música de fundo (normalmente entre -18dB e -25dB)',
          'Retirar totalmente a voz do locutor',
          'Aplicar eco no microfone'
        ],
        correctAnswerIndex: 1,
        explanation: 'A música de fundo deve ficar num nível subtil para não competir com as frequências da voz humana do orador.'
      }
    ]
  },
  {
    id: 'course-capcut-mobile',
    slug: 'capcut-celular',
    title: 'CapCut para Celular',
    category: 'Tecnologia e produtividade',
    level: 'Iniciante',
    price: 0,
    thumbnail: '/src/assets/images/course_capcut_mobile_1792013691286.jpg',
    durationEstimate: '2.5 horas de conteúdo prático',
    shortDescription: 'Cria e edita vídeos verticais dinâmicos directamente no teu telemóvel para Reels, TikTok e WhatsApp Status.',
    fullDescription: 'Não precisas de um computador potente para criar vídeos atractivos. Com o CapCut no telemóvel podes gravar, cortar, aplicar transições, sincronizar batidas musicais e gerar legendas com facilidade. Este curso ensina o fluxo de trabalho completo na aplicação móvel, optimizado para ligações rápidas e partilha instantânea.',
    objectives: [
      'Navegar com agilidade na interface móvel do CapCut',
      'Fazer cortes precisos utilizando apenas os dedos e gestos tácteis',
      'Encontrar e sincronizar músicas com o ritmo dos teus cortes',
      'Gerar legendas automáticas atraentes com cores e destaques',
      'Adicionar efeitos sonoros para prender a atenção do público',
      'Exportar vídeos leves mantendo a nitidez sem sobrecarregar a memória do telemóvel'
    ],
    requirements: [
      'Telemóvel (Android ou iPhone) com a aplicação CapCut instalada',
      'Espaço livre para salvar os vídeos editados',
      'Nenhum equipamento dispendioso é necessário'
    ],
    targetAudience: 'Jovens criadores, empreendedores que vendem produtos pelas redes sociais e qualquer pessoa que queira publicar vídeos com acabamento profissional.',
    isPublished: true,
    featured: false,
    passingScorePercent: 80,
    modules: [
      {
        id: 'mod-cpm-1',
        courseId: 'course-capcut-mobile',
        title: 'Módulo 1: Interface da Aplicação e Cortes',
        order: 1,
        lessons: [
          {
            id: 'les-cpm-1',
            moduleId: 'mod-cpm-1',
            title: '01. Interface da Aplicação Móvel e Novo Projecto',
            description: 'Aula 1',
            videoId: '4SYO0meqIfw',
            durationMinutes: 14,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-cpm-2',
            moduleId: 'mod-cpm-1',
            title: '02. Importação de Vídeos e Galeria',
            description: 'Aula 2',
            videoId: 'iwAB8ocrqUg',
            durationMinutes: 12,
            order: 2,
            isRequired: true
          },
          {
            id: 'les-cpm-3',
            moduleId: 'mod-cpm-1',
            title: '03. Cortes Rápidos e Montagem com o Polegar',
            description: 'Aula 3',
            videoId: 'AnApqTd0Z3o',
            durationMinutes: 18,
            order: 3,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-cpm-2',
        courseId: 'course-capcut-mobile',
        title: 'Módulo 2: Texto, Música e Efeitos',
        order: 2,
        lessons: [
          {
            id: 'les-cpm-4',
            moduleId: 'mod-cpm-2',
            title: '04. Adicionar Músicas em Alta e Sincronização de Batidas',
            description: 'Aula 4',
            videoId: 'n_wGAPZafPU',
            durationMinutes: 17,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-cpm-5',
            moduleId: 'mod-cpm-2',
            title: '05. Legendas Automáticas no Telemóvel',
            description: 'Aula 5',
            videoId: 'mTRx5ECto68',
            durationMinutes: 20,
            order: 2,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-cpm-3',
        courseId: 'course-capcut-mobile',
        title: 'Módulo 3: Ajustes e Exportação Social',
        order: 3,
        lessons: [
          {
            id: 'les-cpm-6',
            moduleId: 'mod-cpm-3',
            title: '06. Filtros e Ajustes de Luminosidade',
            description: 'Aula 6',
            videoId: 'Hzyr33BuglQ',
            durationMinutes: 16,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-cpm-7',
            moduleId: 'mod-cpm-3',
            title: '07. Exportação e Partilha para WhatsApp e TikTok',
            description: 'Aula 7',
            videoId: 'wMEXGOPBt9k',
            durationMinutes: 15,
            order: 2,
            isRequired: true
          }
        ]
      }
    ],
    finalQuiz: [
      {
        id: 'q-cpm-1',
        question: 'Qual é a proporção ideal para vídeos de Reels, TikTok e WhatsApp Status?',
        options: ['4:3', '16:9', '9:16 (Vertical tela cheia)', '21:9'],
        correctAnswerIndex: 2,
        explanation: 'O formato 9:16 ocupa todo o ecrã vertical do telemóvel, proporcionando a melhor experiência móvel.'
      },
      {
        id: 'q-cpm-2',
        question: 'O que faz a funcionalidade "Ritmo / Batidas" (Beats) no CapCut Móvel?',
        options: [
          'Gera batidas automáticas de bateria',
          'Coloca marcadores na música para ajudar a sincronizar os cortes dos vídeos com a melodia',
          'Traduz a letra da canção',
          'Desliga o áudio do telemóvel'
        ],
        correctAnswerIndex: 1,
        explanation: 'Os marcadores de batida indicam visualmente onde a música ganha força para coincidir com a mudança de cena.'
      },
      {
        id: 'q-cpm-3',
        question: 'Por que é importante manter o texto e elementos visuais afastados das extremidades da tela?',
        options: [
          'Porque os botões de curtir, comentários e legendas das redes sociais podem tapar a informação',
          'Para não gastar tinta da tela',
          'O telemóvel desliga se o texto tocar na borda',
          'Não tem qualquer importância'
        ],
        correctAnswerIndex: 0,
        explanation: 'É a chamada "área de segurança" (Safe Area) para que ícones da rede social não cubram elementos importantes.'
      },
      {
        id: 'q-cpm-4',
        question: 'Se um vídeo gravado no telemóvel ficou muito escuro, qual ajuste básico ajuda a recuperar os detalhes?',
        options: ['Brilho e Sombras (Exposure & Shadows)', 'Saturação para o máximo', 'Inverter as cores', 'Diminuir a nitidez'],
        correctAnswerIndex: 0,
        explanation: 'Ajustar exposição e sombras eleva as partes escuras do quadro sem estourar as áreas já iluminadas.'
      },
      {
        id: 'q-cpm-5',
        question: 'Qual é a resolução mais recomendada para exportar no telemóvel com equilíbrio entre qualidade e tamanho de ficheiro?',
        options: ['480p', '1080p (Full HD)', '8K Ultra HD', '240p'],
        correctAnswerIndex: 1,
        explanation: '1080p é a resolução padrão com nitidez perfeita em qualquer telemóvel moderno sem gerar ficheiros pesados demais.'
      }
    ]
  },
  {
    id: 'course-makeup-beginner',
    slug: 'maquiagem-para-iniciantes',
    title: 'Maquiagem para Iniciantes',
    category: 'Beleza',
    level: 'Iniciante',
    price: 0,
    thumbnail: '/src/assets/images/course_makeup_beginner_1792013690552.jpg',
    durationEstimate: '5 horas de aprendizagem detalhada',
    shortDescription: 'Aprende passo a passo a cuidar da pele, escolher a base certa para o teu tom e fazer maquiagens elegantes para o dia a dia e ocasiões especiais.',
    fullDescription: 'Criado para quem quer aprender a maquilhar-se ou iniciar os primeiros passos profissionais na área de estética e beleza. O curso ensina desde a higienização e hidratação da pele, identificação de subtom para peles africanas e morenas, aplicação sem manchas, contorno sutil, realce dos olhos e técnicas para garantir longa durabilidade no clima quente.',
    objectives: [
      'Identificar o tipo de pele e realizar a preparação e hidratação adequadas',
      'Conhecer e manusear os principais pincéis e esponjas de maquiagem',
      'Descobrir o subtom de pele e acertar na escolha da base e corretivo',
      'Corrigir manchas e olheiras com aspecto natural e sem efeito pesado',
      'Desenhar sobrancelhas harmoniosas e fazer contorno facial suave',
      'Executar uma maquiagem duradoura que resista ao calor e humidade'
    ],
    requirements: [
      'Espelho com boa iluminação natural ou ring light',
      'Produtos básicos que tenhas em casa (hidratante, base, pó, pincel ou esponja)',
      'Nenhum conhecimento prévio de estética é necessário'
    ],
    targetAudience: 'Jovens e mulheres que queiram valorizar a sua autoestima, profissionais que necessitam de boa imagem pessoal e futuras maquilhadoras.',
    isPublished: true,
    featured: true,
    passingScorePercent: 80,
    modules: [
      {
        id: 'mod-mak-1',
        courseId: 'course-makeup-beginner',
        title: 'Módulo 1: Preparação da Pele e Ferramentas',
        order: 1,
        lessons: [
          {
            id: 'les-mak-1',
            moduleId: 'mod-mak-1',
            title: '01. Limpeza, Tonificação e Hidratação Pré-Make',
            description: 'Aula 1',
            videoId: 'QeGiq9nBeLc',
            durationMinutes: 18,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-mak-2',
            moduleId: 'mod-mak-1',
            title: '02. Guia de Pincéis e Esponjas Essenciais',
            description: 'Aula 2',
            videoId: '1TDFimS_Nxc',
            durationMinutes: 15,
            order: 2,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-mak-2',
        courseId: 'course-makeup-beginner',
        title: 'Módulo 2: Uniformização de Pele e Correcção',
        order: 2,
        lessons: [
          {
            id: 'les-mak-3',
            moduleId: 'mod-mak-2',
            title: '03. Como Descobrir o teu Subtom de Pele',
            description: 'Aula 3',
            videoId: 'IOHXy3UFCEQ',
            durationMinutes: 22,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-mak-4',
            moduleId: 'mod-mak-2',
            title: '04. Aplicação Perfeita de Base e Acabamento',
            description: 'Aula 4',
            videoId: '_hjwk0ISJfQ',
            durationMinutes: 20,
            order: 2,
            isRequired: true
          },
          {
            id: 'les-mak-5',
            moduleId: 'mod-mak-2',
            title: '05. Neutralização de Olheiras e Manchas',
            description: 'Aula 5',
            videoId: 'gdrVVwWjZ_U',
            durationMinutes: 19,
            order: 3,
            isRequired: true
          },
          {
            id: 'les-mak-6',
            moduleId: 'mod-mak-2',
            title: '06. Selagem com Pó Compacto e Pó Solto',
            description: 'Aula 6',
            videoId: 'csJLwkEuYS0',
            durationMinutes: 21,
            order: 4,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-mak-3',
        courseId: 'course-makeup-beginner',
        title: 'Módulo 3: Sobrancelhas, Contorno e Blush',
        order: 3,
        lessons: [
          {
            id: 'les-mak-7',
            moduleId: 'mod-mak-3',
            title: '07. Preenchimento Natural de Sobrancelhas',
            description: 'Aula 7',
            videoId: 'Jh-4hsOk9HM',
            durationMinutes: 17,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-mak-8',
            moduleId: 'mod-mak-3',
            title: '08. Contorno Facial e Harmonização de Traços',
            description: 'Aula 8',
            videoId: 'c9lhosGccQc',
            durationMinutes: 24,
            order: 2,
            isRequired: true
          },
          {
            id: 'les-mak-9',
            moduleId: 'mod-mak-3',
            title: '09. Aplicação de Blush e Iluminador com Viço',
            description: 'Aula 9',
            videoId: 'LkLqKagGCdA',
            durationMinutes: 18,
            order: 3,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-mak-4',
        courseId: 'course-makeup-beginner',
        title: 'Módulo 4: Olhos e Lábios',
        order: 4,
        lessons: [
          {
            id: 'les-mak-10',
            moduleId: 'mod-mak-4',
            title: '10. Esfumado Básico Neutro para o Dia a Dia',
            description: 'Aula 10',
            videoId: '-qj2gCKsByU',
            durationMinutes: 22,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-mak-11',
            moduleId: 'mod-mak-4',
            title: '11. Delineado Gatinho Descomplicado',
            description: 'Aula 11',
            videoId: 'EJ62w5IMFQk',
            durationMinutes: 20,
            order: 2,
            isRequired: true
          },
          {
            id: 'les-mak-12',
            moduleId: 'mod-mak-4',
            title: '12. Máscara de Cílios com Volume Máximo',
            description: 'Aula 12',
            videoId: 'iQqD5_abjsI',
            durationMinutes: 14,
            order: 3,
            isRequired: true
          },
          {
            id: 'les-mak-13',
            moduleId: 'mod-mak-4',
            title: '13. Contorno Labial e Aplicação de Batom',
            description: 'Aula 13',
            videoId: 'lB_xxCXpISY',
            durationMinutes: 16,
            order: 4,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-mak-5',
        courseId: 'course-makeup-beginner',
        title: 'Módulo 5: Fixação e Avaliação Final',
        order: 5,
        lessons: [
          {
            id: 'les-mak-14',
            moduleId: 'mod-mak-5',
            title: '14. Fixação de Longa Duração para Clima Quente',
            description: 'Aula 14',
            videoId: 'lM0BUS9PlgQ',
            durationMinutes: 19,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-mak-15',
            moduleId: 'mod-mak-5',
            title: '15. Maquiagem Completa Passo a Passo',
            description: 'Aula 15',
            videoId: 'ML31EmDP3JA',
            durationMinutes: 28,
            order: 2,
            isRequired: true
          }
        ]
      }
    ],
    finalQuiz: [
      {
        id: 'q-mak-1',
        question: 'Qual é o primeiro e mais importante passo antes de aplicar qualquer produto de maquiagem na pele?',
        options: [
          'Aplicar imediatamente o iluminador',
          'Limpar e hidratar a pele de acordo com as suas necessidades',
          'Passar pó compacto na cara seca',
          'Pintar os lábios com batom escuro'
        ],
        correctAnswerIndex: 1,
        explanation: 'Uma pele limpa e hidratada evita que a maquiagem absorva a humidade dos produtos e craquele ao longo do dia.'
      },
      {
        id: 'q-mak-2',
        question: 'Como se deve testar o tom correcto da base para não ficar com a cara de cor diferente do corpo?',
        options: [
          'No dorso da mão',
          'Na linha do maxilar em direcção ao pescoço com luz natural',
          'Na ponta dos dedos',
          'Na testa no escuro'
        ],
        correctAnswerIndex: 1,
        explanation: 'O maxilar é a zona de transição entre o rosto e o pescoço, garantindo que o tom fique harmonioso com o colo e os ombros.'
      },
      {
        id: 'q-mak-3',
        question: 'Para peles oleosas em climas quentes, qual é o produto chave para fixar a base e evitar brilho excessivo?',
        options: [
          'Óleo bronzeador',
          'Pó solto translúcido ou no tom da pele para selagem',
          'Água da torneira',
          'Vaselina líquida'
        ],
        correctAnswerIndex: 1,
        explanation: 'O pó tem a função de selar os produtos líquidos e cremosos, absorvendo o excesso de oleosidade e aumentando a durabilidade.'
      },
      {
        id: 'q-mak-4',
        question: 'Qual é a forma correcta de aplicar a esponja de maquiagem na pele para uma boa cobertura?',
        options: [
          'Arrastar com força de um lado para o outro',
          'Dar batidinhas leves e contínuas sem arrastar o produto',
          'Girar a esponja em círculos rápidos',
          'Esfregar como se fosse uma toalha'
        ],
        correctAnswerIndex: 1,
        explanation: 'As batidinhas leves depositam e fundem a base na pele sem remover os produtos que foram colocados por baixo.'
      },
      {
        id: 'q-mak-5',
        question: 'Qual é a função do contorno facial na maquiagem?',
        options: [
          'Devolver as sombras naturais e criar profundidade ao rosto após a uniformização da base',
          'Pintar todo o rosto de castanho escuro',
          'Substituir a máscara de pestanas',
          'Retirar a oleosidade dos lábios'
        ],
        correctAnswerIndex: 0,
        explanation: 'A base deixa o rosto plano num tom uniforme; o contorno recria as sombras naturais para harmonizar a estrutura facial.'
      }
    ]
  },
  {
    id: 'course-cutilagem',
    slug: 'curso-de-cutilagem',
    title: 'Curso de Cutilagem',
    category: 'Beleza',
    level: 'Iniciante',
    price: 0,
    thumbnail: '/src/assets/images/course_cutilagem_1792096835384.jpg',
    durationEstimate: '5 horas de aulas práticas',
    shortDescription: 'Aprende as técnicas profissionais de cutilagem contínua, funda e segura, manuseio do alicate e protocolos de biossegurança.',
    fullDescription: 'O Curso de Cutilagem ensina as técnicas profissionais mais valorizadas nos salões de beleza e estética. Vais aprender o manuseio correcto do alicate, o afastamento da cutícula com espátula sem ferir a matriz da unha, a remoção em fita contínua sem rebarbas ou picadas, e os produtos emolientes e cicatrizantes adequados para um acabamento impecável e seguro.',
    objectives: [
      'Dominar a empunhadura e o ângulo anatómico do alicate de cutícula',
      'Executar o afastamento seguro da cutícula sem machucar a cliente',
      'Realizar a cutilagem funda perfeita com corte em fita contínua',
      'Fazer acabamento fino, polimento ungueal e hidratação profunda',
      'Aplicar regras de esterilização e biossegurança profissional'
    ],
    requirements: [
      'Alicate de cutícula em aço inox afiado',
      'Espátula de metal / afastador de cutícula',
      'Amolecedor de cutículas e algodão',
      'Nenhum conhecimento prévio é necessário'
    ],
    targetAudience: 'Iniciantes em manicure, nail designers, profissionais de estética e quem quer dominar o acabamento perfeito das cutículas.',
    isPublished: true,
    featured: true,
    passingScorePercent: 80,
    modules: [
      {
        id: 'mod-cut-1',
        courseId: 'course-cutilagem',
        title: 'Módulo 1: Fundamentos da Cutilagem e Biossegurança',
        order: 1,
        lessons: [
          {
            id: 'les-cut-1',
            moduleId: 'mod-cut-1',
            title: '01. Técnicas Fundamentais de Cutilagem e Empunhadura',
            description: 'Aula 1',
            videoId: 'k-3EHllN03k',
            durationMinutes: 45,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-cut-2',
            moduleId: 'mod-cut-1',
            title: '02. Manuseio do Alicate e Afastamento com Espátula',
            description: 'Aula 2',
            videoId: '1TEcvrddT3Y',
            durationMinutes: 40,
            order: 2,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-cut-2',
        courseId: 'course-cutilagem',
        title: 'Módulo 2: Cutilagem Contínua e Acabamento Profissional',
        order: 2,
        lessons: [
          {
            id: 'les-cut-3',
            moduleId: 'mod-cut-2',
            title: '03. Cutilagem Funda Perfeita em Linha Contínua',
            description: 'Aula 3',
            videoId: 'bjQ-Wc6kYj8',
            durationMinutes: 48,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-cut-4',
            moduleId: 'mod-cut-2',
            title: '04. Acabamento Fino, Polimento e Hidratação Ungueal',
            description: 'Aula 4',
            videoId: '4WqGB3LOQRw',
            durationMinutes: 42,
            order: 2,
            isRequired: true
          },
          {
            id: 'les-cut-5',
            moduleId: 'mod-cut-2',
            title: '05. Prática Intensiva, Velocidade de Atendimento e Dicas Clínicas',
            description: 'Aula 5',
            videoId: 'Ng7A6QqBvFg',
            durationMinutes: 50,
            order: 3,
            isRequired: true
          }
        ]
      }
    ],
    finalQuiz: [
      {
        id: 'q-cut-1',
        question: 'Qual é o ângulo recomendado para posicionar o alicate durante a cutilagem contínua?',
        options: [
          'Totalmente inclinado para furar a carne',
          'Com a ponta levemente apoiada e o corpo do alicate inclinado cerca de 45 graus para frente',
          'Deitado completamente de costas sobre a unha',
          'Não tem importância'
        ],
        correctAnswerIndex: 1,
        explanation: 'Manter a lâmina do alicate no ângulo correcto corta apenas a pele morta sem beliscar a pele viva ou a matriz.'
      },
      {
        id: 'q-cut-2',
        question: 'Por que é importante afastar a cutícula com a espátula antes de cortar com o alicate?',
        options: [
          'Para descolar a cutícula da lâmina da unha e visualizar com clareza o excesso a ser retirado',
          'Apenas para gastar tempo',
          'Para amaciar o esmalte antigo',
          'Para arrancar a unha'
        ],
        correctAnswerIndex: 0,
        explanation: 'O afastamento cuidadoso levanta a cutícula, permitindo que o alicate deslize de forma contínua sem cortes cegos.'
      },
      {
        id: 'q-cut-3',
        question: 'Qual é a forma ideal de retirar a cutícula para um acabamento perfeito e duradouro?',
        options: [
          'Em pequenos pedacinhos aleatórios',
          'Em fita única e contínua sem repicar as laterais',
          'Puxando com força com os dedos',
          'Raspar com a lixa grossa'
        ],
        correctAnswerIndex: 1,
        explanation: 'A cutilagem contínua evita o surgimento de pelinhas arrebitadas dias após o procedimento.'
      },
      {
        id: 'q-cut-4',
        question: 'Que procedimento de biossegurança é indispensável após o atendimento de cada cliente?',
        options: [
          'Lavar com água da torneira e guardar no estojo',
          'Esterilização em autoclave ou desinfecção hospitalar com descarte de materiais descartáveis',
          'Passar perfume no alicate',
          'Usar o mesmo alicate sem limpar'
        ],
        correctAnswerIndex: 1,
        explanation: 'Alicates e espátulas de metal devem ser lavados com detergente enzimático, secos e esterilizados para prevenir fungos e infecções.'
      },
      {
        id: 'q-cut-5',
        question: 'O que se deve fazer caso ocorra um pequeno corte acidental no dedo da cliente?',
        options: [
          'Esconder e fingir que nada aconteceu',
          'Aplicar imediatamente pó hemostático ou pedra-ume descartável para estancar o sangue e higienizar com antisséptico',
          'Colocar esmalte preto por cima',
          'Mandar a cliente embora'
        ],
        correctAnswerIndex: 1,
        explanation: 'O pó hemostático estanca o sangramento de forma rápida e segura, devendo ser aplicado com algodão estéril descartável.'
      }
    ]
  },
  {
    id: 'course-manicure-pedicure',
    slug: 'curso-de-manicure-e-pedicure',
    title: 'Curso de Manicure e Pedicure',
    category: 'Beleza',
    level: 'Iniciante',
    price: 0,
    thumbnail: '/src/assets/images/course_manicure_pedicure_1792096835656.jpg',
    durationEstimate: '12 horas de conteúdo completo',
    shortDescription: 'Formação completa em manicure e pedicure: formatos de unhas, cutilagem, SPA dos pés, esmaltação sem manchas e nail art.',
    fullDescription: 'O Curso de Manicure e Pedicure é uma formação profissional completa para quem quer aprender as técnicas dos salões de beleza. Abrange esterilização e higiene da bancada, lixamento nos formatos quadrado e amendoado, cutilagem fina, pedicure completa com esfoliação e hidratação, esmaltação sem manchas em tons claros e escuros, palitação precisa e francesinha clássica.',
    objectives: [
      'Preparar a bancada com materiais esterilizados e biossegurança rigorosa',
      'Dominar formatos de unhas (quadrada, redonda, oval e amendoada)',
      'Executar manicure completa com cutilagem e polimento impecáveis',
      'Realizar pedicure completa com tratamento de calosidades e massagem relaxante',
      'Aplicar esmaltes escuros e claros com acabamento uniforme e sem borrões',
      'Fazer decorações comerciais requisitadas como francesinha e detalhes elegantes'
    ],
    requirements: [
      'Kit básico de manicure: alicate afiado, espátula, lixas e palitos',
      'Bacia de água morna ou botinhas emolientes descartáveis para pedicure',
      'Esmaltes variados, base fortalecedora e removedor de esmalte',
      'Nenhum conhecimento prévio é necessário'
    ],
    targetAudience: 'Futuras manicures, profissionais de estética, empreendedoras da beleza e jovens que desejam gerar renda com serviços ungueais.',
    isPublished: true,
    featured: true,
    passingScorePercent: 80,
    modules: [
      {
        id: 'mod-mp-1',
        courseId: 'course-manicure-pedicure',
        title: 'Módulo 1: Biossegurança, Materiais e Preparação da Bancada',
        order: 1,
        lessons: [
          {
            id: 'les-mp-1',
            moduleId: 'mod-mp-1',
            title: '01. Apresentação do Curso e Lista de Materiais Indispensáveis',
            description: 'Aula 1',
            videoId: 'OshByUcCkqA',
            durationMinutes: 20,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-mp-2',
            moduleId: 'mod-mp-1',
            title: '02. Esterilização de Instrumentos e Normas de Biossegurança',
            description: 'Aula 2',
            videoId: 'X3eUD3izzro',
            durationMinutes: 18,
            order: 2,
            isRequired: true
          },
          {
            id: 'les-mp-3',
            moduleId: 'mod-mp-1',
            title: '03. Anatomia das Unhas e Avaliação das Mãos da Cliente',
            description: 'Aula 3',
            videoId: 'pOufCYK-Kas',
            durationMinutes: 22,
            order: 3,
            isRequired: true
          },
          {
            id: 'les-mp-4',
            moduleId: 'mod-mp-1',
            title: '04. Organização e Ergonomia no Posto de Atendimento',
            description: 'Aula 4',
            videoId: 'lmqGqRktOO0',
            durationMinutes: 16,
            order: 4,
            isRequired: true
          },
          {
            id: 'les-mp-5',
            moduleId: 'mod-mp-1',
            title: '05. Amolecimento e Produtos Profissionais Emolientes',
            description: 'Aula 5',
            videoId: 'iG5wtHt0MRU',
            durationMinutes: 19,
            order: 5,
            isRequired: true
          },
          {
            id: 'les-mp-6',
            moduleId: 'mod-mp-1',
            title: '06. Tipos de Lixas e Gramaturas Recomendadas',
            description: 'Aula 6',
            videoId: 'HDyGcoCPNNI',
            durationMinutes: 17,
            order: 6,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-mp-2',
        courseId: 'course-manicure-pedicure',
        title: 'Módulo 2: Técnicas de Manicure e Formatos de Unhas',
        order: 2,
        lessons: [
          {
            id: 'les-mp-7',
            moduleId: 'mod-mp-2',
            title: '07. Lixamento Quadrado e Quadrado com Cantos Arredondados',
            description: 'Aula 7',
            videoId: 'csRQLjslaHQ',
            durationMinutes: 21,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-mp-8',
            moduleId: 'mod-mp-2',
            title: '08. Lixamento Redondo, Oval e Amendoado',
            description: 'Aula 8',
            videoId: 'ND6z7aJ1LA4',
            durationMinutes: 23,
            order: 2,
            isRequired: true
          },
          {
            id: 'les-mp-9',
            moduleId: 'mod-mp-2',
            title: '09. Afastamento Suave da Cutícula sem Lesões',
            description: 'Aula 9',
            videoId: 'fxUamnNxdz8',
            durationMinutes: 24,
            order: 3,
            isRequired: true
          },
          {
            id: 'les-mp-10',
            moduleId: 'mod-mp-2',
            title: '10. Cutilagem Prática Passo a Passo nas Mãos',
            description: 'Aula 10',
            videoId: 'pd83w4pyD3w',
            durationMinutes: 26,
            order: 4,
            isRequired: true
          },
          {
            id: 'les-mp-11',
            moduleId: 'mod-mp-2',
            title: '11. Como Corrigir Unhas Quebradas e Irregulares',
            description: 'Aula 11',
            videoId: 'Ed8fMbMgWRI',
            durationMinutes: 20,
            order: 5,
            isRequired: true
          },
          {
            id: 'les-mp-12',
            moduleId: 'mod-mp-2',
            title: '12. Polimento da Lâmina Ungueal para Aderência do Esmalte',
            description: 'Aula 12',
            videoId: '3Z-9Jfj1_aU',
            durationMinutes: 18,
            order: 6,
            isRequired: true
          },
          {
            id: 'les-mp-13',
            moduleId: 'mod-mp-2',
            title: '13. Aplicação de Base Tratamento e Fortalecedores',
            description: 'Aula 13',
            videoId: '9tHLoTOSKb8',
            durationMinutes: 19,
            order: 7,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-mp-3',
        courseId: 'course-manicure-pedicure',
        title: 'Módulo 3: Pedicure Completo e Tratamento dos Pés',
        order: 3,
        lessons: [
          {
            id: 'les-mp-14',
            moduleId: 'mod-mp-3',
            title: '14. Preparação do SPA dos Pés e Higienização Inicial',
            description: 'Aula 14',
            videoId: 'X4ZNy8DOfl8',
            durationMinutes: 25,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-mp-15',
            moduleId: 'mod-mp-3',
            title: '15. Corte Correto das Unhas dos Pés para Evitar Unha Encravada',
            description: 'Aula 15',
            videoId: 'wNOgx46RMyc',
            durationMinutes: 24,
            order: 2,
            isRequired: true
          },
          {
            id: 'les-mp-16',
            moduleId: 'mod-mp-3',
            title: '16. Lixamento e Alinhamento das Unhas dos Pés',
            description: 'Aula 16',
            videoId: 'JCGDQuu4jfQ',
            durationMinutes: 21,
            order: 3,
            isRequired: true
          },
          {
            id: 'les-mp-17',
            moduleId: 'mod-mp-3',
            title: '17. Cutilagem dos Pés com Precisão e Segurança',
            description: 'Aula 17',
            videoId: 'ndwuXw0A_lE',
            durationMinutes: 28,
            order: 4,
            isRequired: true
          },
          {
            id: 'les-mp-18',
            moduleId: 'mod-mp-3',
            title: '18. Lixamento Plantar e Remoção de Asperezas sem Agressão',
            description: 'Aula 18',
            videoId: 'y-XNeszSzXU',
            durationMinutes: 26,
            order: 5,
            isRequired: true
          },
          {
            id: 'les-mp-19',
            moduleId: 'mod-mp-3',
            title: '19. Esfoliação e Hidratação com Massagem Relaxante',
            description: 'Aula 19',
            videoId: 'ZtMhgTxTiGk',
            durationMinutes: 23,
            order: 6,
            isRequired: true
          },
          {
            id: 'les-mp-20',
            moduleId: 'mod-mp-3',
            title: '20. Finalização e Assepsia Completa dos Pés',
            description: 'Aula 20',
            videoId: 'HL9QPPI24Sc',
            durationMinutes: 20,
            order: 7,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-mp-4',
        courseId: 'course-manicure-pedicure',
        title: 'Módulo 4: Esmaltação Perfeita, Palitação e Limpeza',
        order: 4,
        lessons: [
          {
            id: 'les-mp-21',
            moduleId: 'mod-mp-4',
            title: '21. Técnicas de Esmaltação com Cores Claras sem Manchar',
            description: 'Aula 21',
            videoId: 'JbC5tsqhbAU',
            durationMinutes: 24,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-mp-22',
            moduleId: 'mod-mp-4',
            title: '22. Esmaltação Impecável com Tons Escuros e Vermelhos',
            description: 'Aula 22',
            videoId: '2I4O2zABUro',
            durationMinutes: 27,
            order: 2,
            isRequired: true
          },
          {
            id: 'les-mp-23',
            moduleId: 'mod-mp-4',
            title: '23. Como Usar o Palito para Contorno Preciso da Cutícula',
            description: 'Aula 23',
            videoId: '96waB36GiUc',
            durationMinutes: 22,
            order: 3,
            isRequired: true
          },
          {
            id: 'les-mp-24',
            moduleId: 'mod-mp-4',
            title: '24. Limpeza Rápida de Excessos com Algodão e Removedor',
            description: 'Aula 24',
            videoId: '3B4HvqCeDFc',
            durationMinutes: 20,
            order: 4,
            isRequired: true
          },
          {
            id: 'les-mp-25',
            moduleId: 'mod-mp-4',
            title: '25. Aplicação de Top Coat e Brilho Espelhado Duradouro',
            description: 'Aula 25',
            videoId: 'E3JBd-bDbI8',
            durationMinutes: 19,
            order: 5,
            isRequired: true
          },
          {
            id: 'les-mp-26',
            moduleId: 'mod-mp-4',
            title: '26. Secagem Rápida e Prevenção de Bolhas no Esmalte',
            description: 'Aula 26',
            videoId: 'vV1afS12hxM',
            durationMinutes: 18,
            order: 6,
            isRequired: true
          },
          {
            id: 'les-mp-27',
            moduleId: 'mod-mp-4',
            title: '27. Cuidados Pós-Esmaltação e Orientação à Cliente',
            description: 'Aula 27',
            videoId: 'd31IlRFSbfw',
            durationMinutes: 17,
            order: 7,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-mp-5',
        courseId: 'course-manicure-pedicure',
        title: 'Módulo 5: Francesinha, Decorações Comerciais e Atendimento',
        order: 5,
        lessons: [
          {
            id: 'les-mp-28',
            moduleId: 'mod-mp-5',
            title: '28. Francesinha Tradicional com Traço Fino e Uniforme',
            description: 'Aula 28',
            videoId: 'GI-xgy7oqXU',
            durationMinutes: 25,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-mp-29',
            moduleId: 'mod-mp-5',
            title: '29. Francesinha Sorriso e Variações Modernas',
            description: 'Aula 29',
            videoId: 'ZL8Rwryx0GM',
            durationMinutes: 22,
            order: 2,
            isRequired: true
          },
          {
            id: 'les-mp-30',
            moduleId: 'mod-mp-5',
            title: '30. Aplicação de Películas, Adesivos e Joias de Unhas',
            description: 'Aula 30',
            videoId: 'N-yYrV5zocQ',
            durationMinutes: 24,
            order: 3,
            isRequired: true
          },
          {
            id: 'les-mp-31',
            moduleId: 'mod-mp-5',
            title: '31. Técnica de Degradê / Ombré com Esponja',
            description: 'Aula 31',
            videoId: 'Hy6QEqvGKMk',
            durationMinutes: 23,
            order: 4,
            isRequired: true
          },
          {
            id: 'les-mp-32',
            moduleId: 'mod-mp-5',
            title: '32. Como Fazer Desenhos Florais Simples e Rápidos',
            description: 'Aula 32',
            videoId: '35vbHn5wup8',
            durationMinutes: 21,
            order: 5,
            isRequired: true
          },
          {
            id: 'les-mp-33',
            moduleId: 'mod-mp-5',
            title: '33. Remoção Segura de Esmalte e Cuidados com Alergias',
            description: 'Aula 33',
            videoId: '2icBIko-e_E',
            durationMinutes: 19,
            order: 6,
            isRequired: true
          },
          {
            id: 'les-mp-34',
            moduleId: 'mod-mp-5',
            title: '34. Precificação de Serviços e Tabela de Preços',
            description: 'Aula 34',
            videoId: '1BV5xCyVw7I',
            durationMinutes: 26,
            order: 7,
            isRequired: true
          },
          {
            id: 'les-mp-35',
            moduleId: 'mod-mp-5',
            title: '35. Atendimento de Excelência e Fidelização de Clientes',
            description: 'Aula 35',
            videoId: 'NxAlJwAQBHU',
            durationMinutes: 28,
            order: 8,
            isRequired: true
          }
        ]
      }
    ],
    finalQuiz: [
      {
        id: 'q-mp-1',
        question: 'Qual é o corte ideal para as unhas dos pés a fim de evitar encravamento e inflamação?',
        options: [
          'Cortar bem fundo arredondando todos os cantos',
          'Cortar reto (quadrado) sem escavar as laterais dos dedos',
          'Arrancar com a pinça',
          'Cortar em formato triangular'
        ],
        correctAnswerIndex: 1,
        explanation: 'As unhas dos pés devem ser cortadas em linha reta; arredondar as laterais faz a unha crescer contra a carne e encravar.'
      },
      {
        id: 'q-mp-2',
        question: 'Qual é o segredo para esmaltes brancos ou claros não ficarem manchados nas unhas?',
        options: [
          'Passar uma camada única muito grossa de uma vez só',
          'Aplicar uma base cintilante/perolada antes e passar duas camadas finas e bem espalhadas',
          'Misturar água no esmalte',
          'Não usar base'
        ],
        correctAnswerIndex: 1,
        explanation: 'A base cintilante ou perolada uniformiza a superfície da unha e impede que o esmalte claro se aglomere em manchas.'
      },
      {
        id: 'q-mp-3',
        question: 'Para que serve a palitação durante a esmaltação?',
        options: [
          'Para furar a pele',
          'Para limpar o excesso de esmalte da canaleta da cutícula enquanto ainda está úmido',
          'Para secar mais rápido',
          'Para misturar as cores'
        ],
        correctAnswerIndex: 1,
        explanation: 'A palitação enquanto o esmalte está fresco delimita a separação entre a unha e a pele, facilitando a limpeza final.'
      },
      {
        id: 'q-mp-4',
        question: 'Por que não se deve usar navalhas cortantes para lixar calosidades nos pés em salão de beleza?',
        options: [
          'Porque a lâmina pode cortar tecidos profundos e provocar hemorragias e infecções graves',
          'Porque a navalha enferruja rápido',
          'Porque a cliente sente cócegas',
          'Porque é mais caro'
        ],
        correctAnswerIndex: 0,
        explanation: 'O uso de lâminas cortantes na pele viva é perigoso e proibido pelas normas sanitárias; usa-se esfoliação e lixas adequadas.'
      },
      {
        id: 'q-mp-5',
        question: 'Qual é a melhor forma de fidelizar clientes num atendimento de manicure e pedicure?',
        options: [
          'Atrasar 30 minutos em cada atendimento',
          'Higiene impecável, pontualidade, atendimento atencioso e acabamento de alta qualidade',
          'Cobrar o dobro sem avisar',
          'Não usar materiais limpos'
        ],
        correctAnswerIndex: 1,
        explanation: 'Biossegurança visível, pontualidade, simpatia e qualidade no acabamento são os maiores pilares de fidelização de clientes.'
      }
    ]
  },
  {
    id: 'course-marketing-digital',
    slug: 'marketing-digital',
    title: 'Curso de Marketing Digital',
    category: 'Tecnologia e produtividade',
    level: 'Iniciante',
    price: 0,
    thumbnail: '/src/assets/images/course_marketing_digital_1792264350994.jpg',
    durationEstimate: '3 horas de aulas práticas',
    shortDescription: 'Aprende os processos essenciais do marketing digital, estratégias de conteúdo, canais de mídia, performance e métricas para alavancar marcas e vendas.',
    fullDescription: 'O Curso de Marketing Digital foi concebido de forma prática e objectiva para quem quer aprender a posicionar marcas, criar conteúdos estratégicos, entender canais de mídia e vender na internet. Ao longo de 13 aulas organizadas, vais aprender desde a introdução ao marketing digital, processos essenciais e vantagens do ambiente online, até planeamento de conteúdo, marketing de performance, análise de relatórios e por onde começar no mercado profissional.',
    objectives: [
      'Compreender o ecossistema e os conceitos fundamentais do marketing digital',
      'Dominar os processos essenciais de captação, engajamento e conversão',
      'Elaborar um planeamento estratégico focado em marketing de conteúdo',
      'Entender os formatos de mídia e as estratégias de marketing de performance',
      'Analisar relatórios de resultados, métricas de tráfego e retorno',
      'Identificar as principais profissões e os primeiros passos práticos no mercado'
    ],
    requirements: [
      'Acesso a um computador ou smartphone com ligação à internet',
      'Interesse em redes sociais, comunicação e estratégias de crescimento digital',
      'Nenhum conhecimento técnico prévio obrigatório'
    ],
    targetAudience: 'Empreendedores, estudantes, criadores de conteúdo, profissionais liberais e jovens que queiram conquistar novas oportunidades no mercado de marketing digital em Moçambique.',
    isPublished: true,
    featured: true,
    passingScorePercent: 80,
    modules: [
      {
        id: 'mod-mkt-1',
        courseId: 'course-marketing-digital',
        title: 'Módulo 1: Fundamentos e Processos do Marketing Digital',
        order: 1,
        lessons: [
          {
            id: 'les-mkt-1',
            moduleId: 'mod-mkt-1',
            title: '01. O que é Marketing Digital?',
            description: 'Aula 1',
            videoId: 'emtfheMpOkU',
            durationMinutes: 14,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-mkt-2',
            moduleId: 'mod-mkt-1',
            title: '02. História e Evolução',
            description: 'Aula 2',
            videoId: 'DFUAdPd4T5Y',
            durationMinutes: 12,
            order: 2,
            isRequired: true
          },
          {
            id: 'les-mkt-3',
            moduleId: 'mod-mkt-1',
            title: '03. Processos Essenciais do Marketing Digital',
            description: 'Aula 3',
            videoId: 'iS6zXtQMdVo',
            durationMinutes: 15,
            order: 3,
            isRequired: true
          },
          {
            id: 'les-mkt-4',
            moduleId: 'mod-mkt-1',
            title: '04. Vantagens do Digital',
            description: 'Aula 4',
            videoId: 'LWdNYIJ8xuk',
            durationMinutes: 11,
            order: 4,
            isRequired: true
          },
          {
            id: 'les-mkt-5',
            moduleId: 'mod-mkt-1',
            title: '05. Conceitos de Marketeiro e Fundamentos',
            description: 'Aula 5',
            videoId: 'nqER-CUXSRk',
            durationMinutes: 13,
            order: 5,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-mkt-2',
        courseId: 'course-marketing-digital',
        title: 'Módulo 2: Conteúdo, Performance e Canais de Mídia',
        order: 2,
        lessons: [
          {
            id: 'les-mkt-6',
            moduleId: 'mod-mkt-2',
            title: '06. Marketing de Conteúdo e Planejamento Estratégico',
            description: 'Aula 6',
            videoId: 'dmMzkbxXI2M',
            durationMinutes: 18,
            order: 6,
            isRequired: true
          },
          {
            id: 'les-mkt-7',
            moduleId: 'mod-mkt-2',
            title: '07. Marketing de Performance',
            description: 'Aula 7',
            videoId: 'YixNTerNKIQ',
            durationMinutes: 16,
            order: 7,
            isRequired: true
          },
          {
            id: 'les-mkt-8',
            moduleId: 'mod-mkt-2',
            title: '08. Estratégias Fundamentais',
            description: 'Aula 8',
            videoId: 'eD6jwyoofD0',
            durationMinutes: 15,
            order: 8,
            isRequired: true
          },
          {
            id: 'les-mkt-9',
            moduleId: 'mod-mkt-2',
            title: '09. Formatos e Canais de Mídia',
            description: 'Aula 9',
            videoId: 'sd-6PgCfWvA',
            durationMinutes: 14,
            order: 9,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-mkt-3',
        courseId: 'course-marketing-digital',
        title: 'Módulo 3: Métricas, Profissões e Primeiros Passos',
        order: 3,
        lessons: [
          {
            id: 'les-mkt-10',
            moduleId: 'mod-mkt-3',
            title: '10. Análise e Relatórios',
            description: 'Aula 10',
            videoId: 'GcHhRHKgwg8',
            durationMinutes: 16,
            order: 10,
            isRequired: true
          },
          {
            id: 'les-mkt-11',
            moduleId: 'mod-mkt-3',
            title: '11. Profissões Relacionadas',
            description: 'Aula 11',
            videoId: 'j4v-Ltk-Gy8',
            durationMinutes: 14,
            order: 11,
            isRequired: true
          },
          {
            id: 'les-mkt-12',
            moduleId: 'mod-mkt-3',
            title: '12. Por onde Começar?',
            description: 'Aula 12',
            videoId: 'rDxmzERZhes',
            durationMinutes: 17,
            order: 12,
            isRequired: true
          },
          {
            id: 'les-mkt-13',
            moduleId: 'mod-mkt-3',
            title: '13. Introdução e Visão Geral Prática',
            description: 'Aula 13',
            videoId: 'Us7U6StjyAo',
            durationMinutes: 10,
            order: 13,
            isRequired: true
          }
        ]
      }
    ],
    finalQuiz: [
      {
        id: 'q-mkt-1',
        question: 'Qual é a principal função do marketing de conteúdo numa estratégia digital?',
        options: [
          'Apenas postar promoções de produtos sem valor educativo',
          'Atrair, educar e construir relacionamento de confiança com o público-alvo',
          'Enviar e-mails em massa sem permissão',
          'Comprar seguidores nas redes sociais'
        ],
        correctAnswerIndex: 1,
        explanation: 'O marketing de conteúdo foca em entregar valor real para solucionar problemas e educar a audiência, gerando autoridade e conversões sustentáveis.'
      },
      {
        id: 'q-mkt-2',
        question: 'O que diferencia o Marketing de Performance de outras estratégias?',
        options: [
          'Foco em resultados mensuráveis, cliques, conversões e retorno sobre o investimento (ROI)',
          'Não necessita de planeamento nem medição de métricas',
          'É exclusivo para canais impressos como revistas e panfletos',
          'Garante vendas sem necessidade de produto de qualidade'
        ],
        correctAnswerIndex: 0,
        explanation: 'No marketing de performance, as ações são orientadas por dados concretos, otimização contínua e foco claro em métricas de conversão e ROI.'
      },
      {
        id: 'q-mkt-3',
        question: 'Por que a análise de relatórios e métricas é indispensável no marketing digital?',
        options: [
          'Para saber quais canais e conteúdos trazem resultados e onde otimizar os recursos',
          'Apenas para acumular gráficos sem tomar decisões',
          'Não tem utilidade depois da publicação',
          'Substitui a necessidade de criar bons produtos'
        ],
        correctAnswerIndex: 0,
        explanation: 'A tomada de decisão orientada por dados permite ajustar campanhas, reduzir desperdício de tempo e aumentar os resultados práticos.'
      },
      {
        id: 'q-mkt-4',
        question: 'Qual é a grande vantagem do digital em comparação com o marketing tradicional?',
        options: [
          'Segmentação precisa do público, mensuração em tempo real e maior acessibilidade de custos',
          'Falta de interação com os clientes',
          'Impossibilidade de saber quantas pessoas viram o anúncio',
          'Exclusividade apenas para grandes multinacionais'
        ],
        correctAnswerIndex: 0,
        explanation: 'O meio digital permite alcançar exatamente o público interessado e medir cada clique, visualização e compra com precisão instantânea.'
      },
      {
        id: 'q-mkt-5',
        question: 'Para quem está a começar no marketing digital hoje, qual é o primeiro passo mais recomendado?',
        options: [
          'Entender o público-alvo, dominar uma plataforma/canal principal e produzir conteúdo prático e consistente',
          'Investir todo o orçamento em anúncios sem ter público definido',
          'Copiar concorrentes sem adaptar à realidade local',
          'Aguardar anos até ter uma agência inteira contratada'
        ],
        correctAnswerIndex: 0,
        explanation: 'Começar com clareza sobre quem queres ajudar, focar num canal estratégico e manter consistência na entrega de valor é o caminho mais seguro e eficaz.'
      }
    ]
  },
  {
    id: 'course-english-beginner',
    slug: 'ingles-pratico-do-zero',
    title: 'Inglês Prático do Zero',
    category: 'Idiomas',
    level: 'Iniciante',
    price: 0,
    thumbnail: '/src/assets/images/course_english_learning_1792265740746.jpg',
    durationEstimate: '5 horas de conteúdo prático',
    shortDescription: 'Aprende inglês do zero com pronúncia correta, vocabulário essencial, diálogos do quotidiano e estruturas práticas.',
    fullDescription: 'O curso Inglês Prático do Zero foi concebido para destravar o idioma mais falado no mundo global, nos negócios e na tecnologia de forma simples e descomplicada. Vais aprender desde o alfabeto, sons fundamentais e saudações, até como se apresentar com naturalidade, fazer perguntas essenciais (Who, What, Where, When, How), falar sobre a tua rotina de trabalho e comunicar em situações do dia a dia. Cada aula inclui explicações práticas e um Mini-Quiz com IA para consolidar o teu domínio.',
    objectives: [
      'Dominar a pronúncia correta dos sons essenciais do inglês e o alfabeto',
      'Apresentar-se com segurança, dizer a profissão, país de origem e idade',
      'Construir frases no presente com os pronomes e o verbo To Be',
      'Utilizar vocabulário chave do dia a dia, trabalho, tecnologia e atendimento',
      'Formular perguntas comuns usando Who, What, Where, When e How',
      'Desenvolver audição ativa e confiança para conversações simples'
    ],
    requirements: [
      'Nenhum conhecimento prévio de inglês',
      'Caderno ou bloco de notas para anotar novas expressões',
      'Disposição para falar em voz alta e repetir a pronúncia das aulas'
    ],
    targetAudience: 'Estudantes, profissionais, assistentes, empreendedores e qualquer pessoa que queira abrir portas no mercado de trabalho nacional e internacional aprendendo inglês.',
    isPublished: true,
    featured: true,
    passingScorePercent: 80,
    modules: [
      {
        id: 'mod-eng-1',
        courseId: 'course-english-beginner',
        title: 'Módulo 1: Fundamentos, Sons e Primeiras Palavras',
        order: 1,
        lessons: [
          {
            id: 'les-eng-1',
            moduleId: 'mod-eng-1',
            title: '01. Comece a Falar Inglês do Zero: Alfabeto e Saudações',
            description: 'Aprende as saudações mais usadas no dia a dia (Hello, Good Morning, Hi), o alfabeto e como pronunciar os primeiros sons com clareza.',
            videoId: 'biaEAXoa0-M',
            durationMinutes: 25,
            order: 1,
            isRequired: true,
            resources: [
              { title: 'Tabela de Fonética e Saudações em Inglês (PDF)', url: '#', type: 'guide' }
            ]
          },
          {
            id: 'les-eng-2',
            moduleId: 'mod-eng-1',
            title: '02. Apresentação Pessoal e Verbo To Be na Prática',
            description: 'Aprende a dizer o teu nome, idade, país de origem, profissão e o uso prático e descomplicado do Verb To Be (I am, You are, He is, She is).',
            videoId: 'yaxRsYu1yUA',
            durationMinutes: 22,
            order: 2,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-eng-2',
        courseId: 'course-english-beginner',
        title: 'Módulo 2: Vocabulário Essencial e Estruturas do Quotidiano',
        order: 2,
        lessons: [
          {
            id: 'les-eng-3',
            moduleId: 'mod-eng-2',
            title: '03. Números, Horas, Dias da Semana e Rotina Diária',
            description: 'Como contar, marcar compromissos, falar as horas e descrever as atividades da tua rotina diária em inglês com naturalidade.',
            videoId: 'DIuC1GJnElo',
            durationMinutes: 24,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-eng-4',
            moduleId: 'mod-eng-2',
            title: '04. Como Fazer Perguntas em Inglês (Who, What, Where, When, Why, How)',
            description: 'Domina as Question Words essenciais para pedir informações, pedir orientações e manter uma conversa fluida em qualquer ambiente.',
            videoId: 'FJ0zBvKObG0',
            durationMinutes: 26,
            order: 2,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-eng-3',
        courseId: 'course-english-beginner',
        title: 'Módulo 3: Conversação e Situações Práticas',
        order: 3,
        lessons: [
          {
            id: 'les-eng-5',
            moduleId: 'mod-eng-3',
            title: '05. Inglês para o Trabalho, Viagens e Atendimento ao Público',
            description: 'Expressões indispensáveis para reuniões, trocas de mensagens, e-mails, compras e aeroportos com dicas de pronúncia natural.',
            videoId: 'uryccAhT-Zg',
            durationMinutes: 28,
            order: 1,
            isRequired: true
          }
        ]
      }
    ],
    finalQuiz: [
      {
        id: 'q-eng-1',
        question: 'Qual é a forma correta do verbo To Be para a frase "She _____ a great teacher"?',
        options: ['are', 'is', 'am', 'be'],
        correctAnswerIndex: 1,
        explanation: 'Para a terceira pessoa do singular (He, She, It), a conjugação correta do verbo To Be no presente é "is".'
      },
      {
        id: 'q-eng-2',
        question: 'Qual Question Word é utilizada quando queremos perguntar sobre a localização ou o lugar de algo?',
        options: ['When', 'Where', 'Who', 'Why'],
        correctAnswerIndex: 1,
        explanation: '"Where" significa "Onde" e refere-se especificamente a lugares e localizações.'
      },
      {
        id: 'q-eng-3',
        question: 'Como se responde de forma natural e cortês à saudação "How are you doing today?"',
        options: ['I am doing great, thank you!', 'I am 25 years old', 'Yes, I do', 'Good night'],
        correctAnswerIndex: 0,
        explanation: '"I am doing great, thank you!" é uma resposta educada e comum no dia a dia em língua inglesa.'
      },
      {
        id: 'q-eng-4',
        question: 'Qual é o plural correto do pronome "You" em inglês quando falamos com um grupo de pessoas?',
        options: ['Yous', 'You', 'Yours', 'You alls'],
        correctAnswerIndex: 1,
        explanation: 'Na gramática inglesa padrão, "You" serve tanto para o singular (você/tu) quanto para o plural (vocês).'
      },
      {
        id: 'q-eng-5',
        question: 'Qual frase no Simple Present expressa corretamente uma rotina de trabalho?',
        options: ['I works in an office', 'I work in an office', 'I working in an office', 'I am work in an office'],
        correctAnswerIndex: 1,
        explanation: 'Com o pronome "I", o verbo no presente simples permanece na forma básica sem o sufixo "s": "I work in an office".'
      }
    ]
  },
  {
    id: 'course-spanish-beginner',
    slug: 'espanhol-pratico-iniciantes',
    title: 'Espanhol Prático para Iniciantes',
    category: 'Idiomas',
    level: 'Iniciante',
    price: 0,
    thumbnail: '/src/assets/images/course_spanish_learning_1792265753095.jpg',
    durationEstimate: '5 horas de conteúdo prático',
    shortDescription: 'Aprende espanhol desde o primeiro dia com pronúncia autêntica, saudações, falsos amigos e conversação prática.',
    fullDescription: 'O curso Espanhol Prático para Iniciantes foi desenhado especialmente para falantes de português que desejam falar espanhol com segurança sem cair nas armadilhas do "portunhol". Vais aprender as nuances de pronúncia (sons do LL, Ñ, J, Z, RR), os cumprimentos formais e informais, a diferença crucial entre os verbos Ser e Estar, como evitar os falsos amigos (falsos cognatos) e construir frases corretas para viagens, negócios e amizades.',
    objectives: [
      'Identificar e pronunciar corretamente os sons exclusivos do espanhol (LL, Y, Ñ, RR, J)',
      'Apresentar-se e cumprimentar pessoas formalmente e informalmente',
      'Compreender a diferença prática e o uso correto dos verbos Ser e Estar',
      'Evitar os erros mais comuns de "portunhol" e reconhecer falsos cognatos',
      'Pedir informações em hotéis, restaurantes, táxis e aeroportos',
      'Construir um vocabulário sólido para conversações diárias'
    ],
    requirements: [
      'Nenhum conhecimento prévio de espanhol',
      'Vontade de praticar a pronúncia em voz alta',
      'Caderno de vocabulário para anotar expressões'
    ],
    targetAudience: 'Estudantes, profissionais em comércio exterior, turismo e hospitalidade, e quem deseja viajar ou comunicar-se em espanhol com segurança.',
    isPublished: true,
    featured: true,
    passingScorePercent: 80,
    modules: [
      {
        id: 'mod-esp-1',
        courseId: 'course-spanish-beginner',
        title: 'Módulo 1: Primeiros Passos e Sons Autênticos',
        order: 1,
        lessons: [
          {
            id: 'les-esp-1',
            moduleId: 'mod-esp-1',
            title: '01. Saludos y Despedidas: Saudações e Cumprimentos',
            description: 'Aprende como cumprimentar alguém de manhã, tarde e noite em espanhol (¡Hola!, Buenos días, Buenas tardes), despedidas e fórmulas de cortesia.',
            videoId: '-hwmabZ-aFc',
            durationMinutes: 20,
            order: 1,
            isRequired: true,
            resources: [
              { title: 'Guia de Saludos y Cortesía en Español (PDF)', url: '#', type: 'guide' }
            ]
          },
          {
            id: 'les-esp-2',
            moduleId: 'mod-esp-1',
            title: '02. El Alfabeto y la Pronunciación Correcta (LL, Ñ, RR, J)',
            description: 'Descobre os segredos fonéticos do espanhol: como pronunciar o J com som de R forte, o Ñ, o duplo L e o R vibrante sem cometer gafes.',
            videoId: 'FLL07JrVlGQ',
            durationMinutes: 22,
            order: 2,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-esp-2',
        courseId: 'course-spanish-beginner',
        title: 'Módulo 2: Gramática Prática e Construção de Frases',
        order: 2,
        lessons: [
          {
            id: 'les-esp-3',
            moduleId: 'mod-esp-2',
            title: '03. Los Verbos Ser y Estar: Diferenças e Aplicação',
            description: 'Domina a distinção essencial entre o que é permanente ou essência (Ser) e o que é temporário, estado emocional ou localização (Estar).',
            videoId: '7lOQn9AG8DM',
            durationMinutes: 24,
            order: 1,
            isRequired: true
          },
          {
            id: 'les-esp-4',
            moduleId: 'mod-esp-2',
            title: '04. Artículos, Género y Plurales en Español',
            description: 'Entende o uso de El, La, Los, Las, o famoso artigo neutro "Lo" e as palavras que mudam de gênero do português para o espanhol.',
            videoId: '6qfJnC92FKA',
            durationMinutes: 23,
            order: 2,
            isRequired: true
          }
        ]
      },
      {
        id: 'mod-esp-3',
        courseId: 'course-spanish-beginner',
        title: 'Módulo 3: Conversação e Vida Real',
        order: 3,
        lessons: [
          {
            id: 'les-esp-5',
            moduleId: 'mod-esp-3',
            title: '05. Falsos Amigos (Heterosemánticos) e Diálogos de Viagem',
            description: 'Conhece as palavras que parecem português mas têm significado completamente diferente (embarazada, exquisito, propina) e frases úteis para viagens.',
            videoId: 'BIao_Q8oMf4',
            durationMinutes: 27,
            order: 1,
            isRequired: true
          }
        ]
      }
    ],
    finalQuiz: [
      {
        id: 'q-esp-1',
        question: 'Quando devemos usar o verbo "SER" em espanhol?',
        options: [
          'Para indicar nacionalidade, identidade e profissão permanente',
          'Apenas para dizer a localização de um objeto no momento',
          'Para falar de um estado passageiro de cansaço',
          'Nunca se usa o verbo ser em espanhol'
        ],
        correctAnswerIndex: 0,
        explanation: 'O verbo "SER" define características essenciais, permanentes ou inerentes: "Soy moçambicano, soy estudiante".'
      },
      {
        id: 'q-esp-2',
        question: 'O que significa a palavra "embarazada" em espanhol?',
        options: ['Envergonhada', 'Grávida', 'Preocupada', 'Assustada'],
        correctAnswerIndex: 1,
        explanation: '"Embarazada" é um falso amigo clássico: significa grávida. Envergonhada diz-se "avergonzada".'
      },
      {
        id: 'q-esp-3',
        question: 'Como soa a letra "J" (jota) na pronúncia correta em espanhol?',
        options: [
          'Como o "J" suave da língua portuguesa',
          'Como um som aspirado forte semelhante ao "R" da garganta',
          'Com o som de "Z"',
          'É uma letra sempre silenciosa'
        ],
        correctAnswerIndex: 1,
        explanation: 'A letra "J" (como em "jamón" ou "jardín") tem som gutural aspirado, similar ao R forte em português.'
      },
      {
        id: 'q-esp-4',
        question: 'Quando alguém elogia uma refeição dizendo que está "exquisita", o que significa?',
        options: ['Que a comida tem gosto estranho', 'Que a comida está deliciosa e excelente', 'Que está muito fria', 'Que está sem tempero'],
        correctAnswerIndex: 1,
        explanation: 'Em espanhol, "exquisito/a" significa requintado, saboroso e delicioso!'
      },
      {
        id: 'q-esp-5',
        question: 'Qual é o artigo definido singular correto para a palavra masculina "cuaderno"?',
        options: ['Lo', 'Le', 'El', 'Un'],
        correctAnswerIndex: 2,
        explanation: 'Em espanhol, "El" é o artigo definido masculino singular correspondente a "O" em português ("El cuaderno").'
      }
    ]
  }
];

export const INITIAL_USERS: any[] = [];

