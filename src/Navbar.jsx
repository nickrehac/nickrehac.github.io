import logo from "./assets/react.svg"

function Navbar() {
    return <div className="navbar">
        <a href="/">
            <img className="logo" src={logo} alt="logo" />
        </a>
    </div>
}
export default Navbar;