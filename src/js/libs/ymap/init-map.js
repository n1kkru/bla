import placemarkIco from '../../images/placemark-flag.svg'
import { createBalloon } from './map-balloon'
import { mapCluster } from './map-cluster'

//включить использование баллунов
const withBalloon = true

//настройки метки
let iconImageSize = [32, 32]
let iconImageOffset = [-16, -16]
const icon = placemarkIco

export function initMap() {
  let markArr = []
  let placemarks = [] //создаем пустой массив точек карты
  let pointsArr = []
  let mapDOM

  mapDOM = document.querySelector('#map')

  if (!mapDOM) return
  mapDOM.innerHTML = ''

  ymaps.ready(init)

  function init() {
    if (window.myMap) {
      return // если карта уже сущетсвует, то выходим из функции
    }

    if (mapDOM.hasAttribute('map-center')) {
      var center = map.getAttribute('map-center').split(' ')
    }

    if (mapDOM.hasAttribute('map-zoom')) {
      var zoom = Number(mapDOM.getAttribute('map-zoom'))
    }

    var myMap = new ymaps.Map('map', {
      center: center ? center : [54.193122, 37.617348],
      zoom: zoom ? zoom : 4,
      controls: ['smallMapDefaultSet']
    })

    // проходимся по всем элементам, которые будут отображены на карте
    var coordsList = document.querySelectorAll('.buy-card__item')

    if (coordsList.length === 0) return

    coordsList.forEach((item, index) => {
      let coordX = item.getAttribute('data-coord-x')
      let coordY = item.getAttribute('data-coord-y')
      let coords = [parseFloat(coordX), parseFloat(coordY)]
      let balloon
      let title
      let address
      let link

      pointsArr.push(coords)

      if (withBalloon) {
        title = item.querySelector('.buy-card__title').textContent
        address = item.querySelector('.buy-card__address').textContent
        link = item.querySelector('.buy-card__link').textContent

        balloon = createBalloon(title, address, link)
      }

      placemarks.push({
        coords: coords,
        hint: title,
        balloon: withBalloon ? balloon.innerHTML : undefined
      })
    })

    // создание плейсмарок (точек на карте)
    placemarks.forEach(placemark => {
      var myPlacemark = new ymaps.Placemark(
        placemark.coords,
        {
          hintContent: placemark.hint,
          balloonContent: withBalloon ? placemark.balloon : undefined
        },
        {
          iconLayout: 'default#image',
          iconImageHref: icon,
          iconImageSize: iconImageSize,
          iconImageOffset: iconImageOffset
        }
      )

      markArr.push(myPlacemark)

      myMap.geoObjects.add(myPlacemark)
    })

    let cad = document.querySelectorAll('[data-mark]')

    // событие на открытие баллуна при клике на список адресов слева
    cad.forEach((item, index) => {
      item.addEventListener('click', () => {
        if (withBalloon) {
          markArr.forEach((mark, i) => {
            if (index == i) {
              // получаем координаты из списка слева
              let x = item.getAttribute('data-coord-x')
              let y = item.getAttribute('data-coord-y')

              // центрируем карту
              myMap.setCenter([x, y])

              //увеличиваем карту
              myMap.setZoom(12)
              markArr[index].balloon.open()
            } else {
              markArr[i].balloon.close()
            }
          })
        } else {
          console.log('ошибка')
        }
      })
    })

    // событие на закрытие баллуна при клике на карту
    myMap.events.add('click', () => {
      if (withBalloon && myMap.balloon.isOpen()) {
        myMap.balloon.close()
      }
    })

    //Создание кластеров и добавление на карту
    mapCluster({ markArr, map: myMap })
  }
}

initMap()
