import { ToastContainer } from "react-toastify"
import Layout from "../components/Layout"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
            <ToastContainer></ToastContainer>
        </Layout>
    )
}

export default MyApp
