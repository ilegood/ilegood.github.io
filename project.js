// =======================
// 1️⃣ 프로젝트 데이터
// =======================

const projects = [
  {
    title: "Web 1",
    date: "2024-01-01",
    desc: "description",
    image: "./components/bg.png",
    link: "/project1.html",
    category: "web",
  },
  {
    title: "Web 2",
    date: "2024-02-01",
    desc: "description2",
    image: "./components/bg.png",
    link: "/project2.html",
    category: "web",
  },
  {
    title: "App 1",
    date: "2024-03-01",
    desc: "description3",
    image: "./components/bg.png",
    link: "/project3.html",
    category: "app",
  },
  {
    title: "Design 1",
    date: "2024-04-01",
    desc: "description4",
    image: "./components/bg.png",
    link: "/project4.html",
    category: "design",
  },
  {
    title: "Design 2",
    date: "2024-05-01",
    desc: "description5",
    image: "./components/bg.png",
    link: "/project5.html",
    category: "design",
  },
];

// =======================
// 2️⃣ 카드 자동 생성
// =======================

const container = document.querySelector(".project-list");

container.innerHTML = projects
  .map(
    (project) => `
    <a href="${project.link}" class="project-link">
      <article data-filter="${project.category}">
        <img src="${project.image}" alt="${project.title}" />
        <div class="card-header">
          <h3>${project.title}</h3>
          <span>${project.date}</span>
        </div>
        <p>${project.desc}</p>
      </article>
    </a>
  `,
  )
  .join("");

// =======================
// 3️⃣ 필터 기능
// =======================

const filterBtns = document.querySelectorAll(".filter-btn");
const slider = document.querySelector(".slider");
const hover = document.querySelector(".hover-slider");

function moveSlider(btn) {
  slider.style.width = btn.offsetWidth + "px";
  slider.style.transform = `translateX(${btn.offsetLeft}px)`;
}

// 초기 active 버튼 위치
const initialActive = document.querySelector(".filter-btn.active");
if (initialActive) moveSlider(initialActive);

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // active 변경
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    moveSlider(btn);

    const filter = btn.dataset.filter;

    const cards = container.querySelectorAll("article");

    cards.forEach((card) => {
      if (filter === "all" || filter === card.dataset.filter) {
        card.parentElement.style.display = "block";
      } else {
        card.parentElement.style.display = "none";
      }
    });
  });
});

// =======================
// 4️⃣ 필터 hover 슬라이더
// =======================

const filter = document.querySelector(".filter");

if (filter) {
  filter.addEventListener("mousemove", (e) => {
    const filterRect = filter.getBoundingClientRect();
    const mouseX = e.clientX - filterRect.left;

    let closestBtn = null;
    let closestDist = Infinity;

    filterBtns.forEach((btn) => {
      const btnCenter = btn.offsetLeft + btn.offsetWidth / 2;
      const dist = Math.abs(mouseX - btnCenter);

      if (dist < closestDist) {
        closestDist = dist;
        closestBtn = btn;
      }
    });

    if (!closestBtn) return;

    const snapThreshold = closestBtn.offsetWidth / 2;
    let x;

    if (closestDist < snapThreshold) {
      x = closestBtn.offsetLeft;
    } else {
      const sliderWidth = hover.offsetWidth || 150;
      x = mouseX - sliderWidth / 2;
      x = Math.max(0, Math.min(x, filterRect.width - sliderWidth));
    }

    hover.style.opacity = "1";
    hover.style.width =
      (closestDist < snapThreshold ? closestBtn.offsetWidth : 150) + "px";
    hover.style.transform = `translateX(${x}px)`;
  });

  filter.addEventListener("mouseleave", () => {
    hover.style.opacity = "0";
  });
}

// =======================
// 5️⃣ 메뉴 화살표 제어
// =======================

const box = document.querySelector(".menu-item");
const arrow = document.querySelector(".menu-item .arrow");

if (box && arrow) {
  box.addEventListener("mouseenter", () => {
    arrow.textContent = "▴";
  });

  box.addEventListener("mouseleave", () => {
    arrow.textContent = "▾";
  });
}
