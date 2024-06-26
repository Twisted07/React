import { Outlet, Link } from "react-router-dom";



export default function Root() {
    return(
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            type="search"
                            id="q"
                            aria-label="Search Contacts"
                            placeholder="Search"
                            name="q"
                        />
                        <div 
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div 
                            className="sr-only"
                            aria-live="polite"

                        />
                    </form>

                    <form method="post">
                        <button type="submit">New</button>
                    </form>
                </div>

                <nav>
                    <ul>
                        <li>
                            <Link to={`/contacts/1`}>Your Name</Link>
                        </li>
                        <li>
                            <Link to={`/contacts/2`}>Your Friend</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}