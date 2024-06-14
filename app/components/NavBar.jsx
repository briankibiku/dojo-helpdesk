import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from './dojo-logo.png'


export default function NavBar() {
    return (
        <nav>
            <Image src={logo} alt='Dojo Logo' width={70} quality={100} placeholder='blur' />
            <h1>Dojo Helpdesk</h1>
            <Link href="/">Dashboard</Link>
            <Link href="/tickets">Tickets</Link>
        </nav>
    )
}
