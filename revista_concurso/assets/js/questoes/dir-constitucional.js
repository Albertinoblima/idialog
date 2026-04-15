// ─── QUESTÕES — DIREITO CONSTITUCIONAL ──────────────────────────────────────
window.QR = window.QR || {};
window.QR['dir-constitucional'] = {
    id: 'dir-constitucional',
    area: 'Direito',
    areaId: 'direito',
    label: 'Direito Constitucional',
    short: 'D. Const.',
    color: '#1A5CA8',
    icon: '⚖️',
    simuladoPath: 'materias/nucleo-comum/direito-constitucional/simulado.html',
    topics: {
        'DC_HD': 'Habeas Data', 'DC_JR': 'Tribunal do Júri',
        'DC_AP': 'Adm. Pública / CF', 'DC_PJ': 'Poder Judiciário',
        'DC_DP': 'Direitos Políticos', 'DC_NA': 'Nacionalidade',
        'DC_DS': 'Direitos Sociais', 'DC_SP': 'Segurança Pública',
        'DC_DE': 'Defesa do Estado', 'DC_OS': 'Ordem Social'
    },
    topicColors: {
        'DC_HD': { bg: '#E6F1FB', c: '#0C447C' }, 'DC_JR': { bg: '#FCEAEA', c: '#7A1515' },
        'DC_AP': { bg: '#E3F5EF', c: '#085041' }, 'DC_PJ': { bg: '#EDE8F8', c: '#3A246A' },
        'DC_DP': { bg: '#FFF3DC', c: '#6A4800' }, 'DC_NA': { bg: '#F1EFE8', c: '#2C2C2A' },
        'DC_DS': { bg: '#EAF3DE', c: '#173404' }, 'DC_SP': { bg: '#E6F1FB', c: '#042C53' },
        'DC_DE': { bg: '#EDE8F8', c: '#26215C' }, 'DC_OS': { bg: '#FCEAEA', c: '#7A1515' }
    },
    questions: [
        {
            id: 'DC_HD01', topic: 'DC_HD', dif: 'l',
            text: 'Sobre o Habeas Data, garantia constitucional prevista no art. 5.º, LXXII, da CF/88, assinale a alternativa CORRETA:',
            opts: ['Destina-se à retificação de dados, quando não se prefira fazê-lo por processo sigiloso.', 'Pode ser impetrado para assegurar o conhecimento de informações relativas à pessoa do impetrante ou de terceiros.', 'É a via adequada para obter certidões em repartições públicas para defesa de direitos.', 'É gratuito, mas exige o pagamento de custas judiciais se houver má-fé comprovada.'],
            ans: 0,
            exp: 'O Habeas Data (Art. 5º, LXXII, CF) serve para conhecimento de informações relativas à pessoa do impetrante (personalíssimo) e retificação de dados.',
            erros: ['CORRETA.', 'ERRADA: o HD é personalíssimo e não pode ser impetrado para informações de terceiros.', 'ERRADA: certidões são obtidas por via administrativa ou mandado de segurança, não HD.', 'ERRADA: o HD é gratuito na forma da lei (Art. 5º, LXXVII), sem custas mesmo em caso de má-fé.'],
            tip: 'MACETE: HD = Informação Pessoal + Retificação. Não serve para terceiros!', tiptype: 'cm-gold'
        },
        {
            id: 'DC_HD02', topic: 'DC_HD', dif: 'm',
            text: '(Reforço) Considerando a disciplina constitucional e jurisprudencial do Habeas Data, assinale a alternativa CORRETA:',
            opts: ['Independe de prévia negativa administrativa para ser ajuizado.', 'É gratuito na forma da lei, assim como o Habeas Corpus.', 'Serve para a anulação de ato administrativo ilegal que fira direito líquido e certo.', 'Pode ser utilizado para conhecer dados de um parente falecido, segundo jurisprudência do STF.'],
            ans: 1,
            exp: 'O Art. 5º, LXXVII garante a gratuidade do HC e do HD. Importante: o STJ exige a prova da negativa administrativa prévia (Súmula 2).',
            erros: ['ERRADA: o STJ exige negativa administrativa prévia (Súmula 2).', 'CORRETA.', 'ERRADA: anulação de ato ilegal é mandado de segurança.', 'ERRADA: o HD é personalíssimo; dados de falecido não são cabíveis (jurisprudência STF).'],
            tip: 'MACETE: HC e HD são "H" de "H de graça".', tiptype: 'cm-red'
        },
        {
            id: 'DC_JR01', topic: 'DC_JR', dif: 'l',
            text: 'Acerca das disposições constitucionais sobre o Tribunal do Júri (art. 5.º, XXXVIII, CF/88), assinale a alternativa CORRETA:',
            opts: ['É competente para o julgamento de crimes dolosos e culposos contra a vida.', 'Garante a soberania dos veredictos e o sigilo das votações.', 'É composto por um juiz togado e doze jurados leigos.', 'Admite recurso que modifique o mérito da decisão dos jurados para absolver o réu.'],
            ans: 1,
            exp: 'O Art. 5º, XXXVIII prevê: plenitude de defesa, sigilo das votações, soberania dos veredictos e competência para crimes dolosos contra a vida.',
            erros: ['ERRADA: apenas dolosos contra a vida.', 'CORRETA.', 'ERRADA: 7 jurados (não 12).', 'ERRADA: soberania dos veredictos impede reforma de mérito pelo Tribunal.'],
            tip: 'MACETE: Júri = Crimes Dolosos (com intenção) contra a vida. Mnemônico: "Dolo na Vida".', tiptype: 'cm-gold'
        },
        {
            id: 'DC_JR02', topic: 'DC_JR', dif: 'm',
            text: '(Reforço) Com base na Constituição Federal e na jurisprudência do STF sobre o Tribunal do Júri, assinale a alternativa CORRETA:',
            opts: ['O latrocínio (roubo seguido de morte) deve ser julgado pelo Tribunal do Júri.', 'A competência do Júri não pode ser ampliada por lei infraconstitucional.', 'O sigilo das votações visa proteger a imparcialidade e a segurança dos jurados.', 'Decisões do Júri são irrecorríveis em qualquer hipótese.'],
            ans: 2,
            exp: 'Súmula 603 do STF: Latrocínio NÃO vai ao júri (é crime contra o patrimônio). O sigilo é garantia fundamental.',
            erros: ['ERRADA: latrocínio é julgado por juiz singular (Súmula 603 STF).', 'ERRADA: competência pode ser ampliada por lei (ex.: Lei Maria da Penha).', 'CORRETA.', 'ERRADA: decisões são recorríveis por apelação em error in procedendo.'],
            tip: 'MACETE: Latrocínio = Juiz Singular. Homicídio Doloso = Júri.', tiptype: 'cm-red'
        },
        {
            id: 'DC_AP01', topic: 'DC_AP', dif: 'l',
            text: 'Sobre os concursos públicos e a investidura em cargos e empregos públicos, conforme o art. 37 da CF/88, assinale a alternativa CORRETA:',
            opts: ['O prazo de validade do concurso público será de até dois anos, improrrogável.', 'A investidura em cargo ou emprego público depende de aprovação prévia em concurso de provas ou de provas e títulos.', 'As funções de confiança e os cargos em comissão destinam-se exclusivamente a servidores de carreira.', 'O servidor público estável perderá o cargo apenas mediante sentença judicial transitada em julgado.'],
            ans: 1,
            exp: 'Art. 37, II. A validade (Art. 37, III) pode ser prorrogada uma vez por igual período.',
            erros: ['ERRADA: pode ser prorrogada uma vez.', 'CORRETA.', 'ERRADA: funções de confiança são só de carreira; cargos em comissão são livres.', 'ERRADA: pode perder por processo administrativo (Art. 41, §1º).'],
            tip: 'MACETE: Validade: 2 + 2 (é o teto, pode ser menos, mas a prorrogação deve ser igual ao tempo inicial).', tiptype: 'cm-gold'
        },
        {
            id: 'DC_AP02', topic: 'DC_AP', dif: 'm',
            text: '(Reforço) Acerca das funções de confiança e cargos em comissão no serviço público (art. 37, V, CF/88), assinale a alternativa CORRETA:',
            opts: ['Funções de confiança são exercidas exclusivamente por servidores ocupantes de cargo efetivo.', 'Cargos em comissão só podem ser ocupados por pessoas sem vínculo com a administração.', 'A lei reservará percentual integral dos cargos públicos para pessoas com deficiência.', 'O direito de greve do servidor público será exercido nos termos de lei complementar.'],
            ans: 0,
            exp: 'Art. 37, V. Funções de Confiança (FC) = 100% Efetivos. Cargos em Comissão (CC) = Percentual mínimo para efetivos, o resto é livre.',
            erros: ['CORRETA.', 'ERRADA: cargos em comissão podem ser ocupados por qualquer pessoa (percentual mínimo para efetivos).', 'ERRADA: percentual mínimo, não integral (Lei 13.146/2015).', 'ERRADA: lei ordinária (não complementar).'],
            tip: 'MACETE: FC = Só de carreira (Confiança Total). CC = Comissão é Livre (quase tudo).', tiptype: 'cm-red'
        },
        {
            id: 'DC_PJ01', topic: 'DC_PJ', dif: 'l',
            text: 'Sobre a composição dos Tribunais de Justiça e o quinto constitucional (art. 94, CF/88), assinale a alternativa CORRETA:',
            opts: ['O Tribunal de Justiça é composto por Juízes de Direito e Desembargadores nomeados pelo Governador.', 'Um quinto das vagas dos Tribunais de Justiça é composto de advogados e membros do MP.', 'A idade mínima para ingressar no Tribunal de Justiça como Desembargador é de 30 anos.', 'O quinto constitucional aplica-se apenas aos tribunais federais.'],
            ans: 1,
            exp: 'Art. 94. 1/5 das vagas (Quinto Constitucional) para membros do MP e Advogados com mais de 10 anos de carreira.',
            erros: ['ERRADA: Desembargadores são eleitos pelo TJ, não nomeados pelo Governador.', 'CORRETA.', 'ERRADA: idade mínima é 35 anos.', 'ERRADA: aplica-se a todos os tribunais (federais e estaduais).'],
            tip: 'MACETE: 1/5 = MP e OAB. (Dez anos de atividade + Notável saber).', tiptype: 'cm-gold'
        },
        {
            id: 'DC_PJ02', topic: 'DC_PJ', dif: 'm',
            text: '(Reforço) Acerca das garantias constitucionais da magistratura previstas no art. 95 da CF/88, assinale a alternativa CORRETA:',
            opts: ['A vitaliciedade será adquirida após um ano de exercício no cargo de juiz substituto.', 'A inamovibilidade impede que o juiz seja removido mesmo por motivo de interesse público.', 'A irredutibilidade de subsídio protege o valor nominal da remuneração dos magistrados.', 'Juízes podem exercer, ainda que em disponibilidade, outro cargo ou função, exceto magistério.'],
            ans: 2,
            exp: 'Art. 95. Vitaliciedade (2 anos), Inamovibilidade (salvo interesse público por voto de 2/3), Irredutibilidade e proibição de outras funções (salvo uma de magistério).',
            erros: ['ERRADA: vitaliciedade após 2 anos.', 'ERRADA: pode ser removido por interesse público (2/3).', 'CORRETA.', 'ERRADA: vedado exercer qualquer outra função, exceto uma de magistério.'],
            tip: 'MACETE: Juiz = Vitalício (2 anos) + Inamovível + Irredutível.', tiptype: 'cm-red'
        },
        {
            id: 'DC_PJ03', topic: 'DC_PJ', dif: 'l',
            text: 'Sobre o Conselho Nacional de Justiça (CNJ), previsto no art. 103-B da CF/88, assinale a alternativa CORRETA:',
            opts: ['O CNJ detém competência jurisdicional para julgar processos criminais de magistrados.', 'O CNJ é composto por 15 membros com mandato de 2 anos, admitida uma recondução.', 'O Presidente do CNJ é o Ministro mais antigo do Superior Tribunal de Justiça (STJ).', 'O CNJ não possui controle sobre os atos administrativos do Poder Judiciário.'],
            ans: 1,
            exp: 'Art. 103-B. O CNJ faz o controle administrativo e financeiro, NÃO julga (não tem função jurisdicional). O Presidente é o do STF.',
            erros: ['ERRADA: CNJ não tem competência jurisdicional.', 'CORRETA.', 'ERRADA: Presidente é o do STF.', 'ERRADA: CNJ tem controle administrativo e financeiro.'],
            tip: 'MACETE: CNJ = Faxina e Gestão. Não julga mérito de processo judicial.', tiptype: 'cm-gold'
        },
        {
            id: 'DC_PJ04', topic: 'DC_PJ', dif: 'm',
            text: '(Reforço) Acerca da composição e natureza jurídica do Conselho Nacional de Justiça (CNJ), assinale a alternativa CORRETA:',
            opts: ['Dois advogados, indicados pelo Conselho Federal da OAB, integram o CNJ.', 'O CNJ é órgão externo ao Poder Judiciário.', 'As decisões do CNJ são irrecorríveis perante o STF.', 'O Ministério Público não possui representantes no CNJ.'],
            ans: 0,
            exp: 'Art. 103-B, XII. O CNJ é ÓRGÃO DO JUDICIÁRIO (Art. 92, I-A). Tem 2 advogados e 2 membros do MP.',
            erros: ['CORRETA.', 'ERRADA: CNJ é órgão interno do Poder Judiciário.', 'ERRADA: decisões do CNJ são recorríveis ao STF.', 'ERRADA: 2 membros do MP integram o CNJ.'],
            tip: 'MACETE: CNJ está DENTRO do Judiciário, embora faça controle.', tiptype: 'cm-red'
        },
        {
            id: 'DC_DP01', topic: 'DC_DP', dif: 'l',
            text: 'Sobre as condições de elegibilidade e os direitos políticos previstos no art. 14 da CF/88, assinale a alternativa CORRETA:',
            opts: ['São condições de elegibilidade a filiação partidária e o alistamento eleitoral, sendo dispensado o domicílio eleitoral na circunscrição para candidatos a cargos federais.', 'O militar alistável é elegível, desde que, se contar menos de dez anos de serviço, passe para a inatividade.', 'O analfabeto possui capacidade eleitoral ativa (pode votar), mas não passiva (não pode ser votado).', 'A nacionalidade brasileira nata é requisito para qualquer cargo eletivo.'],
            ans: 2,
            exp: 'Art. 14. Analfabetos são inalistáveis e inelegíveis? Não! São de voto facultativo e inelegíveis (Art. 14, § 4º).',
            erros: ['ERRADA: o domicílio eleitoral na circunscrição é condição de elegibilidade obrigatória para TODOS os cargos eletivos, sem exceção para candidatos federais (Art. 14, §3º, IV, CF).', 'ERRADA: o Art. 14, §8º diz que o militar com MENOS de 10 anos de serviço deve ser AFASTADO da atividade, não "passar para a inatividade".', 'CORRETA — Art. 14, §4º: os inalistáveis e os analfabetos são inelegíveis. Mas o analfabeto NÃO é inalistável — seu voto é apenas facultativo (Art. 14, §1º, II, a).', 'ERRADA: a nacionalidade brasileira NATA só é exigida para os cargos do Art. 12, §3º CF.'],
            tip: 'MACETE: Analfabeto = Vota se quiser, mas não pode ser eleito.', tiptype: 'cm-gold'
        },
        {
            id: 'DC_DP02', topic: 'DC_DP', dif: 'm',
            text: '(Reforço) Acerca das idades mínimas para os cargos eletivos, conforme o art. 14, §3.º, VI, da CF/88, assinale a alternativa CORRETA:',
            opts: ['A idade mínima de 35 anos é exigida para Presidente, Vice e Senador.', 'Para o cargo de Governador, a idade mínima é de 25 anos.', 'Para Deputado Federal e Estadual, a idade mínima é de 18 anos.', 'A idade para elegibilidade é verificada na data da posse, sem exceções.'],
            ans: 0,
            exp: 'Art. 14, § 3º, VI. Idades: 35 (Pres/Sen), 30 (Gov), 21 (Dep/Pref/Juiz Paz), 18 (Ver).',
            erros: ['CORRETA.', 'ERRADA: 30 anos para Governador.', 'ERRADA: 21 anos para Deputado Federal/Estadual.', 'ERRADA: idade é verificada na data da eleição (não posse).'],
            tip: 'MACETE: Mnemônico: 35, 30, 21, 18. (Telefone do sucesso eleitoral).', tiptype: 'cm-red'
        },
        {
            id: 'DC_NA01', topic: 'DC_NA', dif: 'l',
            text: 'Sobre a aquisição da nacionalidade brasileira nata, conforme o art. 12, I, da CF/88, assinale a alternativa CORRETA:',
            opts: ['São brasileiros natos os nascidos no estrangeiro de pai ou mãe brasileira, desde que venham a residir no Brasil e optem pela nacionalidade após a maioridade.', 'O filho de estrangeiros a serviço de seu país nascido em território brasileiro é brasileiro nato.', 'A nacionalidade brasileira nata é conferida apenas aos nascidos em solo brasileiro (jus soli).', 'Portugueses com residência permanente no Brasil possuem os mesmos direitos de brasileiro nato em qualquer caso.'],
            ans: 0,
            exp: 'Art. 12, I, "c". É a nacionalidade potestativa (opção após a maioridade).',
            erros: ['CORRETA.', 'ERRADA: filho de estrangeiro a serviço do país DELE não é nato.', 'ERRADA: também jus sanguinis (pai/mãe brasileiro).', 'ERRADA: direitos iguais só para alguns cargos (não todos).'],
            tip: 'MACETE: Se o pai/mãe estrangeiro estiver "a serviço do país DELE", o filho nascido aqui NÃO é brasileiro.', tiptype: 'cm-gold'
        },
        {
            id: 'DC_NA02', topic: 'DC_NA', dif: 'm',
            text: '(Reforço) Acerca da perda da nacionalidade brasileira, prevista no art. 12, §4.º, da CF/88, assinale a alternativa CORRETA:',
            opts: ['O brasileiro que adquirir outra nacionalidade perderá automaticamente a brasileira, sem exceções.', 'A perda da nacionalidade pode ocorrer em virtude de atividade nociva ao interesse nacional, mediante sentença judicial.', 'Brasileiros natos nunca perdem a nacionalidade, mesmo se optarem por outra de forma voluntária.', 'O cancelamento da naturalização só pode ocorrer por ato administrativo do Ministro da Justiça.'],
            ans: 1,
            exp: 'Art. 12, § 4º, I. A perda ocorre por cancelamento de naturalização (judicial) ou pedido expresso (administrativo). Note que a nova emenda facilitou a manutenção da nacionalidade.',
            erros: ['ERRADA: o Art. 12, §4º, II, CF prevê EXCEÇÕES à perda por aquisição de outra nacionalidade.', 'CORRETA — Art. 12, §4º, I, CF.', 'ERRADA: brasileiros NATOS podem sim perder a nacionalidade se adquirirem outra de forma VOLUNTÁRIA.', 'ERRADA: o cancelamento da naturalização ocorre por SENTENÇA JUDICIAL (Art. 12, §4º, I).'],
            tip: 'MACETE: Nato só perde se quiser explicitamente (via de regra).', tiptype: 'cm-red'
        },
        {
            id: 'DC_DS01', topic: 'DC_DS', dif: 'l',
            text: 'Sobre os direitos sociais relativos à saúde, à educação e à assistência social, conforme a Constituição Federal, assinale a alternativa CORRETA:',
            opts: ['A saúde é direito de todos e dever do Estado, garantida mediante políticas sociais e econômicas.', 'O ensino fundamental é obrigatório e gratuito, mas o ensino médio é apenas facultativo para o Estado.', 'As ações e serviços públicos de saúde constituem um sistema único, financiado exclusivamente pela União.', 'A assistência social será prestada apenas a quem contribuir para a seguridade social.'],
            ans: 0,
            exp: 'Art. 196. Saúde = Direito de todos/Dever do Estado. Educação (Art. 208) exige progressiva universalização do ensino médio.',
            erros: ['CORRETA.', 'ERRADA: ensino médio também obrigatório e gratuito (progressivo).', 'ERRADA: SUS é financiado por União, Estados e Municípios.', 'ERRADA: assistência social é não contributiva.'],
            tip: 'MACETE: Saúde = Universal. Assistência Social = Quem necessitar (não exige contribuição). Previdência = Exige contribuição.', tiptype: 'cm-gold'
        },
        {
            id: 'DC_DS02', topic: 'DC_DS', dif: 'm',
            text: '(Reforço) Acerca dos direitos sociais dos trabalhadores previstos no art. 7.º da CF/88, assinale a alternativa CORRETA:',
            opts: ['O salário mínimo pode ser vinculado a qualquer índice de preços para fins de reajuste.', 'É direito dos trabalhadores a participação nos lucros ou resultados, vinculada à remuneração.', 'A jornada de trabalho normal não pode ser superior a oito horas diárias e quarenta e quatro semanais.', 'O aviso prévio proporcional ao tempo de serviço é de, no mínimo, 15 dias.'],
            ans: 2,
            exp: 'Art. 7º, XIII. O aviso prévio (Art. 7º, XXI) é de no mínimo 30 dias. Salário mínimo não pode ser vinculado para nenhum fim.',
            erros: ['ERRADA: vedada vinculação (Art. 7º, IV).', 'ERRADA: participação nos lucros não é vinculada à remuneração (Art. 7º, XI).', 'CORRETA.', 'ERRADA: mínimo 30 dias (proporcional).'],
            tip: 'MACETE: 8h/dia, 44h/semana. Aviso = 30 dias min.', tiptype: 'cm-red'
        },
        {
            id: 'DC_SP01', topic: 'DC_SP', dif: 'l',
            text: 'Sobre os órgãos e as competências de segurança pública, conforme o art. 144 da CF/88, assinale a alternativa CORRETA:',
            opts: ['A Polícia Federal destina-se a exercer as funções de polícia judiciária da União e de polícia ostensiva federal.', 'Às polícias civis incumbem as funções de polícia judiciária e a apuração de infrações penais, inclusive as militares.', 'A Polícia Federal tem exclusividade na apuração de infrações penais contra a ordem política e social e em detrimento de bens da União de forma cumulativa.', 'As polícias militares e os corpos de bombeiros militares são forças reservas e auxiliares do Exército.'],
            ans: 3,
            exp: 'Art. 144, §6º: PM e Bombeiros = forças auxiliares e reserva do Exército. A PF não faz polícia ostensiva geral. A PC não apura crimes militares.',
            erros: ['ERRADA: a PF NÃO exerce polícia ostensiva federal.', 'ERRADA: as Polícias Civis NÃO apuram infrações penais MILITARES.', 'ERRADA: as hipóteses são ALTERNATIVAS (OU), não cumulativas.', 'CORRETA — Art. 144, §6º, CF.'],
            tip: 'MACETE: PF = Judiciária da União. PC = Judiciária dos Estados. PM/BM = Reserva do Exército.', tiptype: 'cm-gold'
        },
        {
            id: 'DC_SP02', topic: 'DC_SP', dif: 'm',
            text: '(Reforço) Sobre as guardas municipais, conforme o art. 144, §8.º, da CF/88, assinale a alternativa CORRETA:',
            opts: ['Os Municípios podem constituir guardas municipais destinadas à proteção de seus bens, serviços e instalações.', 'As guardas municipais possuem poder de polícia judiciária para investigar crimes contra o patrimônio público.', 'A criação de guardas municipais é obrigatória para municípios com mais de 100 mil habitantes.', 'As guardas municipais são subordinadas operacionalmente à Polícia Militar do Estado.'],
            ans: 0,
            exp: 'Art. 144, § 8º. É uma faculdade do município (podem constituir) e a competência é restrita à proteção de bens, serviços e instalações.',
            erros: ['CORRETA.', 'ERRADA: guarda municipal não tem poder judiciário/investigativo.', 'ERRADA: criação é facultativa.', 'ERRADA: subordinadas ao Prefeito, não à PM.'],
            tip: 'MACETE: Guarda Municipal = Patrimônio Municipal. Não é polícia investigativa!', tiptype: 'cm-red'
        },
        {
            id: 'DC_DE01', topic: 'DC_DE', dif: 'l',
            text: 'Acerca do Estado de Defesa, previsto no art. 136 da CF/88, assinale a alternativa CORRETA:',
            opts: ['O Presidente da República pode decretar o Estado de Defesa para repelir agressão armada estrangeira.', 'O tempo de duração do Estado de Defesa não será superior a 30 dias, podendo ser prorrogado uma vez por igual período.', 'O decreto que instituir o estado de defesa determinará o tempo de sua duração, que é ilimitado enquanto durar a crise.', 'Durante o Estado de Defesa, é vedada qualquer restrição ao sigilo de correspondência ou comunicação telefônica.'],
            ans: 1,
            exp: 'Art. 136, § 2º. O Estado de Defesa serve para "preservar ou prontamente restabelecer a ordem pública ou a paz social".',
            erros: ['ERRADA: Estado de Defesa é para preservar/restabelecer a ordem pública. Agressão armada estrangeira é hipótese de Estado de SÍTIO.', 'CORRETA — Art. 136, §2º, CF: não será superior a 30 dias, podendo ser prorrogado uma vez (total máximo: 60 dias).', 'ERRADA: o prazo é limitado a 30 dias + 30 dias.', 'ERRADA: durante o Estado de Defesa, PODE haver restrição ao sigilo.'],
            tip: 'MACETE: Defesa = 30 + 30 dias (Regra do 3).', tiptype: 'cm-gold'
        },
        {
            id: 'DC_DE02', topic: 'DC_DE', dif: 'm',
            text: '(Reforço) Sobre o Estado de Sítio, previsto no art. 137 da CF/88, assinale a alternativa CORRETA:',
            opts: ['O Estado de Sítio é decretado pelo Presidente após autorização do Congresso Nacional.', 'Pode ser decretado no caso de comoção grave de repercussão nacional, pelo prazo de até 60 dias.', 'Ao contrário do Estado de Defesa, o Estado de Sítio não admite a suspensão da liberdade de reunião.', 'O Congresso Nacional pode ser dissolvido durante a vigência do Estado de Sítio para evitar obstrução política.'],
            ans: 0,
            exp: 'Art. 137. O Estado de Sítio exige AUTORIZAÇÃO prévia do Congresso. No Estado de Defesa, o Presidente decreta e depois envia para controle.',
            erros: ['CORRETA — Art. 137, caput: o Presidente solicita ao Congresso autorização antes de decretar.', 'ERRADA: o prazo para comoção grave de cada prorrogação é de até 30 DIAS (não 60).', 'ERRADA: o Estado de Sítio ADMITE a suspensão da liberdade de reunião.', 'ERRADA: o Congresso NÃO pode ser dissolvido em nenhuma hipótese — separação de poderes é cláusula pétrea.'],
            tip: 'MACETE: Sítio = Solicita (ao Congresso). Defesa = Decreta (e avisa).', tiptype: 'cm-red'
        },
        {
            id: 'DC_OS01', topic: 'DC_OS', dif: 'l',
            text: 'Sobre a seguridade social, conforme o art. 194 e seguintes da CF/88, assinale a alternativa CORRETA:',
            opts: ['A seguridade social compreende saúde, educação e assistência social.', 'O financiamento da seguridade social é de responsabilidade exclusiva dos trabalhadores.', 'A saúde é direito de todos e dever do Estado, mediante políticas que visem à redução do risco de doença.', 'As receitas dos Estados e Municípios destinadas à seguridade social não integram o orçamento da União.'],
            ans: 2,
            exp: 'Art. 194 e 196. A Seguridade Social (PAS) = Previdência, Assistência e Saúde. Educação não faz parte da Seguridade.',
            erros: ['ERRADA: educação não integra a seguridade.', 'ERRADA: financiamento é de toda sociedade (contribuições).', 'CORRETA.', 'ERRADA: receitas integram o orçamento da seguridade.'],
            tip: 'MACETE: P.A.S. (Previdência, Assistência, Saúde). Memorize o acrônimo.', tiptype: 'cm-gold'
        },
        {
            id: 'DC_OS02', topic: 'DC_OS', dif: 'm',
            text: '(Reforço) Acerca da participação da iniciativa privada nas ações de saúde, conforme o art. 199 da CF/88, assinale a alternativa CORRETA:',
            opts: ['As instituições privadas não podem participar do Sistema Único de Saúde.', 'A assistência à saúde é livre à iniciativa privada.', 'É permitida a destinação de recursos públicos para auxílios ou subvenções a instituições privadas com fins lucrativos.', 'É permitida a participação direta de capital estrangeiro na assistência à saúde no Brasil em qualquer hipótese.'],
            ans: 1,
            exp: 'Art. 199. A iniciativa privada pode participar de forma complementar, preferencialmente entidades filantrópicas.',
            erros: ['ERRADA: podem participar de forma complementar.', 'CORRETA.', 'ERRADA: vedada para fins lucrativos.', 'ERRADA: vedada participação direta de capital estrangeiro.'],
            tip: 'MACETE: Iniciativa Privada na Saúde = Livre, mas o dinheiro público não vai para empresa com lucro.', tiptype: 'cm-red'
        },
        {
            id: 'DC_OS03', topic: 'DC_OS', dif: 'l',
            text: 'Sobre a assistência social e seus objetivos, previstos no art. 203 da CF/88, assinale a alternativa CORRETA:',
            opts: ['A assistência social será prestada a quem dela necessitar, independentemente de contribuição à seguridade social.', 'Um dos objetivos da assistência social é o pagamento de aposentadoria por tempo de contribuição.', 'A organização da assistência social é centralizada exclusivamente na União.', 'O benefício mensal de um salário mínimo é garantido a todo idoso com mais de 60 anos, independente de renda.'],
            ans: 0,
            exp: 'Art. 203. Assistência = Não contributiva. O benefício do salário mínimo (BPC/LOAS) é para idoso ou deficiente que comprove não ter meios de subsistência.',
            erros: ['CORRETA.', 'ERRADA: aposentadoria é previdência.', 'ERRADA: descentralizada (União, Estados, Municípios).', 'ERRADA: depende de comprovação de renda baixa.'],
            tip: 'MACETE: Assistência = Quem precisa. Previdência = Quem paga.', tiptype: 'cm-gold'
        },
        {
            id: 'DC_OS04', topic: 'DC_OS', dif: 'm',
            text: '(Reforço) Acerca da previdência social, conforme os arts. 201 e 202 da CF/88, assinale a alternativa CORRETA:',
            opts: ['A previdência social tem caráter contributivo e filiação facultativa para o trabalhador formal.', 'É vedada a adoção de requisitos e critérios diferenciados para a concessão de aposentadoria, sem qualquer exceção.', 'O regime de previdência privada tem caráter complementar e baseia-se na constituição de reservas.', 'Nenhum benefício que substitua o salário de contribuição terá valor mensal inferior a dois salários mínimos.'],
            ans: 2,
            exp: 'Art. 201 e 202. Filiação é obrigatória para trabalhadores. O piso é de UM salário mínimo, não dois.',
            erros: ['ERRADA: filiação obrigatória.', 'ERRADA: há exceções (profissões de risco, etc.).', 'CORRETA.', 'ERRADA: piso é um salário mínimo.'],
            tip: 'MACETE: Previdência = Contributiva e Obrigatória.', tiptype: 'cm-red'
        },
        {
            id: 'DC_OS05', topic: 'DC_OS', dif: 'l',
            text: 'Sobre a educação como direito social previsto nos arts. 205 a 214 da CF/88, assinale a alternativa CORRETA:',
            opts: ['O dever do Estado com a educação será efetivado mediante a garantia de ensino médio público obrigatório e gratuito, sendo o ensino fundamental apenas preferencial.', 'O ensino religioso, de matrícula obrigatória, constituirá disciplina dos horários normais das escolas públicas.', 'As universidades gozam de autonomia didático-científica, mas não administrativa.', 'O acesso ao ensino obrigatório e gratuito é direito público subjetivo.'],
            ans: 3,
            exp: 'Art. 208, § 1º. Direito público subjetivo significa que o cidadão pode exigir judicialmente o cumprimento. Educação básica: 4 a 17 anos (Art. 208, I).',
            erros: ['ERRADA: a alternativa é verdadeira mas a letra D é mais específica ao conceito cobrado.', 'ERRADA: o ensino religioso é de matrícula FACULTATIVA.', 'ERRADA: as universidades gozam de autonomia didático-científica E administrativa.', 'CORRETA — Art. 208, §1º, CF.'],
            tip: 'MACETE: Ensino Religioso = Facultativo. Educação Básica = 4 a 17.', tiptype: 'cm-gold'
        },
        {
            id: 'DC_OS06', topic: 'DC_OS', dif: 'm',
            text: '(Reforço) Sobre as responsabilidades dos entes federativos na oferta de educação, conforme o art. 211 da CF/88, assinale a alternativa CORRETA:',
            opts: ['Os Municípios atuarão prioritariamente no ensino fundamental e na educação infantil.', 'A União, os Estados e os Municípios devem aplicar o mesmo percentual da receita de impostos na manutenção do ensino.', 'O ensino é livre à iniciativa privada, dispensando autorização do Poder Público.', 'A educação infantil é de responsabilidade prioritária dos Estados membros.'],
            ans: 0,
            exp: 'Art. 211, § 2º. Municípios = Infantil e Fundamental. Estados = Fundamental e Médio.',
            erros: ['CORRETA.', 'ERRADA: percentuais são diferentes (União 18%, Estados/Municípios 25%).', 'ERRADA: exige autorização do Poder Público.', 'ERRADA: educação infantil é prioritária dos Municípios.'],
            tip: 'MACETE: Município começa por baixo (Infantil). Estado foca no meio/fim (Médio).', tiptype: 'cm-red'
        },
        {
            id: 'DC_OS07', topic: 'DC_OS', dif: 'l',
            text: 'Acerca do direito ao meio ambiente ecologicamente equilibrado, previsto no art. 225 da CF/88, assinale a alternativa CORRETA:',
            opts: ['Todos têm direito ao meio ambiente ecologicamente equilibrado, bem de uso especial da administração.', 'As usinas que operem com reator nuclear deverão ter sua localização definida em lei estadual.', 'Aquele que explorar recursos minerais fica obrigado a recuperar o meio ambiente degradado.', 'As terras devolutas são sempre indisponíveis quando necessárias à proteção dos ecossistemas naturais.'],
            ans: 2,
            exp: 'Art. 225, § 2º. O meio ambiente é bem de uso COMUM do povo (Art. 225, caput). Usinas nucleares = Lei Federal.',
            erros: ['ERRADA: o meio ambiente é bem de uso COMUM DO POVO.', 'ERRADA: usinas nucleares = LEI FEDERAL (Art. 225, §6º).', 'CORRETA — Art. 225, §2º, CF.', 'ERRADA: a alternativa generaliza; nem todas as terras devolutas são indisponíveis.'],
            tip: 'MACETE: Explorou minério? Tem que recuperar o solo. É obrigação constitucional.', tiptype: 'cm-gold'
        },
        {
            id: 'DC_OS08', topic: 'DC_OS', dif: 'm',
            text: '(Reforço) Sobre as responsabilidades por danos ambientais e os patrimônios naturais constitucionalmente protegidos, assinale a alternativa CORRETA:',
            opts: ['As condutas lesivas ao meio ambiente sujeitarão os infratores apenas a sanções administrativas.', 'As pessoas jurídicas não podem ser responsabilizadas criminalmente por danos ambientais.', 'A Floresta Amazônica brasileira e a Serra do Mar são patrimônio nacional.', 'A proteção do meio ambiente é competência exclusiva da União.'],
            ans: 2,
            exp: 'Art. 225, § 4º. Sanções podem ser penais e administrativas, independente da obrigação de reparar o dano. PJs respondem criminalmente.',
            erros: ['ERRADA: sanções cíveis, administrativas e penais.', 'ERRADA: PJs podem ser responsabilizadas criminalmente.', 'CORRETA.', 'ERRADA: competência comum (União, Estados, Municípios).'],
            tip: 'MACETE: Meio Ambiente = Sanção Tríplice (Cível, Administrativa e Penal).', tiptype: 'cm-red'
        },
        {
            id: 'DC_OS09', topic: 'DC_OS', dif: 'l',
            text: 'Sobre os direitos constitucionais referentes à família e à filiação, conforme o art. 226 da CF/88, assinale a alternativa CORRETA:',
            opts: ['O planejamento familiar é livre decisão do casal, competindo ao Estado fornecer recursos para o controle demográfico obrigatório.', 'A família, base da sociedade, tem especial proteção do Estado.', 'Para efeito da proteção do Estado, é reconhecida a união estável, vedada a sua conversão em casamento.', 'Os filhos havidos fora do casamento podem ter direitos sucessórios reduzidos em relação aos filhos legítimos.'],
            ans: 1,
            exp: 'Art. 226. O Estado não impõe controle demográfico. A união estável deve ter facilitada sua conversão em casamento. Filhos são todos iguais perante a lei.',
            erros: ['ERRADA: planejamento familiar é livre; Estado não impõe controle demográfico.', 'CORRETA.', 'ERRADA: união estável deve ser facilitada a conversão em casamento.', 'ERRADA: filhos têm direitos iguais (Art. 227, §6º).'],
            tip: 'MACETE: Família = Base da Sociedade. Filhos = Igualdade Absoluta.', tiptype: 'cm-gold'
        },
        {
            id: 'DC_OS10', topic: 'DC_OS', dif: 'm',
            text: '(Reforço) Acerca dos direitos constitucionais das pessoas idosas, conforme o art. 230 da CF/88, assinale a alternativa CORRETA:',
            opts: ['Aos maiores de sessenta e cinco anos é garantida a gratuidade dos transportes coletivos urbanos.', 'Os programas de amparo aos idosos serão executados preferencialmente em asilos e casas de repouso.', 'O dever de amparar as pessoas idosas é exclusivo do Estado.', 'A lei punirá severamente qualquer discriminação contra o idoso, exceto no mercado de trabalho.'],
            ans: 0,
            exp: 'Art. 230, § 2º. Gratuidade nos transportes = 65 anos. O amparo ao idoso deve ser feito preferencialmente em seus próprios lares (Art. 230, § 1º).',
            erros: ['CORRETA.', 'ERRADA: preferencialmente em lares próprios.', 'ERRADA: dever da família, sociedade e Estado.', 'ERRADA: punição para qualquer discriminação, inclusive mercado de trabalho.'],
            tip: 'MACETE: Transporte Grátis = 65 anos. Amparo = Lar (não asilo).', tiptype: 'cm-red'
        }
    ]
};
