import { useState } from "react";
import "./Home.css";

const levels = { 초급: 1, 중급: 2, 고급: 3 };

const Home = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [sort, setSort] = useState("created");

  let filteredLectures = dummyLectures.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesCategory = category === "" || item.category === category;
    const matchesLevel = level === "" || item.level === level;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  filteredLectures.sort((a, b) => {
    if (sort === "created")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "levelAsc") return levels[a.level] - levels[b.level];
    if (sort === "levelDesc") return levels[b.level] - levels[a.level];
    if (sort === "studentsAsc") return a.students - b.students;
    if (sort === "studentsDesc") return b.students - a.students;
    return 0;
  });

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setLevel("");
    setSort("created");
  };

  return (
    <div className="home-wrapper">
      <h1>강의 목록</h1>

      <div className="home-filter-row">
        <input
          type="text"
          placeholder="강의명 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="home-input"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="home-select"
        >
          <option value="">전체 카테고리</option>
          <option value="프론트엔드">프론트엔드</option>
          <option value="백엔드">백엔드</option>
          <option value="DB">DB</option>
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="home-select"
        >
          <option value="">전체 난이도</option>
          <option value="초급">초급</option>
          <option value="중급">중급</option>
          <option value="고급">고급</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="home-select"
        >
          <option value="created">작성순</option>
          <option value="levelAsc">난이도 오름차순</option>
          <option value="levelDesc">난이도 내림차순</option>
          <option value="studentsAsc">수강인원 오름차순</option>
          <option value="studentsDesc">수강인원 내림차순</option>
        </select>

        <button onClick={resetFilters} className="home-button">
          초기화
        </button>
      </div>

      <div className="home-result-count">
        검색결과 {filteredLectures.length}개
      </div>

      <table className="home-table">
        <thead>
          <tr>
            <th className="home-th">제목</th>
            <th className="home-th">카테고리</th>
            <th className="home-th">난이도</th>
            <th className="home-th home-th-right">수강인원</th>
            <th className="home-th">작성일</th>
          </tr>
        </thead>
        <tbody>
          {filteredLectures.map((item) => (
            <tr key={item.id}>
              <td className="home-td">{item.title}</td>
              <td className="home-td">{item.category}</td>
              <td className="home-td">
                <span className={`home-badge home-badge-${item.level}`}>
                  {item.level}
                </span>
              </td>
              <td className="home-td home-td-right">{item.students}</td>
              <td className="home-td">{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
