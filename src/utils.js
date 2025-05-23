import dayjs from 'dayjs';
import { offersMock } from './mock/offers-mock';

function convertDate(date, newFormat) {
  return dayjs(date).format(newFormat);
}

function getDestinationBydI(id, destinations) {
  return destinations.find((destination) => destination.id === id);
}

function getDuration(dateFrom, dateTo){
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const difference = end.diff(start, 'minute');

  if (difference > (60 * 24)) {
    const days = Math.floor(difference / (60 * 24));
    const remainder = difference % (60 * 24);
    const hours = Math.floor(remainder / 60);
    const minutes = remainder % 60;
    return `${String(days).padStart(2,'0')}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  } else if (difference > 60){
    const hours = Math.floor(difference / 60);
    const minutes = difference % 60;
    return `${String(hours).padStart(2,'0')}H ${String(minutes).padStart(2,'0')}M`;
  } else {
    return `${String(difference).padStart(2,'0')}M`;
  }
}

function getOffersByType(point) {
  return offersMock.find((offer) => offer.type === point.type).offers;
}

function getRandomPrice(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function isPointPresent(point) {
  return dayjs().isAfter(dayjs(point.dateFrom)) && dayjs().isBefore(dayjs(point.dateTo));
}

function isPointFuture(point) {
  return dayjs().isBefore(dayjs(point.dateFrom));
}

function isPointPast(point) {
  return dayjs().isAfter(dayjs(point.dateTo));
}

function updatePointData(points, updatedPointData) {
  return points.map((point) => point.id === updatedPointData.id ? updatedPointData : point);
}

function sortByDay(pointA, pointB){
  return new Date(pointA.dateFrom) - new Date(pointB.dateFrom);
}

function sortByPrice(pointA, pointB){
  return pointB.basePrice - pointA.basePrice;
}

function sortByDuration(pointA, pointB){
  return dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
}

function formatDate(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
}

export { convertDate, getDestinationBydI, getDuration, getOffersByType, getRandomPrice,
  isEscapeKey, isPointPresent, isPointFuture, isPointPast, updatePointData,
  sortByDay, sortByPrice, sortByDuration, formatDate };
