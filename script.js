// Etapa 12: encontra no HTML a imagem do candidato que será atualizada pelo switch.
const candidateImage = document.querySelector("#candidate-photo");
// Etapa 12.1: encontra a moldura circular que envolve a imagem.
const candidatePhotoFrame = candidateImage.closest(".candidate-card__photo");
// Etapa 12.2: encontra a mensagem visual mostrada se uma foto falhar.
const candidateFallback = document.querySelector(".candidate-card__fallback");
// Etapa 17: encontra o botão circular que alterna entre os candidatos.
const candidateSwitchButton = document.querySelector("#candidate-switch-button");
// Etapa 17.1: encontra o número da opção que não está ativa no trilho.
const otherCandidateNumber = document.querySelector("#other-candidate-number");
// Etapa 19: encontra os dois arquivos de áudio adicionados no HTML.
const candidateAudios = {
	lula: document.querySelector("#lula-audio"),
	flavio: document.querySelector("#flavio-audio"),
};
// Etapa 19.1: guarda qual áudio está tocando para poder pará-lo na próxima troca.
let currentAudio = null;
// Etapa 11: encontra o título que acompanha o candidato selecionado.
const candidateName = document.querySelector("#candidate-name");
// Etapa 13: encontra os dois grupos de links que devem acompanhar a troca de candidato.
const candidateTextLinks = Array.from(document.querySelectorAll(".candidate-links a"));
const candidateIconLinks = Array.from(document.querySelectorAll(".candidate-icon-links a"));
// Etapa 13.1: associa cada posição das listas à mesma categoria de destino.
const candidateLinkTypes = ["instagram", "projects", "trajectory", "latest"];
// Etapa 13.2: marca os links com sua categoria para atualizá-los sem depender do texto visível.
candidateTextLinks.forEach((link, index) => {
	link.dataset.candidateLink = candidateLinkTypes[index];
});
// Etapa 13.3: aplica as mesmas categorias à faixa inferior de ícones.
candidateIconLinks.forEach((link, index) => {
	link.dataset.candidateLink = candidateLinkTypes[index];
});
// Etapa 13.4: guarda os destinos atuais do Lula antes que qualquer link seja trocado.
const lulaLinks = Object.fromEntries(
	candidateTextLinks.map((link, index) => [candidateLinkTypes[index], link.href]),
);
// Etapa 13.5: encontra textos e nomes acessíveis que também mudam com o perfil.
const candidateTextNavigation = document.querySelector("#candidate-links-navigation");
const candidateIconNavigation = document.querySelector("#candidate-icon-navigation");
const trajectoryLinkLabel = document.querySelector("#trajectory-link-label");
const trajectoryIconLink = document.querySelector("#trajectory-icon-link");

// Etapa 12.3: guarda os dados visuais de cada perfil em um único lugar.
const candidateProfiles = {
	// Etapa 12.4: dados usados quando Lula é selecionado.
	lula: {
		name: "Luiz Inácio Lula da Silva",
		number: "13",
		image: "./assets/lula-foto-perfil.png",
		alt: "Ilustração de perfil de Luiz Inácio Lula da Silva",
		fallback: "Parece que alguém roubou a imagem. Faz o L.",
		switchLabel: "Lula, número 13 selecionado. Ative para selecionar Flávio Bolsonaro.",
		links: lulaLinks,
		linkNavigationLabel: "Links sobre Luiz Inácio Lula da Silva",
		iconNavigationLabel: "Atalhos dos links sobre Luiz Inácio Lula da Silva",
		trajectoryLabel: "Trajetória do Lula",
	},
	// Etapa 12.5: dados usados quando Flávio Bolsonaro é selecionado.
	flavio: {
		name: "Flávio Bolsonaro",
		number: "22",
		image: "./assets/flavio-foto-perfil.png",
		alt: "Ilustração de perfil de Flávio Bolsonaro",
		fallback: "A imagem do perfil de Flávio Bolsonaro não carregou.",
		switchLabel: "Flávio Bolsonaro, número 22 selecionado. Ative para selecionar Lula.",
		// Etapa 13.6: destinos informados para a lista textual e para a faixa de ícones do Flávio.
		links: {
			instagram: "https://www.instagram.com/flaviobolsonaro/?hl=pt-br",
			projects: "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/flavio-bolsonaro",
			trajectory: "https://pt.wikipedia.org/wiki/Fl%C3%A1vio_Bolsonaro",
			latest: "https://www.google.com/search?q=ultimos+feitos+positivos+e+negativos+bolsonaro%2Fflavio&oq=ultimos+feitos+positivos+e+negativos+bolsonaro%2Fflavio&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDQ2MTZqMGo0qAIAsAIA&sourceid=chrome&source=chrome.ob&ie=UTF-8",
		},
		linkNavigationLabel: "Links sobre Flávio Bolsonaro",
		iconNavigationLabel: "Atalhos dos links sobre Flávio Bolsonaro",
		trajectoryLabel: "Trajetória do Flávio Bolsonaro",
	},
};

