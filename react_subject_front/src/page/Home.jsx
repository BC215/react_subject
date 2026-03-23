import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

// 카테고리 번호를 한글 텍스트로 변환
const categoryText = (val) => {
  const category = String(val);

  switch (category) {
    case "1":
      return "백엔드";
    case "2":
      return "프론트엔드";
    case "3":
      return "DB";
    default:
      return val || "";
  }
};

// 난이도 값을 한글 텍스트로 변환
const levelText = (val) => {
  const level = String(val);

  switch (level) {
    case "1":
    case "초급":
      return "초급";
    case "2":
    case "중급":
      return "중급";
    case "3":
    case "고급":
      return "고급";
    default:
      return val || "";
  }
};

// 강사명 추출
const teacherName = (item) =>
  item.subject_instructor || item.subjectInstructor || item.teacher || "";

// 강의 목록 페이지
const Home = () => {
  // 강의 목록 상태
  const [lectures, setLectures] = useState([]);
  // 검색 입력값 상태
  const [searchInput, setSearchInput] = useState("");
  // 실제 검색에 사용되는 값
  const [search, setSearch] = useState("");
  // 선택된 카테고리
  const [category, setCategory] = useState("");
  // 선택된 난이도
  const [level, setLevel] = useState("");
  // 적용된 카테고리(검색 시)
  const [appliedCategory, setAppliedCategory] = useState("");
  // 적용된 난이도(검색 시)
  const [appliedLevel, setAppliedLevel] = useState("");
  // 정렬 기준
  const [sort, setSort] = useState("created");

  // 강의 목록 불러오기 
  const fetchLectures = () => {
    console.log("Home fetchLectures sort", sort);
    axios
      .get("http://localhost:8989/api/lectures", {
        params: {
          sort: sort,
          category: appliedCategory,
          level: appliedLevel,
          title: search,
        },
      })
      .then((res) => {
        console.log("axios response", res);
        setLectures(res.data);
      })
      .catch((err) => {
        console.error("Failed to load lectures:", err);
      });
  };

  // 정렬 기준이 변경될 때마다 강의 목록 재요청
  useEffect(() => {
    fetchLectures();
  }, [sort]);

  // 검색/필터링된 강의 목록
  let filteredLectures = lectures.filter((item) => {
    const title = item.subject_title || item.subjectTitle || item.title || "";
    if (search.trim() !== "") {
      const lowerTitle = title.toLowerCase();
      const lowerSearch = search.trim().toLowerCase();
      if (!lowerTitle.includes(lowerSearch)) {
        return false;
      }
    }

    const rawCategory =
      item.subject_category ?? item.subjectCategory ?? item.category;
    if (
      appliedCategory !== "" &&
      String(rawCategory) !== String(appliedCategory)
    ) {
      return false;
    }

    const rawLevel = item.subject_level ?? item.subjectLevel ?? item.level;
    if (
      appliedLevel !== "" &&
      levelText(rawLevel) !== levelText(appliedLevel)
    ) {
      return false;
    }

    return true;
  });

  // 모든 필터와 검색어 초기화
  const resetFilters = () => {
    setSearchInput("");
    setSearch("");
    setCategory("");
    setLevel("");
    setAppliedCategory("");
    setAppliedLevel("");
    setSort("created");
    fetchLectures();
  };

  // 정렬된 강의 목록
  const sortedLectures = filteredLectures;

  // 렌더링
  return (
    <div className="home-wrapper">
      <h1>강의 목록</h1>

      <div className="home-filter-row">
        <input
          type="text"
          placeholder="강의명 검색"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="home-input"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="home-select"
        >
          <option value="">전체 카테고리</option>
          <option value="1">백엔드</option>
          <option value="2">프론트엔드</option>
          <option value="3">DB</option>
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="home-select"
        >
          <option value="">전체 난이도</option>
          <option value="1">초급</option>
          <option value="2">중급</option>
          <option value="3">고급</option>
        </select>

        <button
          onClick={() => {
            setSearch(searchInput);
            setAppliedCategory(category);
            setAppliedLevel(level);
            fetchLectures();
          }}
          className="home-button"
        >
          검색
        </button>

        <button onClick={resetFilters} className="home-button">
          초기화
        </button>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="home-select home-select-right"
        >
          <option value="created">작성순</option>
          <option value="levelAsc">난이도 오름차순</option>
          <option value="levelDesc">난이도 내림차순</option>
          <option value="studentsAsc">수강인원 오름차순</option>
          <option value="studentsDesc">수강인원 내림차순</option>
        </select>
      </div>

      <div className="home-result-count">검색결과</div>

      <table className="home-table">
        <thead>
          <tr>
            <th className="home-th">강의명</th>
            <th className="home-th">강사명</th>
            <th className="home-th">카테고리</th>
            <th className="home-th">난이도</th>
            <th className="home-th home-th-right">수강인원</th>
          </tr>
        </thead>
        <tbody>
          {sortedLectures.map((item) => (
            <tr key={item.subjectNo || item.id || Math.random()}>
              <td className="home-td">
                {item.subject_title || item.subjectTitle || item.title}
              </td>
              <td className="home-td">{teacherName(item)}</td>
              <td className="home-td">
                {categoryText(
                  item.subject_category ||
                    item.subjectCategory ||
                    item.category,
                )}
              </td>
              <td className="home-td">
                <span
                  className={`home-badge home-badge-${levelText(item.subjectLevel ?? item.level ?? item.subject_level)}`}
                >
                  {levelText(
                    item.subjectLevel ?? item.level ?? item.subject_level,
                  )}
                </span>
              </td>
              <td className="home-td home-td-right">
                {item.subject_count || item.subjectCount || item.students || 0}
              </td>
              <td className="home-td">{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
