
/* =========================================
   OUR ALBUMS · 고2 A&R 앨범 기획 프로젝트
   학생 17명 작품 등록용
   ========================================= */

/*
  작품 등록 방법
  1. student: 학생 번호
  2. title: 앨범명
  3. artist: 아티스트명
  4. genre: 음악 장르
  5. cover: 앨범 재킷 경로
  6. concept: 앨범 콘셉트
  7. planning: A&R 기획 의도
  8. target: 타깃 청중
  9. tracks: 수록곡 목록

  아직 완성되지 않은 작품은 published: false
  전시할 작품은 published: true 로 설정
*/

const albums = [
  {
    student: "01",
    published: false,
    featured: false,
    title: "",
    artist: "학생 01",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  },
  {
    student: "02",
    published: false,
    featured: false,
    title: "",
    artist: "학생 02",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  },
  {
    student: "03",
    published: false,
    featured: false,
    title: "",
    artist: "학생 03",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  },
  {
    student: "04",
    published: false,
    featured: false,
    title: "",
    artist: "학생 04",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  },
  {
    student: "05",
    published: false,
    featured: false,
    title: "",
    artist: "학생 05",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  },
  {
    student: "06",
    published: false,
    featured: false,
    title: "",
    artist: "학생 06",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  },
  {
    student: "07",
    published: false,
    featured: false,
    title: "",
    artist: "학생 07",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  },
  {
    student: "08",
    published: false,
    featured: false,
    title: "",
    artist: "학생 08",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  },
  {
    student: "09",
    published: false,
    featured: false,
    title: "",
    artist: "학생 09",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  },
  {
    student: "10",
    published: false,
    featured: false,
    title: "",
    artist: "학생 10",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  },
  {
    student: "11",
    published: false,
    featured: false,
    title: "",
    artist: "학생 11",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  },
  {
    student: "12",
    published: false,
    featured: false,
    title: "",
    artist: "학생 12",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  },
  {
    student: "13",
    published: false,
    featured: false,
    title: "",
    artist: "학생 13",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  },
  {
    student: "14",
    published: false,
    featured: false,
    title: "",
    artist: "학생 14",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  },
  {
    student: "15",
    published: false,
    featured: false,
    title: "",
    artist: "학생 15",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  },
  {
    student: "16",
    published: false,
    featured: false,
    title: "",
    artist: "학생 16",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  },
  {
    student: "17",
    published: false,
    featured: false,
    title: "",
    artist: "학생 17",
    genre: "미분류",
    cover: "",
    concept: "",
    planning: "",
    target: "",
    tracks: []
  }
];


/* ---------- 공통 요소 ---------- */

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

const searchInput = document.getElementById("album-search");
const genreFilter = document.getElementById("genre-filter");
const featuredSection = document.getElementById("featured-section");
const featuredAlbumContainer = document.getElementById("featured-album");

const coverColors = {
  pink: "linear-gradient(135deg, #f6b8d5, #d8b9f5)",
  lavender: "linear-gradient(135deg, #bdb4f0, #9dbfe8)",
  mint: "linear-gradient(135deg, #b9eadb, #d9edb1)",
  yellow: "linear-gradient(135deg, #ffe6a6, #ffcdb9)",
  peach: "linear-gradient(135deg, #ffcdb9, #f6b8d5)"
};

// 실제 전시 대상으로 등록된 작품만 사용
function getPublishedAlbums() {
  return albums.filter(album =>
    album.published === true &&
    album.title.trim() !== ""
  );
}


/* ---------- 앨범 재킷 ---------- */

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

  const background =
    coverColors[album.color] || coverColors.lavender;

  return `
    <div
      class="${className} cover-placeholder"
      style="background: ${background}"
      role="img"
      aria-label="${escapeHTML(album.title)} 앨범 재킷 준비 중"
    >
      <span>OUR ALBUMS</span>
      <strong>${escapeHTML(album.title)}</strong>
    </div>
  `;
}


/* ---------- 장르 필터 ---------- */

function renderGenreOptions() {
  const previousValue = genreFilter.value || "all";

  const genres = [
    ...new Set(
      getPublishedAlbums()
        .map(album => album.genre)
        .filter(genre => genre && genre !== "미분류")
    )
  ].sort((a, b) => a.localeCompare(b, "ko"));

  genreFilter.innerHTML = `
    <option value="all">모든 장르</option>
    ${genres.map(genre => `
      <option value="${escapeHTML(genre)}">
        ${escapeHTML(genre)}
      </option>
    `).join("")}
  `;

  genreFilter.value =
    genres.includes(previousValue) ? previousValue : "all";
}


/* ---------- 검색 ---------- */

function getFilteredAlbums() {
  const query = searchInput.value
    .trim()
    .toLocaleLowerCase();

  const selectedGenre = genreFilter.value;

  return getPublishedAlbums().filter(album => {
    const searchableText = [
      album.student,
      album.title,
      album.artist,
      album.genre,
      album.concept
    ].join(" ").toLocaleLowerCase();

    const matchesSearch = searchableText.includes(query);

    const matchesGenre =
      selectedGenre === "all" ||
      album.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });
}


/* ---------- 앨범 목록 ---------- */

