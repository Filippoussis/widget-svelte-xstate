# Svelte + XState (Finite State Machine)


## Проблема

1. Логика

>Логика виджетов аутентификации основана на изменении представления виджета в зависимости от текущего шага сценария аутентификации или по другому состояния.

>При этом инструменты для реализации подобного поведения зависят от выбранного ui фреймворка на котором пишется основной клиентский код виджета. В частности, при использовании React, работу по менеджменту состояния приложения выполняет одна из библиотек его экосистемы      (redux-thunk, redux-toolkit, redux-saga и др).

2. Размер бандла

>Для целей встраивания виджета в сторонние веб-сервисы, желательно, чтобы результирующий бандл имел минимально возможный размер.

>Приложения же, написанные на Реакте  тянут в результирующий бандл ui библиотеку целиком, что не совсем оптимально.

## Задача

1. Сделать логику виджетов независимой от ui фреймворка, и легко переносимой.

2. По возможности минимизировать размер результирующего бандла виджета.

## Решение

1. Решение основано на идее использования конечных автоматов, в частности js библиотеки XState, которая их реализует.

+++
> логика виджетов независима от ui фреймворков, и легко переносится между ними.

> диаграмма состояний вместе с визуализатором XState помогает моделировать разрабатываемую систему как конечный автомат, наглядно демонстрировать возможные состояния и переходы, что, вероятно, может быть полезным при проектировании, а также при онбординге разработчиков.

> визуализатор XState позволяет выполнить кодогенерацию смоделированного конечного автомата и перенести готовый javascript код в ваш проект.

2. Предлагается рассмотреть возможность реализации виджетов на “исчезающем” фреймворке Svelte, в котором в результирующий бандл попадает только js код бизнес логики, а фреймворк “исчезает” из бандла, делая его минимальным.

+++
> оказываем общее положительное влияние на работу клиентского веб-сервиса.

##  Visualizer XState

Посмотреть и пройти сценарий аутентификации самостоятельно с помощью визуализатора XState можно по ссылке https://stately.ai/registry/editor/e2eb99f8-6f8a-4dc7-bba2-503523896bda?machineId=0fce8346-7413-45e0-bd81-2dc54c203960&mode=Design
