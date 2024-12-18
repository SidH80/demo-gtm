import React from "react";
import { BrowserRouter } from 'react-router-dom';
import ChevronButton from "./ChevronButton";

export default {
    title: 'RCL/Components/ChevronButton',
    components: ChevronButton.WrappedComponent
}

export const ChevronRight = () => (
    <BrowserRouter>
        <ChevronButton direction={'right'} height={20} width={20} />
    </BrowserRouter>
)

export const ChevronLeft = () => (
    <BrowserRouter>
        <ChevronButton direction={'left'} height={20} width={20} />
    </BrowserRouter>
)

export const ChevronUp = () => (
    <BrowserRouter>
        <ChevronButton direction={'up'} />
    </BrowserRouter>
)

export const ChevronDown = () => (
    <BrowserRouter>
        <ChevronButton direction={'down'} />
    </BrowserRouter>
)