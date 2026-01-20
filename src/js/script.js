let hpHeroi = 100, hpVilao = 100;
let logHeroi;
let logVilao;
let intervalo;
let lutandoAtualmente = false; // Controle de estado do jogo
let personagemEscolhido = "vegeta"; // Rastrear personagem escolhido

// Garantir que DOM está carregado antes de usar
document.addEventListener('DOMContentLoaded', function() {
    logHeroi = document.getElementById("logHeroi");
    logVilao = document.getElementById("logVilao");
    
    // Validar se elementos foram encontrados
    if (!logHeroi || !logVilao) {
        console.error("Erro: Elementos de log não encontrados no DOM");
        return;
    }
    
    // Inicializar HP
    atualizarHP();
});

function entrar() {
    if (lutandoAtualmente) return; // Prevenir múltiplos cliques
    
    const menu = document.getElementById("menu");
    const escolha = document.getElementById("escolhaLutador");
    
    if (!menu || !escolha) {
        console.error("Erro: Elementos do menu não encontrados");
        return;
    }
    
    menu.classList.add("hidden");
    escolha.classList.remove("hidden");
}

function fugir() {
    if (lutandoAtualmente) return; // Não pode fugir durante luta
    
    // Validar elementos
    const menu = document.getElementById("menu");
    const escolha = document.getElementById("escolhaLutador");
    const barras = document.getElementById("barrasDeVida");
    const logs = document.querySelector(".log-container");
    const botoes = document.getElementById("tentarNovamente");
    const placeholder = document.getElementById("gifPlaceholder");
    
    if (!menu || !escolha || !barras || !logs || !botoes) {
        console.error("Erro: Elementos de fugir não encontrados");
        return;
    }
    
    menu.classList.add("hidden");
    escolha.classList.add("hidden");
    barras.classList.add("hidden");
    logs.classList.remove("hidden");
    
    // Esconder placeholder (vamos mostrar o GIF de fuga)
    if (placeholder) {
        placeholder.classList.add("hidden");
    }
    
    if (logHeroi && logVilao) {
        logHeroi.textContent = "Você fugiu da batalha. Até a próxima!";
        logVilao.textContent = "Você fugiu da batalha. Até a próxima!";
    }
    
    botoes.classList.remove("hidden");

    // Mostrar GIF de fuga/espera e manter o card de tentar novamente visível
    mostrarGifEspera();
}

function iniciarGif() {
    const gif = document.getElementById("gifLuta");
    const placeholder = document.getElementById("gifPlaceholder");
    
    if (!gif) {
        console.error("Erro: Elemento GIF não encontrado");
        return;
    }
    
    // Esconder o placeholder
    if (placeholder) {
        placeholder.classList.add("hidden");
    }
    
    // Recarregar o GIF forçando uma nova requisição
    gif.style.display = "block";
    gif.style.visibility = "visible";
    gif.src = "";
    gif.style.opacity = "1";
    
    // Pequeno delay para garantir que o browser processe a mudança
    setTimeout(() => {
        // Usar gife02.gif durante a luta
        gif.src = "./img/gife02.gif?" + new Date().getTime();
        console.log("GIF carregando de: ./img/gife02.gif");
    }, 50);
}

// Carrega o GIF de espera (fuga) e mantém ele visível até ação do usuário
function mostrarGifEspera() {
    const gif = document.getElementById("gifLuta");
    const placeholder = document.getElementById("gifPlaceholder");

    if (!gif) {
        console.error("Erro: Elemento GIF não encontrado");
        return;
    }

    // Esconder placeholder
    if (placeholder) {
        placeholder.classList.add("hidden");
    }

    // Mostrar o GIF de espera (não auto-pausar)
    gif.style.display = "block";
    gif.style.visibility = "visible";
    gif.style.opacity = "1";
    gif.src = "./img/gife-vegeta-goku-espera.gif?" + new Date().getTime();
    console.log("GIF de espera carregando: ./img/gife-vegeta-goku-espera.gif");
}

function pausarGif() {
    const gif = document.getElementById("gifLuta");
    const placeholder = document.getElementById("gifPlaceholder");
    
    if (!gif) {
        console.error("Erro: Elemento GIF não encontrado");
        return;
    }
    
    gif.style.opacity = "0";
    
    setTimeout(() => {
        gif.style.display = "none";
        gif.src = "";
        
        // Mostrar o placeholder novamente
        if (placeholder) {
            placeholder.classList.remove("hidden");
        }
    }, 300);
}

