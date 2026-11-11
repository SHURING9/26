
const albums = [
  {
    id: 1,
    title: "달빛 아래",
    artist: "앨범 기획팀 01",
    genre: "인디 팝",
    cover: "",
    color: "pink",
    concept: "하루가 끝난 밤, 혼자만의 시간을 보내며 느끼는 감정을 음악으로 표현한 앨범.",
    target: "바쁜 일상 속에서 휴식과 위로가 필요한 청소년",
    planning: "잔잔한 분위기와 따뜻한 사운드를 통해 듣는 사람에게 편안함을 전달하고자 기획함.",
    tracks: [
      {
        title: "달빛 아래",
        description: "앨범의 핵심 메시지를 담은 타이틀곡"
      },
      {
        title: "잠들기 전",
        description: "하루를 돌아보며 마음을 정리하는 곡"
      },
      {
        title: "내일의 나에게",
        description: "새로운 하루를 응원하는 곡"
      }
    ]
  },
  {
    id: 2,
    title: "CITY LIGHTS",
    artist: "앨범 기획팀 02",
    genre: "신스 팝",
    cover: "",
    color: "lavender",
    concept: "화려한 도시의 야경 속에서 꿈을 향해 나아가는 청춘의 모습을 표현한 앨범.",
    target: "새로운 도전과 미래를 준비하는 청소년과 청년",
    planning: "도시의 역동적인 분위기와 신시사이저 사운드를 활용해 도전과 설렘을 전달하고자 기획함.",
    tracks: [
      {
        title: "CITY LIGHTS",
        description: "도시의 밤과 새로운 시작을 표현한 타이틀곡"
      },
      {
        title: "RUN TO YOU",
        description: "꿈을 향해 달려가는 에너지를 담은 곡"
      },
      {
        title: "LAST TRAIN",
        description: "늦은 밤의 생각과 감정을 담은 곡"
      }
    ]
  },
  {
    id: 3,
    title: "초록의 기록",
    artist: "앨범 기획팀 03",
    genre: "어쿠스틱",
    cover: "",
    color: "mint",
    concept: "자연의 소리와 일상의 작은 순간에서 발견한 행복을 음악으로 기록한 앨범.",
    target: "자연과 여유로운 일상을 좋아하는 사람",
    planning: "어쿠스틱 악기의 따뜻한 음색을 중심으로 자연과 일상의 소중함을 표현하고자 기획함.",
    tracks: [
      {
        title: "초록빛 하루",
        description: "평범한 하루 속 작은 행복을 담은 곡"
      },
      {
        title: "바람이 지나간 자리",
        description: "자연의 움직임을 음악으로 표현한 곡"
      },
      {
        title: "우리의 계절",
        description: "함께한 시간의 의미를 돌아보는 곡"
      }
    ]
  }
];

// HTML에 표시할 문자열을 안전하게 변환
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

const albumList = document.getElementById("album-list");
const albumCount = document.getElementById("album-count");
const emptyMessage = document.getElementById("empty-message");
const albumSection = document.querySelector(".album-section");
const albumHero = document.querySelector(".album-hero");
const albumDetail = document.getElementById("album-detail");
const detailContent = document.getElementById("detail-content");
const closeDetailButton = document.getElementById("close-detail");

const coverColors = {
  pink: "linear-gradient(135deg, #f6b8d5, #d8b9f5)",
  lavender: "linear-gradient(135deg, #bdb4f0, #9dbfe8)",
  mint: "linear-gradient(135deg, #b9eadb, #d9edb1)",
  yellow: "linear-gradient(135deg, #ffe6a6, #ffcdb9)",
  peach: "linear-gradient(135deg, #ffcdb9, #f6b8d5)"
};

function getCoverMarkup(album, className = "album-cover") {
  if (album.cover) {
    return `
      <img
        class="${className}"
        src="${escapeHTML(album.cover)}"
        alt="${escapeHTML(album.title)} 앨범 재킷"
        loading="lazy"
      >
    `;
  }

  const background = coverColors[album.color] || coverColors.lavender;

  return `
    <div
      class="${className} cover-placeholder"
      style="background: ${background}"
      role="img"
      aria-label="${escapeHTML(album.title)} 앨범 재킷 자리"
    >
      <span>OUR ALBUMS</span>
      <strong>${escapeHTML(album.title)}</strong>
    </div>
  `;
}

function renderAlbums() {
  albumCount.textContent = `${albums.length} Albums`;
  emptyMessage.hidden = albums.length > 0;

  albumList.innerHTML = albums.map(album => `
    <article
      class="album-card"
      role="button"
      tabindex="0"
      data-album-id="${album.id}"
      aria-label="${escapeHTML(album.title)} 상세 정보 보기"
    >
      ${getCoverMarkup(album)}

      <h3>${escapeHTML(album.title)}</h3>
      <p class="album-artist">${escapeHTML(album.artist)}</p>
      <span class="album-genre">${escapeHTML(album.genre)}</span>
    </article>
  `).join("");
}

function openAlbum(albumId) {
  const album = albums.find(item => item.id === Number(albumId));

  if (!album) return;

  detailContent.innerHTML = `
    <div class="detail-layout">
      <div>
        ${getCoverMarkup(album, "detail-cover")}
      </div>

      <div class="detail-info">
        <p class="eyebrow">ALBUM INFORMATION</p>
        <h2>${escapeHTML(album.title)}</h2>
        <p>${escapeHTML(album.artist)} · ${escapeHTML(album.genre)}</p>

        <div class="detail-description">
          <h3>앨범 콘셉트</h3>
          <p>${escapeHTML(album.concept)}</p>
        </div>

        <div class="detail-description">
          <h3>A&R 기획 의도</h3>
          <p>${escapeHTML(album.planning)}</p>
        </div>

        <div class="detail-description">
          <h3>타깃 청중</h3>
          <p>${escapeHTML(album.target)}</p>
        </div>

        <div class="track-section">
          <h3>수록곡</h3>
          <ol class="track-list">
            ${album.tracks.map((track, index) => `
              <li class="track-item">
                <span class="track-number">${String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>${escapeHTML(track.title)}</strong>
                  <span>${escapeHTML(track.description)}</span>
                </div>
              </li>
            `).join("")}
          </ol>
        </div>
      </div>
    </div>
  `;

  albumHero.hidden = true;
  albumSection.hidden = true;
  albumDetail.hidden = false;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeAlbumDetail() {
  albumDetail.hidden = true;
  albumHero.hidden = false;
  albumSection.hidden = false;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

albumList.addEventListener("click", event => {
  const card = event.target.closest("[data-album-id]");

  if (card) {
    openAlbum(card.dataset.albumId);
  }
});

albumList.addEventListener("keydown", event => {
  const card = event.target.closest("[data-album-id]");

  if (card && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openAlbum(card.dataset.albumId);
  }
});

closeDetailButton.addEventListener("click", closeAlbumDetail);

// 최초 앨범 목록 표시
renderAlbums();
