export const initBuyMapTabs = () => {
  const tabs = document.querySelectorAll('[data-map-tab]')
  if (!tabs.length) return // Проверка на наличие табов
  const mapContents = document.querySelectorAll('[data-map-content]')

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.mapTab
      const currentWrappers = document.querySelectorAll(`[data-map-content=${id}]`)

      // Убираем класс 'active' у всех табов
      tabs.forEach(item => item.classList.remove('active'))
      btn.classList.add('active')

      // Скрываем все содержимое карты
      mapContents.forEach(item => {
        item.style.transition = 'opacity 0.5s'
        item.style.opacity = '0'
        setTimeout(() => {
          item.style.display = 'none'
        }, 500) // Ждем завершения анимации перед скрытием
      })

      // Показываем текущее содержимое карты
      setTimeout(() => {
        currentWrappers.forEach(item => {
          item.style.display = 'block' // Показываем элемент
          setTimeout(() => {
            item.style.transition = 'opacity 0.5s'
            item.style.opacity = '1' // Плавно показываем элемент
          }, 10) // Небольшая задержка для активации перехода
        })
      }, 500)
    })
  })
}
