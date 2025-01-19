import { MultilanguageDto } from "../Dto/multilang-data";
import { useHttpService } from "../httpService/useHttpService";



export const InterService = () => {
    const { fetchData } = useHttpService();


    const getMultilanguageData = async (): Promise<MultilanguageDto[]> => {
        return fetchData('getMultilanguage');
    };






    return {
        GetMultilanguageData: getMultilanguageData
    }
}