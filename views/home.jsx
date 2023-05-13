const { Link, NavLink } = ReactRouterDOM

export function Home() {
    return (
        <section className="home">
            <h1>Welcome to Appsus!</h1>
            <h2>The only place where you can have it all-in-one.</h2>
            <ul className="clean-list flex align-center justify-center">
                <li>
                    <div className="img-container img-gmail"><img src="./assets/img/home/gmail_logo.svg" alt="Mail" /></div>
                    <h3>Mail</h3>
                    <p>Stay connected and organized with our powerful email client, managing your inbox effortlessly.</p>
                    <NavLink to="/mail"><button className="btn btn-card">Send a mail</button></NavLink>
                </li>
                <li>
                    <div className="img-container"><img src="./assets/img/home/Google_Keep_icon.svg" alt="Notes" /></div>
                    <h3>Notes</h3>
                    <p>Capture your thoughts, ideas, and inspirations seamlessly with our versatile note-taking app, keeping you organized and productive.</p>
                    <NavLink to="/note"><button className="btn btn-card">Write a note</button></NavLink>
                </li>
                {/* <li>
                    <div className="img-container"><img src="./assets/img/home/books.svg" alt="Books" /></div>
                    <h3>Books</h3>
                    <p>Immerse yourself in a world of literature with our vast collection of books, exploring various genres and authors.</p>
                    <NavLink to="/book"><button className="btn btn-card">Read a book</button></NavLink>
                </li> */}
            </ul>
            <section className="footer-wrapper">
                <hr />
                <footer className="home-footer">
                    <p>© This project made with ♥ by Steve Bendersky and Etai Levi.</p>
                </footer>
            </section>
        </section>
    )
}