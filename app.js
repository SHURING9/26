
"use strict";

/* ==========================================
   부천여자고등학교, 소리로 만나는 진로맵
   - 지도 핀 및 작품 목록
   - 진로 분야 필터
   - 작품 상세 팝업
   - YouTube 및 Google Drive 영상 재생
========================================== */

// HTML 요소
const pinLayer = document.getElementById("pinLayer");
const workList = document.getElementById("workList");
const filter = document.getElementById("careerFilter");
const count = document.getElementById("workCount");
const emptyMessage = document.getElementById("emptyMessage");

const dialog = document.getElementById("workDialog");
const dialogCareer = document.getElementById("dialogCareer");
const dialogTitle = document.getElementById("dialogTitle");
const dialogPlace = document.getElementById("dialogPlace");
const dialogDescription = document.getElementById("dialogDescription");
const videoArea = document.getElementById("videoArea");
const closeDialogButton = document.getElementById("closeDialog");
let sheetWorks = [];

/* ==========================================
   안전한 외부 링크 생성
========================================== */

function createExternalLink(url, text) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = text;

  return link;
}


/* ==========================================
   영상 안내 메시지
========================================== */

function showVideoMessage(message) {
  const box = document.createElement("p");
  box.className = "video-placeholder";
  box.textContent = message;

  videoArea.replaceChildren(box);
}


/* ==========================================
   YouTube 영상
   기존 작품의 videoId 지원
========================================== */

function showYouTubeVideo(videoId, title) {
  if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    showVideoMessage("영상 정보를 확인해 주세요.");
    return;
  }

  const frame = document.createElement("iframe");

  frame.src =
    "https://www.youtube-nocookie.com/embed/" + videoId;

  frame.title = title + " 영상";
  frame.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  frame.allowFullscreen = true;
  frame.loading = "lazy";

  videoArea.replaceChildren(frame);
}


/* ==========================================
   Google Drive 공유 링크에서 파일 ID 추출
========================================== */

function getGoogleDriveFileId(url) {
  if (
    url.protocol !== "https:" ||
    url.hostname !== "drive.google.com"
  ) {
    return null;
  }

  const match = url.pathname.match(
    /^\/file\/d\/([a-zA-Z0-9_-]+)/
  );

  if (match) {
    return match[1];
  }

  if (url.pathname === "/open") {
    const id = url.searchParams.get("id");

    if (id && /^[a-zA-Z0-9_-]+$/.test(id)) {
      return id;
    }
  }

  return null;
}


/* ==========================================
   Google Drive 영상 팝업
========================================== */

function showGoogleDriveVideo(fileId, originalUrl, title) {
  const frame = document.createElement("iframe");

  frame.src =
    "https://drive.google.com/file/d/" +
    encodeURIComponent(fileId) +
    "/preview";

  frame.title = title + " 영상";
  frame.allow = "autoplay";
  frame.allowFullscreen = true;
  frame.loading = "lazy";

  const link = createExternalLink(
    originalUrl,
    "영상이 보이지 않으면 Google Drive에서 열기 ↗"
  );

  videoArea.replaceChildren(frame, link);
}


/* ==========================================
   Canva / 미리캔버스 링크
   공유 페이지를 새 창으로 열기
========================================== */

function getDesignService(url) {
  if (url.protocol !== "https:") {
    return null;
  }

  const host = url.hostname.toLowerCase();

  if (
    host === "canva.com" ||
    host.endsWith(".canva.com")
  ) {
    return "Canva";
  }

  if (
    host === "miricanvas.com" ||
    host.endsWith(".miricanvas.com")
  ) {
    return "미리캔버스";
  }

  return null;
}

function showDesignLink(url, service) {
  showVideoMessage(
    service +
    " 공유 링크입니다. 팝업에서 바로 재생되지 않으면 아래 링크로 작품을 열어 주세요."
  );

  videoArea.appendChild(
    createExternalLink(url.href, service + " 작품 열기 ↗")
  );
}


/* ==========================================
   영상 통합 처리
   videoId: 기존 YouTube 작품
   videoUrl: Google Drive 또는 디자인 공유 링크
========================================== */

function renderWorkVideo(work) {
  videoArea.replaceChildren();

  // 기존 YouTube 작품
  if (
    work.videoId &&
    /^[a-zA-Z0-9_-]{11}$/.test(work.videoId)
  ) {
    showYouTubeVideo(work.videoId, work.title || "작품");
    return;
  }

  // 새 영상 링크
  if (!work.videoUrl) {
    showVideoMessage("등록된 영상이 없습니다.");
    return;
  }

  let url;

  try {
    url = new URL(work.videoUrl);
  } catch {
    showVideoMessage("영상 링크가 올바르지 않습니다.");
    return;
  }

  // Google Drive MP4
  const fileId = getGoogleDriveFileId(url);

  if (fileId) {
    showGoogleDriveVideo(
      fileId,
      url.href,
      work.title || "학생 작품"
    );
    return;
  }

  // Canva / 미리캔버스
  const service = getDesignService(url);

  if (service) {
    showDesignLink(url, service);
    return;
  }

  showVideoMessage(
    "지원하지 않는 링크입니다. Google Drive의 파일 공유 링크를 확인해 주세요."
  );
}


