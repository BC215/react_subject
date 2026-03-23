import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const levels = { 초급: 1, 중급: 2, 고급: 3 };

const categoryText = (val) => {
  if (val === 1 || val === "1") return "백엔드";
  if (val === 2 || val === "2") return "프론트엔드";
  if (val === 3 || val === "3") return "DB";
  return val || "";
};

const levelText = (val) => {
  if (val === 1 || val === "1" || val === "초급") return "초급";
  if (val === 2 || val === "2" || val === "중급") return "중급";
  if (val === 3 || val === "3" || val === "고급") return "고급";
  return val || "";
};

const Home = () => {
  const [lectures, setLectures] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    console.log("Home useEffect fetch start");
    axios
      .get("http://localhost:8989/api/lectures")
      .then((res) => {
        console.log("axios response", res);
        setLectures(res.data);
      })
      .catch((err) => {
        console.error("Failed to load lectures:", err);
      });
  }, []);

  let filteredLectures = lectures.filter((item) => {
    const title = item.subjectTitle || item.title || "";
    const matchesSearch = title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const rawCategory = item.subjectCategory ?? item.category;
    const matchesCategory =
      category === "" || String(rawCategory) === String(category);

    const rawLevel = item.subjectLevel ?? item.level ?? item.subject_level;
    const matchesLevel =
      level === "" || levelText(rawLevel) === levelText(level);

    return matchesSearch && matchesCategory && matchesLevel;
  });


  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setLevel("");
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

        <button onClick={resetFilters} className="home-button">
          초기화
        </button>
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
          {filteredLectures.map((item) => (
            <tr key={item.subjectNo || item.id || Math.random()}>
              <td className="home-td">{item.subjectTitle || item.title}</td>
              <td className="home-td"></td>
              <td className="home-td">
                {categoryText(item.subjectCategory || item.category)}
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
                {item.subjectCount || item.students}
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
