import React, {useEffect, useRef} from 'react';
import Link from 'next/link';
import Logo from '../../../public/images/logo.svg';
import Image from 'next/image';

const Header = () => {
    const topNavRoot = useRef<HTMLDivElement>(null);
    const IsTop = () => window.scrollY < (topNavRoot?.current?.clientHeight || 65);
    useEffect(() => {
        IsTop();
        window.addEventListener("scroll", IsTop);
        window.addEventListener("resize", IsTop);
        return () => {
            window.removeEventListener("scroll", IsTop);
            window.removeEventListener("resize", IsTop);
        }
    }, [topNavRoot]);

    return (
            <div ref={topNavRoot} id="top-nav-root" className={`flex fit-width flex-center bg-dark-gray`}>
                <nav id="top-nav" className="flex fit-width content-container">
                    <Link id="header-logo-container" href="/" as="image">
                        <Image priority alt="Logo" src={Logo} className="logo"/>
                    </Link>
                </nav>
            </div>
    );
}

export default Header;