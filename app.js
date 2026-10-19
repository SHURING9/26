"use strict";

/* ==========================================
   부천여자고등학교, 소리로 만나는 진로맵
   - 지도 핀 및 작품 목록
   - 진로 분야 필터
   - 작품 상세 팝업
   - YouTube 및 Google Drive 영상 재생
   - 익명 감상 댓글 (교사 승인 후 공개)
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

// Google 앱스 스크립트 주소 (작품 목록과 댓글이 같은 주소를 사용)
const SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbwpjSZ7NxgfxeEBVoj-P9o2prAadgsgPmCR0C_4_JuVihW5K-EFe0Wsrdw9PgbvnCqA/exec";

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
   앱스 스크립트 호출 (JSONP)
   주소 뒤에 값을 붙여 부르고, 결과를 Promise로 돌려줌
========================================== */

function callSheetApi(params) {
  return new Promise((resolve, reject) => {
    const callbackName =
      "sheetCb_" + Date.now() + "_" + Math.floor(Math.random() * 1000000);

    const script = document.createElement("script");

    const timer = setTimeout(() => {
      // 늦게 도착한 응답이 오류를 내지 않도록 빈 함수를 남겨 둠
      window[callbackName] = function() {};
      script.remove();
      reject(new Error("timeout"));
    }, 15000);

    window[callbackName] = function(data) {
      clearTimeout(timer);
      delete window[callbackName];
      script.remove();
      resolve(data);
    };

    script.onerror = function() {
      clearTimeout(timer);
      delete window[callbackName];
      script.remove();
      reject(new Error("network"));
    };

    const query = new URLSearchParams(
      Object.assign({}, params, {
        callback: callbackName,
        t: String(Date.now())
      })
    );

    script.src = SHEET_API_URL + "?" + query.toString();
    document.head.appendChild(script);
  });
}


/* ==========================================
   익명 감상 댓글
   - 댓글은 시트의 "댓글" 탭에 '대기'로 쌓임
   - 선생님이 approval 칸을 '승인'으로 바꾸면 공개
========================================== */

const MAX_NICKNAME = 20;
const MAX_COMMENT = 200;
const LOCAL_COOLDOWN_MS = 30000;

let currentWorkKey = "";
let lastCommentAt = 0;

// 앱스 스크립트(Code.gs)와 같은 기준: id가 있으면 id, 없으면 작품 제목
function getWorkKey(work) {
  return String(work.id || work.title || "").trim();
}

// 같은 브라우저를 구분하는 임의 번호 (도배 방지용, 개인정보 아님)
function getClientId() {
  const storageKey = "bcgh-comment-client";

  try {
    const saved = localStorage.getItem(storageKey);

    if (saved && /^[a-zA-Z0-9_-]{8,64}$/.test(saved)) {
      return saved;
    }

    const created =
      "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 12);

    localStorage.setItem(storageKey, created);
    return created;
  } catch {
    return "c" + Math.random().toString(36).slice(2, 14).padEnd(10, "0");
  }
}

const clientId = getClientId();

// 댓글 영역을 만들어 팝업 맨 아래에 붙임 (index.html은 고치지 않아도 됨)
const commentList = document.createElement("ul");
commentList.className = "comment-list";
commentList.setAttribute("aria-live", "polite");

const commentStatus = document.createElement("p");
commentStatus.className = "comment-status";
commentStatus.setAttribute("aria-live", "polite");

const nicknameInput = document.createElement("input");
nicknameInput.type = "text";
nicknameInput.maxLength = MAX_NICKNAME;
nicknameInput.placeholder = "닉네임 (비워 두면 '익명')";
nicknameInput.setAttribute("aria-label", "닉네임");
nicknameInput.autocomplete = "off";

const commentInput = document.createElement("textarea");
commentInput.maxLength = MAX_COMMENT;
commentInput.placeholder = "작품을 감상하고 느낀 점을 남겨 주세요.";
commentInput.setAttribute("aria-label", "감상 댓글");
commentInput.required = true;

// 자동 입력 프로그램을 걸러내는 숨은 칸
const honeypotWrap = document.createElement("div");
honeypotWrap.className = "comment-hp";
honeypotWrap.setAttribute("aria-hidden", "true");

const honeypotInput = document.createElement("input");
honeypotInput.type = "text";
honeypotInput.name = "website";
honeypotInput.tabIndex = -1;
honeypotInput.autocomplete = "off";
honeypotWrap.appendChild(honeypotInput);

const commentCounter = document.createElement("span");
commentCounter.className = "comment-count";
commentCounter.textContent = "0 / " + MAX_COMMENT;

const commentSubmit = document.createElement("button");
commentSubmit.type = "submit";
commentSubmit.className = "comment-submit";
commentSubmit.textContent = "댓글 남기기";

const commentRow = document.createElement("div");
commentRow.className = "comment-form-row";
commentRow.append(commentCounter, commentSubmit);

