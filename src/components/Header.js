function Header(props) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={props.headerImage}
        alt="Лого Место"
      />
    </header>
  )
}

export default Header
