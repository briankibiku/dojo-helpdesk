import Link from 'next/link';
import React from 'react'


async function getTickets() {
    await new Promise(resolve => setTimeout(resolve, 3000))
    const resp = await fetch('http://localhost:4000/tickets', {
        next: {
            revalidate: 0 // instruct next js not to cache data
        }
    })
    return resp.json()
}
export default async function TicketList() {
    const tickets = await getTickets();
    return (
        <>
            {tickets.map((ticket) => (
                <div key={ticket.id} className='card my-5'>
                    <Link href={`/tickets/${ticket.id}`}>
                        <h3>{ticket.title}</h3>
                        <p>{ticket.body.slice(0, 200)}...</p>
                        <div className={`pill ${ticket.priority}`}>
                            {ticket.priority}
                        </div>
                    </Link>

                </div>
            ))}
            {tickets.length === 0 && (
                <p className='text-center'>There are no open tickets. Yeh!</p>
            )}
        </>
    )
}
