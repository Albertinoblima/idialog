// ─── QUESTÕES — DIREITO PROCESSUAL PENAL ────────────────────────────────────
window.QR = window.QR || {};
window.QR['dir-processual-penal'] = {
    id: 'dir-processual-penal',
    area: 'Direito',
    areaId: 'direito',
    label: 'Direito Processual Penal',
    short: 'D. Proc. Penal',
    color: '#712B13',
    icon: '⚙️',
    simuladoPath: 'materias/area-judiciaria/processo-penal/simulado.html',
    topics: {
        'DPP_IP': 'Inquérito Policial', 'DPP_FL': 'Flagrante',
        'DPP_AP': 'Ação Penal', 'DPP_PR': 'Provas',
        'DPP_IT': 'Interceptação Telefônica', 'DPP_PP': 'Prisão Preventiva',
        'DPP_PT': 'Prisão Temporária', 'DPP_NU': 'Nulidades',
        'DPP_HC': 'Habeas Corpus', 'DPP_JR': 'Tribunal do Júri',
        'DPP_RC': 'Recursos'
    },
    topicColors: {
        'DPP_IP': { bg: '#E6F1FB', c: '#0C447C' }, 'DPP_FL': { bg: '#FCEAEA', c: '#7A1515' },
        'DPP_AP': { bg: '#E3F5EF', c: '#085041' }, 'DPP_PR': { bg: '#EDE8F8', c: '#3A246A' },
        'DPP_IT': { bg: '#FFF3DC', c: '#6A4800' }, 'DPP_PP': { bg: '#FCEAEA', c: '#7A1515' },
        'DPP_PT': { bg: '#FAECE7', c: '#712B13' }, 'DPP_NU': { bg: '#F1EFE8', c: '#2C2C2A' },
        'DPP_HC': { bg: '#EAF3DE', c: '#173404' }, 'DPP_JR': { bg: '#E6F1FB', c: '#042C53' },
        'DPP_RC': { bg: '#EDE8F8', c: '#26215C' }
    },
    questions: [
        {
            id: 'DPP_IP01', topic: 'DPP_IP', dif: 'l',
            text: 'Sobre o inquérito policial, assinale a alternativa CORRETA:',
            opts: ['O inquérito policial é considerado peça acusatória e obrigatória para a propositura da ação penal.', 'O inquérito policial é inquisitório e sigiloso, mas o advogado tem direito de acesso às diligências já documentadas nos autos.', 'O indiciado no inquérito policial possui o direito ao contraditório e à ampla defesa em todas as fases.', 'A autoridade policial não pode arquivar o inquérito policial, mas pode negar abertura por despacho fundamentado.'],
            ans: 1,
            exp: 'O IP é peça investigativa (não acusatória) e dispensável (o MP pode oferecer denúncia com outros elementos). O advogado pode consultar os autos (Súmula Vinculante 14). A autoridade policial não arquiva o IP (art. 17, CPP).',
            erros: ['ERRADA: o IP é investigativo e dispensável.', 'CORRETA.', 'ERRADA: contraditório e ampla defesa se aplicam no processo, não no IP.', 'ERRADA: a autoridade policial não pode nem arquivar nem negar abertura de IP.'],
            tip: 'IP = Inquisitório (Sem contraditório). Policial NÃO arquiva. Só juiz (a pedido do MP).', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_IP02', topic: 'DPP_IP', dif: 'm',
            text: 'Sobre o prazo do inquérito policial, assinale a alternativa CORRETA:',
            opts: ['O inquérito policial deverá terminar no prazo de 30 dias, se o indiciado tiver sido preso em flagrante ou preventivamente.', 'O prazo de 10 dias para conclusão do IP com indiciado preso é prorrogável por igual período.', 'Com indiciado solto, o prazo para conclusão do IP é de 10 dias, improrrogável.', 'O prazo do IP é de 10 dias quando há réu preso e 30 dias quando o réu está solto.'],
            ans: 3,
            exp: 'Art. 10, CPP. Preso = 10 dias (improrrogável na Justiça Estadual). Solto = 30 dias (prorrogável). Na Justiça Federal: 15+15 dias para preso.',
            erros: ['ERRADA: o prazo preso é 10 dias.', 'ERRADA: o prazo de 10 dias com preso não é prorrogável (na Justiça Estadual).', 'ERRADA: o prazo com solto é de 30 dias.', 'CORRETA.'],
            tip: 'IP: Preso = 10 dias (contar do flagrante). Solto = 30 dias. Justiça Federal: 15+15 (preso).', tiptype: 'cm-red'
        },
        {
            id: 'DPP_IP03', topic: 'DPP_IP', dif: 'm',
            text: 'Sobre o arquivamento do inquérito policial, assinale a alternativa CORRETA:',
            opts: ['A autoridade policial que tiver presidido o inquérito poderá determinar o seu arquivamento, mediante portaria fundamentada.', 'O arquivamento do inquérito policial pelo juiz, a pedido do Promotor, faz coisa julgada material.', 'Com o arquivamento do inquérito, a ação penal pública nunca mais poderá ser proposta sobre os mesmos fatos.', 'O arquivamento do inquérito policial não impede que a ação penal seja intentada, se aparecerem novas provas.'],
            ans: 3,
            exp: 'Art. 18, CPP. O arquivamento do IP não faz coisa julgada material. Se aparecerem novas provas, o MP pode reabrir.',
            erros: ['ERRADA: autoridade policial NÃO arquiva.', 'ERRADA: o arquivamento não faz coisa julgada material.', 'ERRADA: novas provas permitem a retomada.', 'CORRETA.'],
            tip: 'Arquivamento de IP = Não faz coisa julgada. Novas provas = Pode reabrir.', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_IP04', topic: 'DPP_IP', dif: 'm',
            text: 'Quanto à Súmula Vinculante 14, assinale a alternativa CORRETA:',
            opts: ['O advogado tem direito a examinar, em qualquer estabelecimento público, autos de investigações já encerradas ou em andamento, mas não os documentos sigilosos.', 'É direito do defensor, no interesse do representado, ter acesso amplo aos elementos de prova que já documentados em procedimento investigatório realizado por órgão com competência de polícia judiciária.', 'O acesso do defensor é restrito ao boletim de ocorrência, sendo vedado acesso aos demais documentos do IP.', 'A SV 14 permite ao advogado participar ativamente das diligências em andamento no inquérito policial.'],
            ans: 1,
            exp: 'Súmula Vinculante 14 do STF. Refere-se a elementos já documentados. Não se aplica a diligências em andamento (sigilosas).',
            erros: ['ERRADA: pode ter acesso inclusive aos sigilosos, conforme a SV e Estatuto da OAB.', 'CORRETA.', 'ERRADA: o acesso é amplo aos autos já documentados.', 'ERRADA: não pode participar de diligências em andamento.'],
            tip: 'SV 14 = Advogado VÊ o que está nos autos. Não pode ver o que ainda não foi para o papel.', tiptype: 'cm-red'
        },
        {
            id: 'DPP_IP05', topic: 'DPP_IP', dif: 'm',
            text: 'Sobre a instauração do inquérito policial, assinale a alternativa CORRETA:',
            opts: ['Nos crimes de ação penal pública incondicionada, o IP pode ser instaurado de ofício pela autoridade policial, por requisição do MP ou do juiz, ou mediante requerimento do ofendido.', 'O IP só pode ser instaurado mediante requerimento do ofendido, em qualquer modalidade de ação penal.', 'Nos crimes de ação penal privada, a instauração do IP depende de requisição ministerial.', 'O juiz pode instaurar o IP de ofício para crimes de ação penal pública condicionada.'],
            ans: 0,
            exp: 'Art. 5º, CPP. Nos crimes de AP pública incondicionada, a autoridade policial pode agir de ofício (notitia criminis).',
            erros: ['CORRETA.', 'ERRADA: o IP pode ser instaurado de ofício ou por requisição em crimes de AP pública.', 'ERRADA: em AP privada, depende de requerimento do interessado.', 'ERRADA: em AP pública condicionada, depende de representação da vítima.'],
            tip: 'AP Pública Incondicionada → Policial age de OFÍCIO. AP Condicionada → Precisa da Representação da vítima.', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_FL01', topic: 'DPP_FL', dif: 'l',
            text: 'Sobre a prisão em flagrante, assinale a alternativa CORRETA:',
            opts: ['Qualquer pessoa pode prender quem esteja cometendo um crime, sendo essa a única hipótese de flagrante próprio.', 'É considerado em estado de flagrante o agente que, poucos instantes depois de cometer o crime, é encontrado com objetos que façam presumir ser ele o autor da infração.', 'O flagrante presumido ocorre quando o agente é perseguido logo após a prática do crime.', 'No flagrante impróprio, o agente é surpreendido no momento de cometer a infração.'],
            ans: 1,
            exp: 'Art. 302, CPP. Flagrante Próprio (I, II) = Cometendo/Acabou de cometer. Impróprio (III) = Perseguição logo após. Presumido (IV) = Encontrado depois com objetos/sinais.',
            erros: ['ERRADA: qualquer pessoa pode prender em todas as hipóteses de flagrante.', 'CORRETA.', 'ERRADA: a perseguição logo após é flagrante impróprio (não presumido).', 'ERRADA: "no momento" é flagrante próprio.'],
            tip: 'PRÓ = Vendo. IMpróprio = Perseguição. PRESumido = Encontrado depois com sinais.', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_FL02', topic: 'DPP_FL', dif: 'm',
            text: 'Sobre a lavratura do auto de prisão em flagrante (APF), assinale a alternativa CORRETA:',
            opts: ['O preso em flagrante deve ser levado à presença da autoridade policial, que lavrará o auto em até 24 horas.', 'A ausência de testemunhas do fato não impede a lavratura do APF, podendo ser substituídas por testemunhas de apresentação.', 'Após a lavratura do APF, a conclusão é enviada diretamente ao MP, sem necessidade de remessa ao juiz.', 'O auto de prisão em flagrante não pode ser lavrado se o conduzido não tiver um defensor constituído.'],
            ans: 1,
            exp: 'Art. 304, § 2º e 306, CPP. O APF é remetido ao juiz em 24 horas (não ao MP diretamente).',
            erros: ['ERRADA: o APF é lavrado imediatamente, e a comunicação ao juiz ocorre em 24h.', 'CORRETA.', 'ERRADA: o APF é remetido ao juiz.', 'ERRADA: se não tiver defensor, o juiz nomeia um dativo.'],
            tip: 'Testemunha do Fato? Não tem → Usa Testemunha de Apresentação (Art. 304, §2º)!', tiptype: 'cm-red'
        },
        {
            id: 'DPP_FL03', topic: 'DPP_FL', dif: 'm',
            text: 'Sobre a prisão em flagrante nos crimes permanentes, assinale a alternativa CORRETA:',
            opts: ['Nos crimes permanentes, o flagrante só é possível no momento em que o agente inicia a prática da conduta.', 'O estado de flagrância se prolonga enquanto persistir a situação de permanência na prática delitiva.', 'É vedada a entrada forçada em domicílio para prender em flagrante, mesmo em crime permanente.', 'Crimes habituais comportam prisão em flagrante em qualquer momento de sua execução.'],
            ans: 1,
            exp: 'STJ/STF: No crime permanente (ex: sequestro, tráfico em casa), o flagrante pode ocorrer a qualquer instante enquanto durar a permanência.',
            erros: ['ERRADA: o flagrante pode ocorrer em qualquer momento do estado permanente.', 'CORRETA.', 'ERRADA: em crimes permanentes, a entrada em domicílio é justificada.', 'ERRADA: crimes habituais em geral não admitem flagrante.'],
            tip: 'Crime Permanente = Flagrante o dia todo (ex: cárcere privado, tráfico de drogas).', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_FL04', topic: 'DPP_FL', dif: 'm',
            text: 'Sobre o relaxamento da prisão em flagrante, assinale a alternativa CORRETA:',
            opts: ['O juiz, ao receber o APF, pode relaxar a prisão ilegal, conceder liberdade provisória com ou sem fiança, ou converter em preventiva.', 'O relaxamento da prisão em flagrante é competência privativa do Ministério Público.', 'A prisão em flagrante, por si só, é suficiente para manter o preso encarcerado até o julgamento.', 'Após 48 horas da prisão em flagrante, o juiz deve necessariamente converter a prisão em preventiva.'],
            ans: 0,
            exp: 'Art. 310, CPP com redação dada pela Lei 12.403/2011. O juiz tem três opções ao receber o APF.',
            erros: ['CORRETA.', 'ERRADA: relaxamento é competência do juiz.', 'ERRADA: a prisão em flagrante não se sustenta sozinha; o juiz deve tomar uma das três decisões.', 'ERRADA: o juiz PODE converter em preventiva se necessário, mas não é uma obrigação.'],
            tip: 'Juiz recebe APF → 3 Opções: Relaxa (ilegal) | Liberdade Provisória (desnecessária) | Converte (preventiva).', tiptype: 'cm-red'
        },
        {
            id: 'DPP_FL05', topic: 'DPP_FL', dif: 'm',
            text: 'Sobre o flagrante esperado e provocado, assinale a alternativa CORRETA:',
            opts: ['O flagrante provocado (delito de ensaio) é válido, pois a autoria é genuína do infrator.', 'O flagrante esperado é considerado crime impossível, o que torna nula a prisão.', 'No flagrante provocado, o agente é induzido por terceiro à prática do crime; há crime impossível, conforme Súmula 145 do STF.', 'O flagrante esperado e o flagrante provocado produzem os mesmos efeitos jurídicos.'],
            ans: 2,
            exp: 'Súmula 145 do STF. Flagrante Esperado (policial aguarda) = VÁLIDO. Flagrante Provocado (policial induz) = Crime Impossível, nula a prisão.',
            erros: ['ERRADA: o flagrante provocado gera crime impossível.', 'ERRADA: o flagrante esperado é válido.', 'CORRETA.', 'ERRADA: produzem efeitos diferentes.'],
            tip: 'Esperado (EMBOSCADA) = Válido. Provocado (ARMADILHA) = Crime Impossível (Súmula 145).', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_AP01', topic: 'DPP_AP', dif: 'l',
            text: 'Sobre a ação penal, assinale a alternativa CORRETA:',
            opts: ['A ação penal pública incondicionada depende de representação do ofendido para ser proposta.', 'A ação penal privada subsidiária da pública ocorre quando o MP deixa de oferecer denúncia no prazo legal.', 'O Ministério Público, na ação penal privada, atua como dominus litis.', 'A ação penal pública condicionada pode ser proposta de ofício pelo Ministério Público.'],
            ans: 1,
            exp: 'Art. 29, CPP e Art. 5º, LIX, CF. Na AP Privada Subsidiária, o ofendido toma o lugar do MP pela inércia deste.',
            erros: ['ERRADA: AP pública incondicionada é de ofício.', 'CORRETA.', 'ERRADA: o MP custos legis na AP privada.', 'ERRADA: AP condicionada depende de representação da vítima.'],
            tip: 'Privada Subsidiária = Ofendido "assume o volante" quando o MP "dorme".', tiptype: 'cm-red'
        },
        {
            id: 'DPP_AP02', topic: 'DPP_AP', dif: 'm',
            text: 'Sobre a extinção da punibilidade na ação penal privada, assinale a alternativa CORRETA:',
            opts: ['A retratação da representação do ofendido é possível a qualquer tempo, mesmo após o trânsito em julgado.', 'O perdão do ofendido na ação penal privada, após o recebimento da queixa-crime, extingue a punibilidade se aceito pelo réu.', 'A perempção pode ocorrer na ação penal pública, se o MP não comparecer aos atos do processo.', 'A renúncia ao direito de queixa pode ser exercida por um dos ofendidos, sem necessidade de anuência dos demais.'],
            ans: 1,
            exp: 'Art. 106 c/c 107, V, CPP. O perdão bilateral (concedido e aceito) extingue a punibilidade.',
            erros: ['ERRADA: a retratação é possível até o recebimento da denúncia.', 'CORRETA.', 'ERRADA: perempção ocorre na ação penal privada.', 'ERRADA: a renúncia por um dos ofendidos não vincula os demais (cada um decide).'],
            tip: 'Perempção = Só na Ação Penal Privada (o querelante "dorme no ponto"). Perdão = Precisa do Réu aceitar.', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_AP03', topic: 'DPP_AP', dif: 'm',
            text: 'Sobre o prazo para oferecimento da denúncia pelo MP, assinale a alternativa CORRETA:',
            opts: ['O MP tem 5 dias para oferecer denúncia se o indiciado estiver preso e 15 dias se estiver solto.', 'O MP tem 10 dias para oferecer denuncia se o réu estiver preso, e 15 dias se estiver solto.', 'O prazo para o MP oferecer denúncia é sempre de 15 dias, contados do recebimento do IP.', 'O prazo para oferecer queixa-crime é de 6 meses, contados da data do exercício da representação.'],
            ans: 0,
            exp: 'Art. 46, CPP. Preso = 5 dias. Solto = 15 dias. A queixa-crime é no prazo de 6 meses, contados do conhecimento da autoria.',
            erros: ['CORRETA.', 'ERRADA: prazo preso é 5 dias.', 'ERRADA: o prazo varia conforme a situação do indiciado.', 'ERRADA: a queixa-crime conta do conhecimento da autoria.'],
            tip: 'MP: Preso (5 dias) / Solto (15 dias). Queixa-crime: 6 meses do conhecimento da autoria.', tiptype: 'cm-red'
        },
        {
            id: 'DPP_AP04', topic: 'DPP_AP', dif: 'm',
            text: 'Sobre o aditamento da denúncia ou queixa, assinale a alternativa CORRETA:',
            opts: ['O MP pode aditar a queixa em qualquer fase do processo, trazendo novos fatos não incluídos pelo querelante.', 'O MP pode aditar a denúncia para incluir novo réu ou novo fato criminoso ainda não apreciado, desde que antes da sentença.', 'Após o recebimento da denúncia, não é mais possível o aditamento.', 'O juiz pode aditar a denúncia de ofício, se verificar que o MP se omitiu.'],
            ans: 1,
            exp: 'Art. 569 e 384, CPP. O aditamento é possível antes da sentença. O juiz não adita de ofício; comunica o MP para que este proceda ao aditamento.',
            erros: ['ERRADA: o MP pode aditar a queixa somente para incluir coautores (art. 29 c/c 46, §2º).', 'CORRETA.', 'ERRADA: o aditamento é possível antes da sentença.', 'ERRADA: o juiz não adita de ofício — abre vista ao MP.'],
            tip: 'Juiz "viu" fato novo? Abre vistas ao MP. MP decide se adita ou não.', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_PR01', topic: 'DPP_PR', dif: 'm',
            text: 'Sobre a prova testemunhal, assinale a alternativa CORRETA:',
            opts: ['As pessoas que não devem depor, como os que em razão da função conhecem o fato sob sigilo, podem ser compelidas pelo juiz a depor.', 'Toda pessoa que presenciou os fatos pode ser arrolada como testemunha, não podendo se recusar a depor.', 'O cônjuge pode recusar-se a depor contra o seu consorte, exceto em crimes cometidos contra ele ou seus filhos.', 'A contradita de testemunha só é admissível antes do início do depoimento.'],
            ans: 2,
            exp: 'Art. 206, CPP. O cônjuge, ascendente, descendente, irmão do réu não são obrigados a depor. Mas se depuserem, são compromissados.',
            erros: ['ERRADA: quem conhece por sigilo profissional não pode ser compelido a depor (art. 207).', 'ERRADA: algumas pessoas podem se recusar (cônjuge, parentes próximos).', 'CORRETA.', 'ERRADA: a contradita pode ocorrer no início do depoimento.'],
            tip: 'CAD não são obrigados a depor: Cônjuge, Ascendentes, Descendentes (e irmãos) do Réu.', tiptype: 'cm-red'
        },
        {
            id: 'DPP_PR02', topic: 'DPP_PR', dif: 'm',
            text: 'Sobre a prova ilícita, assinale a alternativa CORRETA:',
            opts: ['São inadmissíveis as provas obtidas por meios ilícitos, mas podem ser utilizadas se a parte que se beneficia for o réu (teoria da proporcionalidade pró-réu).', 'As provas ilícitas por derivação (fruits of the poisonous tree) são sempre aproveitadas se a relação de causalidade for meramente hipotética.', 'São inadmissíveis, no processo, as provas obtidas por meios ilícitos, sem qualquer exceção.', 'O juiz deve sempre aproveitar a prova ilícita se for a única prova existente nos autos.'],
            ans: 1,
            exp: 'Art. 157, §1º e §2º, CPP. As provas ilícitas por derivação são inadmissíveis, SALVO quando a relação de causalidade for meramente hipotética "fonte independente" ou "descoberta inevitável".',
            erros: ['ERRADA: provas ilícitas pelo réu também são inadmissíveis em regra, embora a doutrina discuta (pro reo).', 'CORRETA.', 'ERRADA: há a teoria da fonte independente e da inevitável descoberta.', 'ERRADA: provas ilícitas não são aproveitadas.'],
            tip: 'Prova Ilícita por Derivação = "Fruto da Árvore Envenenada". Exceções: Fonte Independente e Descoberta Inevitável.', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_PR03', topic: 'DPP_PR', dif: 'm',
            text: 'Sobre o exame de corpo de delito, assinale a alternativa CORRETA:',
            opts: ['Nos crimes que deixam vestígios, é indispensável o exame de corpo de delito, mas a confissão do acusado pode suprir a falta do exame.', 'A confissão do acusado pode substituir o exame de corpo de delito nos crimes que deixam vestígios.', 'Não é possível o exame de corpo de delito indireto; se não houve perícia, o crime não pode ser provado.', 'É indispensável o exame de corpo de delito nos crimes que deixam vestígios. Se os vestígios desapareceram, a prova testemunhal pode suprir a falta.'],
            ans: 3,
            exp: 'Art. 158 e 168, §§, CPP. A confissão NÃO supre a falta de exame de corpo de delito. Se alguns vestígios desaparecerem, a prova testemunhal supre.',
            erros: ['ERRADA: a confissão não supre a falta do exame.', 'ERRADA: a confissão não substitui o exame.', 'ERRADA: é possível o exame indireto e a prova testemunhal se os vestígios sumiram.', 'CORRETA.'],
            tip: 'Crime que deixa vestígios? Exame é OBRIGATÓRIO. Confissão NÃO substitui. (Art. 158, §único).', tiptype: 'cm-red'
        },
        {
            id: 'DPP_IT01', topic: 'DPP_IT', dif: 'm',
            text: 'Sobre a interceptação telefônica (Lei 9.296/96), assinale a alternativa CORRETA:',
            opts: ['A interceptação telefônica pode ser decretada de ofício pelo juiz, por requisição do membro do MP ou requerimento da autoridade policial.', 'A interceptação é admissível mesmo em crimes punidos com detenção.', 'O prazo de 15 dias para interceptação telefônica não pode ser renovado.', 'A interceptação pode ser determinada oralmente em caso de urgência, com posterior ratificação escrita no prazo de 24 horas.'],
            ans: 0,
            exp: 'Art. 3º, Lei 9.296/96. O prazo é de 15 dias, renovável por igual período. Só para crimes punidos com reclusão.',
            erros: ['CORRETA.', 'ERRADA: só para crimes com pena de reclusão.', 'ERRADA: o prazo de 15 dias é renovável por igual período.', 'ERRADA: a determinação deve ser por escrito, não oral.'],
            tip: 'Interceptação Telefônica: Pode. Prazo: 15 dias + renovável. Só RECLUSÃO. Sempre por escrito. Juiz PODE de ofício.', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_IT02', topic: 'DPP_IT', dif: 'm',
            text: 'Sobre a interceptação telefônica, assinale a alternativa que NÃO é hipótese de cabimento:',
            opts: ['Quando não houver outros meios disponíveis para a produção da prova.', 'Quando os indícios razoáveis de autoria ou participação em infração penal apontem para crime punido com pena de reclusão.', 'Quando o autor do crime, plenamente identificado, solicitar ao juiz a gravação de suas próprias ligações.', 'Para investigar crimes organizados praticados por meio de comunicação telefônica.'],
            ans: 2,
            exp: 'Art. 2º, Lei 9.296/96. Os três requisitos cumulativos são: (1) Sem outros meios de prova, (2) Indício de autoria em crime com reclusão, (3) Não identificado como comunicação interna de escritório de advocacia.',
            erros: ['ERRADA (é hipótese de cabimento).', 'ERRADA (é hipótese de cabimento).', 'CORRETA (NÃO é hipótese de cabimento).', 'ERRADA (é hipótese de cabimento).'],
            tip: 'Interceptação é EXCEÇÃO. Precisa: Indício + Crime de Reclusão + Sem outro meio de prova.', tiptype: 'cm-red'
        },
        {
            id: 'DPP_PP01', topic: 'DPP_PP', dif: 'm',
            text: 'Sobre os requisitos da prisão preventiva, assinale a alternativa CORRETA:',
            opts: ['A prisão preventiva pode ser decretada com base exclusiva em clamor público ou na gravidade abstrata do crime.', 'A prisão preventiva pode ser decretada de ofício pelo juiz durante a fase de investigação policial.', 'O fumus comissi delicti na prisão preventiva é representado pela prova da existência do crime e pelo indício suficiente de autoria.', 'A gravidade em abstrato do crime é fundamento suficiente para a decretação da prisão preventiva.'],
            ans: 2,
            exp: 'Art. 312 e 313, CPP. Fundamentos: GI (Garantia da ordem pública), GE (da instrução criminal), CO (conveniente instrução), AP (aplicação da lei penal). Requisitos: Fumus + Periculum.',
            erros: ['ERRADA: clamor público e gravidade abstrata não são suficientes (STJ/STF).', 'ERRADA: de ofício na investigação, não é mais permitido após o pacote anticrime.', 'CORRETA.', 'ERRADA: jamais por gravidade abstrata.'],
            tip: 'Preventiva: Nunca de ofício no Inquérito. Gravidade Abstrata NUNCA basta.', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_PP02', topic: 'DPP_PP', dif: 'm',
            text: 'Sobre a prisão preventiva, assinale a alternativa CORRETA:',
            opts: ['A prisão preventiva somente pode ser decretada se o máximo da pena cominada ao crime superar 4 anos.', 'A prisão preventiva é adequada para crimes dolosos puníveis com pena privativa de liberdade máxima superior a 4 anos.', 'A prisão preventiva pode ser decretada para crimes culposos, se a pena máxima exceder 2 anos.', 'A preventiva pode ser decretada em crimes com pena de detenção, desde que o réu seja reincidente.'],
            ans: 1,
            exp: 'Art. 313, I, CPP. Crimes dolosos com pena máxima superior a 4 anos. Reincidente em crime doloso (Art. 313, II).',
            erros: ['ERRADA: a redação é "superior a 4 anos" (não somente esse caso).', 'CORRETA.', 'ERRADA: crimes culposos em geral não admitem preventiva.', 'ERRADA: o reincidente específico é o reincidente em crime doloso.'],
            tip: 'Preventiva: Doloso + Pena máx > 4 anos. OU Reincidente em crime DOLOSO.', tiptype: 'cm-red'
        },
        {
            id: 'DPP_PP03', topic: 'DPP_PP', dif: 'm',
            text: 'Sobre a revisão periódica da prisão preventiva, assinale a alternativa CORRETA:',
            opts: ['A prisão preventiva tem prazo máximo de 60 dias para crimes inafiançáveis e 30 dias para os demais.', 'A prisão preventiva deve ser revogada pelo juiz quando não mais subsistirem as razões que a determinaram.', 'A prisão preventiva é irrevogável após a prolação da sentença condenatória.', 'A decretação da prisão preventiva não exige fundamentação específica, podendo basear-se em critérios gerais.'],
            ans: 1,
            exp: 'Art. 316, CPP. A preventiva tem natureza precária e deve ser revogada se as razões cessarem. A revisão é obrigatória a cada 90 dias (Art. 316, parágrafo único).',
            erros: ['ERRADA: a preventiva não tem prazo fixo em dias.', 'CORRETA.', 'ERRADA: a preventiva pode ser revogada a qualquer tempo (inclusive após a sentença).', 'ERRADA: a decretação deve ser fundamentada.'],
            tip: 'Preventiva = Sem prazo fixo, mas revisão obrigatória a cada 90 dias.', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_PT01', topic: 'DPP_PT', dif: 'm',
            text: 'Sobre a prisão temporária (Lei 7.960/89), assinale a alternativa CORRETA:',
            opts: ['A prisão temporária pode ser decretada de ofício pelo juiz na fase investigatória.', 'A prisão temporária é decretada pelo prazo de 5 dias, prorrogável por igual período em caso de extrema necessidade.', 'A prisão temporária pode ser decretada em qualquer fase do processo penal, tanto na investigação quanto durante o processo.', 'A prisão temporária pode ser decretada pela autoridade policial em casos de flagrante.'],
            ans: 1,
            exp: 'Art. 2º, Lei 7.960/89. Prazo: 5+5 dias. Em crimes hediondos: 30+30 dias (Lei 8.072/90). Só na fase de investigação. Nunca de ofício.',
            erros: ['ERRADA: nunca de ofício.', 'CORRETA.', 'ERRADA: só na fase de investigação.', 'ERRADA: decretada pelo juiz (a requerimento do MP ou da AF).'],
            tip: 'Temporária: 5+5 dias (normal) / 30+30 dias (hediondo). Só na INVESTIGAÇÃO. Nunca de ofício.', tiptype: 'cm-red'
        },
        {
            id: 'DPP_PT02', topic: 'DPP_PT', dif: 'm',
            text: 'Sobre as hipóteses de cabimento da prisão temporária, assinale a alternativa CORRETA:',
            opts: ['A prisão temporária é cabível em qualquer crime, desde que haja necessidade para as investigações.', 'A prisão temporária é cabível aos crimes descritos na própria Lei 7.960/89 e nos crimes hediondos, atendidos os demais requisitos.', 'A prisão temporária prescinde de requerimento, podendo o juiz decretá-la de ofício.', 'A imprescindibilidade para as investigações do IP é o único requisito para a prisão temporária.'],
            ans: 1,
            exp: 'Art. 1º c/c Art. 2º, §4º, Lei 7.960/89 + Lei 8.072/90. O inciso III do Art. 1º lista os crimes compatíveis.',
            erros: ['ERRADA: só é cabível para os crimes listados na lei.', 'CORRETA.', 'ERRADA: nunca de ofício.', 'ERRADA: há outros requisitos cumulativos.'],
            tip: 'Temporária só para crimes do rol (Art. 1º, III da lei): homicídio doloso, sequestro, roubo, extorsão, estupro, tráfico...', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_NU01', topic: 'DPP_NU', dif: 'm',
            text: 'Sobre as nulidades no processo penal, assinale a alternativa CORRETA:',
            opts: ['As nulidades absolutas devem ser arguidas na primeira oportunidade em que a parte tiver para falar nos autos, sob pena de preclusão.', 'A nulidade relativa pode ser decretada de ofício pelo juiz, a qualquer tempo.', 'O prejuízo é presumido nas nulidades absolutas, enquanto nas nulidades relativas deve ser demonstrado.', 'Nenhuma nulidade pode ser sanada pelo decurso do tempo ou pela aquiescência das partes.'],
            ans: 2,
            exp: 'Art. 563 e 572, CPP. Nulidade Absoluta = Prejudica a própria lei (Pública). Nulidade Relativa = Prejudica a parte (Privada, preclusão).',
            erros: ['ERRADA: nulidade relativa é que sofre preclusão.', 'ERRADA: nulidade absoluta pode ser decretada de ofício.', 'CORRETA.', 'ERRADA: nulidades relativas podem ser sanadas.'],
            tip: 'Absoluta = Prejuízo Presumido (qualquer momento). Relativa = Prove o prejuízo + Arguir cedo.', tiptype: 'cm-red'
        },
        {
            id: 'DPP_NU02', topic: 'DPP_NU', dif: 'm',
            text: 'Sobre o princípio pas de nullité sans grief no processo penal, assinale a alternativa CORRETA:',
            opts: ['No processo penal, não há nulidade sem que a lei a declare expressamente.', 'Não há nulidade sem que tenha havido um prejuízo concreto para a parte.', 'Toda irregularidade processual resulta automaticamente em nulidade.', 'O princípio do pas de nullité sans grief se aplica somente às nulidades absolutas.'],
            ans: 1,
            exp: 'Art. 563, CPP. Nenhum ato será declarado nulo se da nulidade não resultar prejuízo. Aplica-se tanto às nulidades relativas quanto, em certa medida, às absolutas (STJ tem mitigado).',
            erros: ['ERRADA: esse é o princípio da legalidade das formas.', 'CORRETA.', 'ERRADA: irregularidade não gera nulidade automaticamente.', 'ERRADA: aplica-se principalmente às nulidades relativas, mas o STJ o aplica também às absolutas.'],
            tip: 'Pas de Nullité Sans Grief = "Sem prejuízo, sem nulidade."', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_HC01', topic: 'DPP_HC', dif: 'm',
            text: 'Sobre o habeas corpus, assinale a alternativa CORRETA:',
            opts: ['O habeas corpus pode ser impetrado exclusivamente pelo advogado constituído nos autos.', 'O habeas corpus pode ser preventivo (salvo-conduto), para evitar uma ameaça de prisão iminente, ou liberatório, para cessar uma constrição ilegal em curso.', 'O habeas corpus não pode ser utilizado para discutir o mérito das provas produzidas no processo criminal.', 'O habeas corpus pressupõe que o paciente já esteja em cárcere.'],
            ans: 1,
            exp: 'Art. 647 e 648, CPP. Qualquer pessoa pode impetrar HC. É remédio constitucional (CF, Art. 5º, LXVIII).',
            erros: ['ERRADA: qualquer pessoa pode impetrar HC, até em causa própria.', 'CORRETA.', 'ERRADA: o STJ e STF admitem HC para discutir questões com reflexo na liberdade.', 'ERRADA: pode ser preventivo (salvo-conduto), quando a ameaça é iminente.'],
            tip: 'HC: Qualquer um pode impetrar. Liberatório (preso) ou Preventivo (salvo-conduto).', tiptype: 'cm-red'
        },
        {
            id: 'DPP_HC02', topic: 'DPP_HC', dif: 'm',
            text: 'Sobre a competência para julgamento de habeas corpus, assinale a alternativa CORRETA:',
            opts: ['O STF julgará o HC quando o coator for Tribunal Superior ou quando o HC for impetrado pela Defensoria Pública.', 'O STJ é competente para processar e julgar em originário o HC quando o coator ou o paciente for Tribunal Regional Federal ou juízes federais.', 'A competência para habeas corpus sempre será do Tribunal imediatamente superior ao da autoridade coatora.', 'O Tribunal do Júri tem competência para julgar habeas corpus.'],
            ans: 1,
            exp: 'Art. 105, I, "c", CF/88. STJ julga HC quando o coator for TRF ou juízes federais (e TJ, TRM).',
            erros: ['ERRADA: STF julga HC contra Tribunais Superiores (não por quem impetra).', 'CORRETA.', 'ERRADA: a regra é do coator/paciente, não simplesmente o "imediatamente superior".', 'ERRADA: Tribunal do Júri não julga HC.'],
            tip: 'HC no STF: Coator = Tribunal Superior. HC no STJ: Coator = TRF ou Juiz Federal.', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_JR01', topic: 'DPP_JR', dif: 'm',
            text: 'Sobre o Tribunal do Júri, assinale a alternativa CORRETA:',
            opts: ['O Tribunal do Júri é competente para julgar todos os crimes dolosos, independentemente do bem jurídico tutelado.', 'O Tribunal do Júri é composto por juízes leigos, tendo seu veredicto como soberano e irrecorrível.', 'O Tribunal do Júri é dotado de plenitude de defesa e soberania dos veredictos, mas sua decisão pode ser submetida a novo julgamento pelo Tribunal de Apelação.', 'O sigilo das votações do Júri pode ser afastado por decisão do juiz-presidente em casos de interesse público.'],
            ans: 2,
            exp: 'Art. 5º, XXXVIII, CF/88 e Art. 593, III e §3º, CPP. A soberania dos veredictos não é absoluta: em caso de decisão manifestamente contrária à prova, o Tribunal pode mandar a júri novo.',
            erros: ['ERRADA: só crimes dolosos contra a vida.', 'ERRADA: o veredicto é soberano, mas pode ser cassado para novo júri (não reavaliado pelo Tribunal diretamente).', 'CORRETA.', 'ERRADA: o sigilo das votações é absoluto.'],
            tip: 'Soberania do Júri ≠ Absoluta. Decisão manifestamente contrária às provas = Novo júri.', tiptype: 'cm-red'
        },
        {
            id: 'DPP_JR02', topic: 'DPP_JR', dif: 'm',
            text: 'Sobre a pronúncia no Tribunal do Júri, assinale a alternativa CORRETA:',
            opts: ['A pronúncia é o ato pelo qual o juiz absolve sumariamente o réu por insuficiência de provas na 1ª fase do Júri.', 'Na pronúncia, o juiz submete o réu a julgamento pelo Tribunal do Júri, quando entende que há prova da materialidade e indícios suficientes de autoria.', 'O réu pronunciado deve ser necessariamente preso preventivamente até o julgamento.', 'A pronúncia admite recurso em sentido estrito, ao qual é dado efeito suspensivo.'],
            ans: 1,
            exp: 'Art. 413 e 414, CPP. Pronunciar = "Vai para o Júri". In dúbio pro societate nessa fase (diferente do processo comum).',
            erros: ['ERRADA: a absolvição sumária é diferente da pronúncia.', 'CORRETA.', 'ERRADA: a pronúncia não implica em obrigatoriedade de prisão.', 'ERRADA: o recurso cabível é RSE (recurso em sentido estrito), e em geral não tem efeito suspensivo.'],
            tip: '1ª Fase do Júri: Pronúncia (vai) / Impronúncia (volta) / Absolvição Sumária (acabou) / Desclassificação (outro juízo).', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_RC01', topic: 'DPP_RC', dif: 'm',
            text: 'Sobre o recurso em sentido estrito (RESE), assinale a alternativa CORRETA:',
            opts: ['O RESE cabe da decisão que receber a denúncia ou a queixa-crime.', 'O RESE é recurso de fundamentação livre, cabendo em qualquer decisão interlocutória do processo penal.', 'Cabe RESE da decisão que não receber a denúncia ou queixa.', 'O RESE é recurso exclusivo do Ministério Público.'],
            ans: 2,
            exp: 'Art. 581, I, CPP. O RESE cabe da decisão que NÃO receber a denúncia (rejeitar), não do recebimento. A rejeição é atacável pelo RESE.',
            erros: ['ERRADA: do recebimento não cabe RESE.', 'ERRADA: o RESE tem rol taxativo.', 'CORRETA.', 'ERRADA: pode ser interposto por qualquer parte.'],
            tip: 'RESE cabe da REJEIÇÃO da denúncia (NÃO do recebimento). Rol taxativo.', tiptype: 'cm-red'
        },
        {
            id: 'DPP_RC02', topic: 'DPP_RC', dif: 'm',
            text: 'Sobre a apelação no processo penal, assinale a alternativa CORRETA:',
            opts: ['A apelação no processo penal é o recurso cabível de qualquer decisão definitiva ou de mérito, no prazo de 10 dias.', 'O MP não pode apelar da sentença absolutória para favorecer o réu.', 'A apelação no processo penal deve ser fundamentada no ato de sua interposição, sob pena de não conhecimento.', 'Na apelação do júri por decisão manifestamente contrária às provas, o tribunal pode reformar diretamente a decisão.'],
            ans: 0,
            exp: 'Art. 593 e 600, CPP. Prazo de 5 dias para interposição e 8 dias para arrazoar (prazo separado). O tribunal no júri não reforma — manda a novo julgamento.',
            erros: ['CORRETA.', 'ERRADA: o MP pode apelar em benefício do réu.', 'ERRADA: razões são apresentadas em separado (Art. 600).', 'ERRADA: o Tribunal manda a novo júri, não reforma diretamente.'],
            tip: 'Apelação CPP: Interposição (5 dias) + Razões (8 dias) — separados!', tiptype: 'cm-gold'
        },
        {
            id: 'DPP_RC03', topic: 'DPP_RC', dif: 'm',
            text: 'Sobre o princípio "reformatio in pejus" no processo penal, assinale a alternativa CORRETA:',
            opts: ['No processo penal, o tribunal pode agravar a situação do réu em recurso interposto exclusivamente pela defesa.', 'É vedado ao tribunal piorar a situação do réu em recurso por ele exclusivamente interposto.', 'A reformatio in pejus direta é vedada, mas a indireta é permitida no processo penal.', 'O MP, ao recorrer da decisão absolutória, está sujeito à proibição da reformatio in pejus.'],
            ans: 1,
            exp: 'Art. 617, CPP. O tribunal não pode piorar a situação do réu em recurso exclusivo da defesa (reformatio in pejus direta). A indireta também é vedada.',
            erros: ['ERRADA: é proibida a reformatio in pejus.', 'CORRETA.', 'ERRADA: tanto a direta quanto a indireta são vedadas.', 'ERRADA: o MP não tem essa limitação, pois ele pode requerer condenação mais severa.'],
            tip: 'Só Defesa Recorreu? Tribunal NÃO pode piorar a situação do réu.', tiptype: 'cm-red'
        }
    ]
};
