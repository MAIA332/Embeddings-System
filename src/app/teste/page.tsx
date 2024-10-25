'use client'

import React from 'react'
import ControlPanel from '../components/controlpanel/index'

export default function Teste() {
    return (
        <ControlPanel isOpen={true} onClose={()=>{console.log("hello");}} /> // Usado como ControlPanel
    )
}