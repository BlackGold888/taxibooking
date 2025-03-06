# Taxi Booking API

## Описание
Этот проект представляет собой RESTful API для системы бронирования такси с возможностью запроса поездок, поиска ближайших водителей и назначения водителя на поездку.

## Технологии
- Node.js
- Express.js
- Haversine formula (для расчета расстояний между координатами)

## Установка и запуск
### 1. Клонирование репозитория
```sh
git clone https://github.com/BlackGold888/taxibooking.git
cd taxibooking
```

### 2. Установка зависимостей
```sh
npm install
```

### 3. Запуск сервера
```sh
npm start
```
Сервер будет работать на `http://localhost:3000`

## API Эндпоинты
### 1. Запрос поездки
**POST /ride/request**
#### Описание
Позволяет пользователю запросить поездку, указав координаты отправления и назначения.

#### Пример запроса
```sh
curl -X POST http://localhost:3000/ride/request -H "Content-Type: application/json" -d '{ "pickup": { "lat": 56.9469, "lng": 24.1059 }, "dropoff": { "lat": 56.9496, "lng": 24.1052 } }'
```

#### Пример ответа
```json
{
  "id": 1,
  "pickup": { "lat": 56.9469, "lng": 24.1059 },
  "dropoff": { "lat": 56.9496, "lng": 24.1052 },
  "status": "requested"
}
```

### 2. Поиск ближайших водителей
**GET /drivers/nearby**
#### Описание
Возвращает 3 ближайших доступных водителей в радиусе 5 миль.

#### Пример запроса
```sh
curl "http://localhost:3000/drivers/nearby?lat=56.9469&lng=24.1059"
```

#### Пример ответа
```json
[
  { "driverId": 1, "distance": 0.2 },
  { "driverId": 3, "distance": 1.5 }
]
```

### 3. Назначение водителя
**POST /ride/match**
#### Описание
Назначает ближайшего доступного водителя на поездку.

#### Пример запроса
```sh
curl -X POST http://localhost:3000/ride/match -H "Content-Type: application/json" -d '{ "rideId": 1 }'
```

#### Пример ответа
```json
{
  "id": 1,
  "pickup": { "lat": 56.9469, "lng": 24.1059 },
  "dropoff": { "lat": 56.9496, "lng": 24.1052 },
  "status": "matched",
  "driver": { "driverId": 1 }
}
```
