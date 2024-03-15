
import Link from 'next/link';

const Custom404 = () => {
    return (
        <div className="notFoundPageContainer">
            <h1 className="titleNotFoundPage">404 - Page Not Found</h1>
            <p className="descriptionNotFoundPage">The page you are looking for does not exist.</p>
            <div className="loader"></div>
            <Link href="/" className="linkBack">
                Go back to the homepage
            </Link>
        </div>
    );
};

export default Custom404;