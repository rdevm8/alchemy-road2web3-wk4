import { useState } from "react"

export function DefaultFieldSet({ legend, children, className, ...rest }) {
    return (
        <fieldset className="border-2 border-black flex flex-col px-2 py-4 rounded-lg w-full">
            <legend className=" text-md font-semibold text-black">{legend}</legend>
            {children}
        </fieldset>
    )
}

export function DefaultInputField({ type, placeholder, className, ...rest }) {
    return (
        <input
            className=" bg-transparent outline-0 text-md p-2 autofill:bg-yellow-300"
            type={type}
            placeholder={placeholder}
            {...rest}
        />
    )
}
