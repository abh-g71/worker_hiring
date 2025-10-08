const workers = [
  {
    name: "John Doe",
    skill: "Electrician",
    location: "Downtown",
    status: "available",
    img: "images/profile1.jpg"
  },
  {
    name: "Jane Smith",
    skill: "Plumber",
    location: "Uptown",
    status: "busy",
    img: "images/profile2.jpg"
  },
  {
    name: "Mike Johnson",
    skill: "Painter",
    location: "Midtown",
    status: "available",
    img: "images/profile3.jpg"
  }
];

const container = document.getElementById("workersContainer");
const searchSkill = document.getElementById("searchSkill");
const searchLocation = document.getElementById("searchLocation");

function renderWorkers(list) {
  container.innerHTML = '';
  list.forEach(worker => {
    const card = document.createElement("div");
    card.classList.add("worker-card");

    card.innerHTML = `
      <img src="${worker.img}" alt="Worker Profile" class="worker-img" />
      <div class="worker-info">
        <h3>${worker.name}</h3>
        <p>${worker.skill}</p>
        <p>Location: ${worker.location}</p>
        <span class="availability ${worker.status === "available" ? "available" : "busy"}">
          ${worker.status === "available" ? "🟢 Available" : "🔴 Busy"}
        </span>
      </div>
      <button class="btn hire-btn" ${worker.status === "busy" ? "disabled" : ""}>Hire</button>
      <button class="btn view-profile-btn">View Profile</button>
    `;

    container.appendChild(card);
  });
}

// Initial render
renderWorkers(workers);

// Filter functionality
function filterWorkers() {
  const skillValue = searchSkill.value.toLowerCase();
  const locationValue = searchLocation.value.toLowerCase();

  const filtered = workers.filter(worker => 
    worker.skill.toLowerCase().includes(skillValue) &&
    worker.location.toLowerCase().includes(locationValue)
  );

  renderWorkers(filtered);
}

searchSkill.addEventListener("input", filterWorkers);
searchLocation.addEventListener("input", filterWorkers);

// Modal elements
const modal = document.getElementById("profileModal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalSkill = document.getElementById("modalSkill");
const modalLocation = document.getElementById("modalLocation");
const modalStatus = document.getElementById("modalStatus");
const closeBtn = document.querySelector(".close-btn");

// Open modal when "View Profile" clicked
container.addEventListener("click", (e) => {
  if(e.target.classList.contains("view-profile-btn")) {
    const card = e.target.closest(".worker-card");
    const name = card.querySelector("h3").textContent;
    const skill = card.querySelector(".worker-info p:nth-child(2)").textContent;
    const location = card.querySelector(".worker-info p:nth-child(3)").textContent;
    const status = card.querySelector(".availability").textContent;
    const img = card.querySelector(".worker-img").src;

    modalImg.src = img;
    modalName.textContent = name;
    modalSkill.textContent = skill;
    modalLocation.textContent = location;
    modalStatus.textContent = status;

    modal.style.display = "flex";
  }
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if(e.target === modal) {
    modal.style.display = "none";
  }
});
