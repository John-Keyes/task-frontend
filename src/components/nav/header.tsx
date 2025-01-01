import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import Logo from '../../../public/images/logo.svg';
import {useRouter} from 'next/router';
import Image from 'next/image';

const Header = () => {
    const {push, pathname} = useRouter();
    const topNavRoot = useRef<HTMLDivElement>(null);
    const [atTop, setAtTop] = useState(true);
    const IsTop = () => setAtTop(window.scrollY < (topNavRoot?.current?.clientHeight || 65));
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
                    <Link id="header-logo-container" href="/">
                        <Image priority alt="Logo" src={Logo} className="logo"/>
                    </Link>
                </nav>
            </div>
    );
}

export default Header;