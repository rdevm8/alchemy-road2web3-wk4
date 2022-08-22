export function DefaultContentHeader({ children, className, ...rest }) {
    return (
        <p className="  text-black text-lg font-bold border-b-2 border-b-slate-900" {...rest}>
            {children}
        </p>
    )
}
