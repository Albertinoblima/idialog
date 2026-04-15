// ─── QUESTÕES — RACIOCÍNIO LÓGICO ───────────────────────────────────────────
window.QR = window.QR || {};
window.QR['raciocinio-logico'] = {
    id: 'raciocinio-logico',
    area: 'Conhecimentos Gerais',
    areaId: 'conhecimentos-gerais',
    label: 'Raciocínio Lógico',
    short: 'R. Lógico',
    color: '#3A246A',
    icon: '🔢',
    simuladoPath: 'materias/nucleo-comum/raciocinio-logico/simulado.html',
    topics: {
        'RL_NL': 'Negação Lógica', 'RL_EQ': 'Equivalências Lógicas',
        'RL_QT': 'Quantificadores', 'RL_TV': 'Tabela-Verdade',
        'RL_CJ': 'Conjuntos', 'RL_SQ': 'Sequências Lógicas',
        'RL_DL': 'Diagramas Lógicos', 'RL_AL': 'Argumentação Lógica',
        'RL_PB': 'Probabilidade'
    },
    topicColors: {
        'RL_NL': { bg: '#E6F1FB', c: '#0C447C' }, 'RL_EQ': { bg: '#FCEAEA', c: '#7A1515' },
        'RL_QT': { bg: '#E3F5EF', c: '#085041' }, 'RL_TV': { bg: '#EDE8F8', c: '#3A246A' },
        'RL_CJ': { bg: '#FFF3DC', c: '#6A4800' }, 'RL_SQ': { bg: '#FCEAEA', c: '#7A1515' },
        'RL_DL': { bg: '#FAECE7', c: '#712B13' }, 'RL_AL': { bg: '#F1EFE8', c: '#2C2C2A' },
        'RL_PB': { bg: '#EAF3DE', c: '#173404' }
    },
    questions: [
        {
            id: 'RL_NL01', topic: 'RL_NL', dif: 'l',
            text: 'Qual é a negação correta da proposição "Todos os concurseiros são estudiosos"?',
            opts: ['Nenhum concurseiro é estudioso.', 'Existe pelo menos um concurseiro que não é estudioso.', 'Todos os concurseiros não são estudiosos.', 'Alguns concurseiros são estudiosos.'],
            ans: 1,
            exp: 'A negação de "Todo A é B" é "Existe pelo menos um A que não é B" (∃x: ¬B(x)). Negar "TODOS" = "ALGUM NÃO".',
            erros: ['ERRADA: essa é a negação de "Algum concurseiro é estudioso".', 'CORRETA.', 'ERRADA: "Todos não" equivale a "Nenhum".', 'ERRADA: "Alguns são" não nega "Todos são".'],
            tip: 'TODOS → Algum NÃO. NENHUM → Algum. ALGUM É → Nenhum é. ALGUM NÃO → Todos são.', tiptype: 'cm-gold'
        },
        {
            id: 'RL_NL02', topic: 'RL_NL', dif: 'm',
            text: 'Considere a proposição: "Se chover, então não sairei". Qual é a negação desta proposição?',
            opts: ['Se chover, então sairei.', 'Se não chover, então sairei.', 'Choverá e sairei.', 'Não choverá e não sairei.'],
            ans: 2,
            exp: 'A negação do condicional "Se P então Q" (P→Q) é "P e não-Q". Logo, "Choveu E sairei".',
            erros: ['ERRADA: isso é o contrapositivo aplicado ao consequente.', 'ERRADA: isso é a inversa.', 'CORRETA.', 'ERRADA: isso nega ambas as partes (não é a negação do condicional).'],
            tip: 'Negação de P→Q = P ∧ ¬Q. ("P e não Q"). NUNCA outro condicional!', tiptype: 'cm-red'
        },
        {
            id: 'RL_NL03', topic: 'RL_NL', dif: 'm',
            text: 'A negação da proposição "Pedro é médico ou Paulo é advogado" é:',
            opts: ['Pedro não é médico e Paulo não é advogado.', 'Pedro não é médico ou Paulo não é advogado.', 'Pedro é médico e Paulo não é advogado.', 'Pedro não é médico ou Paulo é advogado.'],
            ans: 0,
            exp: 'Lei de De Morgan: ¬(P∨Q) = ¬P∧¬Q. A negação da disjunção (OU) é a conjunção (E) das negações.',
            erros: ['CORRETA.', 'ERRADA: essa é a negação da conjunção (E).', 'ERRADA: essa mantém uma parte sem negar.', 'ERRADA: essa mantém Pedro sem negar.'],
            tip: 'De Morgan: Nega o OU → E das negações. Nega o E → OU das negações.', tiptype: 'cm-gold'
        },
        {
            id: 'RL_NL04', topic: 'RL_NL', dif: 'm',
            text: 'Qual é a negação de "Existe pelo menos uma pessoa que é feliz e rica"?',
            opts: ['Toda pessoa não é feliz e não é rica.', 'Toda pessoa é infeliz ou não é rica.', 'Não existe nenhuma pessoa que seja feliz e rica.', 'Toda pessoa é infeliz e não é rica.'],
            ans: 1,
            exp: 'Negar ∃(P∧Q) = ∀(¬P∨¬Q). A negação do existencial vira universal, e a negação da conjunção (∧) vira disjunção (∨) das negações.',
            erros: ['ERRADA: a negação da conjunção é a disjunção das negações.', 'CORRETA.', 'ERRADA: seria a tradução direta, sem aplicar De Morgan internamente com o universal.', 'ERRADA: deveria usar o "ou" na negação interna.'],
            tip: 'Negar ALGUM/EXISTE com conjunção (E): vira TODOS com disjunção (OU) das negações.', tiptype: 'cm-red'
        },
        {
            id: 'RL_NL05', topic: 'RL_NL', dif: 'm',
            text: 'Considere a proposição: "O candidato passou no concurso se e somente se estudou muito." Sua negação é:',
            opts: ['O candidato não passou no concurso se e somente se estudou muito.', 'O candidato passou no concurso e não estudou muito, ou não passou no concurso e estudou muito.', 'Se o candidato passou no concurso, então estudou muito.', 'Se o candidato não passou no concurso, então não estudou muito.'],
            ans: 1,
            exp: 'A negação do bicondicional (P↔Q) é (P∧¬Q)∨(¬P∧Q). A proposição é falsa quando os membros têm valores diferentes.',
            erros: ['ERRADA: modificar só um lado não nega o bicondicional.', 'CORRETA.', 'ERRADA: isso é parte do bicondicional original.', 'ERRADA: isso é a recíproca do original.'],
            tip: 'Nega P↔Q: "P e não-Q" OU "não-P e Q". Ou seja, quando os dois divergem.', tiptype: 'cm-gold'
        },
        {
            id: 'RL_NL06', topic: 'RL_NL', dif: 'm',
            text: 'A negação de "Nenhum aluno é reprovado" é:',
            opts: ['Todos os alunos são reprovados.', 'Algum aluno é reprovado.', 'Algum aluno não é reprovado.', 'Nenhum aluno é aprovado.'],
            ans: 1,
            exp: 'Negar "NENHUM A é B" = "ALGUM A é B". (A negação do universal negativo é o existencial positivo.)',
            erros: ['ERRADA: negar "Nenhum" não implica "Todos".', 'CORRETA.', 'ERRADA: "Algum não" negaria "Todos são".', 'ERRADA: troca o predicado, o que não é negação lógica.'],
            tip: 'TODOS → Algum NÃO. NENHUM → Algum. (Opostos são contraditórios, nunca podem ser os dois V ou os dois F.)', tiptype: 'cm-red'
        },
        {
            id: 'RL_EQ01', topic: 'RL_EQ', dif: 'm',
            text: 'Qual das seguintes proposições é logicamente equivalente a "Se o servidor for pontual, então será promovido"?',
            opts: ['Se o servidor não for pontual, então não será promovido.', 'Se o servidor não for promovido, então não foi pontual.', 'O servidor é pontual e não foi promovido.', 'O servidor não é pontual ou será promovido.'],
            ans: 1,
            exp: 'Equivalências do condicional P→Q: Contrapositiva: ¬Q→¬P (EQUIVALENTE). Inversa ¬P→¬Q (NÃO equivalente). A→B ≡ ¬B→¬A.',
            erros: ['ERRADA: essa é a inversa (não é equivalente).', 'CORRETA. É a contrapositiva.', 'ERRADA: essa é a negação.', 'ERRADA: essa é equivalente ao condicional, mas a questão pergunta qual é.'],
            tip: 'P→Q ≡ ¬Q→¬P (Contrapositiva). P→Q ≡ ¬P∨Q (Disjunção equivalente).', tiptype: 'cm-gold'
        },
        {
            id: 'RL_EQ02', topic: 'RL_EQ', dif: 'm',
            text: 'A proposição "¬P ∨ Q" é equivalente a:',
            opts: ['P ∧ ¬Q', 'P → Q', '¬P → ¬Q', 'P ↔ Q'],
            ans: 1,
            exp: 'P→Q ≡ ¬P∨Q. Essa é a equivalência fundamental do condicional.',
            erros: ['ERRADA: P ∧ ¬Q é a negação de P→Q.', 'CORRETA.', 'ERRADA: ¬P→¬Q é a inversa de P→Q.', 'ERRADA: o bicondicional é mais restrito.'],
            tip: 'P→Q = "Não-P OU Q". Se não lembro: quando P é falso, qualquer Q torna o condicional verdadeiro.', tiptype: 'cm-red'
        },
        {
            id: 'RL_QT01', topic: 'RL_QT', dif: 'm',
            text: 'Com relação às proposições quantificadas, assinale a alternativa CORRETA:',
            opts: ['A proposição "Todos os juízes são honestos" tem valor lógico Verdadeiro se existir pelo menos um juiz honesto.', 'A proposição "Existe pelo menos um juiz desonesto" é verdadeira se nem todos os juízes forem honestos.', 'A proposição "Nenhum político é corrupto" é verdadeira se a maioria dos políticos não for corrupta.', 'A proposição "Algum concurseiro reprova" não implica que "Todos os concurseiros reprovam".'],
            ans: 3,
            exp: '"Algum" (existencial) não implica "Todos" (universal). O existencial afirma pelo menos um caso.',
            erros: ['ERRADA: "Todos" exige que TODOS sejam honestos.', 'ERRADA: basta que um seja desonesto para ser verdadeira.', 'ERRADA: "Nenhum" exige que ZERO sejam corruptos.', 'CORRETA.'],
            tip: 'ALGUNS não implica TODOS. ALGUM = pelo menos um. TODOS = sem exceção.', tiptype: 'cm-gold'
        },
        {
            id: 'RL_QT02', topic: 'RL_QT', dif: 'm',
            text: 'Assinale a alternativa que corretamente representa a negação de "Todos os homens são mortais":',
            opts: ['Nenhum homem é mortal.', 'Existe pelo menos um homem que não é mortal.', 'Todos os homens são imortais.', 'Nenhum homem é imortal.'],
            ans: 1,
            exp: 'Negar ∀x P(x) = ∃x ¬P(x). A negação de "Todos são" é "Existe pelo menos um que não é".',
            erros: ['ERRADA: negar não transforma em universal negativo.', 'CORRETA.', 'ERRADA: "todos são imortais" é mais forte que a negação.', 'ERRADA: "Nenhum é imortal" é equivalente a "Todos são mortais".'],
            tip: 'Negação: TODOS → ALGUM NÃO. NENHUM → ALGUM É.', tiptype: 'cm-red'
        },
        {
            id: 'RL_TV01', topic: 'RL_TV', dif: 'm',
            text: 'Uma proposição composta do tipo P ∧ Q (conjunção) é verdadeira quando:',
            opts: ['Pelo menos uma das partes for verdadeira.', 'Ambas as partes, P e Q, são verdadeiras.', 'P é verdadeiro e Q é falso.', 'P é falso e Q é verdadeiro.'],
            ans: 1,
            exp: 'A conjunção (E, ∧) só é verdadeira quando AMBAS as partes são verdadeiras. Caso contrário, é falsa.',
            erros: ['ERRADA: isso descreve a disjunção (OU).', 'CORRETA.', 'ERRADA: a conjunção seria falsa neste caso.', 'ERRADA: a conjunção seria falsa neste caso.'],
            tip: 'E (∧): Verdadeiro só quando DOIS VERDADEIROS. OU (∨): Falso só quando DOIS FALSOS.', tiptype: 'cm-gold'
        },
        {
            id: 'RL_TV02', topic: 'RL_TV', dif: 'm',
            text: 'Considerando P=V e Q=F, qual o valor lógico da proposição composta ¬P → Q?',
            opts: ['Verdadeiro', 'Falso', 'Indeterminado', 'Depende do contexto'],
            ans: 0,
            exp: '¬P= ¬V = F. Então F→F. O condicional é falso apenas quando o antecedente é V e o consequente é F. Como o antecedente é F, a proposição é V.',
            erros: ['CORRETA.', 'ERRADA: com antecedente falso, o condicional é sempre verdadeiro.', 'ERRADA: em lógica clássica, o valor é determinado.', 'ERRADA: o valor é objetivamente calculável.'],
            tip: 'Condicional é FALSO apenas quando: Antecedente V e Consequente F. Em todos os outros casos, V.', tiptype: 'cm-red'
        },
        {
            id: 'RL_CJ01', topic: 'RL_CJ', dif: 'm',
            text: 'Em uma turma de 40 alunos, 25 gostam de Matemática e 20 gostam de Português. Sabe-se que todos gostam de pelo menos uma das duas disciplinas. Quantos alunos gostam de ambas?',
            opts: ['5', '45', '15', '10'],
            ans: 0,
            exp: '|M∪P| = |M| + |P| - |M∩P|. 40 = 25 + 20 - |M∩P|. |M∩P| = 45 - 40 = 5.',
            erros: ['CORRETA.', 'ERRADA: 45 = 25+20, sem descontar a interseção.', 'ERRADA: divisão incorreta.', 'ERRADA: cálculo incorreto.'],
            tip: 'Fórmula: |A∪B| = |A| + |B| − |A∩B|. Rearranje: |A∩B| = |A| + |B| − |A∪B|.', tiptype: 'cm-gold'
        },
        {
            id: 'RL_CJ02', topic: 'RL_CJ', dif: 'm',
            text: 'Em um grupo de 100 pessoas, 60 falam inglês, 40 falam espanhol e 20 falam os dois idiomas. Quantas pessoas não falam nenhum dos dois idiomas?',
            opts: ['20', '40', '80', '0'],
            ans: 0,
            exp: '|I∪E| = 60 + 40 - 20 = 80. Não falam nenhum = 100 - 80 = 20.',
            erros: ['CORRETA.', 'ERRADA: confundiu subtração com resultado final.', 'ERRADA: 80 é o total que fala pelo menos um.', 'ERRADA: há quem não fale nenhum.'],
            tip: 'Não falam nenhum = Total - |A∪B|. Não se esqueça de subtrair a interseção ao calcular a união.', tiptype: 'cm-red'
        },
        {
            id: 'RL_SQ01', topic: 'RL_SQ', dif: 'm',
            text: 'Qual é o próximo número da sequência: 2, 5, 10, 17, 26, ___?',
            opts: ['33', '35', '37', '39'],
            ans: 2,
            exp: 'As diferenças são: 3, 5, 7, 9... (ímpares crescentes). Portanto a diferença seguinte é 11. 26 + 11 = 37.',
            erros: ['ERRADA: diferença de 7 (repetindo).', 'ERRADA: diferença de 9 (repetindo).', 'CORRETA.', 'ERRADA: diferença de 13.'],
            tip: 'Calcule as DIFERENÇAS entre os termos. Verifique se formam uma PA ou PG.', tiptype: 'cm-gold'
        },
        {
            id: 'RL_SQ02', topic: 'RL_SQ', dif: 'm',
            text: 'Qual é a letra que completa a sequência: B, D, G, K, P, ___?',
            opts: ['T', 'U', 'V', 'W'],
            ans: 2,
            exp: 'Posições: B=2, D=4, G=7, K=11, P=16. Diferenças: +2, +3, +4, +5, +6. Próxima posição: 16+6=22 = V.',
            erros: ['ERRADA: posição 20.', 'ERRADA: posição 21.', 'CORRETA.', 'ERRADA: posição 23.'],
            tip: 'Sequência de letras? Converta para NÚMEROS (posição A=1, B=2...) e analise a diferença.', tiptype: 'cm-red'
        },
        {
            id: 'RL_DL01', topic: 'RL_DL', dif: 'm',
            text: 'Todos os analistas são servidores. Nenhum servidor é terceirizado. Conclui-se que:',
            opts: ['Nenhum analista é terceirizado.', 'Algum analista é terceirizado.', 'Alguns servidores são analistas.', 'Nenhum terceirizado é servidor.'],
            ans: 0,
            exp: 'Se Analistas ⊆ Servidores, e Servidores ∩ Terceirizados = ∅, então Analistas ∩ Terceirizados = ∅.',
            erros: ['CORRETA.', 'ERRADA: como nenhum servidor é terceirizado e todos os analistas são servidores, nenhum analista é terceirizado.', 'ERRADA: não é possível concluir isso das premissas.', 'ERRADA: isso equivale à segunda premissa, não é uma conclusão nova.'],
            tip: 'Desenhe os círculos: Analistas dentro de Servidores, e Servidores separado de Terceirizados.', tiptype: 'cm-gold'
        },
        {
            id: 'RL_DL02', topic: 'RL_DL', dif: 'm',
            text: 'Alguns professores são pesquisadores. Todos os pesquisadores são doutores. Qual conclusão é NECESSARIAMENTE verdadeira?',
            opts: ['Todos os professores são doutores.', 'Alguns professores são doutores.', 'Nenhum professor é doutor.', 'Todos os doutores são professores.'],
            ans: 1,
            exp: 'Os professores que são pesquisadores são também doutores. Como alguns professores são pesquisadores, esses mesmos professores são doutores → Logo, alguns professores são doutores.',
            erros: ['ERRADA: nem todos os professores são pesquisadores.', 'CORRETA.', 'ERRADA: pelo menos os pesquisadores-professores são doutores.', 'ERRADA: pode haver doutores que não sejam professores.'],
            tip: 'Quando "Alguns A são B" e "Todos B são C", conclui-se "Alguns A são C".', tiptype: 'cm-red'
        },
        {
            id: 'RL_DL03', topic: 'RL_DL', dif: 'm',
            text: 'Nenhum réptil é mamífero. Todos os dinossauros são répteis. Conclui-se que:',
            opts: ['Todos os mamíferos são répteis.', 'Alguns dinossauros são mamíferos.', 'Nenhum dinossauro é mamífero.', 'Algum réptil é mamífero.'],
            ans: 2,
            exp: 'Dinossauros ⊆ Répteis. Répteis ∩ Mamíferos = ∅. Logo, Dinossauros ∩ Mamíferos = ∅ → Nenhum dinossauro é mamífero.',
            erros: ['ERRADA: o contrário não é necessariamente verdadeiro.', 'ERRADA: contradiz as premissas.', 'CORRETA.', 'ERRADA: contradiz a primeira premissa.'],
            tip: 'Se A ⊆ B e B∩C=∅, então A∩C=∅ (A herda a exclusão de B com C).', tiptype: 'cm-gold'
        },
        {
            id: 'RL_DL04', topic: 'RL_DL', dif: 'm',
            text: 'Todo aprovado estudou. João não estudou. Conclui-se que:',
            opts: ['João não foi aprovado.', 'João estudou mas não foi aprovado.', 'João pode ter sido aprovado.', 'João foi reprovado e estudou.'],
            ans: 0,
            exp: 'Aprovado → Estudou. ¬Estudou → ¬Aprovado (Contrapositiva). Como João não estudou, João não foi aprovado.',
            erros: ['CORRETA.', 'ERRADA: João notadamente NÃO estudou.', 'ERRADA: pela contrapositiva, João definitivamente não foi aprovado.', 'ERRADA: João não estudou.'],
            tip: 'Para aplicar a contrapositiva: "Se P então Q" → "Se não-Q então não-P". Modus Tollens.', tiptype: 'cm-red'
        },
        {
            id: 'RL_AL01', topic: 'RL_AL', dif: 'm',
            text: 'Qual das seguintes formas de argumento é VÁLIDA?',
            opts: ['P→Q; Q; Logo P. (Afirmação do consequente)', 'P→Q; ¬P; Logo ¬Q. (Negação do antecedente)', 'P→Q; P; Logo Q. (Modus Ponens)', 'P→Q; ¬Q→P; Logo P→P.'],
            ans: 2,
            exp: 'Modus Ponens: Afirmo o antecedente (P), logo afirmo o consequente (Q). Argumento válido. As opções A e B são falácias clássicas.',
            erros: ['ERRADA: Falácia da Afirmação do Consequente.', 'ERRADA: Falácia da Negação do Antecedente.', 'CORRETA.', 'ERRADA: tautológico mas não form argumentativa padrão.'],
            tip: 'Argumentos VÁLIDOS: Modus Ponens (P→Q; P; Logo Q) e Modus Tollens (P→Q; ¬Q; Logo ¬P).', tiptype: 'cm-gold'
        },
        {
            id: 'RL_AL02', topic: 'RL_AL', dif: 'm',
            text: 'Considere o argumento: "Se chover, a rua fica molhada. A rua está molhada. Logo, choveu." Este argumento é:',
            opts: ['Válido, pois a conclusão é uma consequência lógica necessária das premissas.', 'Inválido, pois comete a falácia da afirmação do consequente.', 'Válido, pois utiliza a contrapositiva corretamente.', 'Inválido, pois a segunda premissa contradiz a primeira.'],
            ans: 1,
            exp: 'Este argumento comete a Falácia da Afirmação do Consequente. A rua pode estar molhada por outras razões (ex: vazamento). P→Q; Q; ∴P — INVÁLIDO.',
            erros: ['ERRADA: a conclusão não é necessária.', 'CORRETA.', 'ERRADA: não usa a contrapositiva.', 'ERRADA: as premissas não se contradizem.'],
            tip: 'Falácia da Afirmação do Consequente: P→Q; Q; Logo P. (INVÁLIDO — "pós hoc ergo propter hoc").', tiptype: 'cm-red'
        },
        {
            id: 'RL_AL03', topic: 'RL_AL', dif: 'm',
            text: '"Se estudo, passo. Não passei. Logo, não estudei." Este argumento é:',
            opts: ['Inválido: falácia da negação do antecedente.', 'Válido: Modus Tollens.', 'Inválido: falácia da afirmação do consequente.', 'Válido: Silogismo disjuntivo.'],
            ans: 1,
            exp: 'Modus Tollens: P→Q; ¬Q; Logo ¬P. "Não passei" (¬Q) → "Não estudei" (¬P). Argumento válido.',
            erros: ['ERRADA: não é a negação do antecedente.', 'CORRETA.', 'ERRADA: não é a afirmação do consequente.', 'ERRADA: não é um silogismo disjuntivo.'],
            tip: 'Modus Tollens = "Contra-prova". Nega o consequente para negar o antecedente.', tiptype: 'cm-gold'
        },
        {
            id: 'RL_AL04', topic: 'RL_AL', dif: 'm',
            text: 'Considere o argumento hipotético encadeado: "Se estudo, então passo. Se passo, then serei contratado. Logo:":',
            opts: ['Se não estudo, não serei contratado.', 'Se estudo, serei contratado.', 'Se serei contratado, então passei.', 'Não estudar implica passar.'],
            ans: 1,
            exp: 'Silogismo Hipotético: P→Q e Q→R, logo P→R. "Estudo→Passo" e "Passo→Contratado", logo "Estudo→Contratado".',
            erros: ['ERRADA: a inversa/contrapositiva encadeada não é garantida como conclusão direta.', 'CORRETA.', 'ERRADA: a ordem é "Contratado←Passei", não o contrário.', 'ERRADA: contradiz as premissas.'],
            tip: 'Silogismo Hipotético: P→Q e Q→R, logo P→R. "Cadeia" de condicionais.', tiptype: 'cm-red'
        },
        {
            id: 'RL_PB01', topic: 'RL_PB', dif: 'm',
            text: 'Uma urna contém 5 bolas vermelhas e 3 bolas azuis. Qual é a probabilidade de sortear uma bola vermelha?',
            opts: ['3/8', '5/3', '5/8', '1/2'],
            ans: 2,
            exp: 'P(Red) = Casos favoráveis / Total = 5 / (5+3) = 5/8.',
            erros: ['ERRADA: 3/8 é a probabilidade da azul.', 'ERRADA: 5/3 é a razão vermelho/azul, não a probabilidade.', 'CORRETA.', 'ERRADA: 1/2 seria se tivesse 4 de cada.'],
            tip: 'P(A) = Casos Favoráveis / Total de Casos Possíveis. Simples assim!', tiptype: 'cm-gold'
        },
        {
            id: 'RL_PB02', topic: 'RL_PB', dif: 'm',
            text: 'Lança-se um dado não viciado de 6 faces. Qual a probabilidade de sair um número par?',
            opts: ['1/6', '1/3', '1/2', '2/3'],
            ans: 2,
            exp: 'Pares: {2,4,6} = 3 casos favoráveis. Total: 6. P = 3/6 = 1/2.',
            erros: ['ERRADA: probabilidade de um número específico.', 'ERRADA: 2/6.', 'CORRETA.', 'ERRADA: probabilidade de 4 eventos.'],
            tip: 'Dados: 6 faces. Pares = 3. Ímpares = 3. P(Par) = P(Ímpar) = 1/2.', tiptype: 'cm-red'
        },
        {
            id: 'RL_PB03', topic: 'RL_PB', dif: 'm',
            text: 'Dois eventos A e B são independentes. P(A)=0,4 e P(B)=0,5. Qual é P(A∩B)?',
            opts: ['0,9', '0,1', '0,2', '0,45'],
            ans: 2,
            exp: 'Para eventos independentes: P(A∩B) = P(A) × P(B) = 0,4 × 0,5 = 0,2.',
            erros: ['ERRADA: 0,9 é P(A)+P(B).', 'ERRADA: 0,1 é P(A)-P(B)/2.', 'CORRETA.', 'ERRADA: divisão incorreta.'],
            tip: 'Eventos Independentes: P(A e B) = P(A) × P(B). "e" = multiplica.', tiptype: 'cm-gold'
        },
        {
            id: 'RL_PB04', topic: 'RL_PB', dif: 'm',
            text: 'De um baralho com 52 cartas, qual a probabilidade de retirar um ás?',
            opts: ['1/52', '1/13', '4/52', '1/4'],
            ans: 1,
            exp: 'Há 4 ases em um baralho de 52 cartas. P = 4/52 = 1/13.',
            erros: ['ERRADA: P de uma carta específica.', 'CORRETA.', 'ERRADA: 4/52 está correto, mas 1/13 é a forma simplificada.'],
            tip: 'Sempre simplifique a fração. 4/52 = 1/13.', tiptype: 'cm-red'
        },
        {
            id: 'RL_PB05', topic: 'RL_PB', dif: 'm',
            text: 'Uma moeda honesta é lançada 3 vezes. Qual a probabilidade de sair cara nas 3 vezes?',
            opts: ['1/2', '3/8', '1/8', '1/6'],
            ans: 2,
            exp: 'Cada lançamento é independente: P(C)=1/2. P(3 caras) = (1/2)³ = 1/8.',
            erros: ['ERRADA: probabilidade de um único lançamento.', 'ERRADA: probabilidade de exatamente 2 caras.', 'CORRETA.', 'ERRADA: não tem relação com moeda.'],
            tip: 'Lançamentos INDEPENDENTES: multiplica. (1/2)×(1/2)×(1/2) = 1/8.', tiptype: 'cm-gold'
        },
        {
            id: 'RL_PB06', topic: 'RL_PB', dif: 'm',
            text: 'Em uma sala há 10 pessoas, sendo 6 homens e 4 mulheres. Sorteia-se 1 pessoa. Qual a probabilidade de ser homem?',
            opts: ['4/10', '1/6', '6/10', '1/4'],
            ans: 2,
            exp: 'P(Homem) = 6/10 = 3/5 = 0,6. Há 6 casos favoráveis em 10 possíveis.',
            erros: ['ERRADA: esta é a probabilidade de ser mulher.', 'ERRADA: seria se houvesse 6 grupos de 1.', 'CORRETA.', 'ERRADA: seria se fosse 1 em 4 mulheres.'],
            tip: 'Sempre: Favoráveis / Total. Aqui: 6/10 (simplificável para 3/5).', tiptype: 'cm-red'
        }
    ]
};
