import React from 'react';
import Layout from "../components/Layout";
import {useRouter} from "next/router";

const Unauthorized = () => {
    const router = useRouter()
    const {message} = router.query
    return (
        <Layout title="Отказано в доступе">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <h1 className="text-xl">Отказано в доступе!</h1>
                {message === "auth" && <p className="mb-4 text-red-500">Необходимо авторизоваться.</p>}
            </div>
        </Layout>
    );
};

export default Unauthorized;