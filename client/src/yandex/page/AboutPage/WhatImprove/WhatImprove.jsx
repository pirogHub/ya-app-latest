import OneSection from "../components/OneSection/OneSection"
import SectionItem from "../components/SectionItem/SectionItem"

export const WhatImprove = () => {



    return (
        <OneSection
            title="Что можно улучшить?"
        >
            <SectionItem
                title="Отложенные запросы к серверу"
            >

                <p> Выполнять запросы к серверу на дополнительные данные
                    ("похожие" офферы в минислайдер, например) не сразу в момент первого рендеринга страницы, а в моменты "простоя" страницы или в зависимости от загруженности мощностей браузера</p>
            </SectionItem>

            <SectionItem
                title={<><span className="underline">Полностью убрать с клиента</span> все операции по трансформации каждого Offer для разных компонентов</>}
            >

                <p>у объекта Offer примерно 78 полей</p>
                <p>
                    На страницах поиска объявлений (/table) и на userpage (/user/:id) нам нужны только поля offer.price, offer.createdAt, offer.mainTitle... .
                </p>
                <p>То есть в mongoDB у модели Offer можно создать методы getBaseInfo_ForUserList и getBaseInfo_ForFiltrationList, которые будут выдавать только "базовые" поля, необходимые для отображения инфы об оффере
                </p>
            </SectionItem>
            <SectionItem
                title={<><span className="underline">Полностью убрать с сервера</span> глобальный объект Offer-Father</>}

            >

                <p>Как было описано выше, глобальный объект Offer-Father парсится на author, random_author, seeker, random_seeker на сервере в момент запуска сервера. </p>
                <p>То есть, как минимум, если мы хотим что-то изменить, придётся останавливать сервер</p>
                <p>Если мы перенесем этот Offer-Father в Mongo, то изменения можно проводить прямо там, не выключая сервер</p>
                <p>Возможно, какой-то вид методов (н-р, mongo-виртуальные методы) mongo выполняет на своих серверах. Если так, то генерацию рандомных объявлений и фильтров можно перенести на сервера mongo </p>
            </SectionItem>

            <SectionItem
                title={"Верстка для смартфонов через @media"}
            >
                <p>Тут и так всё понятно{`:)`}</p>
            </SectionItem>
            <SectionItem
                title={"Сделать спринг своих svg"}
            >
                <p>Тут тоже бех подробностей</p>
            </SectionItem>
        </OneSection>
    )
}