// Etapa 17.2: registra qual perfil aparece ao abrir a página.
let selectedCandidate = "lula";

// Etapa 12.6: esconde a moldura e mostra o fallback se a imagem atual não carregar.
function showCandidateImageFallback() {
	// Esconde a moldura vazia para não deixar um círculo sem foto na página.
	candidatePhotoFrame.hidden = true;
	// Usa a mensagem correspondente ao candidato selecionado.
	candidateFallback.textContent = candidateProfiles[selectedCandidate].fallback;
	// Revela a mensagem abaixo da moldura.
	candidateFallback.hidden = false;
}

// Etapa 17.3: troca todos os dados visuais entre Lula e Flávio Bolsonaro.
function toggleCandidate() {
	// Escolhe o perfil oposto ao que está ativo neste momento.
	selectedCandidate = selectedCandidate === "lula" ? "flavio" : "lula";
	// Para e volta ao início do áudio anterior antes de iniciar o próximo.
	if (currentAudio !== null) {
		currentAudio.pause();
		currentAudio.currentTime = 0;
	}
	// Seleciona o áudio que corresponde ao candidato que acabou de ser escolhido.
	currentAudio = candidateAudios[selectedCandidate];
	// Garante que cada reprodução comece do início do arquivo.
	currentAudio.currentTime = 0;
	// Toca o áudio em resposta ao clique no switch.
	currentAudio.play().catch((error) => {
		// Registra no console se o navegador ou o arquivo impedir a reprodução.
		console.error("Não foi possível reproduzir o áudio do candidato.", error);
	});
	// Busca os dados do candidato que acabou de ser selecionado.
	const activeProfile = candidateProfiles[selectedCandidate];
	// Calcula qual número ficará visível no trilho como opção inativa.
	const inactiveProfile = candidateProfiles[selectedCandidate === "lula" ? "flavio" : "lula"];
	// Ativa estilos de fundo e coração do Flávio quando esse perfil estiver selecionado.
	document.body.classList.toggle("is-flavio", selectedCandidate === "flavio");
	// Atualiza a imagem de perfil para o arquivo do candidato ativo.
	candidateImage.src = activeProfile.image;
	// Atualiza o texto alternativo para descrever a imagem atual.
	candidateImage.alt = activeProfile.alt;
	// Atualiza o título mostrado abaixo da foto.
	candidateName.textContent = activeProfile.name;
	// Mostra o número do candidato ativo dentro do botão circular.
	candidateSwitchButton.textContent = activeProfile.number;
	// Atualiza o nome acessível e a ação explicada pelo botão.
	candidateSwitchButton.setAttribute("aria-label", activeProfile.switchLabel);
	// Atualiza os destinos dos quatro botões com texto para o candidato ativo.
	candidateTextLinks.forEach((link) => {
		link.href = activeProfile.links[link.dataset.candidateLink];
	});
	// Atualiza os destinos dos quatro atalhos de ícone para o mesmo candidato.
	candidateIconLinks.forEach((link) => {
		link.href = activeProfile.links[link.dataset.candidateLink];
	});
	// Atualiza o nome da trajetória nos botões com texto e nos atalhos acessíveis.
	trajectoryLinkLabel.textContent = activeProfile.trajectoryLabel;
	trajectoryIconLink.setAttribute("aria-label", activeProfile.trajectoryLabel);
	trajectoryIconLink.title = activeProfile.trajectoryLabel;
	// Atualiza os nomes acessíveis dos dois grupos de navegação.
	candidateTextNavigation.setAttribute("aria-label", activeProfile.linkNavigationLabel);
	candidateIconNavigation.setAttribute("aria-label", activeProfile.iconNavigationLabel);
	// Mostra o número do outro candidato no lado oposto do trilho.
	otherCandidateNumber.textContent = inactiveProfile.number;
	// Restaura a moldura e esconde qualquer fallback da imagem anterior.
	candidatePhotoFrame.hidden = false;
	candidateFallback.hidden = true;
	// Prepara a mensagem apropriada caso a nova imagem não carregue.
	candidateFallback.textContent = activeProfile.fallback;
}

// Etapa 17.4: alterna o candidato quando o botão circular é ativado por mouse ou teclado.
candidateSwitchButton.addEventListener("click", toggleCandidate);

// Etapa 12.7: mostra o fallback se qualquer imagem selecionada falhar ao carregar.
candidateImage.addEventListener("error", showCandidateImageFallback);

// Etapa 12.8: oculta o fallback quando uma imagem selecionada carregar corretamente.
candidateImage.addEventListener("load", () => {
	// Garante que a moldura circular volte a ficar visível.
	candidatePhotoFrame.hidden = false;
	// Esconde o texto de erro depois do carregamento bem-sucedido.
	candidateFallback.hidden = true;
});

// Etapa 12.9: cobre falhas que aconteceram antes de o script instalar os listeners.
if (candidateImage.complete && candidateImage.naturalWidth === 0) {
	// Mostra a mensagem de erro referente ao perfil inicial do Lula.
	showCandidateImageFallback();
}