function renderAlbums() {
  const publishedAlbums = getPublishedAlbums();
  const filteredAlbums = getFilteredAlbums();

  albumCount.textContent =
    `${filteredAlbums.length} / ${publishedAlbums.length} Albums`;

  emptyMessage.hidden = filteredAlbums.length > 0;

  if (publishedAlbums.length === 0) {
    emptyMessage.textContent =
      "학생들의 앨범이 완성되면 이곳에 전시됩니다.";
  } else {
    emptyMessage.textContent =
      "검색 결과가 없어요. 다른 검색어나 장르를 선택해 보세요.";
  }

  albumList.innerHTML = filteredAlbums.length
    ? filteredAlbums.map(album => `
        <article
          class="album-card"
          role="button"
          tabindex="0"
          data-student="${escapeHTML(album.student)}"
          aria-label="${escapeHTML(album.title)} 상세 정보 보기"
        >
          ${getCoverMarkup(album)}
          <h3>${escapeHTML(album.title)}</h3>
          <p class="album-artist">
            ${escapeHTML(album.artist)}
          </p>
          <span class="album-genre">
            ${escapeHTML(album.genre)}
          </span>
        </article>
      `).join("")
    : "";

  // 빈 검색 결과 안내
  if (publishedAlbums.length > 0 && filteredAlbums.length === 0) {
    albumList.innerHTML = `
      <p class="no-results">
        검색 결과가 없어요. 다른 검색어나 장르를 선택해 보세요.
      </p>
    `;
  }
}


/* ---------- 추천 앨범 ---------- */

function renderFeaturedAlbum() {
  const hasActiveFilter =
    searchInput.value.trim() !== "" ||
    genreFilter.value !== "all";

  const featuredAlbum = getPublishedAlbums().find(
    album => album.featured === true
  );

  if (hasActiveFilter || !featuredAlbum) {
    featuredSection.hidden = true;
    return;
  }

  featuredSection.hidden = false;

  featuredAlbumContainer.innerHTML = `
    <article
      class="featured-card"
      role="button"
      tabindex="0"
      data-student="${escapeHTML(featuredAlbum.student)}"
      aria-label="추천 앨범 ${escapeHTML(featuredAlbum.title)} 상세 정보 보기"
    >
      ${getCoverMarkup(featuredAlbum)}

      <div class="featured-copy">
        <p class="eyebrow">FEATURED ALBUM</p>
        <h3>${escapeHTML(featuredAlbum.title)}</h3>
        <p>
          ${escapeHTML(featuredAlbum.artist)}
          · ${escapeHTML(featuredAlbum.genre)}
        </p>
        <p>${escapeHTML(featuredAlbum.concept)}</p>
        <span class="featured-open">앨범 만나보기 →</span>
      </div>
    </article>
  `;
}


/* ---------- 앨범 상세 화면 ---------- */

function openAlbum(studentNumber) {
  const album = getPublishedAlbums().find(
    item => item.student === String(studentNumber)
  );

  if (!album) return;

  const tracks = Array.isArray(album.tracks)
    ? album.tracks
    : [];

  detailContent.innerHTML = `
    <div class="detail-layout">
      <div>
        ${getCoverMarkup(album, "detail-cover")}
      </div>

      <div class="detail-info">
        <p class="eyebrow">ALBUM INFORMATION</p>
        <h2>${escapeHTML(album.title)}</h2>

        <p>
          ${escapeHTML(album.artist)}
          · ${escapeHTML(album.genre)}
        </p>

        <div class="detail-description">
          <h3>앨범 콘셉트</h3>
          <p>${escapeHTML(album.concept || "정보 준비 중")}</p>
        </div>

        <div class="detail-description">
          <h3>A&R 기획 의도</h3>
          <p>${escapeHTML(album.planning || "정보 준비 중")}</p>
        </div>

        <div class="detail-description">
          <h3>타깃 청중</h3>
          <p>${escapeHTML(album.target || "정보 준비 중")}</p>
        </div>

        <div class="track-section">
          <h3>수록곡</h3>

          ${tracks.length ? `
            <ol class="track-list">
              ${tracks.map((track, index) => `
                <li class="track-item">
                  <span class="track-number">
                    ${String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <strong>${escapeHTML(track.title)}</strong>
                    <span>
                      ${escapeHTML(track.description || "")}
                    </span>
                  </div>
                </li>
              `).join("")}
            </ol>
          ` : `
            <p class="empty-message">수록곡 정보 준비 중</p>
          `}
        </div>
      </div>
    </div>
  `;

  albumHero.hidden = true;
  albumSection.hidden = true;
  featuredSection.hidden = true;
  albumDetail.hidden = false;

  window.scrollTo({ top: 0, behavior: "smooth" });
}


/* ---------- 목록으로 돌아가기 ---------- */

function closeAlbumDetail() {
  albumDetail.hidden = true;
  albumHero.hidden = false;
  albumSection.hidden = false;

  renderAlbums();
  renderFeaturedAlbum();

  window.scrollTo({ top: 0, behavior: "smooth" });
}


/* ---------- 카드 이벤트 ---------- */

function handleAlbumActivation(event) {
  const card = event.target.closest("[data-student]");

  if (!card) return;

  if (event.type === "keydown") {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
  }

  openAlbum(card.dataset.student);
}

albumList.addEventListener("click", handleAlbumActivation);
albumList.addEventListener("keydown", handleAlbumActivation);

featuredAlbumContainer.addEventListener(
  "click",
  handleAlbumActivation
);

featuredAlbumContainer.addEventListener(
  "keydown",
  handleAlbumActivation
);

searchInput.addEventListener("input", () => {
  renderAlbums();
  renderFeaturedAlbum();
});

genreFilter.addEventListener("change", () => {
  renderAlbums();
  renderFeaturedAlbum();
});

closeDetailButton.addEventListener("click", closeAlbumDetail);


/* ---------- 최초 실행 ---------- */

renderGenreOptions();
renderAlbums();
renderFeaturedAlbum();
