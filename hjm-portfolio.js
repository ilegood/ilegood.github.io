// 커리큘럼 박스 토글
document.querySelectorAll(".box").forEach((box) => {
  const header = box.querySelector(".box-header");
  const detail = box.querySelector(".box-detail");
  const btn = box.querySelector(".wide");

  header.addEventListener("click", () => {
    const isOpen = box.classList.toggle("active");
    detail.style.maxHeight = isOpen ? detail.scrollHeight + 30 + "px" : null;
    btn.textContent = isOpen ? "–" : "+";
  });
});

// 원형 프로그레스 바 애니메이션
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;

      const progress = target.querySelector("circle.progress");
      const r = progress.r.baseVal.value;
      const circumference = 2 * Math.PI * r;
      const offset = circumference * (1 - target.dataset.percent / 100);

      progress.style.strokeDasharray = circumference;
      progress.style.strokeDashoffset = circumference;
      progress.style.transition = "none";

      // reflow 강제 후 트랜지션 적용
      progress.getBoundingClientRect();
      progress.style.transition = "stroke-dashoffset 1.2s ease";
      progress.style.opacity = 1;

      requestAnimationFrame(() => {
        progress.style.strokeDashoffset = offset;
      });

      skillObserver.unobserve(target);
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll("#skills .circle")
  .forEach((c) => skillObserver.observe(c));

// 섹션 스크롤 Reveal
let lastScrollY = window.scrollY;
const sections = document.querySelectorAll("section");

sections.forEach((sec) => sec.classList.add("section-hidden-down"));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const scrollingDown = window.scrollY > lastScrollY;

    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.classList.remove("section-hidden-up", "section-hidden-down");
        target.classList.add("section-show");
      } else {
        target.classList.remove("section-show");
        target.classList.add(
          scrollingDown ? "section-hidden-up" : "section-hidden-down",
        );
        target.classList.remove(
          scrollingDown ? "section-hidden-down" : "section-hidden-up",
        );
      }
    });

    lastScrollY = window.scrollY;
  },
  { threshold: 0.1, rootMargin: "-5% 0px" },
);

sections.forEach((sec) => sectionObserver.observe(sec));

// menu 화살표
const box = document.querySelector(".menu-item");
const arrow = document.querySelector(".menu-item > a");
box.addEventListener("mouseenter", () => {
  arrow.textContent = "PROJECTS ▴";
});
box.addEventListener("mouseleave", () => {
  arrow.textContent = "PROJECTS ▾";
});
