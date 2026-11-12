
/* =========================================
   OUR ALBUMS · 고2 A&R 앨범 기획 프로젝트
   선생님 가이드 샘플 + 학생 17명 작품 등록
   ========================================= */

/*
  작품 등록 방법
  1. student: 학생 번호
  2. published: 공개 여부
  3. featured: 추천 앨범 여부
  4. title: 앨범명
  5. artist: 아티스트명
  6. genre: 음악 장르
  7. cover: 앨범 재킷 이미지 경로
  8. color: 이미지가 없을 때 사용할 배경색
  9. concept: 앨범 콘셉트
  10. planning: A&R 기획 의도
  11. target: 타깃 청중
  12. tracks: 수록곡 목록

  학생 작품은 published: false로 시작합니다.
  전시할 학생 작품만 published: true로 변경하세요.
  학생 작품의 student 번호는 01~17을 유지하세요.
*/


/* ---------- 선생님 가이드 앨범 ---------- */

const teacherAlbum = {
  student: "TEACHER",
  isTeacherSample: true,
  published: true,
  featured: true,

  title: "Talk to Me, Mirror",
  artist: "ZiNA",
  genre: " Dance-pop, Alternative R&B",
  cover: "./covers/teacher-zina.png",
  color: "lavender",

  concept:
    "타인의 시선과 사회가 요구하는 모습에서 벗어나 진정한 자기 자신을 발견하고, 자신의 선택으로 삶을 살아가는 과정 ",


planning:
  "<p>세련되고 몽환적이며 신비로운 분위기에서 시작해 따뜻하고 희망적인 분위기로 변화하는 구성</p>" +
  "<p>이 앨범은 화려한 무대 뒤에서 자신의 진짜 모습을 고민하는 아티스트의 이야기를 통해, 타인에게 보이는 모습과 실제 자신의 모습 사이의 간극을 표현하고자 한다.</p>" +
  "<p>거울을 자신을 돌아보는 매개체로 활용하여, 처음엔 자신이 누구인지 묻지만 마지막엔 스스로 자신의 정체성을 받아들이고 자기 삶의 주체가 되는 모습을 담는다.</p>",

  target:
    "자신에 대한 타인의 평가와 기대 속에서 진정한 자아를 찾아가고 싶은 청소년 및 청년. ",

  tracks: [
    {
      title: "Behind the Lights",
      description:
        "공연이 끝난 뒤 마주하는 고독과 공허함 - 앨범의 세계관 도입"
    },
  {
  title: "Talk to ME, Mirror",
  description:
    "거울 앞에서 진짜 자신의 목소리를 찾는 이야기 - title",
  isTitle: true,
  audio: "./audio/teacher.mp3"
},
    {
      title: "Secondhand Heart",
      description:
        "타인의 기대에 맞추느라 잃어버린 감정과 선택 - 내면의 갈등(몽환적인 신스와 기타 사운드)"
    },
    {
      title: "My Own Way",
      description:
        "불완전한 자신을 받아들이고 스스로 선택하는 과정 - 변화와 성장 표현"
    },
       {
      title: "Here, As I Am",
      description:
        "꾸밈없는 자신으로 세상에 서겠다는 다짐 - 앨범의 결말과 메시지 완성"
    }
  ]
};


/* ---------- 학생 작품 17개 ---------- */

const albums = [
  {
    student: "01",
    published: false,
    featured: false,
    title: "",
    artist: "학생 01",
    genre: "미분류",
    cover: "",
    color: "pink",
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
    color: "lavender",
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
    color: "mint",
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
    color: "yellow",
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
    color: "peach",
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
    color: "pink",
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
    color: "lavender",
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
    color: "mint",
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
    color: "yellow",
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
    color: "peach",
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
    color: "pink",
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
    color: "lavender",
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
    color: "mint",
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
    color: "yellow",
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
    color: "peach",
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
    color: "pink",
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
    color: "lavender",
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


/* ---------- 공개 작품 관리 ---------- */

// 선생님 샘플은 항상 공개.
// 학생 작품은 published: true인 작품만 공개.
function getPublishedAlbums() {
  return [
    teacherAlbum,
    ...albums.filter(album =>
      album.published === true &&
      album.title.trim() !== ""
    )
  ];
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
      <span>${album.isTeacherSample ? "TEACHER'S GUIDE" : "OUR ALBUMS"}</span>
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
      album.concept,
      album.isTeacherSample ? "선생님 가이드 샘플" : ""
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
          class="album-card ${album.isTeacherSample ? "teacher-sample-card" : ""}"
          role="button"
          tabindex="0"
          data-student="${escapeHTML(album.student)}"
          aria-label="${escapeHTML(album.title)} 상세 정보 보기"
        >
          ${getCoverMarkup(album)}

          ${album.isTeacherSample
            ? `<span class="sample-label">선생님 가이드 · 샘플</span>`
            : ""}

          <h3>${escapeHTML(album.title)}</h3>

          <p class="album-artist">
            ${escapeHTML(album.artist)}
          </p>

          <span class="album-genre">
            ${escapeHTML(album.genre)}
          </span>
        </article>
      `).join("")
    : `
        <p class="no-results">
          검색 결과가 없어요. 다른 검색어나 장르를 선택해 보세요.
        </p>
      `;
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
      class="featured-card ${featuredAlbum.isTeacherSample ? "teacher-sample-card" : ""}"
      role="button"
      tabindex="0"
      data-student="${escapeHTML(featuredAlbum.student)}"
      aria-label="추천 앨범 ${escapeHTML(featuredAlbum.title)} 상세 정보 보기"
    >
      ${getCoverMarkup(featuredAlbum)}

      <div class="featured-copy">
        <p class="eyebrow">
          ${featuredAlbum.isTeacherSample
            ? "TEACHER'S GUIDE · SAMPLE"
            : "FEATURED ALBUM"}
        </p>

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
   const titleTrack =
  tracks.find(track => track.isTitle) || null;

  detailContent.innerHTML = `
    <div class="detail-layout">
     
<div class="detail-cover-column">
  ${getCoverMarkup(album, "detail-cover")}

  <div class="title-track-player">
    <p class="title-track-label">
      ♫ TITLE TRACK
    </p>

    ${titleTrack ? `
      <h3 class="title-track-name">
        ${escapeHTML(titleTrack.title)}
      </h3>

      ${titleTrack.audio ? `
        <audio
          class="title-track-audio"
          controls
          preload="none"
          aria-label="${escapeHTML(titleTrack.title)} 재생"
        >
          <source
            src="${escapeHTML(titleTrack.audio)}"
            type="audio/mpeg"
          >
          브라우저에서 오디오 재생을 지원하지 않습니다.
        </audio>
      ` : `
        <p class="title-track-pending">
          음원이 등록되면 재생할 수 있어요.
        </p>
      `}
    ` : `
      <p class="title-track-pending">
        타이틀곡 정보 준비 중
      </p>
    `}
  </div>
</div>


      <div class="detail-info">
        <p class="eyebrow">
          ${album.isTeacherSample
            ? "TEACHER'S GUIDE · SAMPLE ALBUM"
            : "ALBUM INFORMATION"}
        </p>

        <h2>${escapeHTML(album.title)}</h2>

        <p>
          ${escapeHTML(album.artist)}
          · ${escapeHTML(album.genre)}
        </p>

        ${album.isTeacherSample
          ? `
            <p class="sample-notice">
              수업 참고용으로 제작한 선생님 가이드 앨범입니다.
              앨범 기획과 디자인의 예시를 살펴보세요.
            </p>
          `
          : ""}

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
