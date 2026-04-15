// ─── QUESTÕES — DIREITO ADMINISTRATIVO ──────────────────────────────────────
window.QR = window.QR || {};
window.QR['dir-administrativo'] = {
    id: 'dir-administrativo',
    area: 'Direito',
    areaId: 'direito',
    label: 'Direito Administrativo',
    short: 'D. Adm.',
    color: '#085041',
    icon: '🏛️',
    simuladoPath: 'materias/nucleo-comum/direito-administrativo/simulado.html',
    topics: {
        'DA_PR': 'Princípios', 'DA_AT': 'Atos Administrativos',
        'DA_PO': 'Poderes Adm.', 'DA_OR': 'Organização Adm.',
        'DA_RC': 'Responsabilidade Civil', 'DA_LC': 'Licitações',
        'DA_CA': 'Contratos Adm.', 'DA_SV': 'Servidores Públicos',
        'DA_IM': 'Improbidade', 'DA_PA': 'Processo Adm.'
    },
    topicColors: {
        'DA_PR': { bg: '#E3F5EF', c: '#085041' }, 'DA_AT': { bg: '#E8F0FA', c: '#0C447C' },
        'DA_PO': { bg: '#EDE8F8', c: '#3A246A' }, 'DA_OR': { bg: '#FFF3DC', c: '#6A4800' },
        'DA_RC': { bg: '#FCEAEA', c: '#7A1515' }, 'DA_LC': { bg: '#FAECE7', c: '#5A200A' },
        'DA_CA': { bg: '#EDE8F8', c: '#26215C' }, 'DA_SV': { bg: '#E8F0FA', c: '#042C53' },
        'DA_IM': { bg: '#FCEAEA', c: '#501313' }, 'DA_PA': { bg: '#FFF3DC', c: '#412402' }
    },
    questions: [
        {
            id: 'DA_PR01', topic: 'DA_PR', dif: 'l',
            text: 'O art. 37, caput, da CF/88 consagra os princípios expressos da Administração Pública. O princípio que impõe ao administrador a obrigação de agir somente quando há lei que autorize, diferenciando-se do regime privado — onde o particular pode fazer tudo que a lei não proíbe — denomina-se:',
            opts: ['Moralidade, pois exige conduta ética e probidade do agente público.', 'Legalidade, pois o administrador só pode praticar atos que a lei expressamente permite.', 'Eficiência, pois o gestor deve obter resultados com o menor custo possível.', 'Publicidade, pois todos os atos devem ser transparentes e acessíveis ao público.'],
            ans: 1,
            exp: 'O princípio da legalidade administrativa (art. 37, caput, CF/88) estabelece vinculação positiva à lei: o administrador só pode fazer o que a lei autoriza. No direito privado, a vinculação é negativa: o particular pode fazer tudo o que a lei não proíbe.',
            erros: ['Moralidade exige ética e probidade, mas não é o princípio que diferencia a liberdade de agir entre público e privado.', 'CORRETA.', 'Eficiência trata de presteza e rendimento — não da relação entre ato administrativo e lei autorizativa.', 'Publicidade trata da transparência dos atos — não da exigência de lei prévia para agir.'],
            tip: 'LEGALIDADE ADM.: Administrador só faz o que a lei AUTORIZA. Particular faz tudo que a lei não PROÍBE.', tiptype: 'cm-red'
        },
        {
            id: 'DA_PR02', topic: 'DA_PR', dif: 'm',
            text: 'Sobre o princípio da impessoalidade, o STF editou a Súmula Vinculante 13, que veda a prática do nepotismo. Essa súmula decorre principalmente da violação de qual(is) princípio(s) constitucional(is)?',
            opts: ['Somente do princípio da eficiência, pois o nepotismo prejudica a prestação adequada do serviço público.', 'Dos princípios da impessoalidade e da moralidade administrativa, pois o nepotismo importa em favorecimento pessoal e violação da probidade.', 'Somente do princípio da legalidade, pois o nepotismo é conduta expressamente proibida em lei federal.', 'Do princípio da publicidade, pois as nomeações devem ser publicadas no Diário Oficial.'],
            ans: 1,
            exp: 'A Súmula Vinculante 13 do STF proíbe nomeação de cônjuge, companheiro ou parente até o 3º grau para cargos em comissão. O STF fundamentou principalmente nos princípios da impessoalidade e da moralidade.',
            erros: ['A eficiência é indiretamente afetada, mas não é o fundamento principal da SV 13.', 'CORRETA — impessoalidade e moralidade são os pilares da SV 13 (STF).', 'Nepotismo viola diretamente a Constituição — impessoalidade e moralidade, não apenas legalidade.', 'Publicidade trata da transparência dos atos, não do fundamento da vedação ao nepotismo.'],
            tip: 'Nepotismo = viola IMPESSOALIDADE + MORALIDADE (SV 13 STF). Não precisa de lei — é vedação constitucional direta.', tiptype: 'cm-blue'
        },
        {
            id: 'DA_PR03', topic: 'DA_PR', dif: 'm',
            text: 'O princípio da eficiência, acrescentado ao art. 37, caput, da CF/88 pela Emenda Constitucional n. 19/1998, serve de fundamento constitucional para:',
            opts: ['A extinção de cargos públicos efetivos quando o titular não atinge metas de produtividade fixadas anualmente.', 'A avaliação periódica de desempenho e a possibilidade de perda do cargo pelo servidor estável que obtiver desempenho insuficiente.', 'A vedação de concurso público para cargos cujo provimento por livre nomeação seja mais eficiente.', 'A privatização obrigatória de serviços públicos ineficientes prestados pela Administração direta.'],
            ans: 1,
            exp: 'A EC 19/1998 alterou o art. 41, §1º, III, CF/88, prevendo que o servidor estável pode perder o cargo mediante avaliação periódica de desempenho insuficiente, após procedimento de contraditório e ampla defesa.',
            erros: ['A extinção de cargo exige lei — não é decorrência automática de metas.', 'CORRETA — art. 41, §1º, III CF, com redação da EC 19/1998.', 'Concurso público é regra obrigatória (art. 37, II CF). A eficiência não autoriza sua supressão.', 'Privatização é política pública, não decorrência obrigatória do princípio da eficiência.'],
            tip: 'Eficiência (EC 19/98) → base para avaliação periódica → servidor estável pode PERDER o cargo se insuficiente.', tiptype: 'cm-teal'
        },
        {
            id: 'DA_AT01', topic: 'DA_AT', dif: 'l',
            text: 'Quanto aos atributos dos atos administrativos, a presunção de legitimidade e veracidade é caracterizada como:',
            opts: ['Presunção absoluta (iuris et de iure), não admitindo prova em contrário.', 'Presunção relativa (iuris tantum), que admite prova em contrário e inverte o ônus da prova ao administrado.', 'Atributo exclusivo dos atos vinculados, inaplicável aos atos discricionários.', 'Atributo que equipara o ato administrativo à coisa julgada, impedindo sua impugnação judicial.'],
            ans: 1,
            exp: 'A presunção de legitimidade e veracidade é presunção relativa (juris tantum): admite prova em contrário, mas os efeitos do ato persistem enquanto não declarado inválido. Inverte o ônus da prova — quem alega a ilegalidade deve comprová-la.',
            erros: ['ERRADA: a presunção é RELATIVA — admite prova em contrário.', 'CORRETA.', 'ERRADA: o atributo se aplica a TODOS os atos (vinculados e discricionários).', 'ERRADA: presunção de legitimidade ≠ coisa julgada. O ato pode ser anulado.'],
            tip: 'Presunção de legitimidade: RELATIVA (juris tantum) + incide sobre TODOS os atos + INVERTE o ônus da prova.', tiptype: 'cm-teal'
        },
        {
            id: 'DA_AT02', topic: 'DA_AT', dif: 'm',
            text: 'Assinale a alternativa que distingue CORRETAMENTE revogação de anulação de atos administrativos:',
            opts: ['Revogação: ato ilegal, efeitos ex tunc, competência da Administração. Anulação: ato inconveniente, efeitos ex nunc, competência do Judiciário.', 'Revogação: ato válido retirado por conveniência/oportunidade, efeitos ex nunc, exclusiva da Administração. Anulação: ato ilegal, efeitos ex tunc, Administração ou Judiciário.', 'Revogação: ato ilegal, com indenização ao administrado. Anulação: ato válido retirado por interesse público, sem indenização.', 'Revogação e anulação têm o mesmo fundamento; diferenciam-se apenas pelo órgão competente.'],
            ans: 1,
            exp: 'REVOGAÇÃO: retira ato válido por conveniência e oportunidade. Efeitos ex nunc. Competência exclusiva da Administração. ANULAÇÃO: retira ato ilegal. Efeitos ex tunc. Competência da Administração (autotutela) e do Judiciário.',
            erros: ['ERRADA: fundamentos e efeitos estão invertidos.', 'CORRETA.', 'ERRADA: a revogação recai sobre ato válido (não ilegal). A anulação recai sobre ato ilegal (não válido).', 'ERRADA: os fundamentos são completamente distintos: mérito (revogação) × ilegalidade (anulação).'],
            tip: 'REVOGAÇÃO = válido + mérito + ex nunc + só Adm. ANULAÇÃO = ilegal + legalidade + ex tunc + Adm. ou Judiciário.', tiptype: 'cm-gold'
        },
        {
            id: 'DA_AT03', topic: 'DA_AT', dif: 'm',
            text: 'Um agente público, valendo-se de competência legalmente atribuída para aplicar multas, impõe penalidade a um concorrente de seu irmão, sem que haja infração real. Esse vício recai sobre o elemento denominado:',
            opts: ['Competência, pois o agente não tinha atribuição legal para aplicar multas.', 'Forma, pois o procedimento para aplicação da multa não foi observado.', 'Finalidade (desvio de poder), pois o agente usou competência legítima para alcançar fim ilegal ou pessoal.', 'Motivo, pois o fundamento fático da multa (a infração) era inexistente.'],
            ans: 2,
            exp: 'O vício descrito é o desvio de poder (desvio de finalidade), que recai sobre o elemento FINALIDADE. O agente tinha competência para aplicar multas, mas a usou para atingir fim pessoal, não o interesse público.',
            erros: ['ERRADA: o agente TINHA competência para aplicar multas. O vício não é de competência.', 'ERRADA: vício de forma ocorre quando o procedimento não é observado.', 'CORRETA — desvio de poder/finalidade.', 'ERRADA: vício de motivo ocorre quando o fato ou fundamento jurídico é inexistente ou falso.'],
            tip: 'DESVIO DE PODER = vício na FINALIDADE. Agente TEM competência, mas usa para fim PESSOAL ou ILEGAL.', tiptype: 'cm-purple'
        },
        {
            id: 'DA_AT04', topic: 'DA_AT', dif: 'h',
            text: 'A Administração Pública anulou ato administrativo de concessão de benefício previdenciário praticado há 7 anos tendo o servidor agido de boa-fé. Com base no art. 54 da Lei 9.784/1999, assinale a alternativa CORRETA:',
            opts: ['A Administração pode anular o ato a qualquer tempo, pois a legalidade não se sujeita a prazo.', 'A anulação é inválida, pois o direito da Administração de anular atos favoráveis ao administrado de boa-fé decai em 5 anos.', 'A Administração pode anular o ato, mas deve indenizar o servidor apenas pelas despesas médicas realizadas.', 'O prazo de 5 anos aplica-se apenas aos atos de natureza tributária, não a benefícios previdenciários.'],
            ans: 1,
            exp: 'O art. 54 da Lei 9.784/1999: "o direito da Administração de anular os atos administrativos de que decorram efeitos favoráveis para os destinatários decai em cinco anos, contados da data em que foram praticados, salvo comprovada má-fé." O prazo decadencial de 5 anos já se consumou → a Administração não pode mais anular.',
            erros: ['ERRADA: a legalidade não é absoluta em face do tempo. O art. 54 limita o poder de anulação a 5 anos.', 'CORRETA — art. 54 da Lei 9.784/1999.', 'ERRADA: a anulação é juridicamente inviável após o prazo.', 'ERRADA: o art. 54 se aplica a todos os atos favoráveis ao administrado, sem distinção de matéria.'],
            tip: 'Art. 54 Lei 9.784/99: Adm. não pode anular ato favorável ao administrado de BOA-FÉ após 5 ANOS. Após esse prazo = decadência do poder de anular.', tiptype: 'cm-coral'
        },
        {
            id: 'DA_PO01', topic: 'DA_PO', dif: 'm',
            text: 'Sobre os atributos do poder de polícia administrativo, assinale a alternativa CORRETA:',
            opts: ['A autoexecutoriedade é atributo universal do poder de polícia, permitindo sempre executar qualquer medida sem intervenção judicial.', 'São atributos do poder de polícia: discricionariedade (em regra), autoexecutoriedade (não universal) e coercibilidade. A multa não é autoexecutória para fins de cobrança.', 'O poder de polícia é sempre vinculado, pois qualquer limitação a direitos exige previsão legal sem margem de escolha.', 'O poder de polícia prescinde de previsão legal — basta o interesse público para restringir direitos privados.'],
            ans: 1,
            exp: 'O poder de polícia possui três atributos: (1) Discricionariedade — em regra; (2) Autoexecutoriedade — não é universal; a multa é aplicada unilateralmente, mas sua cobrança coercitiva exige execução fiscal; (3) Coercibilidade. O poder de polícia sempre exige base legal.',
            erros: ['ERRADA: autoexecutoriedade NÃO é universal. Multa precisa de execução fiscal para cobrança.', 'CORRETA.', 'ERRADA: o poder de polícia é em regra DISCRICIONÁRIO.', 'ERRADA: o poder de polícia exige sempre PREVISÃO LEGAL.'],
            tip: 'Poder de polícia: (1) Discricionariedade (regra); (2) Autoexecutoriedade (NÃO universal); (3) Coercibilidade.', tiptype: 'cm-red'
        },
        {
            id: 'DA_PO02', topic: 'DA_PO', dif: 'm',
            text: 'O poder disciplinar da Administração Pública permite a aplicação de sanções a servidores e contratados. Sobre as garantias exigidas, assinale a alternativa CORRETA:',
            opts: ['A Administração pode aplicar sanções disciplinares de forma sumária, sem qualquer procedimento, quando flagrar a infração do servidor.', 'O exercício do poder disciplinar exige, em regra, processo administrativo com garantia de contraditório e ampla defesa (art. 5º, LV, CF/88).', 'O poder disciplinar é absoluto — instaurado o processo, o resultado é vinculado à infração apurada.', 'O poder disciplinar alcança apenas os servidores públicos efetivos, sendo inaplicável a comissionados e contratados temporários.'],
            ans: 1,
            exp: 'O art. 5º, LV, CF/88 garante o contraditório e ampla defesa em processo administrativo. O poder disciplinar deve ser exercido com observância de PAD. A aplicação sumária de sanções graves (demissão, suspensão prolongada) sem PAD é nula.',
            erros: ['ERRADA: sanções mais graves exigem PAD completo com contraditório.', 'CORRETA — art. 5º, LV CF/88.', 'ERRADA: o poder disciplinar é discricionário quanto à gradação da pena.', 'ERRADA: o poder disciplinar alcança todos em relação de sujeição especial com a Administração.'],
            tip: 'Poder disciplinar: exige PROCESSO ADMINISTRATIVO com CONTRADITÓRIO e AMPLA DEFESA (art. 5º, LV CF). Sanção sem PAD = nulidade.', tiptype: 'cm-blue'
        },
        {
            id: 'DA_OR01', topic: 'DA_OR', dif: 'm',
            text: 'Quanto à distinção entre desconcentração e descentralização administrativa, assinale a alternativa CORRETA:',
            opts: ['Desconcentração cria nova pessoa jurídica integrante da Administração Indireta; descentralização distribui competências internamente.', 'Descentralização transfere competências para outra pessoa jurídica ou particular; desconcentração distribui internamente, dentro da mesma pessoa jurídica, mantendo a hierarquia.', 'Desconcentração e descentralização são sinônimos utilizados alternativamente pela doutrina.', 'Descentralização é a criação de departamentos e setores dentro de um órgão; desconcentração é a criação de autarquias e fundações.'],
            ans: 1,
            exp: 'DESCONCENTRAÇÃO: ocorre dentro de uma mesma pessoa jurídica, com distribuição interna de competências entre órgãos hierarquicamente organizados. DESCENTRALIZAÇÃO: transferência de competências para outra pessoa jurídica. Não há hierarquia entre o ente descentralizador e a entidade — há apenas controle finalístico.',
            erros: ['ERRADA: é o contrário. Desconcentração = interna (mesma PJ). Descentralização = externa (outra PJ).', 'CORRETA.', 'ERRADA: são técnicas completamente distintas.', 'ERRADA: é o contrário. Departamentos = desconcentração. Autarquias = descentralização.'],
            tip: 'DESCONCENTRAÇÃO: interna, mesma PJ, hierarquia. DESCENTRALIZAÇÃO: outra PJ, sem hierarquia (só tutela).', tiptype: 'cm-gold'
        },
        {
            id: 'DA_OR02', topic: 'DA_OR', dif: 'm',
            text: 'Sobre o regime jurídico das autarquias, assinale a alternativa CORRETA:',
            opts: ['Autarquias são pessoas jurídicas de direito privado, criadas por autorização legislativa, com fins lucrativos e controle acionário do Estado.', 'Autarquias são pessoas jurídicas de direito público, criadas por lei específica, dotadas de autonomia administrativa e financeira, sujeitas ao controle finalístico do ente criador.', 'Autarquias são órgãos públicos sem personalidade jurídica própria, integrantes da Administração Direta.', 'Autarquias são criadas por decreto do Poder Executivo, com patrimônio misto e fins de interesse coletivo.'],
            ans: 1,
            exp: 'As autarquias (art. 5º, I, DL 200/67; art. 37, XIX CF/88) são pessoas jurídicas de direito público, criadas por lei específica (não por decreto), dotadas de patrimônio próprio, sujeitas ao controle finalístico (tutela ministerial). Gozam de imunidade tributária recíproca, bens impenhoráveis, execução por precatórios.',
            erros: ['ERRADA: autarquias são de direito PÚBLICO, sem fins lucrativos e criadas por lei.', 'CORRETA.', 'ERRADA: autarquias TÊM personalidade jurídica própria e integram a Administração INDIRETA.', 'ERRADA: autarquias são criadas por LEI (não por decreto).'],
            tip: 'AUTARQUIA: direito PÚBLICO + criada por LEI + sem fins lucrativos + imunidade tributária + precatórios.', tiptype: 'cm-teal'
        },
        {
            id: 'DA_RC01', topic: 'DA_RC', dif: 'l',
            text: 'O art. 37, §6º, da Constituição Federal disciplina a responsabilidade civil extracontratual do Estado. Qual é a teoria adotada como regra geral no Brasil e quais são seus elementos?',
            opts: ['Teoria subjetiva: exige dolo ou culpa do agente, nexo causal e dano. A vítima deve provar a culpa da Administração.', 'Teoria do risco administrativo: responsabilidade objetiva — basta provar a conduta do agente estatal, o dano e o nexo causal. Admite excludentes.', 'Teoria do risco integral: responsabilidade objetiva absoluta, sem qualquer excludente de responsabilidade.', 'Teoria da culpa anônima do serviço (faute du service): sempre exige que a vítima demonstre falha genérica do serviço público.'],
            ans: 1,
            exp: 'O Brasil adota como regra geral a teoria do risco administrativo (art. 37, §6º, CF/88): responsabilidade objetiva — dispensada prova de culpa ou dolo. A vítima prova: conduta do agente + dano + nexo causal. O Estado pode se eximir comprovando: culpa exclusiva da vítima, força maior, culpa concorrente.',
            erros: ['ERRADA: a teoria subjetiva aplica-se em geral às omissões estatais.', 'CORRETA.', 'ERRADA: risco integral (sem excludentes) é exceção — aplicado a dano nuclear, ambiental específico.', 'ERRADA: a culpa anônima aplica-se às omissões estatais em geral.'],
            tip: 'Regra geral: RISCO ADMINISTRATIVO (objetivo, com excludentes). Atos omissivos = SUBJETIVA. Risco INTEGRAL = sem excludentes (nuclear).', tiptype: 'cm-red'
        },
        {
            id: 'DA_RC02', topic: 'DA_RC', dif: 'm',
            text: 'Sobre a ação regressiva do Estado contra o servidor causador do dano (art. 37, §6º, CF), assinale a alternativa CORRETA:',
            opts: ['O Estado pode mover ação regressiva contra qualquer servidor, independentemente de ter havido dolo ou culpa.', 'A ação regressiva exige comprovação de dolo ou culpa do servidor, e o STF firmou que essa ação é imprescritível.', 'A ação regressiva só é cabível quando o servidor for identificado nominalmente na sentença condenatória.', 'A ação regressiva tem prazo prescricional de 5 anos, contados da data do pagamento da indenização.'],
            ans: 1,
            exp: 'O art. 37, §6º, parte final: "assegurado o direito de regresso contra o responsável nos casos de dolo ou culpa." A ação regressiva é subjetiva — exige dolo ou culpa do servidor. O STF firmou que a ação regressiva do Estado para ressarcimento ao erário é imprescritível (RE 669.069 — Tema 666).',
            erros: ['ERRADA: a CF exige expressamente DOLO ou CULPA do servidor para o regresso.', 'CORRETA — art. 37, §6º CF; STF, RE 669.069 (Tema 666).', 'ERRADA: a ação pode ser movida mesmo sem identificação nominal do servidor na sentença.', 'ERRADA: a ação regressiva é IMPRESCRITÍVEL (STF).'],
            tip: 'Ação regressiva: exige DOLO ou CULPA + é IMPRESCRITÍVEL (STF, art. 37, §5º CF). Responsabilidade com particular = objetiva. Regresso contra servidor = subjetiva.', tiptype: 'cm-teal'
        },
        {
            id: 'DA_RC03', topic: 'DA_RC', dif: 'h',
            text: 'Um preso mantido sob custódia do Estado foi morto por outro detento. A família ajuizou ação de indenização. Com base no STF (RE 841.526 — Tema 592), assinale a alternativa CORRETA:',
            opts: ['O Estado não responde, pois o homicídio foi praticado por particular (outro detento), não por agente estatal.', 'O Estado responde objetivamente pelo evento, pois assume o dever de guarda e proteção sobre os presos custodiados, e a morte durante a custódia configura omissão específica do serviço.', 'O Estado responde apenas se a família provar que algum agente estatal agiu com dolo ou culpa.', 'O Estado responde subsidiariamente, apenas se o detento autor do homicídio não tiver bens suficientes.'],
            ans: 1,
            exp: 'O STF, no RE 841.526 (Tema 592), fixou tese: "Em caso de inobservância de seu dever específico de proteção previsto no art. 5º, XLIX, CF/88, o Estado é responsável pela morte de detento." A morte dentro do presídio configura omissão específica, que gera responsabilidade objetiva do Estado.',
            erros: ['ERRADA: a omissão do Estado no dever de custódia gera responsabilidade objetiva por omissão específica (STF, RE 841.526).', 'CORRETA.', 'ERRADA: por se tratar de omissão específica em relação a preso sob custódia, o STF reconhece responsabilidade OBJETIVA.', 'ERRADA: a responsabilidade do Estado é direta e principal — não subsidiária.'],
            tip: 'Morte de preso sob custódia = responsabilidade OBJETIVA do Estado (STF, RE 841.526, Tema 592). Omissão ESPECÍFICA (não genérica).', tiptype: 'cm-coral'
        },
        {
            id: 'DA_LC01', topic: 'DA_LC', dif: 'l',
            text: 'A Lei 14.133/2021 (Nova Lei de Licitações) estabelece as modalidades licitatórias. Sobre o PREGÃO, assinale a alternativa CORRETA:',
            opts: ['O pregão é modalidade utilizada para obras de grande vulto e complexidade técnica, com critério de julgamento pela melhor técnica.', 'O pregão é obrigatório para aquisição de bens e serviços comuns, e a forma eletrônica é a preferencial. O critério de julgamento é exclusivamente menor preço ou maior desconto.', 'O pregão é modalidade facultativa para a Administração, que pode optar pela concorrência mesmo em bens e serviços comuns.', 'No pregão é permitido o critério de julgamento por técnica e preço quando o objeto envolver alta complexidade tecnológica.'],
            ans: 1,
            exp: 'O art. 29 da Lei 14.133/2021 determina que o pregão é obrigatório para aquisição de bens e serviços comuns. A forma eletrônica é a preferencial — a presencial só é admitida por ato motivado. O critério de julgamento admitido no pregão é exclusivamente menor preço ou maior desconto.',
            erros: ['ERRADA: obras de grande vulto são objeto da CONCORRÊNCIA.', 'CORRETA.', 'ERRADA: o pregão é OBRIGATÓRIO para bens e serviços comuns.', 'ERRADA: técnica e preço é vedado no pregão.'],
            tip: 'Pregão: OBRIGATÓRIO para bens/serviços COMUNS. Forma ELETRÔNICA preferencial. Critério: APENAS menor preço ou maior desconto.', tiptype: 'cm-red'
        },
        {
            id: 'DA_LC02', topic: 'DA_LC', dif: 'm',
            text: 'Sobre a distinção entre dispensa e inexigibilidade de licitação (arts. 74 e 75 da Lei 14.133/2021), assinale a alternativa CORRETA:',
            opts: ['Na dispensa, a competição é materialmente inviável; na inexigibilidade, é viável mas a lei autoriza a contratação direta.', 'Na inexigibilidade, a competição é materialmente inviável; na dispensa, é viável mas a lei autoriza a contratação direta. O rol da dispensa é taxativo; o da inexigibilidade é exemplificativo.', 'Dispensa e inexigibilidade são sinônimas e podem ser utilizadas indistintamente.', 'O rol da inexigibilidade é taxativo, pois representa exceção à regra da licitação; o da dispensa é exemplificativo.'],
            ans: 1,
            exp: 'DISPENSA: a competição seria viável, mas a lei autoriza a contratação direta (baixo valor, emergência). O rol é taxativo. INEXIGIBILIDADE: a competição é materialmente inviável (exclusividade do fornecedor, natureza do objeto). O rol é exemplificativo.',
            erros: ['ERRADA: fundamentos estão invertidos.', 'CORRETA.', 'ERRADA: têm fundamentos opostos.', 'ERRADA: é o contrário — dispensa = taxativo; inexigibilidade = exemplificativo.'],
            tip: 'DISPENSA: competição POSSÍVEL, lei autoriza dispensar → rol TAXATIVO. INEXIGIBILIDADE: competição INVIÁVEL → rol EXEMPLIFICATIVO.', tiptype: 'cm-gold'
        },
        {
            id: 'DA_LC03', topic: 'DA_LC', dif: 'm',
            text: 'As sanções administrativas previstas na Lei 14.133/2021 para licitantes e contratados são, em ordem crescente de gravidade:',
            opts: ['Advertência, multa, suspensão temporária (até 2 anos) e declaração de inidoneidade (até 5 anos).', 'Advertência, multa, impedimento de licitar e contratar (1 a 3 anos, para o ente que aplicou) e declaração de inidoneidade (3 a 6 anos, para toda a Administração Pública).', 'Advertência, multa, interdição de atividade e declaração de inidoneidade (definitiva, sem prazo).', 'Notificação, multa, impedimento de licitar (até 5 anos) e descredenciamento definitivo.'],
            ans: 1,
            exp: 'O art. 156 da Lei 14.133/2021 prevê: (1) advertência; (2) multa; (3) impedimento de licitar e contratar — até 3 anos, para o ente que aplicou; (4) declaração de inidoneidade — 3 a 6 anos, para toda a Administração Pública. Todas exigem processo administrativo com contraditório.',
            erros: ['ERRADA: "suspensão temporária" é terminologia da Lei 8.666/93 (revogada).', 'CORRETA.', 'ERRADA: "interdição de atividade" não consta na Lei 14.133/2021.', 'ERRADA: "notificação" e "descredenciamento definitivo" não são as sanções previstas no art. 156.'],
            tip: 'Sanções Lei 14.133: Advertência → Multa → Impedimento (1-3 anos, só o ente) → Inidoneidade (3-6 anos, TODA Adm. Pública).', tiptype: 'cm-teal'
        },
        {
            id: 'DA_CA01', topic: 'DA_CA', dif: 'm',
            text: 'As "cláusulas exorbitantes" dos contratos administrativos são prerrogativas da Administração que, se inseridas em contratos privados, seriam ilegais ou abusivas. Assinale o exemplo de cláusula exorbitante:',
            opts: ['Previsão de multa de 10% sobre o valor do contrato em caso de inadimplência do contratado.', 'Poder da Administração de modificar unilateralmente as cláusulas regulamentares do contrato para adequá-lo às necessidades do serviço público.', 'Cláusula de eleição de foro para resolução de litígios decorrentes do contrato.', 'Direito do contratado ao reequilíbrio econômico-financeiro em caso de alteração imprevisível dos custos.'],
            ans: 1,
            exp: 'As cláusulas exorbitantes são exclusividades da Administração: (1) modificação unilateral; (2) rescisão unilateral; (3) fiscalização da execução; (4) aplicação de sanções unilaterais; (5) exigência de garantia. Multa contratual, eleição de foro e reequilíbrio são cláusulas comuns em contratos privados.',
            erros: ['ERRADA: multa por inadimplência existe em contratos privados — não é prerrogativa exclusiva da Administração.', 'CORRETA — modificação unilateral é prerrogativa exclusiva da Adm. (art. 104, I, Lei 14.133/2021).', 'ERRADA: eleição de foro é comum nos contratos privados.', 'ERRADA: o reequilíbrio é DIREITO DO CONTRATADO (art. 37, XXI CF), não prerrogativa da Administração.'],
            tip: 'Cláusula exorbitante = prerrogativa da ADM que seria ILEGAL entre privados: modificação unilateral, rescisão unilateral, sanções unilaterais.', tiptype: 'cm-coral'
        },
        {
            id: 'DA_CA02', topic: 'DA_CA', dif: 'h',
            text: 'Município celebrou contrato de pavimentação com empresa Alfa. Após o início da obra, o Governo Federal majorou em 30% o IPI incidente sobre insumos asfálticos. A empresa requer reequilíbrio econômico-financeiro. Esse evento configura:',
            opts: ['Álea ordinária do negócio, pois variações tributárias são previsíveis e o contratado deve absorver o custo.', 'Fato do príncipe — ato geral do Estado que impacta imprevisível e onerosamente o contrato, gerando direito ao reequilíbrio.', 'Fato da Administração — ato do próprio contratante que alterou unilateralmente as condições contratuais.', 'Força maior — evento externo, imprevisível e irresistível que exonera totalmente o contratado de suas obrigações.'],
            ans: 1,
            exp: 'O fato do príncipe é o ato geral do Estado (qualquer ente federado, não necessariamente o contratante) que impacta indiretamente o contrato de forma imprevisível e extraordinária. A majoração de 30% no IPI federal preenche os requisitos: ato de autoridade estatal; caráter geral; imprevisibilidade; onerosidade excessiva. O contratado tem direito ao reequilíbrio.',
            erros: ['ERRADA: uma majoração de 30% em insumo essencial não é variação ordinária e previsível.', 'CORRETA — fato do príncipe.', 'ERRADA: fato da Administração é ato do próprio ente CONTRATANTE. Aqui o ato foi do Governo Federal (ente diverso do Município contratante).', 'ERRADA: força maior exonera totalmente. No caso, o contrato pode continuar — apenas o custo aumentou.'],
            tip: 'Fato do príncipe: ato geral do ESTADO (qualquer ente, não só o contratante) que onera imprevisível e extraordinariamente o contrato → REEQUILÍBRIO.', tiptype: 'cm-gold'
        },
        {
            id: 'DA_SV01', topic: 'DA_SV', dif: 'm',
            text: 'O art. 37, XVI, da Constituição Federal veda, em regra, a acumulação remunerada de cargos públicos. As hipóteses de acumulação PERMITIDA são:',
            opts: ['Dois cargos efetivos de nível médio, com compatibilidade de horários, em entes distintos da Federação.', 'Dois cargos de professor; um de professor e outro técnico ou científico; dois cargos ou empregos privativos de profissionais de saúde com profissão regulamentada — todos com compatibilidade de horários.', 'Dois cargos em comissão, desde que em órgãos distintos e com compatibilidade de horários.', 'Um cargo efetivo e um emprego público, desde que em esferas federativas diferentes, com compatibilidade de horários.'],
            ans: 1,
            exp: 'O art. 37, XVI, CF/88 prevê rol taxativo de acumulações permitidas, com compatibilidade de horários: (a) dois cargos de professor; (b) um cargo de professor com outro técnico ou científico; (c) dois cargos ou empregos privativos de profissionais de saúde com profissão regulamentada.',
            erros: ['ERRADA: dois cargos de nível médio não estão no rol taxativo do art. 37, XVI.', 'CORRETA — art. 37, XVI, a, b e c, CF/88.', 'ERRADA: cargos em comissão são vedados de acumulação como regra.', 'ERRADA: cargo efetivo + emprego público não está nas hipóteses taxativas.'],
            tip: 'Acumulação PERMITIDA (art. 37, XVI CF): (a) professor + professor; (b) professor + técnico/científico; (c) dois de SAÚDE com profissão regulamentada. ROL TAXATIVO.', tiptype: 'cm-red'
        },
        {
            id: 'DA_SV02', topic: 'DA_SV', dif: 'm',
            text: 'Sobre a aquisição da estabilidade e as hipóteses de perda do cargo pelo servidor público estável (art. 41 CF, EC 19/1998), assinale a alternativa CORRETA:',
            opts: ['A estabilidade é adquirida após 2 anos de efetivo exercício, sem necessidade de avaliação formal de desempenho.', 'A estabilidade é adquirida após 3 anos de efetivo exercício e aprovação em avaliação especial de desempenho; o servidor estável perde o cargo por sentença judicial, PAD, avaliação periódica insuficiente ou excesso de despesa.', 'A estabilidade é adquirida após 5 anos de serviço e não admite perda do cargo por nenhuma hipótese posterior.', 'A estabilidade é adquirida com a posse no cargo efetivo, independentemente de prazo ou avaliação.'],
            ans: 1,
            exp: 'O art. 41 CF (EC 19/1998) exige: (1) nomeação por concurso público; (2) 3 anos de efetivo exercício; (3) aprovação em avaliação especial de desempenho. As hipóteses de perda do cargo do servidor estável são: sentença judicial transitada em julgado; processo administrativo disciplinar; avaliação periódica insuficiente; excesso de despesa.',
            erros: ['ERRADA: o prazo é 3 anos (não 2). A avaliação especial de desempenho é exigida pela CF desde a EC 19/1998.', 'CORRETA.', 'ERRADA: o prazo é 3 anos (não 5). Há 4 hipóteses de perda.', 'ERRADA: a estabilidade não é adquirida com a posse — exige 3 anos + avaliação especial.'],
            tip: 'Estabilidade: 3 anos (EC 19/98 mudou de 2 para 3) + avaliação especial. Perda: (1) sentença; (2) PAD; (3) desempenho insuficiente; (4) excesso de despesa.', tiptype: 'cm-blue'
        },
        {
            id: 'DA_IM01', topic: 'DA_IM', dif: 'm',
            text: 'A Lei 14.230/2021 promoveu profunda reforma na Lei de Improbidade Administrativa (Lei 8.429/1992). A mudança mais relevante refere-se ao elemento subjetivo. Assinale a alternativa CORRETA:',
            opts: ['Manteve-se a possibilidade de configurar improbidade por conduta culposa nas modalidades de dano ao erário e violação de princípios.', 'Após a Lei 14.230/2021, apenas condutas dolosas configuram atos de improbidade administrativa — a culpa foi inteiramente excluída de todas as modalidades.', 'A culpa grave (culpa lata) continua configurando improbidade, sendo excluída apenas a culpa leve.', 'A lei apenas substituiu o termo "culpa" por "negligência qualificada", mantendo o mesmo alcance prático.'],
            ans: 1,
            exp: 'A Lei 14.230/2021 incluiu o §1º no art. 1º da LIA: "Consideram-se atos de improbidade administrativa as condutas dolosas tipificadas nos arts. 9º, 10 e 11 desta Lei." O dolo passou a ser o único elemento subjetivo capaz de configurar improbidade em qualquer das três modalidades. A conduta culposa foi inteiramente eliminada.',
            erros: ['ERRADA: a Lei 14.230/2021 excluiu a culpa de TODAS as modalidades.', 'CORRETA.', 'ERRADA: não há distinção entre culpa grave e leve na lei reformada. Qualquer grau de culpa foi excluído.', 'ERRADA: houve exclusão material da culpa. O elemento subjetivo passou a ser exclusivamente o dolo.'],
            tip: 'IMPROBIDADE pós Lei 14.230/2021: APENAS DOLO. Culpa foi EXCLUÍDA de todas as modalidades. Esta é a mudança mais cobrada da reforma.', tiptype: 'cm-red'
        },
        {
            id: 'DA_IM02', topic: 'DA_IM', dif: 'h',
            text: 'Sobre o prazo prescricional das ações de improbidade e a competência para seu julgamento, após a Lei 14.230/2021, assinale a alternativa CORRETA:',
            opts: ['O prazo prescricional é de 5 anos contados do término do mandato/cargo, e a competência é dos Tribunais de Contas.', 'O prazo prescricional é de 8 anos da ocorrência do fato; a competência é do juízo de primeiro grau, independentemente de prerrogativa de foro do agente.', 'O prazo prescricional é de 10 anos para agentes com mandato eletivo e 5 anos para os demais; a competência segue a prerrogativa de foro penal.', 'O prazo é de 3 anos e a ação é proposta pelo administrado lesado diretamente perante o juízo cível.'],
            ans: 1,
            exp: 'Após a Lei 14.230/2021: PRAZO: art. 23, I — 8 anos, contados da ocorrência do fato. COMPETÊNCIA: juízo de primeiro grau — o STF firmou que a prerrogativa de foro não se aplica às ações de improbidade. A ação é proposta exclusivamente pelo Ministério Público.',
            erros: ['ERRADA: a competência é do Judiciário (juízo de 1º grau), não do Tribunal de Contas.', 'CORRETA.', 'ERRADA: o prazo é único — 8 anos da ocorrência do fato.', 'ERRADA: o prazo é de 8 anos e a ação é proposta exclusivamente pelo MP.'],
            tip: 'Improbidade (Lei 14.230/2021): prazo = 8 ANOS da ocorrência. Competência = 1º GRAU (sem foro privilegiado). Legitimado ativo = apenas MP.', tiptype: 'cm-purple'
        },
        {
            id: 'DA_PA01', topic: 'DA_PA', dif: 'm',
            text: 'A Lei 9.784/1999 disciplina o processo administrativo federal. Sobre seus prazos, assinale a alternativa CORRETA:',
            opts: ['Os atos processuais devem ser praticados em 30 dias; a decisão final deve ser proferida em até 60 dias.', 'Inexistindo previsão específica, os atos processuais devem ser praticados em 5 dias; a decisão final deve ser proferida em 30 dias, prorrogáveis por mais 30 dias expressamente motivados.', 'Os prazos da Lei 9.784/99 são contados em dias úteis, por analogia ao Código de Processo Civil.', 'O processo administrativo pode ser instaurado apenas por requerimento do interessado — a instauração de ofício é vedada.'],
            ans: 1,
            exp: 'A Lei 9.784/1999 estabelece: art. 24 — "inexistindo disposição específica, os atos devem ser praticados em 5 dias, salvo motivo de força maior." Art. 49 — "a decisão final deve ser proferida em até 30 dias, prorrogáveis por mais 30 dias expressamente motivados." Os prazos são contados em dias corridos.',
            erros: ['ERRADA: o prazo para atos processuais sem previsão é 5 dias (não 30).', 'CORRETA — arts. 24 e 49 da Lei 9.784/1999.', 'ERRADA: a Lei 9.784/99 conta os prazos em dias CORRIDOS.', 'ERRADA: o art. 5º da Lei 9.784/99 permite a instauração DE OFÍCIO.'],
            tip: 'Lei 9.784/99: atos = 5 dias (sem previsão específica). Decisão = 30 + 30 dias. Dias CORRIDOS. De OFÍCIO ou a requerimento.', tiptype: 'cm-teal'
        },
        {
            id: 'DA_PA02', topic: 'DA_PA', dif: 'm',
            text: 'As Súmulas 346 e 473 do STF consagram o princípio da autotutela administrativa. Contudo, o art. 54 da Lei 9.784/1999 impõe limite ao poder de anulação. Assinale a alternativa CORRETA:',
            opts: ['A autotutela é ilimitada — a Administração pode anular qualquer ato ilegal a qualquer tempo, sem restrições.', 'A autotutela admite limite temporal: o direito de anular atos favoráveis ao administrado de boa-fé decai em 5 anos, contados da data do ato.', 'A autotutela só pode ser exercida até o prazo de 2 anos — após esse período, qualquer anulação depende de autorização judicial.', 'O prazo decadencial de 5 anos aplica-se apenas ao controle de constitucionalidade das leis, não aos atos administrativos.'],
            ans: 1,
            exp: 'O art. 54 da Lei 9.784/1999 limita: "o direito da Administração de anular os atos administrativos de que decorram efeitos favoráveis para os destinatários decai em cinco anos, contados da data em que foram praticados, salvo comprovada má-fé." Após 5 anos, o ato ilegal que gerou efeitos favoráveis ao administrado de boa-fé não pode mais ser anulado.',
            erros: ['ERRADA: a autotutela tem limite temporal — art. 54 da Lei 9.784/99.', 'CORRETA — art. 54 da Lei 9.784/1999 + Súmulas STF 346 e 473.', 'ERRADA: o prazo é de 5 anos (não 2). E não exige autorização judicial.', 'ERRADA: o art. 54 aplica-se especificamente aos ATOS ADMINISTRATIVOS.'],
            tip: 'Autotutela: anula atos ILEGAIS. Limite: atos favoráveis ao administrado de BOA-FÉ decaem em 5 ANOS (art. 54 Lei 9.784/99).', tiptype: 'cm-gold'
        }
    ]
};