const commentForm = document.createElement("form");
commentForm.className = "comment-form";
commentForm.append(
  nicknameInput,
  commentInput,
  honeypotWrap,
  commentRow,
  commentStatus
);

const commentHeading = document.createElement("h3");
commentHeading.textContent = "감상 댓글";

const commentNote = document.createElement("p");
commentNote.className = "comment-note";
commentNote.textContent =
  "닉네임에는 나를 나타내는 별명을 써 주세요. 댓글은 선생님이 확인한 뒤 공개돼요.";

const commentSection = document.createElement("section");
commentSection.className = "comment-section";
commentSection.append(
  commentHeading,
  commentNote,
  commentList,
  commentForm
);

dialog.appendChild(commentSection);

function setCommentStatus(message, type) {
  commentStatus.textContent = message || "";
  commentStatus.className =
    "comment-status" + (type ? " is-" + type : "");
}

function showCommentMessage(message) {
  const item = document.createElement("li");
  item.className = "comment-empty";
  item.textContent = message;

  commentList.replaceChildren(item);
}

function renderComments(comments) {
  if (comments.length === 0) {
    showCommentMessage("아직 공개된 댓글이 없어요. 첫 감상을 남겨 주세요!");
    return;
  }

  // 최근 댓글이 위로 오도록 뒤집어서 표시
  const items = comments.slice().reverse().map(entry => {
    const item = document.createElement("li");
    item.className = "comment-item";

    const meta = document.createElement("p");
    meta.className = "comment-meta";

    const name = document.createElement("strong");
    name.textContent = entry.nickname || "익명";

    const date = document.createElement("span");
    date.textContent = entry.date || "";

    meta.append(name, date);

    const text = document.createElement("p");
    text.className = "comment-text";
    text.textContent = entry.comment || "";

    item.append(meta, text);

    return item;
  });

  commentList.replaceChildren(...items);
}

function loadComments(workKey) {
  showCommentMessage("댓글을 불러오는 중이에요…");

  callSheetApi({ action: "comments", workKey: workKey })
    .then(data => {
      // 그 사이 다른 작품으로 바뀌었으면 무시
      if (workKey !== currentWorkKey) {
        return;
      }

      if (Array.isArray(data)) {
        renderComments(data);
      } else {
        showCommentMessage("댓글을 불러오지 못했어요.");
      }
    })
    .catch(() => {
      if (workKey === currentWorkKey) {
        showCommentMessage("댓글을 불러오지 못했어요. 잠시 후 다시 열어 주세요.");
      }
    });
}

function resetComments() {
  currentWorkKey = "";
  commentList.replaceChildren();
  commentInput.value = "";
  commentCounter.textContent = "0 / " + MAX_COMMENT;
  setCommentStatus("");
}

commentInput.addEventListener("input", () => {
  commentCounter.textContent =
    commentInput.value.length + " / " + MAX_COMMENT;
});

commentForm.addEventListener("submit", event => {
  event.preventDefault();

  const comment = commentInput.value.trim();
  const workKey = currentWorkKey;

  if (!workKey) {
    return;
  }

  if (!comment) {
    setCommentStatus("댓글 내용을 입력해 주세요.", "error");
    return;
  }

  const waitMs = LOCAL_COOLDOWN_MS - (Date.now() - lastCommentAt);

  if (waitMs > 0) {
    setCommentStatus(
      Math.ceil(waitMs / 1000) + "초 뒤에 다시 남길 수 있어요.",
      "error"
    );
    return;
  }

  commentSubmit.disabled = true;
  setCommentStatus("댓글을 보내는 중이에요…");

  callSheetApi({
    action: "addComment",
    workKey: workKey,
    nickname: nicknameInput.value.trim(),
    comment: comment,
    clientId: clientId,
    website: honeypotInput.value
  })
    .then(result => {
      if (result && result.ok) {
        lastCommentAt = Date.now();
        commentInput.value = "";
        commentCounter.textContent = "0 / " + MAX_COMMENT;
        setCommentStatus(
          "댓글이 접수되었어요. 선생님이 확인하면 공개됩니다.",
          "ok"
        );
      } else {
        setCommentStatus(
          (result && result.error) || "댓글을 보내지 못했어요.",
          "error"
        );
      }
    })
    .catch(() => {
      setCommentStatus(
        "댓글을 보내지 못했어요. 잠시 후 다시 시도해 주세요.",
        "error"
      );
    })
    .finally(() => {
      commentSubmit.disabled = false;
    });
});


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

  resetComments();
  currentWorkKey = getWorkKey(work);

  if (currentWorkKey) {
    loadComments(currentWorkKey);
    commentSection.hidden = false;
  } else {
    // 작품 id와 제목이 모두 없으면 댓글을 붙일 수 없음
    commentSection.hidden = true;
  }

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

// 팝업을 닫으면 영상도 정지, 댓글 입력도 초기화
dialog.addEventListener("close", () => {
  videoArea.replaceChildren();
  resetComments();
});


/* ==========================================
   Google 스프레드시트에서 승인 작품 불러오기
========================================== */

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
