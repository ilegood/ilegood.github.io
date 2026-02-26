// 정렬
const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".grid article");
const slider = document.querySelector(".slider");
const hover = document.querySelector(".hover-slider");

function moveSlider(btn) {
  slider.style.width = btn.offsetWidth + "px";
  slider.style.transform = `translateX(${btn.offsetLeft}px)`;
}

const initialActive = document.querySelector(".filter-btn.active");
moveSlider(initialActive);

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    moveSlider(btn);

    const filter = btn.dataset.filter;

    cards.forEach((card) => {
      if (filter === "all" || filter === card.dataset.filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const filter = document.querySelector(".filter");

filter.addEventListener("mousemove", (e) => {
  const filterRect = filter.getBoundingClientRect();
  const mouseX = e.clientX - filterRect.left;

  // 가장 가까운 버튼 찾기
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

  const snapThreshold = closestBtn.offsetWidth / 2;
  let x;

  if (closestDist < snapThreshold) {
    // 버튼 위치로 snap
    x = closestBtn.offsetLeft;
  } else {
    // 마우스 따라 자유롭게
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