function mostrarGifVitoria(vencedor) {
    const gif = document.getElementById("gifLuta");
    const placeholder = document.getElementById("gifPlaceholder");
    const vencedorText = document.getElementById("vencedorText");
    const fraseLutador = document.getElementById("fraseLutador");
    
    if (!gif) {
        console.error("Erro: Elemento GIF não encontrado");
        return;
    }
    
    // Esconder o placeholder
    if (placeholder) {
        placeholder.classList.add("hidden");
    }
    
    // Mostrar o texto do vencedor
    if (vencedorText) {
        const nomeVencedor = vencedor === 'vegeta' ? 'Vegeta' : 'Goku';
        vencedorText.textContent = `🏆 O Vencedor é ${nomeVencedor}!`;
        vencedorText.classList.remove("hidden");
        
        // Aplicar cor ao texto do vencedor
        vencedorText.style.color = vencedor === 'vegeta' ? '#0099ff' : '#ff8800';
    }
    
    // Mostrar a frase do lutador
    if (fraseLutador) {
        const frase = vencedor === 'vegeta'
            ? "Sou o Príncipe dos Sayajins, você, um Miserável"
            : "Oi, Eu sou o Goku, adorei vencer você";
        
        fraseLutador.textContent = `"${frase}"`;
        fraseLutador.classList.remove("hidden");
        
        // Aplicar cor ao texto da frase
        fraseLutador.style.color = vencedor === 'vegeta' ? '#0099ff' : '#ff8800';
    }
    
    // Mostrar o GIF de vitória com fade in
    gif.style.display = "block";
    gif.style.visibility = "visible";
    gif.style.opacity = "0";
    gif.src = "";
    
    setTimeout(() => {
        // Carregar GIF baseado no vencedor
        const gifVitoria = vencedor === 'vegeta' 
            ? "./img/gife-vegeta.gif?" 
            : "./img/gife-goku.gif?";
        
        gif.src = gifVitoria + new Date().getTime();
        gif.style.opacity = "1";
        console.log("GIF de vitória carregando: " + gifVitoria);
    }, 50);
}

function escolherLutador(tipo) {
    if (lutandoAtualmente) return; // Prevenir mudança durante combate
    
    // Validar entrada
    if (tipo !== 'vegeta' && tipo !== 'goku') {
        console.error("Tipo de lutador inválido");
        return;
    }
    
    personagemEscolhido = tipo; // Armazenar personagem escolhido
    
    const elementos = [
        document.getElementById("escolhaLutador"),
        document.getElementById("barrasDeVida"),
        document.getElementById("animacaoBatalha"),
        document.querySelector(".log-container")
    ];
    
    if (elementos.some(el => !el)) {
        console.error("Erro: Um ou mais elementos não encontrados");
        return;
    }
    
    elementos[0].classList.add("hidden");
    elementos[1].classList.remove("hidden");
    elementos[2].classList.remove("hidden");
    elementos[3].classList.remove("hidden");

    const introducaoHeroi = tipo === 'vegeta'
        ? "Você escolheu VEGETA!\nHP: 100\n\n"
        : "Seu oponente escolheu GOKU!\n\n";

    const introducaoVilao = tipo === 'goku'
        ? "Você escolheu GOKU!\nHP: 100\n\n"
        : "Seu oponente escolheu VEGETA!\n\n";

    logHeroi.textContent = introducaoHeroi;
    logVilao.textContent = introducaoVilao;

    lutandoAtualmente = true; // Marcar que a luta começou
    simularCombate();
    iniciarGif();
}

function atualizarHP() {
    const barraHeroi = document.getElementById("hpHeroi");
    const barraVilao = document.getElementById("hpVilao");

    // Validar se elementos existem
    if (!barraHeroi || !barraVilao) {
        console.error("Erro: Barras de HP não encontradas");
        return;
    }

    // Garantir que HP não ultrapasse 100%
    const hpHeroiValido = Math.min(Math.max(hpHeroi, 0), 100);
    const hpVilaoValido = Math.min(Math.max(hpVilao, 0), 100);

    barraHeroi.style.width = hpHeroiValido + "%";
    barraVilao.style.width = hpVilaoValido + "%";

    barraHeroi.style.backgroundColor = corPorHP(hpHeroiValido, 'vegeta');
    barraVilao.style.backgroundColor = corPorHP(hpVilaoValido, 'goku');
}

function corPorHP(valor, personagem) {
    if (personagem === 'vegeta') {
        // Vegeta: AZUL
        if (valor <= 25) return "#0066ff";   // azul escuro crítico
        if (valor <= 50) return "#0099ff";   // azul médio
        return "#00ccff";                    // azul claro cheio
    } else {
        // Goku: LARANJA
        if (valor <= 25) return "#ff6600";   // laranja escuro crítico
        if (valor <= 50) return "#ff8800";   // laranja médio
        return "#ffaa00";                    // laranja claro cheio
    }
}

