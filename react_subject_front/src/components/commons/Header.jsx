import "./header.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-left">
        <span className="header-logo">Lee's academy</span>
      </div>

      <nav className="header-nav">
        <a href="#" className="header-link">
          마이페이지
        </a>
        <a href="#" className="header-link">
          강의 상세
        </a>
        <a href="#" className="header-link">
          수강 관리
        </a>
        <a href="#" className="header-link">
          로그인
        </a>
        <a href="#" className="header-link">
          회원가입
        </a>
      </nav>
    </header>
  );
};

export default Header;
