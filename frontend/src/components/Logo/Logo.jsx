import React from 'react'
import Tilt from 'react-parallax-tilt'
import flairpointLogo from '/img/flairpoint.png'

const Logo = () => {
    return (
        <Tilt className='w-36 drop-shadow-lg rounded-lg overflow-hidden' tiltReverse={true}>
                <img src={flairpointLogo} alt="Flairpoint Logo" />
        </Tilt>
    )
}

export default Logo;