import React from 'react';

export default function SaveButtons({ uid, contentLength }) {
  if (uid && contentLength > 135) {
    return (
      <div className="text-right text-dark">
        <button className="btn btn-outline-light btn-sm purple">Отправить</button>
      </div>
    )
  } else if (uid) {
    return (
      <div className="text-right text-light">
        <button disabled
          className="btn btn-outline-light btn-sm"
          data-toggle="tooltip"
          data-placement="top"
          title="Напишите больше"
        >
          не отправить...
        </button>
      </div>
    )
  } else {
    return (
      <div className="text-muted text-right"
        data-toggle="tooltip"
        data-placement="top"
        title="Вы можете зарегестрироваться"
      >
        Вы не вошли в профиль, данные сохранятся в браузере
      </div>
    )
  }
}

