interface Props {
  username: string;
  logout: () => void;
  sidebarActive: () => void;
}

const Header = ({ username, logout, sidebarActive }: Props) => {
  return (
    <>
      <div className="header d-inline-flex justify-content-between align-content-center border border-1 shadow-m">
        <div className="menu-1">
          <button
            type="button"
            className="menu-button border-0 h-100 btn-hover"
            onClick={sidebarActive}
          >
            <i className="bi bi-list menu-icon"></i>
          </button>
        </div>
        <div className="menu-2 d-inline-flex justify-content-end m-2 align-content-center menu-nav px-3">
          <div className="px-1 py-1">
            <h6 className="user-name">{username}</h6>
          </div>

          <button className="px-1 p-0 border-0 btn btn-link" onClick={logout}>
            <i className="bi bi-box-arrow-right menu-icon"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
