
import "../styles/layouts/footer.css"

export const Footer = () => {
    return (
        <footer className="flex-column-center pd-sm">
            <p className="mg-bottom-xsm">Made by Abhijeet Gorde</p>
            <div className="footer-links mg-bottom-xsm">
                <a className="mg-xsm fs-sm-plus" href="https://www.linkedin.com/in/abhijeet-gorde-22201b394" target="_blank" rel="noreferrer"
                ><i className="fab fa-github"></i
                ></a>
                <a
                    className="mg-xsm fs-sm-plus"
                    href="https://www.linkedin.com/in/abhijeet-gorde-22201b394"
                    target="_blank" rel="noreferrer"
                ><i className="fab fa-linkedin-in"></i
                ></a>
                <a className="mg-xsm fs-sm-plus" href="https://www.linkedin.com/in/abhijeet-gorde-22201b394" target="_blank" rel="noreferrer"
                ><i className="fab fa-twitter"></i
                ></a>
            </div>
            <p className="copyright mg-bottom-xsm">© 2026 AgroStores</p>
        </footer>
    );
}
