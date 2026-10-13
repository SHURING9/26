const pinLayer = document.getElementById("pinLayer");
const workList = document.getElementById("workList");
const filter = document.getElementById("careerFilter");
const count = document.getElementById("workCount");
const emptyMessage = document.getElementById("emptyMessage");
const dialog = document.getElementById("workDialog");

function openWork(work) {
  document.getElementById("dialogCareer").textContent = work.career;
  document.getElementById("dialogTitle").textContent = work.title;
  document.getElementById("dialogPlace").textContent = "⌖ " + work.place;
  document.getElementById("dialogDescription").textContent = work.description;

  const videoArea = document.getElementById("videoArea");
  videoArea.replaceChildren();
  if (work.videoId && /^[a-zA-Z0-9_-]{11}$/.test(work.videoId)) {
    const frame = document.createElement("iframe");
    frame.src = "https://www.youtube-nocookie.com/embed/" + work.videoId;
    frame.title = work.title + " 영상";
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    frame.allowFullscreen = true;
    videoArea.appendChild(frame);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "video-placeholder";
    placeholder.textContent = "교사 승인 후 works.js에 영상 ID를 등록하면 이곳에서 재생됩니다.";
    videoArea.appendChild(placeholder);
  }
  dialog.showModal();
}

function render() {
  const selected = filter.value;
  const visible = works.filter(work => selected === "all" || work.career === selected);
  pinLayer.replaceChildren();
  workList.replaceChildren();
  count.textContent = "공개 작품 " + visible.length + "개";
  emptyMessage.hidden = visible.length !== 0;

  visible.forEach(work => {
    const pin = document.createElement("button");
    pin.className = "map-pin";
    pin.style.left = work.x + "%";
    pin.style.top = work.y + "%";
    pin.type = "button";
    const pinIcon = document.createElement("span");
    pinIcon.className = "pin-icon";
    pinIcon.textContent = work.icon || "♫";
    const pinLabel = document.createElement("span");
    pinLabel.className = "pin-label";
    pinLabel.textContent = work.title;
    pin.append(pinIcon, pinLabel);
    pin.title = work.title + " 감상하기";
    pin.setAttribute("aria-label", work.title + " 작품 감상하기");
    pin.addEventListener("click", () => openWork(work));
    pinLayer.appendChild(pin);

    const card = document.createElement("article");
    card.className = "work-card";
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = work.career;
    const title = document.createElement("h3");
    title.textContent = work.title;
    const place = document.createElement("p");
    place.textContent = "⌖ " + work.place;
    const description = document.createElement("p");
    description.textContent = work.description;
    const button = document.createElement("button");
    button.className = "card-button";
    button.type = "button";
    button.textContent = "작품 감상하기 →";
    button.addEventListener("click", () => openWork(work));
    card.append(tag, title, place, description, button);
    workList.appendChild(card);
  });
}

filter.addEventListener("change", render);
document.getElementById("closeDialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
render();
