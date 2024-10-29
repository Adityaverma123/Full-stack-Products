import { useRouter } from 'next/navigation';

const handleApiError = (error) => {
    const router = useRouter(); 

    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        router.replace('/');
    }

    return Promise.reject(error);
};

export default handleApiError;