/* ==========================================
   작품 상세 팝업
========================================== */

function openWork(work) {
  dialogCareer.textContent = work.career || "진로 분야";
  dialogTitle.textContent = work.title || "작품 제목";
  dialogPlace.textContent =
    "⌖ " + (work.place || "장소 정보 없음");
  dialogDescription.textContent =
    work.description || "등록된 작품 설명이 없습니다.";

  renderWorkVideo(work);

  if (!dialog.open) {
    dialog.showModal();
  }
}


/* ==========================================
   지도 핀 생성
========================================== */

function createMapPin(work) {
  const pin = document.createElement("button");

  pin.type = "button";
  pin.className = "map-pin";
  pin.style.left = Number(work.x) + "%";
  pin.style.top = Number(work.y) + "%";
  pin.title = work.title || "작품 감상하기";
  pin.setAttribute(
    "aria-label",
    (work.title || "작품") + " 감상하기"
  );

  const icon = document.createElement("span");
  icon.className = "pin-icon";
  icon.textContent = work.icon || "♫";

  const label = document.createElement("span");
  label.className = "pin-label";
  label.textContent = work.title || "작품";

  pin.append(icon, label);

  pin.addEventListener("click", () => {
    openWork(work);
  });

  return pin;
}


/* ==========================================
   작품 목록 카드 생성
========================================== */

function createWorkCard(work) {
  const card = document.createElement("article");
  card.className = "work-card";

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = work.career || "기타";

  const title = document.createElement("h3");
  title.textContent = work.title || "작품 제목";

  const place = document.createElement("p");
  place.textContent =
    "⌖ " + (work.place || "장소 정보 없음");

  const description = document.createElement("p");
  description.textContent =
    work.description || "등록된 설명이 없습니다.";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "card-button";
  button.textContent = "작품 감상하기 →";

  button.addEventListener("click", () => {
    openWork(work);
  });

  card.append(tag, title, place, description, button);

  return card;
}


/* ==========================================
   지도와 작품 목록 렌더링
========================================== */

function render() {
  if (
    !pinLayer ||
    !workList ||
    !filter ||
    !count ||
    !emptyMessage
  ) {
    console.error("HTML 요소 ID를 확인해 주세요.");
    return;
  }

  const selectedCareer = filter.value;

  const visibleWorks = sheetWorks.filter(work => {
    return (
      selectedCareer === "all" ||
      work.career === selectedCareer
    );
  });

  pinLayer.replaceChildren();
  workList.replaceChildren();

  count.textContent = "공개 작품 " + visibleWorks.length + "개";
  emptyMessage.hidden = visibleWorks.length > 0;

  visibleWorks.forEach(work => {
    pinLayer.appendChild(createMapPin(work));
    workList.appendChild(createWorkCard(work));
  });
}


/* ==========================================
   이벤트 등록 및 초기 실행
========================================== */

filter.addEventListener("change", render);

closeDialogButton.addEventListener("click", () => {
  dialog.close();
});

// 팝업 바깥을 누르면 닫기
dialog.addEventListener("click", event => {
  if (event.target === dialog) {
    dialog.close();
  }
});

// 팝업을 닫으면 영상도 정지
dialog.addEventListener("close", () => {
  videoArea.replaceChildren();
});


/* ==========================================
   Google 스프레드시트에서 승인 작품 불러오기
========================================== */

const SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbwpjSZ7NxgfxeEBVoj-P9o2prAadgsgPmCR0C_4_JuVihW5K-EFe0Wsrdw9PgbvnCqA/exec";

window.receiveWorksFromSheet = function(data) {
  if (!Array.isArray(data)) {
    console.error("스프레드시트 데이터 형식이 올바르지 않습니다.", data);
    emptyMessage.textContent = "작품 데이터를 불러오지 못했습니다.";
    emptyMessage.hidden = false;
    return;
  }

  sheetWorks = data;
  render();
};

function loadWorksFromSheet() {
  const script = document.createElement("script");

  script.src =
    SHEET_API_URL +
    "?callback=receiveWorksFromSheet&t=" +
    Date.now();

  script.onerror = function() {
    console.error("스프레드시트 연결에 실패했습니다.");
    emptyMessage.textContent =
      "작품 데이터를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.";
    emptyMessage.hidden = false;
  };

  document.head.appendChild(script);
}

// 페이지가 열리면 승인된 작품 불러오기
loadWorksFromSheet();

