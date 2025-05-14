let getBarItem = document.querySelector(".bar-item");
let getSideBar = document.querySelector(".sidebar");
let getXmark = document.querySelector(".xmark");
let getPageContent = document.querySelector(".page-content");
let getLoader = document.querySelector(".loader");
let getToggle = document.querySelectorAll(".toggle");
let getHeart = document.querySelector(".heart");
let getSidebarLink = document.querySelectorAll(".sidebar-link");
let activePage = window.location.pathname;
let getSideBarStatus = false;

getBarItem.onclick = () => {
  getSideBar.style = "transform: translateX(0px);width:220px";
  getSideBar.classList.add("sidebar-active");
};
getXmark.onclick = () => {
  getSideBar.style =
    "transform: translateX(-220px);width:220px;box-shadow:none;";
  getSideBarStatus = true;
  if (getSideBar.classList.contains("sidebar-active")) {
    getSideBar.classList.remove("sidebar-active");
  }
};
window.addEventListener("resize", (e) => {
  if (getSideBarStatus === true) {
    if (e.target.innerWidth > 768) {
      getSideBar.style = "transform: translateX(0px);width:220px";
    } else {
      getSideBar.style =
        "transform: translateX(-220px);width:220px;box-shadow:none;";
    }
  }
});
if (getLoader) {
  window.addEventListener("load", () => {
    getLoader.style.display = "none";
    getPageContent.style.display = "grid";
    activePage = "index.html";
    getSidebarLink.forEach((item) => {
      if (item.href.includes(`${activePage}`)) {
        item.classList.add("active");
      } else item.classList.remove("active");
    });
  });
}
document.onclick = (e) => {
  if (getSideBar.classList.contains("sidebar-active")) {
    if (
      !e.target.classList.contains("bar-item") &&
      !e.target.classList.contains("sidebar") &&
      !e.target.classList.contains("brand") &&
      !e.target.classList.contains("brand-name")
    ) {
      getSideBar.style =
        "transform: translateX(-220px);width:220px;box-shadow:none;";
      getSideBar.classList.remove("sidebar-active");
      getSideBarStatus = true;
    }
  }
};
window.addEventListener("scroll", () => {
  if (getSideBar.classList.contains("sidebar-active")) {
    getSideBar.style =
      "transform: translateX(-220px);width:220px;box-shadow:none;";
    getSideBar.classList.remove("sidebar-active");
  }
});
if (getHeart) {
  getHeart.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-regular")) {
      getHeart.classList.replace("fa-regular", "fa-solid");
      getHeart.style.color = "red";
    } else {
      getHeart.classList.replace("fa-solid", "fa-regular");
      getHeart.style.color = "#888";
    }
  });
}
getToggle.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("left")) {
      item.classList.remove("left");
    } else {
      item.classList.add("left");
    }
  });
});

getSidebarLink.forEach((item) => {
  if (item.href.includes(`${activePage}`)) {
    item.classList.add("active");
  }
});

//#Script do FRIENDS#//
function exibirMotoristas() {
  const container = document.getElementById('motoristas-container');
  if (!container) return;

  const motoristas = JSON.parse(localStorage.getItem('motoristas')) || [];

  if (motoristas.length === 0) {
    container.innerHTML = "<p>Nenhum motorista cadastrado ainda.</p>";
    return;
  }

  container.innerHTML = "";

  motoristas.forEach((motorista, index) => {
    const card = document.createElement('div');
    card.classList.add('friends-box-card');

    card.innerHTML = `
      <div class="friends-box-card-info">
        <img src="${motorista.foto || '../images/avatar.png'}" alt="Foto do Motorista" />
        <h4>${motorista.nomeCompleto}</h4>
        <span class="perfil-label">Perfil</span>
      </div>
      <div class="friends-box-card-body">
        <ul>
            <li><i class="fa-regular fa-id-card"></i><span>CPF: ${motorista.cpf}</span></li>
            <li><i class="fa-regular fa-id-badge"></i><span>CNH: ${motorista.cnh}</span></li>
            <li><i class="fa-regular fa-calendar"></i><span>Validade CNH: ${motorista.validadeCnh}</span></li>
            <li><i class="fa-solid fa-phone"></i><span>Telefone: ${motorista.telefone}</span></li>
            <li><i class="fa-regular fa-envelope"></i><span>Email: ${motorista.email}</span></li>
        </ul>
      </div>
      <div class="friends-box-card-footer">
        <div class="friends-box-card-footer-buttons">
          <a href="#" class="btn-veiculos" data-index="${index}">Perfil</a>
          <a href="#" class="remover-btn" data-index="${index}">Remover</a>
          <a href="#" class="btn-veiculos" data-index="${index}">Veículos vinculados</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Evento de clique para "Remover"
  document.querySelectorAll('.remover-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const index = this.getAttribute('data-index');
      removerMotorista(index);
    });
  });

  // Evento de clique para ambos botões "Veículos vinculados"
  document.querySelectorAll('.btn-veiculos').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const index = this.getAttribute('data-index');
      vincularVeiculos(index);
    });
  });
}

// Função para abrir a página de vinculação de veículos ou abrir um modal
function vincularVeiculos(index) {
  const motoristas = JSON.parse(localStorage.getItem('motoristas')) || [];
  const motorista = motoristas[index];
  alert(`Vincular veículo para o motorista: ${motorista.nomeCompleto}`);
}

// Remove motorista do localStorage
function removerMotorista(index) {
  const motoristas = JSON.parse(localStorage.getItem('motoristas')) || [];
  motoristas.splice(index, 1);
  localStorage.setItem('motoristas', JSON.stringify(motoristas));
  exibirMotoristas();
}

// Chamar a função ao carregar a página
window.addEventListener('DOMContentLoaded', exibirMotoristas);





