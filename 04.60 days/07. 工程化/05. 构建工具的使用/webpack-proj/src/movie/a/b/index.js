import $ from 'jquery';
import url from '@/a.png';

export default function () {
  $('<img>').prop('src', url).appendTo(document.body);
}
