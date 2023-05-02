

import Highlight from "react-highlight"
import { code_generating } from "../../../codes/genetation"
import { code_author } from "../../../codes/author"
import { code_landFullStruct } from "../../../codes/landFullStruct"
import SectionItem from "../../../components/SectionItem/SectionItem"
import LittlePart from "../../../components/LittlePart/LittlePart"
import { code_aboutLand } from "../../../codes/aboutLand"



const OfferFatherClient = () => {



    return (<>
        <SectionItem
            title="Клиент: Супер-объект Offer-Father"
        >
            <>
                <p> На клиент приходит land.author.client или land.seeker.client.</p>
                <p> И на Клиенте это парсится функцией inputsGenerator, в которой сопоставляется значение area.area_total.type с каким-то ui-инпутом</p>
                <p> В каждый компонент при генерации замыкается функция onChange типа {`(val) => loadValToForm({aboutLand: {area:{area_total: val}}}`} или{`(val) => loadValToForm({priceDetails:{deposit: val}}`} </p>

            </>
        </SectionItem>
        <SectionItem
            title="Управление формами на клиенте"
        >
            <LittlePart>
                Так как мы заранее не знаем, сколько и каких компоненты будет сгенерировано,компоненты в конечном итоге получаются неуправляемыми в том смысле, который описан в React.

                При первом рендере компонент присылает пустое значение через onChange и у нас в ref_State собирается скелет полей оффера с пустыми значениями:

                То есть каждый компонент сам хранит своё состояние, присылая копию состояния наверх.



                Еще хочется отметить загрузку данных в компонент

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

export default OfferFatherClient