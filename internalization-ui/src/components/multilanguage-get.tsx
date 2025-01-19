import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InterService } from '../service/inter-service';
import { MultilanguageDto } from '../Dto/multilang-data';
import { updateTranslations } from '../i18n/config';

export const MultilanguageComponent = () => {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState<MultilanguageDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentLang, setCurrentLang] = useState('tr-TR');
    const Service = InterService();

    const getMl = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const result = await Service.GetMultilanguageData();
            console.log('Fetched data:', result);
            if (Array.isArray(result)) {
                setData(result);
                updateTranslations(result);
            } else {
                console.error('Expected array but got:', typeof result);
                setError('Invalid data format received');
            }
        } catch (error) {
            console.error("Error fetching multilingual data", error);
            setError('Failed to load data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getMl();
    }, []);

    const availableLanguages = [...new Set(data.map(item => item.LANG))];

    const handleLanguageChange = (lang: string) => {
        debugger;
        i18n.changeLanguage(lang);
        setCurrentLang(lang);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-lg text-gray-600">{t('loading')}</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 p-4 rounded-md">
                <p className="text-red-600">{error}</p>
                <button
                    onClick={() => getMl()}
                    className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 main-content">
            <div className="flex items-center ">
                <h2 className="text-2xl font-bold ">{t('loginText')}</h2>
                <div className="flex">
                    <button
                        onClick={() => handleLanguageChange(currentLang === 'en-EN' ? 'tr-TR' : 'en-EN')}
                        className={`px-3 py-1 rounded ${currentLang === 'en'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {currentLang === 'en-EN' ? 'Türkçe' : 'English'}
                    </button>
                    <form >
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">{t('username')}</label>
                            <input
                                id="username"
                                type="text"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                placeholder={t('enterUsername')}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('password')}</label>
                            <input
                                id="password"
                                type="password"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                placeholder={t('enterPassword')}
                            />
                        </div>
                        <div className="mb-6 text-center">
                            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                {t('login')}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};