function simularCombate() {
    // Limpar intervalo anterior se existir
    if (intervalo) clearInterval(intervalo);
    
    hpHeroi = 100;
    hpVilao = 100;
    atualizarHP();
    let turno = 1;
    const maxTurnos = 150; // Limite de segurança para evitar loops infinitos
    const mensagensHeroi = [];
    const mensagensVilao = [];

    intervalo = setInterval(() => {
        let atqHeroi = Math.floor(Math.random() * 20);
        let atqVilao = Math.floor(Math.random() * 20);

        hpHeroi = Math.max(0, hpHeroi - atqVilao);
        hpVilao = Math.max(0, hpVilao - atqHeroi);

        mensagensHeroi.push(`Turno ${turno}\nVEGETA ATINGIU COM: ${atqHeroi}\nHP DO VEGETA: ${hpHeroi}\n`);
        mensagensVilao.push(`Turno ${turno}\nGOKU ATINGIU COM: ${atqVilao}\nHP DO GOKU: ${hpVilao}\n`);

        // Atualizar DOM a cada turno
        logHeroi.textContent = mensagensHeroi.join('\n');
        logVilao.textContent = mensagensVilao.join('\n');

        atualizarHP();

        // Verificar vitória ou limite de turnos
        if (hpHeroi === 0 || hpVilao === 0 || turno >= maxTurnos) {
            clearInterval(intervalo);

            let resultado = "";
            let vencedor = null;
            
            if (hpHeroi === 0 && hpVilao !== 0) {
                resultado = "*** GOKU VENCEU ***";
                vencedor = 'goku';
            } else if (hpVilao === 0 && hpHeroi !== 0) {
                resultado = "*** VEGETA VENCEU ***";
                vencedor = 'vegeta';
            } else if (turno >= maxTurnos) {
                resultado = "*** COMBATE EMPATADO (LIMITE DE TURNOS) ***";
            } else {
                resultado = "HOUVE EMPATE!!!";
            }

            logHeroi.textContent = mensagensHeroi.join('\n') + '\n\n' + resultado;
            logVilao.textContent = mensagensVilao.join('\n') + '\n\n' + resultado;

            document.getElementById("tentarNovamente").classList.remove("hidden");
            
            // Mostrar GIF de vitória se houver vencedor
            if (vencedor) {
                mostrarGifVitoria(vencedor);
            } else {
                pausarGif();
            }
        }

        turno++;
    }, 1000);
}

function resetar() {
    if (intervalo) clearInterval(intervalo); // Limpar qualquer intervalo ativo
    lutandoAtualmente = false; // Permitir novo jogo
    
    // Esconder botões imediatamente
    document.getElementById("tentarNovamente").classList.add("hidden");
    // Remover mensagem de espera, se existir
    const msgEsperando = document.getElementById('mensagemEsperando');
    if (msgEsperando) msgEsperando.remove();
    
    if (logHeroi) logHeroi.textContent = "";
    if (logVilao) logVilao.textContent = "";
    
    // Resetar texto do vencedor
    const vencedorText = document.getElementById("vencedorText");
    if (vencedorText) {
        vencedorText.textContent = "";
        vencedorText.classList.add("hidden");
    }
    
    // Resetar frase do lutador
    const fraseLutador = document.getElementById("fraseLutador");
    if (fraseLutador) {
        fraseLutador.textContent = "";
        fraseLutador.classList.add("hidden");
    }
    
    document.getElementById("menu").classList.remove("hidden");
    document.getElementById("barrasDeVida").classList.add("hidden");
    document.getElementById("animacaoBatalha").classList.add("hidden");
    document.querySelector(".log-container").classList.add("hidden");
    atualizarHP();
    pausarGif();

    // Reiniciar o fluxo automaticamente: abrir tela de escolha após pequeno delay
    // Isso atende ao requisito de que 'tentar novamente -> sim' reinicie o fluxo.
    setTimeout(() => {
        try {
            entrar();
        } catch (e) {
            // se entrar() falhar, apenas logamos e mantemos o menu visível
            console.error('Não foi possível iniciar a escolha automaticamente:', e);
        }
    }, 150);
}

function fim() {
    // Garantir que o card de tentar novamente permaneça visível
    const tentar = document.getElementById("tentarNovamente");
    if (tentar) {
        tentar.classList.remove("hidden");
    }

    // Adicionar mensagem de espera logo abaixo do card (uma vez)
    let msg = document.getElementById("mensagemEsperando");
    if (!msg) {
        msg = document.createElement('div');
        msg.id = 'mensagemEsperando';
        msg.style.marginTop = '12px';
        msg.style.textAlign = 'center';
        msg.style.fontWeight = 'bold';
        msg.style.color = '#00ccff';
        msg.textContent = 'Estamos lhe esperando';
        if (tentar && tentar.parentNode) {
            tentar.parentNode.insertBefore(msg, tentar.nextSibling);
        }
    } else {
        msg.textContent = 'Estamos lhe esperando';
        msg.style.display = '';
    }

    if (logHeroi && logVilao) {
        const mensagemFinal = "\nATÉ O PRÓXIMO BINÁRIO FIGHTER!";
        logHeroi.textContent = logHeroi.textContent + mensagemFinal;
        logVilao.textContent = logVilao.textContent + mensagemFinal;
    }

    pausarGif();
}
