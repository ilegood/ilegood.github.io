// 커리큘럼 박스 높이 바꾸기
document.querySelectorAll(".box").forEach((box) => {
  const header = box.querySelector(".box-header");
  const detail = box.querySelector(".box-detail");
  const btn = box.querySelector(".wide");

  header.addEventListener("click", () => {
    const isOpen = box.classList.contains("active");

    if (isOpen) {
      detail.style.maxHeight = null;
      box.classList.remove("active");
      btn.textContent = "+";
    } else {
      detail.style.maxHeight = detail.scrollHeight + "px";
      box.classList.add("active");
      btn.textContent = "–";
    }
  });
});

// 원형 프로그레스 바 애니메이션
const circles = document.querySelectorAll("#skills .circle");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const circleWrap = entry.target;
      const percent = circleWrap.dataset.percent;

      const progressCircle = circleWrap.querySelector("circle.progress");

      const r = progressCircle.r.baseVal.value;
      const circumference = 2 * Math.PI * r;

      progressCircle.style.strokeDasharray = circumference;
      progressCircle.style.transition = "none";
      progressCircle.style.strokeDashoffset = circumference;

      const offset = circumference * (1 - percent / 100);

      progressCircle.getBoundingClientRect();

      progressCircle.style.transition = "stroke-dashoffset 1.2s ease";
      progressCircle.style.opacity = 1;

      requestAnimationFrame(() => {
        progressCircle.style.strokeDashoffset = offset;
      });

      skillObserver.unobserve(circleWrap);
    });
  },
  {
    threshold: 0.5,
  },
);

circles.forEach((circle) => {
  skillObserver.observe(circle);
});

// 각 섹션을 감지하면 애니메이션을 작동시킴
let lastScrollY = window.scrollY;

const sections = document.querySelectorAll("section");

sections.forEach((sec) => {
  sec.classList.add("section-hidden-down");
});

const observer = new IntersectionObserver(
  (entries) => {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;

    entries.forEach((entry) => {
      const el = entry.target;

      if (entry.isIntersecting) {
        // 들어올 때
        el.classList.remove("section-hidden-up");
        el.classList.remove("section-hidden-down");
        el.classList.add("section-show");
      } else {
        // 나갈 때
        el.classList.remove("section-show");

        if (scrollingDown) {
          // 아래로 스크롤 → 위로 빠짐
          el.classList.add("section-hidden-up");
          el.classList.remove("section-hidden-down");
        } else {
          // 위로 스크롤 → 아래로 빠짐
          el.classList.add("section-hidden-down");
          el.classList.remove("section-hidden-up");
        }
      }
    });

    lastScrollY = currentScrollY;
  },
  {
    threshold: 0.1,
    rootMargin: "-5% 0px",
  },
);

sections.forEach((sec) => observer.observe(sec));
