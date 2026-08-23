import React, {ReactNode} from 'react'

const AuthLayout = ({children}: {children: ReactNode }) => {
    return (
        <div className="Auth-layout">{children}</div>
    )
}
export default AuthLayout
