import Highlight from "react-highlight"
import { code_generating } from "../../../codes/genetation"
import { code_author } from "../../../codes/author"
import { code_landFullStruct } from "../../../codes/landFullStruct"
import SectionItem from "../../../components/SectionItem/SectionItem"
import LittlePart from "../../../components/LittlePart/LittlePart"
import { code_aboutLand } from "../../../codes/aboutLand"



const OfferFather = () => {



    return (<>
        <SectionItem
            title="Супер-объект Offer-Father"
        >
            <>
                <p> На этом сайте есть 6 видов объявлений (далее "офферы"):</p>
                <ul>
                    <li>Квартира</li>
                    <li>Комната</li>
                    <li>Дом</li>
                    <li>Гараж</li>
                    <li>Коммерческая недвижимость</li>
                    <li>Земля</li>
                </ul>

                <p>Поэтому на сервере есть 6 больших объектов(иногда будем называть его "OFFER-Father"), полностью описывающих работу с каждым видом оффера. А именно:</p>
                <h5>для операции "Оставить объявление"</h5>
                <ul>    <li>отрисовка ui-инпутов</li>
                    <li>генератор случайных параметров объявления</li>
                </ul>
                <h5>для операции "Найти объявление"</h5>
                <ul>    <li>отрисовка ui-инпутов (фильтров)</li>
                    <li>генератор случайных параметров фильтров</li>
                </ul>
            </>

        </SectionItem>
        <SectionItem
            title="Пример объекта оффера 'Земля'"
        >
            <LittlePart>

                Например, OFFER-Father Земли ("landFullStruct"):

                <Highlight className="javascript">
                    {code_landFullStruct}
                </Highlight>
            </LittlePart>
            <LittlePart>
                Если упростить и взглянуть внуть объекта FullAboutLand (3тья строчка сверху), мы увидим такую структуру:

                <Highlight className="javascript">
                    {code_aboutLand}
                </Highlight>
            </LittlePart>


            <p>У area.area_total есть поля author и seeker. </p>
            <p>Они описывают инструкции для страницы "Добавить объявление" /add (author) и компонентов-инпутов фильтрации для страницы "К фильтрам" /table (seeker).

                <Highlight className="javascript">
                    {code_author}
                </Highlight>
                <p>
                    Все остальные части, составляющие Offer-Father построены по такому же принципу.
                </p>
                Дальше мы парсим этот Offer-Father специально написанной функцией и на выходе получаем 8 маленьких объектов:

            </p>

            <Highlight className="javascript">
                {code_generating}
            </Highlight>


        </SectionItem>
    </>
    )
}

export default OfferFather