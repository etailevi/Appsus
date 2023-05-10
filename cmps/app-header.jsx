const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
        <h1><img className="logo-header" src="assets/favicon/horse.png" alt=""/>Appsus</h1>
        </Link>
        <nav>
            <NavLink to="/"><img src="assets/img/home/home.svg" alt="Home" /></NavLink>
            <NavLink to="/mail"><img src="assets/img/imgs-gmail/mail.svg" alt="Gmail" /></NavLink>
            <NavLink to="/note"><img src="assets/img/imgs-notes/notes.svg" alt="Notes" /></NavLink>
            <NavLink to="/about"><img src="assets/img/about/info.svg" alt="About" /></NavLink>
        </nav>
    </header>
}
