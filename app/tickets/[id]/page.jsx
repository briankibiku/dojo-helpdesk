
import { notFound } from 'next/navigation'
import React from 'react'

export const dynamicParams = true

export async function generateStaticParams() {
    const res = await fetch('http://localhost:4000/tickets')
    const tickets = await res.json()

    return tickets
        .map((ticket) => ({
            id: ticket.id
        }))
}
async function getTicket(id) {

    await new Promise(resolve => setTimeout(resolve, 3000))
    const resp = await fetch('http://localhost:4000/tickets/' + id, {
        next: {
            revalidate: 60 // instruct next js not to cache data
        }
    })
    if (!resp.ok) {
        notFound()
    }
    return resp.json()
}

export default async function TicketDetails({ params }) {
    const ticket = await getTicket(params.id)
    return (
        <main>
            <nav>
                <h2>Ticket Details</h2>
            </nav>
            <div className='card'>
                <h3>{ticket.title}</h3>
                <small>Created y {ticket.user_email}</small>
                <p>{ticket.body.slice(0.200)}...</p>
                <div className={`pill ${ticket.priority}`}>
                    {ticket.priority}
                </div>
            </div>
        </main>
    )
}
