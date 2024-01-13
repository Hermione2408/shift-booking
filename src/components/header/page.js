import React from 'react'
import Link from 'next/link'

const Header=()=>{

    return(
        <div>
            <Link href="my-shifts">My shifts</Link>
            <Link href="available-shifts">Available shifts</Link>

        </div>
    )
}

export default Header