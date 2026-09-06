let hpHeroi = 100, hpVilao = 100;
let logHeroi = document.getElementById("logHeroi");
let logVilao = document.getElementById("logVilao");
let intervalo;

function entrar() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("escolhaLutador").classList.remove("hidden");
}

function fugir() {
    logHeroi.innerText = "Você fugiu da batalha. Até a próxima!";
    logVilao.innerText = "Você fugiu da batalha. Até a próxima!";
}

function iniciarGif() {
    const gif = document.getElementById("gifLuta");
    gif.style.display = "block";
    gif.src = "";
    setTimeout(() => {
        gif.src = "img/lutaOriginal.gif"; // atualize conforme o nome/caminho real
    }, 10);
}

function pausarGif() {
    const gif = document.getElementById("gifLuta");
    gif.style.display = "none";
    gif.src = "";
}

function escolherLutador(tipo) {
    document.getElementById("escolhaLutador").classList.add("hidden");
    document.getElementById("barrasDeVida").classList.remove("hidden");
    document.querySelector(".log-container").classList.remove("hidden");

    const introducao = tipo === 'heroi'
        ? "Você escolheu o HERÓI!\nHP: 100\n\n"
        : "Você escolheu o VILÃO!\nHP: 100\n\n";

    logHeroi.innerText = introducao;
    logVilao.innerText = introducao;

    simularCombate();
    iniciarGif();
}

function atualizarHP() {
    const barraHeroi = document.getElementById("hpHeroi");
    const barraVilao = document.getElementById("hpVilao");

    barraHeroi.style.width = hpHeroi + "%";
    barraVilao.style.width = hpVilao + "%";

    barraHeroi.style.backgroundColor = corPorHP(hpHeroi);
    barraVilao.style.backgroundColor = corPorHP(hpVilao);
}

function corPorHP(valor) {
    if (valor <= 25) return "#ff0000";   // vermelho crítico
    if (valor <= 50) return "#ff0055";   // rosa/vermelho
    return "#9e00ff";                    // roxo cheio
}

function simularCombate() {
    hpHeroi = 100;
    hpVilao = 100;
    atualizarHP();
    let turno = 1;

    intervalo = setInterval(() => {
        let atqHeroi = Math.floor(Math.random() * 20);
        let atqVilao = Math.floor(Math.random() * 20);

        hpHeroi -= atqVilao;
        hpVilao -= atqHeroi;

        if (hpHeroi < 0) hpHeroi = 0;
        if (hpVilao < 0) hpVilao = 0;

        const msgHeroi = `Turno ${turno}\nHERÓI ATINGIU COM: ${atqHeroi}\nHP DO HERÓI: ${hpHeroi}\n\n`;
        const msgVilao = `Turno ${turno}\nVILÃO ATINGIU COM: ${atqVilao}\nHP DO VILÃO: ${hpVilao}\n\n`;

        logHeroi.innerText += msgHeroi;
        logVilao.innerText += msgVilao;

        atualizarHP();

        if (hpHeroi === 0 || hpVilao === 0) {
            clearInterval(intervalo);

            let resultado = "";
            if (hpHeroi > hpVilao) {
                resultado = "*** HERÓI VENCEU ***\n";
            } else if (hpVilao > hpHeroi) {
                resultado = "*** VILÃO VENCEU ***\n";
            } else {
                resultado = "HOUVE EMPATE!!!\n";
            }

            logHeroi.innerText += resultado;
            logVilao.innerText += resultado;

            document.getElementById("tentarNovamente").classList.remove("hidden");
            pausarGif(); // pausa ao fim da luta
        }

        turno++;
    }, 1000);
}

function resetar() {
    logHeroi.innerText = "";
    logVilao.innerText = "";
    document.getElementById("menu").classList.remove("hidden");
    document.getElementById("tentarNovamente").classList.add("hidden");
    document.getElementById("barrasDeVida").classList.add("hidden");
    document.querySelector(".log-container").classList.add("hidden");
    atualizarHP();
    pausarGif();
}

function fim() {
    logHeroi.innerText += "\nATÉ O PRÓXIMO BINÁRIO FIGHTER!";
    logVilao.innerText += "\nATÉ O PRÓXIMO BINÁRIO FIGHTER!";
    document.getElementById("tentarNovamente").classList.add("hidden");
    pausarGif();
}
